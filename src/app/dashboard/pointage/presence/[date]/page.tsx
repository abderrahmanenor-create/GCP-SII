"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

type User = {
  id: string; nom: string; prenom: string;
  matricule: string | null; photoUrl: string | null;
  poste: { nom: string } | null; statut: string;
};

type StatutPresence = "PRESENT" | "ABSENT" | "RETARD" | "CONGE" | "MISSION" | "ARRET_MALADIE";

type Presence = {
  statut: StatutPresence;
  heureArrivee: string;
  heureDepart: string;
  remarque: string;
};

const STATUTS: Record<StatutPresence, { label: string; color: string; bg: string; icon: string; border: string }> = {
  PRESENT:       { label: "Présent",   color: "#059669", bg: "#f0fdf4", icon: "✅", border: "#6ee7b7" },
  RETARD:        { label: "Retard",    color: "#d97706", bg: "#fffbeb", icon: "⏰", border: "#fde68a" },
  ABSENT:        { label: "Absent",    color: "#dc2626", bg: "#fef2f2", icon: "❌", border: "#fca5a5" },
  CONGE:         { label: "Congé",     color: "#7c3aed", bg: "#f5f3ff", icon: "🏖️", border: "#ddd6fe" },
  MISSION:       { label: "Mission",   color: "#0070f3", bg: "#eff6ff", icon: "🚗", border: "#bfdbfe" },
  ARRET_MALADIE: { label: "Maladie",   color: "#be123c", bg: "#fff1f2", icon: "🏥", border: "#fecdd3" },
};

const ORDRE: StatutPresence[] = ["PRESENT","RETARD","ABSENT","CONGE","MISSION","ARRET_MALADIE"];

