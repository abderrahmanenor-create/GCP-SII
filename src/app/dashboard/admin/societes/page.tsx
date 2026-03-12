"use client";

import { useState, useEffect } from "react";

type Societe = {
  id: string;
  nom: string;
  type: string;
  ice: string | null;
  email: string | null;
  tel: string | null;
  adresse: string | null;
  actif: boolean;
  _count: { users: number; contrats: number };
};

const TYPES = ["CLIENT", "SOUS_TRAITANT", "INTERNE"];

const typeColor: Record<string, string> = {
  CLIENT: "#0070f3",
  SOUS_TRAITANT: "#8b5cf6",
  INTERNE: "#10b981",
};

export default function SocietesPage() {
  const [societes, setSocietes] = useState<Societe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Societe | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const emptyForm = { nom: "", type: "CLIENT", ice: "", email: "", tel: "", adresse: "" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadSocietes();
  }, []);

  const loadSocietes = () => {
    fetch("/api/admin/societes")
      .then((r) => r.json())
      .then((data) => {
        setSocietes(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.type) {
      setError("Nom et type obligatoires");
      return;
    }
    setSaving(true);
    setError("");

    const method = editing ? "PATCH" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;

    const res = await fetch("/api/admin/societes", {
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

    await loadSocietes();
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    setSaving(false);
  };

  const openEdit = (s: Societe) => {
    setEditing(s);
    setForm({
      nom: s.nom,
      type: s.type,
      ice: s.ice || "",
      email: s.email || "",
      tel: s.tel || "",
      adresse: s.adresse || "",
    });
    setShowModal(true);
  };

  const filtered = societes.filter((s) => {
    const matchSearch = !search ||
      s.nom.toLowerCase().includes(search.toLowerCase()) ||
      (s.ice && s.ice.includes(search));
    const matchType = !filterType || s.type === filterType;
    return matchSearch && matchType;
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
            🏢 Sociétés & Clients
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            {filtered.length} société(s)
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm(emptyForm); setShowModal(true); }}
          style={{ background: "#0070f3", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}
        >
          + Ajouter une société
        </button>
      </div>

      {/* Filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", display: "flex", gap: "12px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
        >
          <option value="">Tous les types</option>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Liste */}
      {loading ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>Chargement...</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>Aucune société trouvée</div>
      ) : (
        <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>SOCIÉTÉ</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>TYPE</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>CONTACT</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>EMPLOYÉS</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>CONTRATS</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>{s.nom}</div>
                    {s.ice && <div style={{ fontSize: "12px", color: "#999" }}>ICE: {s.ice}</div>}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span style={{
                      background: `${typeColor[s.type]}20`,
                      color: typeColor[s.type],
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}>
                      {s.type}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#555" }}>
                    {s.email && <div>{s.email}</div>}
                    {s.tel && <div>{s.tel}</div>}
                    {!s.email && !s.tel && <span style={{ color: "#ccc" }}>—</span>}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center", fontWeight: "bold", color: "#0070f3" }}>
                    {s._count.users}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center", fontWeight: "bold", color: "#6366f1" }}>
                    {s._count.contrats}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button
                      onClick={() => openEdit(s)}
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
          <div style={{ background: "white", borderRadius: "12px", padding: "28px", width: "500px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: "bold" }}>
              {editing ? "Modifier la société" : "Nouvelle société"}
            </h3>

            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "6px", padding: "10px 14px", marginBottom: "16px", color: "#dc2626", fontSize: "13px" }}>
                {error}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>NOM <span style={{ color: "#ef4444" }}>*</span></label>
                <input style={inputStyle} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Nom de la société" />
              </div>
              <div>
                <label style={labelStyle}>TYPE <span style={{ color: "#ef4444" }}>*</span></label>
                <select style={inputStyle} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>ICE</label>
                <input style={inputStyle} value={form.ice} onChange={(e) => setForm({ ...form, ice: e.target.value })} placeholder="Numéro ICE" />
              </div>
              <div>
                <label style={labelStyle}>EMAIL</label>
                <input style={inputStyle} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@societe.ma" />
              </div>
              <div>
                <label style={labelStyle}>TÉLÉPHONE</label>
                <input style={inputStyle} value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="05XXXXXXXX" />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>ADRESSE</label>
                <input style={inputStyle} value={form.adresse} onChange={(e) => setForm({ ...form, adresse: e.target.value })} placeholder="Adresse complète" />
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