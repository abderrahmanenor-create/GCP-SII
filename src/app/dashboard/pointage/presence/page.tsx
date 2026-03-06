"use client";

import { useState, useEffect } from "react";

type User = {
  id: string;
  nom: string;
  prenom: string;
  matricule: string | null;
  photoUrl: string | null;
  poste: { nom: string } | null;
  statut: string;
};

type Presence = {
  userId: string;
  statut: string;
  heureArrivee: string;
  heureDepart: string;
  remarque: string;
};

const STATUTS = [
  { value: "PRESENT",       label: "Présent",       color: "#10b981", bg: "#f0fdf4", icon: "✅" },
  { value: "RETARD",        label: "Retard",         color: "#f59e0b", bg: "#fffbeb", icon: "⏰" },
  { value: "ABSENT",        label: "Absent",         color: "#ef4444", bg: "#fef2f2", icon: "❌" },
  { value: "CONGE",         label: "Congé",          color: "#6366f1", bg: "#f5f3ff", icon: "🏖️" },
  { value: "MISSION",       label: "Mission",        color: "#0070f3", bg: "#f0f9ff", icon: "🚗" },
  { value: "ARRET_MALADIE", label: "Arrêt maladie",  color: "#dc2626", bg: "#fef2f2", icon: "🏥" },
];

function Avatar({ user }: { user: User }) {
  const initials = `${user.prenom[0]}${user.nom[0]}`.toUpperCase();
  const colors = ["#0070f3", "#10b981", "#6366f1", "#f59e0b", "#ef4444", "#0891b2"];
  const color = colors[(user.nom.charCodeAt(0) + user.prenom.charCodeAt(0)) % colors.length];
  if (user.photoUrl) return (
    <img src={user.photoUrl} alt={initials} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
  );
  return (
    <div style={{ width: 36, height: 36, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "12px", flexShrink: 0 }}>
      {initials}
    </div>
  );
}

