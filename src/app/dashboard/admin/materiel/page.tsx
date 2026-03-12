"use client";

import { useState, useEffect } from "react";
import { uploadFile } from "@/lib/cloudinary";

type Materiel = {
  id: string;
  nom: string;
  code: string;
  numeroSerie: string | null;
  proprietaire: string;
  statut: string;
  coutJournalier: number | null;
  prixLocationJour: number | null;
  categorie: { id: string; nom: string } | null;
  attestationElectrique: string | null;
  dateAttestElec: string | null;
  certificatLevage: string | null;
  dateCertLevage: string | null;
  ficheControleOutillage: string | null;
  dateControleOutillage: string | null;
  carnetBord: string | null;
  dateCarnetBord: string | null;
  ficheEPI: string | null;
  prochaineInspElec: string | null;
  prochaineInspLevage: string | null;
  prochaineInspOutillage: string | null;
  affectations: { zone: { nom: string; projet: { nom: string; code: string } } }[];
};

type Ref = {
  categoriesMateriel: { id: string; nom: string }[];
};

const STATUTS = ["OPERATIONNEL", "EN_PANNE", "EN_MAINTENANCE", "RETIRE"];
const PROPRIETAIRES = ["INTERNE", "LOCATION", "CLIENT"];

const statutColor: Record<string, string> = {
  OPERATIONNEL: "#10b981",
  EN_PANNE: "#ef4444",
  EN_MAINTENANCE: "#f59e0b",
  RETIRE: "#6b7280",
};

