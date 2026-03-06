"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Facture = {
  id: string;
  numero: string;
  statut: string;
  dateEmission: string;
  dateEcheance: string | null;
  totalHT: number;
  montantTVA: number;
  montantRetenue: number;
  totalTTC: number;
  netAPayer: number;
  tauxTVA: number;
  tauxRetenue: number;
  client: { id: string; nom: string };
  feuilles: { id: string; date: string; totalGeneral: number; zone: { nom: string; projet: { nom: string; code: string } } }[];
};

type Feuille = {
  id: string;
  date: string;
  statut: string;
  totalGeneral: number;
  totalHeures: number;
  factureId: string | null;
  zone: { nom: string; projet: { nom: string; code: string; contrat: { client: { id: string; nom: string } } } };
};

type Societe = { id: string; nom: string };

const statutConfig: Record<string, { label: string; color: string; bg: string }> = {
  BROUILLON: { label: "Brouillon",  color: "#6b7280", bg: "#f9fafb" },
  EMISE:     { label: "Émise",      color: "#0070f3", bg: "#f0f9ff" },
  PAYEE:     { label: "Payée",      color: "#10b981", bg: "#f0fdf4" },
  ANNULEE:   { label: "Annulée",    color: "#ef4444", bg: "#fef2f2" },
};

