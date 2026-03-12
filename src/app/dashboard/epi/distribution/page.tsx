"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Distribution = {
  id: string;
  date: string;
  quantite: number;
  etat: string;
  taille: string | null;
  dateMiseEnService: string | null;
  datePeremption: string | null;
  dateProchVGP: string | null;
  dateDerniereVGP: string | null;
  dateRetour: string | null;
  statut: string;
  motifReforme: string | null;
  remarque: string | null;
  epi: {
    id: string;
    nom: string;
    reference: string | null;
    norme: string | null;
    categorieSec: string;
    vgpRequise: boolean;
    dureeVieAns: number | null;
  };
  user: {
    id: string;
    nom: string;
    prenom: string;
    matricule: string | null;
    poste: { nom: string } | null;
  };
};

type EPI = { id: string; nom: string; stockActuel: number; norme: string | null };
type User = { id: string; nom: string; prenom: string; matricule: string | null; poste: { nom: string } | null };

const statutColor: Record<string, { bg: string; color: string; label: string }> = {
  ACTIF:    { bg: "#f0fdf4", color: "#10b981", label: "Actif" },
  RETOURNE: { bg: "#f0f9ff", color: "#0070f3", label: "Retourné" },
  REFORME:  { bg: "#fef2f2", color: "#ef4444", label: "Réformé" },
  PERDU:    { bg: "#f9fafb", color: "#6b7280", label: "Perdu" },
};