export default function MaterielPage() {
  const [materiels, setMateriels] = useState<Materiel[]>([]);
  const [refs, setRefs] = useState<Ref>({ categoriesMateriel: [] });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Materiel | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState("");
  const [activeTab, setActiveTab] = useState("infos");
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const [showAddCategorie, setShowAddCategorie] = useState(false);
  const [newCategorie, setNewCategorie] = useState("");

  const emptyForm: any = {
    nom: "", code: "", numeroSerie: "", proprietaire: "INTERNE",
    statut: "OPERATIONNEL", coutJournalier: "", prixLocationJour: "",
    categorieId: "", attestationElectrique: "", dateAttestElec: "",
    certificatLevage: "", dateCertLevage: "", ficheControleOutillage: "",
    dateControleOutillage: "", carnetBord: "", dateCarnetBord: "",
    ficheEPI: "", prochaineInspElec: "", prochaineInspLevage: "",
    prochaineInspOutillage: "",
  };
  const [form, setForm] = useState<any>(emptyForm);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [materielsRes, refsRes] = await Promise.all([
      fetch("/api/admin/materiel").then((r) => r.json()),
      fetch("/api/ref").then((r) => r.json()),
    ]);
    setMateriels(Array.isArray(materielsRes) ? materielsRes : []);
    setRefs(refsRes);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.code) {
      setError("Nom et code obligatoires");
      return;
    }
    setSaving(true);
    setError("");

    const method = editing ? "PATCH" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;

    const res = await fetch("/api/admin/materiel", {
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

  const handleUploadDoc = async (field: string, file: File) => {
    setUploadingDoc(field);
    try {
      const url = await uploadFile(file, `gcp-sii/materiel/${editing?.id || "nouveau"}`);
      setForm((prev: any) => ({ ...prev, [field]: url }));
    } catch {
      setError("Erreur upload document");
    } finally {
      setUploadingDoc(null);
    }
  };

  const handleAddCategorie = async () => {
    if (!newCategorie.trim()) return;
    const res = await fetch("/api/ref", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "categorieMateriel", data: { nom: newCategorie } }),
    });
    const newItem = await res.json();
    setRefs((prev) => ({ ...prev, categoriesMateriel: [...prev.categoriesMateriel, newItem] }));
    setForm((prev: any) => ({ ...prev, categorieId: newItem.id }));
    setNewCategorie("");
    setShowAddCategorie(false);
  };

  const openEdit = (m: Materiel) => {
    setEditing(m);
    setForm({
      nom: m.nom,
      code: m.code,
      numeroSerie: m.numeroSerie || "",
      proprietaire: m.proprietaire,
      statut: m.statut,
      coutJournalier: m.coutJournalier?.toString() || "",
      prixLocationJour: m.prixLocationJour?.toString() || "",
      categorieId: m.categorie?.id || "",
      attestationElectrique: m.attestationElectrique || "",
      dateAttestElec: m.dateAttestElec ? m.dateAttestElec.split("T")[0] : "",
      certificatLevage: m.certificatLevage || "",
      dateCertLevage: m.dateCertLevage ? m.dateCertLevage.split("T")[0] : "",
      ficheControleOutillage: m.ficheControleOutillage || "",
      dateControleOutillage: m.dateControleOutillage ? m.dateControleOutillage.split("T")[0] : "",
      carnetBord: m.carnetBord || "",
      dateCarnetBord: m.dateCarnetBord ? m.dateCarnetBord.split("T")[0] : "",
      ficheEPI: m.ficheEPI || "",
      prochaineInspElec: m.prochaineInspElec ? m.prochaineInspElec.split("T")[0] : "",
      prochaineInspLevage: m.prochaineInspLevage ? m.prochaineInspLevage.split("T")[0] : "",
      prochaineInspOutillage: m.prochaineInspOutillage ? m.prochaineInspOutillage.split("T")[0] : "",
    });
    setActiveTab("infos");
    setShowModal(true);
  };

  const filtered = materiels.filter((m) => {
    const matchSearch = !search ||
      m.nom.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase());
    const matchStatut = !filterStatut || m.statut === filterStatut;
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

  const DocField = ({ label, field, dateField }: { label: string; field: string; dateField?: string }) => (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "14px", background: form[field] ? "#f0fdf4" : "#fafafa" }}>
      <div style={{ fontWeight: "bold", fontSize: "13px", marginBottom: "10px", color: "#333" }}>{label}</div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: dateField ? "10px" : "0" }}>
        {form[field] ? (
          <a href={form[field]} target="_blank" rel="noopener noreferrer"
            style={{ color: "#0070f3", fontSize: "12px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            ✓ Document uploadé
          </a>
        ) : (
          <span style={{ color: "#999", fontSize: "12px", flex: 1 }}>Aucun document</span>
        )}
        <label style={{ padding: "5px 10px", background: "#0070f3", color: "white", borderRadius: "5px", cursor: "pointer", fontSize: "11px", fontWeight: "bold", whiteSpace: "nowrap" }}>
          {uploadingDoc === field ? "Upload..." : form[field] ? "Remplacer" : "+ Ajouter"}
          <input type="file" accept="image/*,application/pdf" style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadDoc(field, f); }}
            disabled={uploadingDoc === field}
          />
        </label>
      </div>
      {dateField && (
        <div>
          <label style={{ ...labelStyle, marginTop: "6px" }}>DATE</label>
          <input type="date" style={inputStyle} value={form[dateField]} onChange={(e) => setForm((p: any) => ({ ...p, [dateField]: e.target.value }))} />
        </div>
      )}
    </div>
  );

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" }}>🔧 Matériel JESA</h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>{filtered.length} équipement(s)</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm(emptyForm); setActiveTab("infos"); setShowModal(true); }}
          style={{ background: "#0070f3", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}
        >
          + Nouveau matériel
        </button>
      </div>

      {/* Filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", display: "flex", gap: "12px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
        <input
          type="text"
          placeholder="🔍 Rechercher par nom, code..."
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
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>Aucun matériel trouvé</div>
      ) : (
        <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MATÉRIEL</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>CATÉGORIE</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>STATUT</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", color: "#666", fontWeight: "bold" }}>PRIX/JOUR</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>AFFECTATION</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => {
                const affectationActuelle = m.affectations?.[0];
                const inspecBientot = (date: string | null) => {
                  if (!date) return false;
                  return (new Date(date).getTime() - Date.now()) < 30 * 24 * 60 * 60 * 1000;
                };
                const alerteInsp = inspecBientot(m.prochaineInspElec) || inspecBientot(m.prochaineInspLevage) || inspecBientot(m.prochaineInspOutillage);
                return (
                  <tr key={m.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "14px" }}>{m.nom}</div>
                        {alerteInsp && <span style={{ background: "#fef3c7", color: "#f59e0b", padding: "1px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "bold" }}>⚠️ INSPECTION</span>}
                      </div>
                      <div style={{ fontSize: "12px", color: "#999" }}>{m.code} {m.numeroSerie ? `· N/S: ${m.numeroSerie}` : ""}</div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#555" }}>
                      {m.categorie?.nom || <span style={{ color: "#ccc" }}>—</span>}
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <span style={{
                        background: `${statutColor[m.statut]}20`,
                        color: statutColor[m.statut],
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}>
                        {m.statut}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "bold", color: "#0070f3", fontSize: "14px" }}>
                      {m.prixLocationJour ? `${m.prixLocationJour} DH` : <span style={{ color: "#ccc" }}>—</span>}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#555" }}>
                      {affectationActuelle ? `${affectationActuelle.zone.nom} · ${affectationActuelle.zone.projet.code}` : <span style={{ color: "#ccc" }}>Non affecté</span>}
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <button
                        onClick={() => openEdit(m)}
                        style={{ padding: "6px 14px", background: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}
                      >
                        Voir fiche
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", width: "640px", maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

            {/* Header modal */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                {editing ? `Fiche matériel — ${editing.nom}` : "Nouveau matériel"}
              </h3>
              <button onClick={() => { setShowModal(false); setEditing(null); setError(""); }}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#666" }}>✕</button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
              {[
                { id: "infos", label: "Informations" },
                { id: "jesa", label: "Documents JESA" },
                { id: "inspections", label: "Inspections" },
              ].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  padding: "12px 20px", border: "none", background: "transparent",
                  borderBottom: activeTab === tab.id ? "3px solid #0070f3" : "3px solid transparent",
                  color: activeTab === tab.id ? "#0070f3" : "#666",
                  fontWeight: activeTab === tab.id ? "bold" : "normal",
                  cursor: "pointer", fontSize: "13px",
                }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Contenu modal */}
            <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
              {error && (
                <div style={{ background: "#fee2e2", borderRadius: "6px", padding: "10px 14px", marginBottom: "16px", color: "#dc2626", fontSize: "13px" }}>
                  {error}
                </div>
              )}

              {/* TAB INFOS */}
              {activeTab === "infos" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>NOM <span style={{ color: "#ef4444" }}>*</span></label>
                    <input style={inputStyle} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Perceuse Bosch" />
                  </div>
                  <div>
                    <label style={labelStyle}>CODE <span style={{ color: "#ef4444" }}>*</span></label>
                    <input style={inputStyle} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="Ex: MAT-001" />
                  </div>
                  <div>
                    <label style={labelStyle}>NUMÉRO DE SÉRIE</label>
                    <input style={inputStyle} value={form.numeroSerie} onChange={(e) => setForm({ ...form, numeroSerie: e.target.value })} placeholder="Optionnel" />
                  </div>
                  <div>
                    <label style={labelStyle}>CATÉGORIE</label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <select style={{ ...inputStyle, flex: 1 }} value={form.categorieId} onChange={(e) => setForm({ ...form, categorieId: e.target.value })}>
                        <option value="">— Sélectionner —</option>
                        {refs.categoriesMateriel.map((c) => <option key={c.id} value={c.id}>{c.nom}</option>)}
                      </select>
                      <button onClick={() => setShowAddCategorie(true)}
                        style={{ padding: "8px 10px", background: "#f0f9ff", border: "1px solid #0070f3", borderRadius: "6px", color: "#0070f3", cursor: "pointer", fontWeight: "bold", whiteSpace: "nowrap" }}>
                        + Nouveau
                      </button>
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>PROPRIÉTAIRE</label>
                    <select style={inputStyle} value={form.proprietaire} onChange={(e) => setForm({ ...form, proprietaire: e.target.value })}>
                      {PROPRIETAIRES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>STATUT</label>
                    <select style={inputStyle} value={form.statut} onChange={(e) => setForm({ ...form, statut: e.target.value })}>
                      {STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>COÛT JOURNALIER INTERNE (DH)</label>
                    <input type="number" style={inputStyle} value={form.coutJournalier} onChange={(e) => setForm({ ...form, coutJournalier: e.target.value })} placeholder="0.00" />
                  </div>
                  <div>
                    <label style={labelStyle}>PRIX LOCATION/JOUR CLIENT (DH)</label>
                    <input type="number" style={inputStyle} value={form.prixLocationJour} onChange={(e) => setForm({ ...form, prixLocationJour: e.target.value })} placeholder="0.00" />
                  </div>
                </div>
              )}

              {/* TAB JESA */}
              {activeTab === "jesa" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <DocField label="Attestation Contrôle Électrique" field="attestationElectrique" dateField="dateAttestElec" />
                  <DocField label="Certificat Levage / Élingage" field="certificatLevage" dateField="dateCertLevage" />
                  <DocField label="Fiche Contrôle Outillage" field="ficheControleOutillage" dateField="dateControleOutillage" />
                  <DocField label="Carnet de Bord" field="carnetBord" dateField="dateCarnetBord" />
                  <DocField label="Fiche EPI" field="ficheEPI" />
                </div>
              )}

              {/* TAB INSPECTIONS */}
              {activeTab === "inspections" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { label: "Prochaine inspection électrique", field: "prochaineInspElec" },
                    { label: "Prochaine inspection levage", field: "prochaineInspLevage" },
                    { label: "Prochaine inspection outillage", field: "prochaineInspOutillage" },
                  ].map((item) => {
                    const val = form[item.field];
                    const isAlert = val && (new Date(val).getTime() - Date.now()) < 30 * 24 * 60 * 60 * 1000;
                    const isPast = val && new Date(val) < new Date();
                    return (
                      <div key={item.field} style={{
                        border: `1px solid ${isPast ? "#fca5a5" : isAlert ? "#fde68a" : "#e5e7eb"}`,
                        borderRadius: "8px", padding: "14px",
                        background: isPast ? "#fee2e2" : isAlert ? "#fef3c7" : "white",
                      }}>
                        <label style={{ ...labelStyle, color: isPast ? "#dc2626" : isAlert ? "#d97706" : "#666" }}>
                          {item.label} {isPast ? "⚠️ DÉPASSÉ" : isAlert ? "⚠️ BIENTÔT" : ""}
                        </label>
                        <input type="date" style={inputStyle} value={form[item.field]} onChange={(e) => setForm((p: any) => ({ ...p, [item.field]: e.target.value }))} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer modal */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
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

      {/* Modal ajout catégorie */}
      {showAddCategorie && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "24px", width: "360px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "16px" }}>Nouvelle catégorie matériel</h3>
            <input
              type="text"
              placeholder="Nom de la catégorie..."
              value={newCategorie}
              onChange={(e) => setNewCategorie(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategorie()}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" }}
              autoFocus
            />
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowAddCategorie(false)} style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={handleAddCategorie} style={{ padding: "8px 16px", background: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}