export default function FacturationPage() {
  const router = useRouter();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [feuilles, setFeuilles] = useState<Feuille[]>([]);
  const [clients, setClients] = useState<Societe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filtreStatut, setFiltreStatut] = useState("");
  const [filtreClient, setFiltreClient] = useState("");

  const [form, setForm] = useState({
    clientId: "",
    feuilleIds: [] as string[],
    tauxTVA: "20",
    tauxRetenue: "0",
    dateEcheance: "",
    notes: "",
  });

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    const [facturesRes, feuillesRes, clientsRes] = await Promise.all([
      fetch("/api/facturation").then(r => r.json()),
      fetch("/api/pointage/regie/liste").then(r => r.json()),
      fetch("/api/admin/clients").then(r => r.json()),
    ]);
    setFactures(Array.isArray(facturesRes) ? facturesRes : []);
    setFeuilles(Array.isArray(feuillesRes) ? feuillesRes.filter((f: Feuille) => f.statut === "VALIDE_CLIENT" && !f.factureId) : []);
    setClients(Array.isArray(clientsRes) ? clientsRes : []);
    setLoading(false);
  };

  const feuillesFiltrees = feuilles.filter(f =>
    !form.clientId || f.zone.projet.contrat.client.id === form.clientId
  );

  const feuillesSelectionnees = feuilles.filter(f => form.feuilleIds.includes(f.id));
  const totalHT = feuillesSelectionnees.reduce((s, f) => s + f.totalGeneral, 0);
  const montantTVA = totalHT * (parseFloat(form.tauxTVA) / 100);
  const totalTTC = totalHT + montantTVA;
  const montantRetenue = totalTTC * (parseFloat(form.tauxRetenue) / 100);
  const netAPayer = totalTTC - montantRetenue;

  const toggleFeuille = (id: string) => {
    setForm(prev => ({
      ...prev,
      feuilleIds: prev.feuilleIds.includes(id)
        ? prev.feuilleIds.filter(i => i !== id)
        : [...prev.feuilleIds, id],
    }));
  };

  const handleCreate = async () => {
    if (!form.clientId || !form.feuilleIds.length) return;
    setSaving(true);
    const res = await fetch("/api/facturation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      await loadAll();
      setShowModal(false);
      setForm({ clientId: "", feuilleIds: [], tauxTVA: "20", tauxRetenue: "0", dateEcheance: "", notes: "" });
      router.push(`/dashboard/facturation/${data.id}`);
    }
    setSaving(false);
  };

  const handleStatut = async (id: string, statut: string) => {
    await fetch("/api/facturation", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, statut }),
    });
    await loadAll();
  };

  const filtered = factures.filter(f => {
    const matchStatut = !filtreStatut || f.statut === filtreStatut;
    const matchClient = !filtreClient || f.client.id === filtreClient;
    return matchStatut && matchClient;
  });

  const stats = {
    total: factures.length,
    brouillon: factures.filter(f => f.statut === "BROUILLON").length,
    emises: factures.filter(f => f.statut === "EMISE").length,
    payees: factures.filter(f => f.statut === "PAYEE").length,
    caHT: factures.filter(f => f.statut !== "ANNULEE").reduce((s, f) => s + f.totalHT, 0),
    enAttente: factures.filter(f => f.statut === "EMISE").reduce((s, f) => s + f.netAPayer, 0),
  };

  if (loading) return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🧾</div>
      <div style={{ color: "#999" }}>Chargement facturation...</div>
    </div>
  );

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#1a1a1a" }}>🧾 Facturation</h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>Génération des factures depuis les NFI validées</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{
          padding: "10px 20px", background: "#0070f3", color: "white",
          border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px",
        }}>
          + Nouvelle facture
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {[
          { icon: "🧾", label: "Total factures", value: stats.total, color: "#0070f3", bg: "#f0f9ff" },
          { icon: "📝", label: "Brouillons", value: stats.brouillon, color: "#6b7280", bg: "#f9fafb" },
          { icon: "📤", label: "Émises", value: stats.emises, color: "#f59e0b", bg: "#fffbeb" },
          { icon: "✅", label: "Payées", value: stats.payees, color: "#10b981", bg: "#f0fdf4" },
          { icon: "⏳", label: "En attente (DH)", value: `${stats.enAttente.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}`, color: "#ef4444", bg: "#fef2f2" },
        ].map(k => (
          <div key={k.label} style={{ background: k.bg, borderRadius: "10px", padding: "14px 16px", border: `1px solid ${k.color}22` }}>
            <div style={{ fontSize: "22px", marginBottom: "4px" }}>{k.icon}</div>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: k.color }}>{k.value}</div>
            <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* NFI disponibles */}
      {feuilles.length > 0 && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 18px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "13px", color: "#92400e" }}>
            <strong>⚠️ {feuilles.length} NFI validée{feuilles.length > 1 ? "s" : ""}</strong> en attente de facturation
          </div>
          <button onClick={() => setShowModal(true)} style={{
            padding: "6px 14px", background: "#f59e0b", color: "white",
            border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold",
          }}>
            Facturer maintenant →
          </button>
        </div>
      )}

      {/* Filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <select value={filtreStatut} onChange={e => setFiltreStatut(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}>
          <option value="">Tous les statuts</option>
          {Object.entries(statutConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select value={filtreClient} onChange={e => setFiltreClient(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}>
          <option value="">Tous les clients</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
        </select>
        {(filtreStatut || filtreClient) && (
          <button onClick={() => { setFiltreStatut(""); setFiltreClient(""); }}
            style={{ padding: "8px 14px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer", fontSize: "13px", color: "#666" }}>
            ✕ Effacer
          </button>
        )}
        <span style={{ fontSize: "12px", color: "#999", alignSelf: "center" }}>{filtered.length} facture{filtered.length > 1 ? "s" : ""}</span>
      </div>

      {/* Liste factures */}
      <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#999" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🧾</div>
            <div>Aucune facture</div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["N° FACTURE", "CLIENT", "NFI", "DATE", "TOTAL HT", "TVA", "RETENUE", "NET À PAYER", "STATUT", ""].map(h => (
                  <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: "11px", color: "#666", fontWeight: "bold", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => {
                const st = statutConfig[f.statut];
                return (
                  <tr key={f.id}
                    style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                    onClick={() => router.push(`/dashboard/facturation/${f.id}`)}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                    onMouseLeave={e => (e.currentTarget.style.background = "white")}
                  >
                    <td style={{ padding: "12px 16px", fontWeight: "bold", color: "#0070f3" }}>{f.numero}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px" }}>{f.client.nom}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: "#f0f9ff", color: "#0070f3", padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "bold" }}>
                        {f.feuilles.length} NFI
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#666" }}>
                      {new Date(f.dateEmission).toLocaleDateString("fr-FR")}
                      {f.dateEcheance && <div style={{ color: "#f59e0b", fontSize: "11px" }}>Éch. {new Date(f.dateEcheance).toLocaleDateString("fr-FR")}</div>}
                    </td>
                    <td style={{ padding: "12px 16px", fontWeight: "bold" }}>{f.totalHT.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#666" }}>{f.tauxTVA}%</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: f.tauxRetenue > 0 ? "#ef4444" : "#ccc" }}>
                      {f.tauxRetenue > 0 ? `-${f.montantRetenue.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH` : "—"}
                    </td>
                    <td style={{ padding: "12px 16px", fontWeight: "bold", color: "#10b981", fontSize: "15px" }}>
                      {f.netAPayer.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: st.bg, color: st.color, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold" }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "4px" }} onClick={e => e.stopPropagation()}>
                        {f.statut === "BROUILLON" && (
                          <button onClick={() => handleStatut(f.id, "EMISE")}
                            style={{ padding: "4px 10px", background: "#f0f9ff", color: "#0070f3", border: "1px solid #bae6fd", borderRadius: "5px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>
                            📤 Émettre
                          </button>
                        )}
                        {f.statut === "EMISE" && (
                          <button onClick={() => handleStatut(f.id, "PAYEE")}
                            style={{ padding: "4px 10px", background: "#f0fdf4", color: "#10b981", border: "1px solid #bbf7d0", borderRadius: "5px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>
                            ✅ Payée
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: "#f8fafc", borderTop: "2px solid #e5e7eb" }}>
                <td colSpan={4} style={{ padding: "12px 16px", fontWeight: "bold", fontSize: "13px" }}>
                  TOTAL ({filtered.length} factures)
                </td>
                <td style={{ padding: "12px 16px", fontWeight: "bold" }}>
                  {filtered.reduce((s, f) => s + f.totalHT, 0).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH
                </td>
                <td colSpan={2} />
                <td style={{ padding: "12px 16px", fontWeight: "bold", color: "#10b981", fontSize: "15px" }}>
                  {filtered.reduce((s, f) => s + f.netAPayer, 0).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* MODAL création facture */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "14px", padding: "28px", width: "640px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: "bold" }}>🧾 Nouvelle facture</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Client */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>CLIENT *</label>
                <select style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
                  value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value, feuilleIds: [] })}>
                  <option value="">— Sélectionner un client —</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                </select>
              </div>

              {/* NFI disponibles */}
              {form.clientId && (
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "8px" }}>
                    NFI VALIDÉES DISPONIBLES * ({feuillesFiltrees.length})
                  </label>
                  {feuillesFiltrees.length === 0 ? (
                    <div style={{ padding: "20px", textAlign: "center", color: "#999", fontSize: "13px", background: "#f8fafc", borderRadius: "8px" }}>
                      Aucune NFI validée disponible pour ce client
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "200px", overflowY: "auto" }}>
                      {feuillesFiltrees.map(f => (
                        <div key={f.id}
                          onClick={() => toggleFeuille(f.id)}
                          style={{
                            padding: "10px 14px", borderRadius: "8px", cursor: "pointer",
                            border: `2px solid ${form.feuilleIds.includes(f.id) ? "#0070f3" : "#e5e7eb"}`,
                            background: form.feuilleIds.includes(f.id) ? "#f0f9ff" : "white",
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                          }}>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                              {new Date(f.date).toLocaleDateString("fr-FR")} — {f.zone.nom}
                            </div>
                            <div style={{ fontSize: "11px", color: "#666" }}>
                              {f.zone.projet.code} · {f.totalHeures}h
                            </div>
                          </div>
                          <div style={{ fontWeight: "bold", color: "#0070f3", fontSize: "14px" }}>
                            {f.totalGeneral.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Paramètres financiers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>TVA (%)</label>
                  <input type="number" min={0} max={100} step={1}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" as const }}
                    value={form.tauxTVA} onChange={e => setForm({ ...form, tauxTVA: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>RETENUE DE GARANTIE (%)</label>
                  <input type="number" min={0} max={100} step={0.5}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" as const }}
                    value={form.tauxRetenue} onChange={e => setForm({ ...form, tauxRetenue: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>DATE ÉCHÉANCE</label>
                  <input type="date"
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" as const }}
                    value={form.dateEcheance} onChange={e => setForm({ ...form, dateEcheance: e.target.value })} />
                </div>
              </div>

              {/* Récap calcul */}
              {form.feuilleIds.length > 0 && (
                <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "10px", padding: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "10px", color: "#0369a1" }}>
                    📊 Récapitulatif — {form.feuilleIds.length} NFI sélectionnée{form.feuilleIds.length > 1 ? "s" : ""}
                  </div>
                  {[
                    { label: "Total HT", value: totalHT, color: "#1a1a1a" },
                    { label: `TVA (${form.tauxTVA}%)`, value: montantTVA, color: "#6b7280" },
                    { label: `Total TTC`, value: totalTTC, color: "#0070f3", bold: true },
                    { label: `Retenue (${form.tauxRetenue}%)`, value: -montantRetenue, color: "#ef4444" },
                    { label: "Net à payer", value: netAPayer, color: "#10b981", bold: true, large: true },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderTop: item.large ? "2px solid #bae6fd" : "none", marginTop: item.large ? "6px" : "0" }}>
                      <span style={{ fontSize: item.large ? "15px" : "13px", fontWeight: item.bold ? "bold" : "normal", color: "#333" }}>{item.label}</span>
                      <span style={{ fontSize: item.large ? "18px" : "13px", fontWeight: "bold", color: item.color }}>
                        {item.value.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Notes */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>NOTES (optionnel)</label>
                <textarea rows={2} placeholder="Observations..."
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" as const, resize: "vertical" }}
                  value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px" }}>
              <button onClick={() => setShowModal(false)}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "14px" }}>
                Annuler
              </button>
              <button onClick={handleCreate}
                disabled={saving || !form.clientId || !form.feuilleIds.length}
                style={{
                  padding: "10px 24px", background: !form.clientId || !form.feuilleIds.length ? "#ccc" : "#0070f3",
                  color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold",
                }}>
                {saving ? "Génération..." : "🧾 Générer la facture"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}