function joursRestants(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function AlerteBadge({ date, label }: { date: string | null; label: string }) {
  if (!date) return null;
  const jours = joursRestants(date);
  if (jours === null) return null;
  if (jours < 0) return (
    <span style={{ background: "#fee2e2", color: "#ef4444", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "bold", display: "block", marginTop: "2px" }}>
      ⛔ {label} dépassé ({Math.abs(jours)}j)
    </span>
  );
  if (jours <= 30) return (
    <span style={{ background: "#fef3c7", color: "#d97706", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "bold", display: "block", marginTop: "2px" }}>
      ⚠️ {label} dans {jours}j
    </span>
  );
  return null;
}

export default function DistributionPage() {
  const router = useRouter();
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [epis, setEpis] = useState<EPI[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showVGPModal, setShowVGPModal] = useState<Distribution | null>(null);
  const [showReformeModal, setShowReformeModal] = useState<Distribution | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("ACTIF");
  const [filtreUser, setFiltreUser] = useState("");
  const [filtreAlertes, setFiltreAlertes] = useState(false);

  const emptyForm = {
    epiId: "", userId: "", quantite: "1", etat: "NEUF",
    taille: "", dateMiseEnService: new Date().toISOString().split("T")[0], remarque: "",
  };
  const [form, setForm] = useState<any>(emptyForm);
  const [vgpForm, setVgpForm] = useState({ dateDerniereVGP: new Date().toISOString().split("T")[0], dateProchVGP: "" });
  const [motifReforme, setMotifReforme] = useState("");

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const [distRes, episRes, usersRes] = await Promise.all([
      fetch("/api/epi/distribution").then(r => r.json()),
      fetch("/api/epi/stock").then(r => r.json()),
      fetch("/api/users").then(r => r.json()),
    ]);
    setDistributions(Array.isArray(distRes) ? distRes : []);
    setEpis(Array.isArray(episRes) ? episRes : []);
    setUsers(Array.isArray(usersRes) ? usersRes : []);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!form.epiId || !form.userId) { setError("EPI et employé obligatoires"); return; }
    setSaving(true); setError("");
    const res = await fetch("/api/epi/distribution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) { const d = await res.json(); setError(d.error); setSaving(false); return; }
    await loadData();
    setShowModal(false);
    setForm(emptyForm);
    setSaving(false);
  };

  const handleAction = async (id: string, action: string, extra?: any) => {
    setSaving(true);
    await fetch("/api/epi/distribution", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action, ...extra }),
    });
    await loadData();
    setShowVGPModal(null);
    setShowReformeModal(null);
    setSaving(false);
  };

  const distFiltrees = distributions.filter(d => {
    const matchStatut = !filtreStatut || d.statut === filtreStatut;
    const matchUser = !filtreUser || d.user.id === filtreUser;
    const matchAlertes = !filtreAlertes || (
      (joursRestants(d.datePeremption) !== null && joursRestants(d.datePeremption)! <= 30) ||
      (joursRestants(d.dateProchVGP) !== null && joursRestants(d.dateProchVGP)! <= 30)
    );
    return matchStatut && matchUser && matchAlertes;
  });

  const totalAlertes = distributions.filter(d =>
    d.statut === "ACTIF" && (
      (joursRestants(d.datePeremption) !== null && joursRestants(d.datePeremption)! <= 30) ||
      (joursRestants(d.dateProchVGP) !== null && joursRestants(d.dateProchVGP)! <= 30)
    )
  ).length;

  const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" as const };
  const labelStyle = { fontSize: "11px", fontWeight: "bold" as const, color: "#666", marginBottom: "4px", display: "block" };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#999" }}>Chargement...</div>;

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold" }}>👷 Dotations EPI</h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>Suivi individuel par ouvrier avec traçabilité complète</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => router.push("/dashboard/epi/stock")}
            style={{ padding: "10px 18px", background: "#f0f9ff", border: "1px solid #0070f3", borderRadius: "8px", color: "#0070f3", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
            📦 Stock EPI
          </button>
          <button onClick={() => { setForm(emptyForm); setShowModal(true); }}
            style={{ background: "#10b981", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>
            + Nouvelle dotation
          </button>
        </div>
      </div>

      {/* KPI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Dotations actives", value: distributions.filter(d => d.statut === "ACTIF").length, color: "#10b981", bg: "#f0fdf4", icon: "✅" },
          { label: "Alertes péremption/VGP", value: totalAlertes, color: "#ef4444", bg: "#fef2f2", icon: "⚠️" },
          { label: "Retournés", value: distributions.filter(d => d.statut === "RETOURNE").length, color: "#0070f3", bg: "#f0f9ff", icon: "↩️" },
          { label: "Réformés", value: distributions.filter(d => d.statut === "REFORME").length, color: "#6b7280", bg: "#f9fafb", icon: "🗑️" },
        ].map(item => (
          <div key={item.label} style={{ background: item.bg, borderRadius: "10px", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "20px", marginBottom: "4px" }}>{item.icon}</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: item.color }}>{item.value}</div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "16px 20px", marginBottom: "16px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <select value={filtreStatut} onChange={e => setFiltreStatut(e.target.value)}
          style={{ ...inputStyle, width: "160px" }}>
          <option value="">Tous statuts</option>
          <option value="ACTIF">Actifs</option>
          <option value="RETOURNE">Retournés</option>
          <option value="REFORME">Réformés</option>
        </select>
        <select value={filtreUser} onChange={e => setFiltreUser(e.target.value)}
          style={{ ...inputStyle, width: "200px" }}>
          <option value="">Tous les ouvriers</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.nom} {u.prenom}</option>)}
        </select>
        <button onClick={() => setFiltreAlertes(!filtreAlertes)} style={{
          padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer",
          background: filtreAlertes ? "#ef4444" : "#f4f6f9",
          color: filtreAlertes ? "white" : "#666", fontWeight: "bold", fontSize: "13px",
        }}>
          ⚠️ Alertes ({totalAlertes})
        </button>
        <span style={{ color: "#999", fontSize: "13px", marginLeft: "auto" }}>{distFiltrees.length} dotation(s)</span>
      </div>

      {/* Tableau */}
      <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        {distFiltrees.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#999" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>👷</div>
            <div>Aucune dotation trouvée</div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                {["OUVRIER", "EPI", "QTÉ / ÉTAT", "DATE DOTATION", "PÉREMPTION / VGP", "STATUT", "ACTIONS"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {distFiltrees.map(d => {
                const st = statutColor[d.statut];
                const hasAlerte = (joursRestants(d.datePeremption) !== null && joursRestants(d.datePeremption)! <= 30) ||
                  (joursRestants(d.dateProchVGP) !== null && joursRestants(d.dateProchVGP)! <= 30);
                return (
                  <tr key={d.id} style={{ borderBottom: "1px solid #f1f5f9", background: hasAlerte && d.statut === "ACTIF" ? "#fffbeb" : "white" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{d.user.nom} {d.user.prenom}</div>
                      <div style={{ fontSize: "11px", color: "#999" }}>{d.user.matricule || ""} {d.user.poste?.nom || ""}</div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{d.epi.nom}</div>
                      {d.epi.norme && <span style={{ background: "#f0f9ff", color: "#0070f3", padding: "1px 6px", borderRadius: "4px", fontSize: "11px" }}>{d.epi.norme}</span>}
                      {d.taille && <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>Taille: {d.taille}</div>}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontWeight: "bold" }}>{d.quantite} unité(s)</div>
                      <span style={{ fontSize: "11px", background: "#f0f9ff", color: "#0070f3", padding: "1px 6px", borderRadius: "4px" }}>{d.etat}</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "13px" }}>
                      {new Date(d.date).toLocaleDateString("fr-FR")}
                      {d.dateMiseEnService && (
                        <div style={{ fontSize: "11px", color: "#999" }}>
                          Service: {new Date(d.dateMiseEnService).toLocaleDateString("fr-FR")}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {d.datePeremption ? (
                        <div style={{ fontSize: "12px" }}>
                          <div>📅 {new Date(d.datePeremption).toLocaleDateString("fr-FR")}</div>
                          <AlerteBadge date={d.datePeremption} label="Péremption" />
                        </div>
                      ) : <span style={{ color: "#ccc", fontSize: "12px" }}>—</span>}
                      {d.epi.vgpRequise && d.dateProchVGP && (
                        <div style={{ fontSize: "12px", marginTop: "4px" }}>
                          <div>🔍 VGP: {new Date(d.dateProchVGP).toLocaleDateString("fr-FR")}</div>
                          <AlerteBadge date={d.dateProchVGP} label="VGP" />
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: st.bg, color: st.color, padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {d.statut === "ACTIF" && (
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          <button onClick={() => handleAction(d.id, "RETOUR")}
                            style={{ padding: "4px 8px", background: "#f0f9ff", color: "#0070f3", border: "1px solid #0070f3", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>
                            ↩ Retour
                          </button>
                          {d.epi.vgpRequise && (
                            <button onClick={() => { setShowVGPModal(d); setVgpForm({ dateDerniereVGP: new Date().toISOString().split("T")[0], dateProchVGP: "" }); }}
                              style={{ padding: "4px 8px", background: "#fef3c7", color: "#d97706", border: "1px solid #fcd34d", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>
                              🔍 VGP
                            </button>
                          )}
                          <button onClick={() => { setShowReformeModal(d); setMotifReforme(""); }}
                            style={{ padding: "4px 8px", background: "#fee2e2", color: "#ef4444", border: "1px solid #fca5a5", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>
                              🗑 Réforme
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal nouvelle dotation */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "28px", width: "520px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: "bold" }}>Nouvelle dotation EPI</h3>

            {error && <div style={{ background: "#fee2e2", borderRadius: "6px", padding: "10px", marginBottom: "16px", color: "#dc2626", fontSize: "13px" }}>{error}</div>}

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={labelStyle}>OUVRIER <span style={{ color: "#ef4444" }}>*</span></label>
                <select style={inputStyle} value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })}>
                  <option value="">— Sélectionner un ouvrier —</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.nom} {u.prenom} {u.matricule ? `(${u.matricule})` : ""}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>EPI <span style={{ color: "#ef4444" }}>*</span></label>
                <select style={inputStyle} value={form.epiId} onChange={e => setForm({ ...form, epiId: e.target.value })}>
                  <option value="">— Sélectionner un EPI —</option>
                  {epis.filter(e => e.stockActuel > 0).map(e => (
                    <option key={e.id} value={e.id}>{e.nom} {e.norme ? `(${e.norme})` : ""} — Stock: {e.stockActuel}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>QUANTITÉ</label>
                  <input type="number" style={inputStyle} value={form.quantite} min={1}
                    onChange={e => setForm({ ...form, quantite: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>ÉTAT</label>
                  <select style={inputStyle} value={form.etat} onChange={e => setForm({ ...form, etat: e.target.value })}>
                    <option value="NEUF">Neuf</option>
                    <option value="BON">Bon état</option>
                    <option value="USE">Usé</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>TAILLE</label>
                  <input style={inputStyle} value={form.taille} placeholder="S, M, L, 42..."
                    onChange={e => setForm({ ...form, taille: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>DATE MISE EN SERVICE</label>
                <input type="date" style={inputStyle} value={form.dateMiseEnService}
                  onChange={e => setForm({ ...form, dateMiseEnService: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>REMARQUE</label>
                <input style={inputStyle} value={form.remarque} placeholder="Observations..."
                  onChange={e => setForm({ ...form, remarque: e.target.value })} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px" }}>
              <button onClick={() => { setShowModal(false); setError(""); }}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={handleSubmit} disabled={saving}
                style={{ padding: "10px 20px", background: "#10b981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                {saving ? "..." : "Distribuer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal VGP */}
      {showVGPModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "28px", width: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 6px", fontSize: "18px", fontWeight: "bold" }}>🔍 Enregistrer VGP</h3>
            <p style={{ margin: "0 0 20px", color: "#666", fontSize: "14px" }}>
              {showVGPModal.epi.nom} — {showVGPModal.user.nom} {showVGPModal.user.prenom}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={labelStyle}>DATE DE LA VGP</label>
                <input type="date" style={inputStyle} value={vgpForm.dateDerniereVGP}
                  onChange={e => setVgpForm({ ...vgpForm, dateDerniereVGP: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>PROCHAINE VGP</label>
                <input type="date" style={inputStyle} value={vgpForm.dateProchVGP}
                  onChange={e => setVgpForm({ ...vgpForm, dateProchVGP: e.target.value })} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}>
              <button onClick={() => setShowVGPModal(null)}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={() => handleAction(showVGPModal.id, "VGP", vgpForm)} disabled={saving}
                style={{ padding: "10px 20px", background: "#f59e0b", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                {saving ? "..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Réforme */}
      {showReformeModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "28px", width: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 6px", fontSize: "18px", fontWeight: "bold" }}>🗑️ Réformer l'EPI</h3>
            <p style={{ margin: "0 0 20px", color: "#666", fontSize: "14px" }}>
              {showReformeModal.epi.nom} — {showReformeModal.user.nom} {showReformeModal.user.prenom}
            </p>
            <div>
              <label style={labelStyle}>MOTIF DE RÉFORME</label>
              <input style={inputStyle} value={motifReforme} placeholder="Péremption, usure, choc, détérioration..."
                onChange={e => setMotifReforme(e.target.value)} />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}>
              <button onClick={() => setShowReformeModal(null)}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={() => handleAction(showReformeModal.id, "REFORME", { motifReforme })} disabled={saving}
                style={{ padding: "10px 20px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                {saving ? "..." : "Confirmer réforme"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}