export default function PresencePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [presences, setPresences] = useState<Record<string, Presence>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("");

  useEffect(() => { loadUsers(); }, []);
  useEffect(() => { loadPresences(); }, [date]);

  const loadUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    const actifs = Array.isArray(data) ? data.filter((u: User) => u.statut === "ACTIF") : [];
    setUsers(actifs);
    setLoading(false);
  };

  const loadPresences = async () => {
    const res = await fetch(`/api/presence?date=${date}`);
    const data = await res.json();
    const map: Record<string, Presence> = {};
    if (Array.isArray(data)) {
      data.forEach((p: any) => {
        map[p.userId] = {
          userId: p.userId,
          statut: p.statut,
          heureArrivee: p.heureArrivee || "",
          heureDepart: p.heureDepart || "",
          remarque: p.remarque || "",
        };
      });
    }
    setPresences(map);
  };

  const getPresence = (userId: string): Presence => {
    return presences[userId] || {
      userId,
      statut: "PRESENT",
      heureArrivee: "08:00",
      heureDepart: "17:00",
      remarque: "",
    };
  };

  const updatePresence = (userId: string, field: string, value: string) => {
    setPresences(prev => ({
      ...prev,
      [userId]: { ...getPresence(userId), [field]: value },
    }));
    setSaved(false);
  };

  const setAllStatut = (statut: string) => {
    const newPresences = { ...presences };
    users.forEach(u => {
      newPresences[u.id] = { ...getPresence(u.id), statut };
    });
    setPresences(newPresences);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const lignes = users.map(u => getPresence(u.id));
    await fetch("/api/presence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, lignes }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const filtered = users.filter(u => {
    const matchSearch = !search || `${u.nom} ${u.prenom} ${u.matricule}`.toLowerCase().includes(search.toLowerCase());
    const matchStatut = !filtreStatut || getPresence(u.id).statut === filtreStatut;
    return matchSearch && matchStatut;
  });

  // Stats
  const stats = STATUTS.map(s => ({
    ...s,
    count: users.filter(u => getPresence(u.id).statut === s.value).length,
  }));

  const presentsCount = users.filter(u => ["PRESENT", "RETARD"].includes(getPresence(u.id).statut)).length;

  if (loading) return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
      <div style={{ color: "#999" }}>Chargement...</div>
    </div>
  );

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#1a1a1a" }}>📋 Feuille de Présence</h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>Pointage journalier de tous les ouvriers</p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input type="date" value={date} onChange={e => { setDate(e.target.value); setSaved(false); }}
            style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", fontWeight: "bold" }} />
          <button onClick={handleSave} disabled={saving}
            style={{ padding: "10px 24px", background: saved ? "#10b981" : "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
            {saving ? "⏳ Sauvegarde..." : saved ? "✅ Sauvegardé !" : "💾 Sauvegarder"}
          </button>
        </div>
      </div>

      {/* KPIs statuts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "16px" }}>
        {stats.map(s => (
          <div key={s.value}
            onClick={() => setFiltreStatut(filtreStatut === s.value ? "" : s.value)}
            style={{
              background: filtreStatut === s.value ? s.bg : "white",
              border: `2px solid ${filtreStatut === s.value ? s.color : "#e5e7eb"}`,
              borderRadius: "10px", padding: "12px", cursor: "pointer", textAlign: "center",
            }}>
            <div style={{ fontSize: "20px" }}>{s.icon}</div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: s.color }}>{s.count}</div>
            <div style={{ fontSize: "10px", color: "#666" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Barre présence globale */}
      <div style={{ background: "white", borderRadius: "10px", padding: "14px 18px", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
          <span style={{ fontWeight: "bold" }}>Taux de présence</span>
          <span style={{ fontWeight: "bold", color: "#10b981" }}>
            {users.length > 0 ? Math.round((presentsCount / users.length) * 100) : 0}% — {presentsCount}/{users.length} ouvriers
          </span>
        </div>
        <div style={{ background: "#f1f5f9", borderRadius: "20px", height: "10px", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: "20px", background: "#10b981",
            width: `${users.length > 0 ? (presentsCount / users.length) * 100 : 0}%`,
            transition: "width 0.3s",
          }} />
        </div>
      </div>

      {/* Actions groupées + filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <input placeholder="🔍 Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: "7px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", flex: 1, minWidth: "160px" }} />
        <span style={{ fontSize: "12px", color: "#999", fontWeight: "bold" }}>Tout marquer :</span>
        {STATUTS.map(s => (
          <button key={s.value} onClick={() => setAllStatut(s.value)}
            style={{ padding: "5px 12px", background: s.bg, color: s.color, border: `1px solid ${s.color}44`, borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Table présence */}
      <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["EMPLOYÉ", "POSTE", "STATUT", "ARRIVÉE", "DÉPART", "REMARQUE"].map(h => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: "11px", color: "#666", fontWeight: "bold", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const p = getPresence(u.id);
              const st = STATUTS.find(s => s.value === p.statut) || STATUTS[0];
              const absent = ["ABSENT", "CONGE", "ARRET_MALADIE"].includes(p.statut);
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid #f1f5f9", background: absent ? "#fafafa" : "white" }}>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Avatar user={u} />
                      <div>
                        <div style={{ fontWeight: "bold", fontSize: "14px", color: absent ? "#aaa" : "#1a1a1a" }}>
                          {u.prenom} {u.nom}
                        </div>
                        <div style={{ fontSize: "11px", color: "#999" }}>{u.matricule || "—"}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: "13px", color: "#555" }}>
                    {u.poste?.nom || "—"}
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <select value={p.statut} onChange={e => updatePresence(u.id, "statut", e.target.value)}
                      style={{ padding: "5px 10px", border: `2px solid ${st.color}44`, borderRadius: "6px", fontSize: "12px", fontWeight: "bold", background: st.bg, color: st.color, cursor: "pointer" }}>
                      {STATUTS.map(s => <option key={s.value} value={s.value}>{s.icon} {s.label}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <input type="time" value={p.heureArrivee} disabled={absent}
                      onChange={e => updatePresence(u.id, "heureArrivee", e.target.value)}
                      style={{ padding: "5px 8px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", opacity: absent ? 0.3 : 1 }} />
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <input type="time" value={p.heureDepart} disabled={absent}
                      onChange={e => updatePresence(u.id, "heureDepart", e.target.value)}
                      style={{ padding: "5px 8px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", opacity: absent ? 0.3 : 1 }} />
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <input type="text" value={p.remarque} placeholder="Optionnel..."
                      onChange={e => updatePresence(u.id, "remarque", e.target.value)}
                      style={{ padding: "5px 10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "12px", width: "140px" }} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}