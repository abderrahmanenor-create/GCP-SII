"use client";

import { useState, useEffect } from "react";

type Contrat = {
  id: string;
  numero: string;
  objet: string;
  client: { id: string; nom: string };
};

type Projet = {
  id: string;
  nom: string;
  code: string;
  contrat: { id: string; numero: string; objet: string; client: { id: string; nom: string } };
  _count: { zones: number; equipes: number };
};

type Zone = {
  id: string;
  nom: string;
  projetId: string;
};

export default function ProjetsPage() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [contrats, setContrats] = useState<Contrat[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModalProjet, setShowModalProjet] = useState(false);
  const [showModalZone, setShowModalZone] = useState(false);
  const [editingProjet, setEditingProjet] = useState<Projet | null>(null);
  const [selectedProjet, setSelectedProjet] = useState<Projet | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const emptyFormProjet = { nom: "", code: "", contratId: "" };
  const emptyFormZone = { nom: "", projetId: "" };
  const [formProjet, setFormProjet] = useState(emptyFormProjet);
  const [formZone, setFormZone] = useState(emptyFormZone);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [projetsRes, contratsRes, zonesRes] = await Promise.all([
      fetch("/api/admin/projets").then((r) => r.json()),
      fetch("/api/admin/contrats").then((r) => r.json()),
      fetch("/api/zones").then((r) => r.json()),
    ]);
    setProjets(Array.isArray(projetsRes) ? projetsRes : []);
    setContrats(Array.isArray(contratsRes) ? contratsRes : []);
    setZones(Array.isArray(zonesRes) ? zonesRes : []);
    setLoading(false);
  };

  const handleSubmitProjet = async () => {
    if (!formProjet.nom || !formProjet.code || !formProjet.contratId) {
      setError("Nom, code et contrat obligatoires");
      return;
    }
    setSaving(true);
    setError("");

    const method = editingProjet ? "PATCH" : "POST";
    const body = editingProjet ? { ...formProjet, id: editingProjet.id } : formProjet;

    const res = await fetch("/api/admin/projets", {
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
    setShowModalProjet(false);
    setEditingProjet(null);
    setFormProjet(emptyFormProjet);
    setSaving(false);
  };

  const handleSubmitZone = async () => {
    if (!formZone.nom || !formZone.projetId) {
      setError("Nom et projet obligatoires");
      return;
    }
    setSaving(true);
    setError("");

    const res = await fetch("/api/zones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formZone),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur");
      setSaving(false);
      return;
    }

    await loadData();
    setShowModalZone(false);
    setFormZone(emptyFormZone);
    setSaving(false);
  };

  const openEditProjet = (p: Projet) => {
    setEditingProjet(p);
    setFormProjet({
      nom: p.nom,
      code: p.code,
      contratId: p.contrat.id,
    });
    setShowModalProjet(true);
  };

  const openAddZone = (p: Projet) => {
    setSelectedProjet(p);
    setFormZone({ nom: "", projetId: p.id });
    setShowModalZone(true);
  };

  const filtered = projets.filter((p) =>
    !search ||
    p.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase()) ||
    p.contrat.client.nom.toLowerCase().includes(search.toLowerCase())
  );

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
            🗂️ Projets & Zones
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            {filtered.length} projet(s)
          </p>
        </div>
        <button
          onClick={() => { setEditingProjet(null); setFormProjet(emptyFormProjet); setShowModalProjet(true); }}
          style={{ background: "#0070f3", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}
        >
          + Nouveau projet
        </button>
      </div>

      {/* Filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
        <input
          type="text"
          placeholder="🔍 Rechercher par nom, code, client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
        />
      </div>

      {/* Liste projets */}
      {loading ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>Chargement...</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>Aucun projet trouvé</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filtered.map((p) => {
            const zonesProjet = zones.filter((z) => z.projetId === p.id);
            return (
              <div key={p.id} style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                {/* En-tête projet */}
                <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontWeight: "bold", fontSize: "16px", color: "#1a1a1a" }}>{p.nom}</span>
                      <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" }}>
                        {p.code}
                      </span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
                      {p.contrat.client.nom} · Contrat {p.contrat.numero}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => openAddZone(p)}
                      style={{ padding: "6px 14px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}
                    >
                      + Zone
                    </button>
                    <button
                      onClick={() => openEditProjet(p)}
                      style={{ padding: "6px 14px", background: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}
                    >
                      Modifier
                    </button>
                  </div>
                </div>

                {/* Zones du projet */}
                <div style={{ padding: "12px 20px", background: "#f8fafc" }}>
                  {zonesProjet.length === 0 ? (
                    <p style={{ margin: 0, color: "#999", fontSize: "13px" }}>Aucune zone — cliquez sur "+ Zone" pour en ajouter</p>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {zonesProjet.map((z) => (
                        <span key={z.id} style={{
                          background: "white",
                          border: "1px solid #e5e7eb",
                          padding: "4px 12px",
                          borderRadius: "6px",
                          fontSize: "13px",
                          color: "#333",
                          fontWeight: "500",
                        }}>
                          📍 {z.nom}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Projet */}
      {showModalProjet && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "28px", width: "480px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: "bold" }}>
              {editingProjet ? "Modifier le projet" : "Nouveau projet"}
            </h3>

            {error && (
              <div style={{ background: "#fee2e2", borderRadius: "6px", padding: "10px 14px", marginBottom: "16px", color: "#dc2626", fontSize: "13px" }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={labelStyle}>NOM DU PROJET <span style={{ color: "#ef4444" }}>*</span></label>
                <input style={inputStyle} value={formProjet.nom} onChange={(e) => setFormProjet({ ...formProjet, nom: e.target.value })} placeholder="Ex: Maintenance Zone OCP" />
              </div>
              <div>
                <label style={labelStyle}>CODE <span style={{ color: "#ef4444" }}>*</span></label>
                <input style={inputStyle} value={formProjet.code} onChange={(e) => setFormProjet({ ...formProjet, code: e.target.value.toUpperCase() })} placeholder="Ex: OCP-2024-01" />
              </div>
              <div>
                <label style={labelStyle}>CONTRAT <span style={{ color: "#ef4444" }}>*</span></label>
                <select style={inputStyle} value={formProjet.contratId} onChange={(e) => setFormProjet({ ...formProjet, contratId: e.target.value })}>
                  <option value="">— Sélectionner un contrat —</option>
                  {contrats.map((c) => (
                    <option key={c.id} value={c.id}>{c.numero} — {c.client.nom}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px" }}>
              <button
                onClick={() => { setShowModalProjet(false); setEditingProjet(null); setError(""); }}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "14px" }}
              >
                Annuler
              </button>
              <button
                onClick={handleSubmitProjet}
                disabled={saving}
                style={{ padding: "10px 20px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
              >
                {saving ? "Sauvegarde..." : editingProjet ? "Modifier" : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Zone */}
      {showModalZone && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "28px", width: "400px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "bold" }}>
              Nouvelle zone
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#666" }}>
              Projet : {selectedProjet?.nom}
            </p>

            {error && (
              <div style={{ background: "#fee2e2", borderRadius: "6px", padding: "10px 14px", marginBottom: "16px", color: "#dc2626", fontSize: "13px" }}>
                {error}
              </div>
            )}

            <div>
              <label style={labelStyle}>NOM DE LA ZONE <span style={{ color: "#ef4444" }}>*</span></label>
              <input
                style={inputStyle}
                value={formZone.nom}
                onChange={(e) => setFormZone({ ...formZone, nom: e.target.value })}
                placeholder="Ex: Zone A, Atelier Nord, Hall 3..."
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSubmitZone()}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px" }}>
              <button
                onClick={() => { setShowModalZone(false); setError(""); }}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "14px" }}
              >
                Annuler
              </button>
              <button
                onClick={handleSubmitZone}
                disabled={saving}
                style={{ padding: "10px 20px", background: "#10b981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
              >
                {saving ? "Sauvegarde..." : "Créer la zone"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}