"use client";

import { useState, useEffect } from "react";

type Societe = {
  id: string;
  nom: string;
  type: string;
};

type Contrat = {
  id: string;
  numero: string;
  objet: string;
  budget: number;
  dateDebut: string;
  dateFin: string | null;
  statut: string;
  validationRequise: boolean;
  client: { id: string; nom: string; type: string };
  _count: { projets: number; factures: number };
};

const STATUTS = ["ACTIF", "TERMINE", "SUSPENDU", "EN_ATTENTE"];

const statutColor: Record<string, string> = {
  ACTIF: "#10b981",
  TERMINE: "#6b7280",
  SUSPENDU: "#ef4444",
  EN_ATTENTE: "#f59e0b",
};

export default function ContratsPage() {
  const [contrats, setContrats] = useState<Contrat[]>([]);
  const [societes, setSocietes] = useState<Societe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Contrat | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState("");

  const emptyForm = {
    numero: "", objet: "", budget: "", dateDebut: "",
    dateFin: "", statut: "ACTIF", validationRequise: true, clientId: ""
  };
  const [form, setForm] = useState<any>(emptyForm);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [contratsRes, societesRes] = await Promise.all([
      fetch("/api/admin/contrats").then((r) => r.json()),
      fetch("/api/admin/societes").then((r) => r.json()),
    ]);
    setContrats(Array.isArray(contratsRes) ? contratsRes : []);
    setSocietes(Array.isArray(societesRes) ? societesRes.filter((s: Societe) => s.type === "CLIENT") : []);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!form.numero || !form.objet || !form.clientId || !form.dateDebut) {
      setError("Numéro, objet, client et date début obligatoires");
      return;
    }
    setSaving(true);
    setError("");

    const method = editing ? "PATCH" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;

    const res = await fetch("/api/admin/contrats", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur");
      setSaving(false);
      return;
    }

    await loadData();
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    setSaving(false);
  };

  const openEdit = (c: Contrat) => {
    setEditing(c);
    setForm({
      numero: c.numero,
      objet: c.objet,
      budget: c.budget.toString(),
      dateDebut: c.dateDebut.split("T")[0],
      dateFin: c.dateFin ? c.dateFin.split("T")[0] : "",
      statut: c.statut,
      validationRequise: c.validationRequise,
      clientId: c.client.id,
    });
    setShowModal(true);
  };

  const filtered = contrats.filter((c) => {
    const matchSearch = !search ||
      c.numero.toLowerCase().includes(search.toLowerCase()) ||
      c.objet.toLowerCase().includes(search.toLowerCase()) ||
      c.client.nom.toLowerCase().includes(search.toLowerCase());
    const matchStatut = !filterStatut || c.statut === filterStatut;
    return matchSearch && matchStatut;
  });

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontSize: "11px",
    fontWeight: "bold" as const,
    color: "#666",
    marginBottom: "4px",
    display: "block",
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" }}>
            📑 Contrats
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            {filtered.length} contrat(s)
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm(emptyForm); setShowModal(true); }}
          style={{ background: "#0070f3", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}
        >
          + Nouveau contrat
        </button>
      </div>

      {/* Filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", display: "flex", gap: "12px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
        <input
          type="text"
          placeholder="🔍 Rechercher par numéro, objet, client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
        />
        <select
          value={filterStatut}
          onChange={(e) => setFilterStatut(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
        >
          <option value="">Tous les statuts</option>
          {STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Liste */}
      {loading ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>Chargement...</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>Aucun contrat trouvé</div>
      ) : (
        <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>CONTRAT</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>CLIENT</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", color: "#666", fontWeight: "bold" }}>BUDGET</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>PÉRIODE</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>STATUT</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>PROJETS</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>{c.numero}</div>
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>{c.objet}</div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#333" }}>
                    {c.client.nom}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "bold", color: "#0070f3", fontSize: "14px" }}>
                    {c.budget.toLocaleString("fr-FR")} DH
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#555" }}>
                    <div>{new Date(c.dateDebut).toLocaleDateString("fr-FR")}</div>
                    {c.dateFin && <div>→ {new Date(c.dateFin).toLocaleDateString("fr-FR")}</div>}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span style={{
                      background: `${statutColor[c.statut]}20`,
                      color: statutColor[c.statut],
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}>
                      {c.statut}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center", fontWeight: "bold", color: "#6366f1" }}>
                    {c._count.projets}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button
                      onClick={() => openEdit(c)}
                      style={{ padding: "6px 14px", background: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "28px", width: "560px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: "bold" }}>
              {editing ? "Modifier le contrat" : "Nouveau contrat"}
            </h3>

            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "6px", padding: "10px 14px", marginBottom: "16px", color: "#dc2626", fontSize: "13px" }}>
                {error}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={labelStyle}>NUMÉRO <span style={{ color: "#ef4444" }}>*</span></label>
                <input style={inputStyle} value={form.numero} onChange={(e) => setForm({ ...form, numero: e.target.value })} placeholder="Ex: CTR-2024-001" />
              </div>
              <div>
                <label style={labelStyle}>CLIENT <span style={{ color: "#ef4444" }}>*</span></label>
                <select style={inputStyle} value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })}>
                  <option value="">— Sélectionner —</option>
                  {societes.map((s) => <option key={s.id} value={s.id}>{s.nom}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>OBJET <span style={{ color: "#ef4444" }}>*</span></label>
                <input style={inputStyle} value={form.objet} onChange={(e) => setForm({ ...form, objet: e.target.value })} placeholder="Description de la prestation" />
              </div>
              <div>
                <label style={labelStyle}>BUDGET (DH)</label>
                <input style={inputStyle} type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="0.00" />
              </div>
              <div>
                <label style={labelStyle}>STATUT</label>
                <select style={inputStyle} value={form.statut} onChange={(e) => setForm({ ...form, statut: e.target.value })}>
                  {STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>DATE DÉBUT <span style={{ color: "#ef4444" }}>*</span></label>
                <input style={inputStyle} type="date" value={form.dateDebut} onChange={(e) => setForm({ ...form, dateDebut: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>DATE FIN</label>
                <input style={inputStyle} type="date" value={form.dateFin} onChange={(e) => setForm({ ...form, dateFin: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  id="validationRequise"
                  checked={form.validationRequise}
                  onChange={(e) => setForm({ ...form, validationRequise: e.target.checked })}
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                />
                <label htmlFor="validationRequise" style={{ fontSize: "14px", color: "#333", cursor: "pointer" }}>
                  Validation client requise pour les feuilles de régie
                </label>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px" }}>
              <button
                onClick={() => { setShowModal(false); setEditing(null); setError(""); }}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "14px" }}
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                style={{ padding: "10px 20px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
              >
                {saving ? "Sauvegarde..." : editing ? "Modifier" : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}