function Avatar({ user, size = 44 }: { user: User; size?: number }) {
  const initials = `${user.prenom[0]}${user.nom[0]}`.toUpperCase();
  const colors = ["#0070f3","#059669","#7c3aed","#d97706","#dc2626","#0891b2"];
  const color = colors[(user.nom.charCodeAt(0) + user.prenom.charCodeAt(0)) % colors.length];
  if (user.photoUrl) return <img src={user.photoUrl} alt={initials} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: size * 0.32, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

export default function AppelPage() {
  const params = useParams();
  const router = useRouter();
  const dateStr = params.date as string;

  const [users, setUsers] = useState<User[]>([]);
  const [presences, setPresences] = useState<Record<string, Presence>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [etape, setEtape] = useState<"appel" | "revision" | "confirme">("appel");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Gestion touch intelligente — distingue tap vs scroll
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const MOVE_THRESHOLD = 10; // pixels
  const TIME_THRESHOLD = 500; // ms pour long press

  useEffect(() => { loadData(); }, [dateStr]);

  const loadData = async () => {
    const [usersRes, presencesRes, veilleRes] = await Promise.all([
      fetch("/api/users").then(r => r.json()),
      fetch(`/api/presence?date=${dateStr}`).then(r => r.json()),
      fetch(`/api/presence/veille?date=${dateStr}`).then(r => r.json()),
    ]);

    const actifs: User[] = Array.isArray(usersRes)
      ? usersRes.filter((u: User) => u.statut === "ACTIF")
      : [];
    setUsers(actifs);

    // Priorité : données existantes > données de la veille > défaut PRESENT
    const map: Record<string, Presence> = {};

    // D'abord la veille
    if (Array.isArray(veilleRes)) {
      veilleRes.forEach((p: any) => {
        map[p.userId] = {
          statut: p.statut,
          heureArrivee: p.heureArrivee || "08:00",
          heureDepart: p.heureDepart || "17:00",
          remarque: "",
        };
      });
    }

    // Ensuite les données existantes du jour (écrasent la veille)
    if (Array.isArray(presencesRes)) {
      presencesRes.forEach((p: any) => {
        map[p.userId] = {
          statut: p.statut,
          heureArrivee: p.heureArrivee || "08:00",
          heureDepart: p.heureDepart || "17:00",
          remarque: p.remarque || "",
        };
      });
    }

    setPresences(map);
    setLoading(false);
  };

  const getPresence = (userId: string): Presence =>
    presences[userId] || { statut: "PRESENT", heureArrivee: "08:00", heureDepart: "17:00", remarque: "" };

  const setStatut = (userId: string, statut: StatutPresence) => {
    setPresences(prev => ({ ...prev, [userId]: { ...getPresence(userId), statut } }));
    setMenuOpen(null);
  };

  const updateField = (userId: string, field: keyof Presence, value: string) => {
    setPresences(prev => ({ ...prev, [userId]: { ...getPresence(userId), [field]: value } }));
  };

  // ===== GESTION TOUCH INTELLIGENTE =====
  const handleTouchStart = useCallback((userId: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  }, []);

  const handleTouchEnd = useCallback((userId: string, e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - touchStart.current.x);
    const dy = Math.abs(touch.clientY - touchStart.current.y);
    const dt = Date.now() - touchStart.current.time;

    // Si mouvement > seuil → c'est un scroll, ignorer
    if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
      touchStart.current = null;
      return;
    }

    // Long press → menu statut
    if (dt >= TIME_THRESHOLD) {
      e.preventDefault();
      setMenuOpen(prev => prev === userId ? null : userId);
    } else {
      // Tap court → toggle présent/absent
      const current = getPresence(userId).statut;
      setStatut(userId, current === "PRESENT" ? "ABSENT" : "PRESENT");
    }

    touchStart.current = null;
  }, [presences]);

  const handleClick = useCallback((userId: string) => {
    // Click souris uniquement (pas touch)
    const current = getPresence(userId).statut;
    setStatut(userId, current === "PRESENT" ? "ABSENT" : "PRESENT");
  }, [presences]);

  const setAllStatut = (statut: StatutPresence) => {
    const newP = { ...presences };
    users.forEach(u => { newP[u.id] = { ...getPresence(u.id), statut }; });
    setPresences(newP);
  };

  const handleSave = async () => {
    setSaving(true);
    const lignes = users.map(u => ({ userId: u.id, ...getPresence(u.id) }));
    await fetch("/api/presence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: dateStr, lignes }),
    });
    setSaving(false);
    setEtape("confirme");
    setTimeout(() => router.push("/dashboard/pointage/presence"), 2000);
  };

  const filtered = users.filter(u =>
    !search || `${u.nom} ${u.prenom} ${u.matricule || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: users.length,
    presents: users.filter(u => getPresence(u.id).statut === "PRESENT").length,
    retards: users.filter(u => getPresence(u.id).statut === "RETARD").length,
    absents: users.filter(u => getPresence(u.id).statut === "ABSENT").length,
    conge: users.filter(u => getPresence(u.id).statut === "CONGE").length,
    mission: users.filter(u => getPresence(u.id).statut === "MISSION").length,
    maladie: users.filter(u => getPresence(u.id).statut === "ARRET_MALADIE").length,
  };

  const date = new Date(dateStr);
  const dateLabel = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  if (loading) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ fontSize: 48 }}>📋</div>
      <div style={{ color: "#999", marginTop: 12 }}>Chargement de l'appel...</div>
    </div>
  );

  // ===== ÉCRAN CONFIRMATION =====
  if (etape === "confirme") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16 }}>
      <div style={{ fontSize: 64 }}>✅</div>
      <div style={{ fontSize: 20, fontWeight: "bold", color: "#059669" }}>Fiche sauvegardée !</div>
      <div style={{ color: "#666" }}>{stats.presents} présents · {stats.absents} absents</div>
    </div>
  );

  // ===== ÉCRAN RÉVISION =====
  if (etape === "revision") return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh", paddingBottom: 100 }}>
      <div style={{ background: "white", padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setEtape("appel")}
            style={{ padding: "6px 14px", border: "1px solid #ddd", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 14, minHeight: 40 }}>
            ← Retour
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(15px,4vw,20px)", fontWeight: "bold" }}>📊 Révision avant validation</h1>
            <div style={{ fontSize: 12, color: "#888" }}>{dateLabel}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>

        {/* Récap global */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Présents",  value: stats.presents, color: "#059669", bg: "#f0fdf4", icon: "✅" },
            { label: "Retards",   value: stats.retards,  color: "#d97706", bg: "#fffbeb", icon: "⏰" },
            { label: "Absents",   value: stats.absents,  color: "#dc2626", bg: "#fef2f2", icon: "❌" },
            { label: "Congés",    value: stats.conge,    color: "#7c3aed", bg: "#f5f3ff", icon: "🏖️" },
            { label: "Missions",  value: stats.mission,  color: "#0070f3", bg: "#eff6ff", icon: "🚗" },
            { label: "Maladie",   value: stats.maladie,  color: "#be123c", bg: "#fff1f2", icon: "🏥" },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "10px", textAlign: "center", border: `1px solid ${s.color}22` }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: "bold", color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "#666" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tableau récap par statut */}
        {ORDRE.filter(s => users.some(u => getPresence(u.id).statut === s)).map(statut => {
          const st = STATUTS[statut];
          const ouvriers = users.filter(u => getPresence(u.id).statut === statut);
          return (
            <div key={statut} style={{ background: "white", borderRadius: 12, marginBottom: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ padding: "12px 16px", background: st.bg, borderBottom: `2px solid ${st.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{st.icon}</span>
                <span style={{ fontWeight: "bold", color: st.color }}>{st.label}</span>
                <span style={{ background: "white", color: st.color, padding: "1px 8px", borderRadius: 20, fontSize: 12, fontWeight: "bold", marginLeft: "auto" }}>
                  {ouvriers.length}
                </span>
              </div>
              {ouvriers.map((u, i) => {
                const p = getPresence(u.id);
                return (
                  <div key={u.id} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
                    borderBottom: i < ouvriers.length - 1 ? "1px solid #f1f5f9" : "none",
                  }}>
                    <Avatar user={u} size={34} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", fontSize: 14 }}>{u.prenom} {u.nom}</div>
                      <div style={{ fontSize: 11, color: "#aaa" }}>{u.poste?.nom || "—"}</div>
                    </div>
                    {!["ABSENT","CONGE","ARRET_MALADIE"].includes(statut) && (
                      <div style={{ fontSize: 12, color: "#666" }}>
                        {p.heureArrivee} → {p.heureDepart}
                      </div>
                    )}
                    {p.remarque && (
                      <div style={{ fontSize: 11, color: "#0070f3", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        💬 {p.remarque}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Barre validation */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", padding: "14px 20px", boxShadow: "0 -4px 20px rgba(0,0,0,0.1)", display: "flex", gap: 12, zIndex: 99 }}>
        <button onClick={() => setEtape("appel")}
          style={{ flex: 1, padding: 14, border: "1px solid #ddd", borderRadius: 10, background: "white", cursor: "pointer", fontSize: 14 }}>
          ✏️ Modifier
        </button>
        <button onClick={handleSave} disabled={saving}
          style={{ flex: 2, padding: 14, background: "#059669", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: "bold", fontSize: 15, minHeight: 52 }}>
          {saving ? "⏳ Sauvegarde..." : "✅ Confirmer et valider"}
        </button>
      </div>
    </div>
  );

  // ===== ÉCRAN APPEL PRINCIPAL =====
  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh", paddingBottom: 100 }}>

      {/* Header sticky */}
      <div style={{ background: "white", padding: "14px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => router.push("/dashboard/pointage/presence")}
              style={{ padding: "6px 12px", border: "1px solid #ddd", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 14, minHeight: 38 }}>
              ←
            </button>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "clamp(14px,3.5vw,18px)" }}>📋 Appel</div>
              <div style={{ fontSize: 11, color: "#888" }}>{dateLabel}</div>
            </div>
          </div>
          {/* Mini stats */}
          <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
            <span style={{ color: "#059669", fontWeight: "bold" }}>✅ {stats.presents}</span>
            {stats.retards > 0 && <span style={{ color: "#d97706", fontWeight: "bold" }}>⏰ {stats.retards}</span>}
            <span style={{ color: "#dc2626", fontWeight: "bold" }}>❌ {stats.absents}</span>
            <span style={{ color: "#aaa" }}>/ {stats.total}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 16px" }}>

        {/* Actions groupées */}
        <div style={{ background: "white", borderRadius: 12, padding: "12px 14px", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input placeholder="🔍 Rechercher..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, minHeight: 42, outline: "none" }} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "#aaa", fontWeight: "bold" }}>TOUT :</span>
            {ORDRE.map(s => {
              const st = STATUTS[s];
              return (
                <button key={s} onClick={() => setAllStatut(s)} style={{
                  padding: "4px 10px", background: st.bg, color: st.color,
                  border: `1px solid ${st.border}`, borderRadius: 20,
                  cursor: "pointer", fontSize: 11, fontWeight: "bold", minHeight: 30,
                }}>
                  {st.icon} {st.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instruction */}
        <div style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginBottom: 10 }}>
          👆 Tap = présent/absent · Appui long = choisir statut
        </div>

        {/* Grille cartes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(150px, 44vw), 1fr))",
          gap: 10,
        }}>
          {filtered.map(u => {
            const p = getPresence(u.id);
            const st = STATUTS[p.statut];
            const isMenu = menuOpen === u.id;

            return (
              <div key={u.id} style={{ position: "relative" }}>
                <div
                  onTouchStart={(e) => handleTouchStart(u.id, e)}
                  onTouchEnd={(e) => handleTouchEnd(u.id, e)}
                  onClick={() => handleClick(u.id)}
                  style={{
                    background: st.bg, border: `2px solid ${st.border}`,
                    borderRadius: 12, padding: "14px 10px", cursor: "pointer",
                    textAlign: "center", userSelect: "none", WebkitUserSelect: "none",
                    touchAction: "pan-y", // permet le scroll vertical natif
                    transition: "transform 0.1s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                    <Avatar user={u} size={42} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#1a1a1a", lineHeight: 1.2 }}>{u.prenom}</div>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>{u.nom}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 20, background: "white", border: `1px solid ${st.border}`, fontSize: 11, fontWeight: "bold", color: st.color }}>
                    {st.icon} {st.label}
                  </div>
                  {u.poste && <div style={{ fontSize: 9, color: "#bbb", marginTop: 4 }}>{u.poste.nom}</div>}
                </div>

                {/* Menu statut (appui long) */}
                {isMenu && (
                  <div
                    style={{
                      position: "absolute", top: "105%", left: "50%", transform: "translateX(-50%)",
                      background: "white", borderRadius: 12, padding: 8,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.2)", zIndex: 200,
                      minWidth: 170, border: "1px solid #e5e7eb",
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div style={{ fontSize: 11, color: "#aaa", padding: "4px 8px 8px", fontWeight: "bold" }}>
                      {u.prenom} {u.nom}
                    </div>
                    {ORDRE.map(s => {
                      const sst = STATUTS[s];
                      return (
                        <button key={s} onClick={() => setStatut(u.id, s)} style={{
                          width: "100%", padding: "9px 12px", textAlign: "left",
                          background: p.statut === s ? sst.bg : "white",
                          border: "none", borderRadius: 8, cursor: "pointer",
                          fontSize: 13, color: sst.color, fontWeight: p.statut === s ? "bold" : "normal",
                          display: "flex", alignItems: "center", gap: 8,
                        }}>
                          {sst.icon} {sst.label}
                          {p.statut === s && <span style={{ marginLeft: "auto", fontSize: 10 }}>✓</span>}
                        </button>
                      );
                    })}
                    <div style={{ borderTop: "1px solid #f1f5f9", marginTop: 4, paddingTop: 4 }}>
                      <button onClick={() => { setEditUser(u.id); setMenuOpen(null); }} style={{
                        width: "100%", padding: "8px 12px", background: "white", border: "none",
                        borderRadius: 8, cursor: "pointer", fontSize: 12, color: "#0070f3",
                        display: "flex", alignItems: "center", gap: 8, textAlign: "left",
                      }}>
                        🕐 Modifier les heures
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fermer menu en cliquant ailleurs */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setMenuOpen(null)} />
      )}

      {/* Modal heures (bottom sheet) */}
      {editUser && (() => {
        const u = users.find(x => x.id === editUser)!;
        const p = getPresence(editUser);
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000 }}
            onClick={() => setEditUser(null)}>
            <div onClick={e => e.stopPropagation()} style={{
              background: "white", borderRadius: "16px 16px 0 0", padding: 24,
              width: "100%", maxWidth: 480, boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontWeight: "bold", fontSize: 16 }}>🕐 {u.prenom} {u.nom}</div>
                <button onClick={() => setEditUser(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#666" }}>×</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "ARRIVÉE", field: "heureArrivee" as keyof Presence },
                  { label: "DÉPART",  field: "heureDepart"  as keyof Presence },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label style={{ fontSize: 11, fontWeight: "bold", color: "#666", display: "block", marginBottom: 6 }}>{label}</label>
                    <input type="time" value={p[field] as string}
                      onChange={e => updateField(editUser, field, e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 16, minHeight: 48 }} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: "bold", color: "#666", display: "block", marginBottom: 6 }}>REMARQUE</label>
                <input type="text" value={p.remarque} placeholder="Optionnel..."
                  onChange={e => updateField(editUser, "remarque", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, minHeight: 44 }} />
              </div>
              <button onClick={() => setEditUser(null)} style={{
                width: "100%", padding: 14, background: "#0070f3", color: "white",
                border: "none", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: "bold",
              }}>
                ✓ Confirmer
              </button>
            </div>
          </div>
        );
      })()}

      {/* Barre basse fixe */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "white", padding: "12px 20px",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        display: "flex", gap: 10, alignItems: "center", zIndex: 99,
      }}>
        <div style={{ flex: 1, fontSize: 13, color: "#666" }}>
          <span style={{ color: "#059669", fontWeight: "bold" }}>{stats.presents}</span> présents
          {stats.absents > 0 && <span style={{ color: "#dc2626", fontWeight: "bold" }}> · {stats.absents}</span>}
          {stats.absents > 0 && " absents"}
          <span style={{ color: "#aaa" }}> / {stats.total}</span>
        </div>
        <button onClick={() => setEtape("revision")}
          style={{ padding: "10px 24px", background: "#0070f3", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: "bold", fontSize: 14, minHeight: 46 }}>
          Réviser →
        </button>
      </div>
    </div>
  );
}