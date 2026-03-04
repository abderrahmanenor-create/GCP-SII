"use client";
import { uploadFile } from "@/lib/cloudinary";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type Employe = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  matricule: string | null;
  cin: string | null;
  cnss: string | null;
  photoUrl: string | null;
  role: string;
  statut: string;
  tauxHoraire: number | null;
  salaireBase: number | null;
  indemniteTransport: number | null;
  autreIndemnite: number | null;
  dateDebutContrat: string | null;
  dateFinContrat: string | null;
  poste: { id: string; nom: string } | null;
  typeContrat: { id: string; nom: string } | null;
  equipe: { id: string; nom: string } | null;
  societe: { id: string; nom: string } | null;
  habilitations: { id: string; dateFin: string; statut: string; type: { nom: string } }[];
  epiDistribues: { id: string; date: string; etat: string; epi: { nom: string } }[];
  cinUrl: string | null;
  cnssUrl: string | null;
  contratUrl: string | null;
};

type Ref = {
  postes: { id: string; nom: string }[];
  typesContrat: { id: string; nom: string }[];
  typesHabilitation: { id: string; nom: string; dureeValiditeMois: number }[];
};

const ROLES = ["ADMIN", "CHEF_CHANTIER", "SUPERVISEUR", "RH", "OUVRIER", "CLIENT", "SOUS_TRAITANT"];
const STATUTS = ["ACTIF", "INACTIF", "SUSPENDU"];
function DocumentCard({ label, type, url, accept, icon, userId, onUploaded }: {
  label: string;
  type: string;
  url: string | null;
  accept: string;
  icon: string;
  userId: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const cloudUrl = await uploadFile(file, `gcp-sii/employes/${userId}`);
      await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, type, url: cloudUrl }),
      });
      onUploaded(cloudUrl);
    } catch {
      setError("Erreur upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      border: "2px dashed #e5e7eb",
      borderRadius: "10px",
      padding: "20px",
      textAlign: "center",
      background: url ? "#f0fdf4" : "#fafafa",
      borderColor: url ? "#10b981" : "#e5e7eb",
    }}>
      <div style={{ fontSize: "32px", marginBottom: "8px" }}>{icon}</div>
      <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "8px", color: "#1a1a1a" }}>{label}</div>

      {url ? (
        <div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0070f3", fontSize: "13px", textDecoration: "none", display: "block", marginBottom: "8px" }}
          >
            ✓ Voir le document
          </a>
          <label style={{
            padding: "6px 14px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
            color: "#666",
          }}>
            {uploading ? "Upload..." : "Remplacer"}
            <input type="file" accept={accept} onChange={handleUpload} style={{ display: "none" }} />
          </label>
        </div>
      ) : (
        <label style={{
          padding: "8px 16px",
          background: "#0070f3",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "bold",
          display: "inline-block",
        }}>
          {uploading ? "Upload en cours..." : "+ Ajouter"}
          <input type="file" accept={accept} onChange={handleUpload} style={{ display: "none" }} disabled={uploading} />
        </label>
      )}
      {error && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "8px" }}>{error}</p>}
    </div>
  );
}
export default function FicheEmployePage() {
  const params = useParams();
  const router = useRouter();
  const [employe, setEmploye] = useState<Employe | null>(null);
  const [refs, setRefs] = useState<Ref>({ postes: [], typesContrat: [], typesHabilitation: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("infos");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});

  // Modal ajout référence
  const [showAddRef, setShowAddRef] = useState<string | null>(null);
  const [newRefNom, setNewRefNom] = useState("");

  // Modal ajout habilitation
  const [showAddHab, setShowAddHab] = useState(false);
  const [newHab, setNewHab] = useState({ typeId: "", dateFin: "" });

  useEffect(() => {
    fetch("/api/ref")
      .then((r) => r.json())
      .then((data) => setRefs(data));

    fetch(`/api/users/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setEmploye(data);
        setForm(data);
        setLoading(false);
      });
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/users/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const updated = await fetch(`/api/users/${params.id}`).then((r) => r.json());
    setEmploye(updated);
    setForm(updated);
    setEditing(false);
    setSaving(false);
  };

  const handleAddRef = async (table: string) => {
    if (!newRefNom.trim()) return;
    const res = await fetch("/api/ref", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, data: { nom: newRefNom } }),
    });
    const newItem = await res.json();
    setRefs((prev: any) => {
      const key = table === "poste" ? "postes" : table === "typeContrat" ? "typesContrat" : "typesHabilitation";
      return { ...prev, [key]: [...prev[key], newItem] };
    });
    setNewRefNom("");
    setShowAddRef(null);
  };

  const handleAddHabilitation = async () => {
    if (!newHab.typeId || !newHab.dateFin) return;
    await fetch("/api/rh/habilitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: params.id, ...newHab }),
    });
    const updated = await fetch(`/api/users/${params.id}`).then((r) => r.json());
    setEmploye(updated);
    setShowAddHab(false);
    setNewHab({ typeId: "", dateFin: "" });
  };

  if (loading) return (
    <div style={{ padding: 40, textAlign: "center", color: "#999" }}>Chargement...</div>
  );

  if (!employe) return (
    <div style={{ padding: 40, textAlign: "center", color: "#999" }}>Employé non trouvé.</div>
  );

  const tabs = [
    { id: "infos", label: "Informations" },
    { id: "contrat", label: "Contrat & Coût" },
    { id: "securite", label: "Sécurité & Habilitations" },
    { id: "epi", label: "Historique EPI" },
    { id: "documents", label: "Documents" },
  ];

  const inputStyle = (editable: boolean) => ({
    width: "100%",
    padding: "8px 12px",
    border: `1px solid ${editable ? "#0070f3" : "#e5e7eb"}`,
    borderRadius: "6px",
    fontSize: "14px",
    background: editable ? "white" : "#f8fafc",
    color: "#1a1a1a",
    boxSizing: "border-box" as const,
  });

  const labelStyle = {
    fontSize: "11px",
    fontWeight: "bold" as const,
    color: "#666",
    marginBottom: "4px",
    display: "block",
  };

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header profil */}
      <div style={{
        background: "linear-gradient(135deg, #0070f3, #0050b3)",
        padding: "24px 28px",
        color: "white",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "32px", fontWeight: "bold", flexShrink: 0,
          border: "3px solid rgba(255,255,255,0.5)",
        }}>
          {employe.photoUrl ? (
            <img src={employe.photoUrl} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            employe.nom[0].toUpperCase()
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
            {employe.nom} {employe.prenom}
          </h1>
          <p style={{ margin: "4px 0 0", opacity: 0.85, fontSize: "14px" }}>
            {employe.poste?.nom || "Poste non défini"} · {employe.role} · {employe.statut}
          </p>
          <p style={{ margin: "2px 0 0", opacity: 0.7, fontSize: "13px" }}>
            Matricule: {employe.matricule || "N/A"} | CIN: {employe.cin || "N/A"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: "8px 20px", background: "white", color: "#0070f3",
                  border: "none", borderRadius: "8px", fontWeight: "bold",
                  cursor: "pointer", fontSize: "14px",
                }}
              >
                {saving ? "Sauvegarde..." : "✓ Sauvegarder"}
              </button>
              <button
                onClick={() => { setEditing(false); setForm(employe); }}
                style={{
                  padding: "8px 20px", background: "rgba(255,255,255,0.2)",
                  color: "white", border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: "8px", cursor: "pointer", fontSize: "14px",
                }}
              >
                Annuler
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              style={{
                padding: "8px 20px", background: "rgba(255,255,255,0.2)",
                color: "white", border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "8px", cursor: "pointer", fontSize: "14px",
              }}
            >
              ✏️ Modifier
            </button>
          )}
          <button
            onClick={() => router.push("/dashboard/rh")}
            style={{
              padding: "8px 20px", background: "rgba(255,255,255,0.1)",
              color: "white", border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "8px", cursor: "pointer", fontSize: "14px",
            }}
          >
            ← Retour
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "white", borderBottom: "2px solid #e5e7eb", display: "flex" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "14px 24px", border: "none", background: "transparent",
              borderBottom: activeTab === tab.id ? "3px solid #0070f3" : "3px solid transparent",
              color: activeTab === tab.id ? "#0070f3" : "#666",
              fontWeight: activeTab === tab.id ? "bold" : "normal",
              cursor: "pointer", fontSize: "14px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div style={{ padding: "24px", maxWidth: "900px" }}>

        {/* TAB INFOS */}
        {activeTab === "infos" && (
          <div style={{ background: "white", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "bold", color: "#1a1a1a" }}>
              Informations Générales
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>NOM</label>
                <input style={inputStyle(editing)} value={form.nom || ""} onChange={(e) => setForm({ ...form, nom: e.target.value })} disabled={!editing} />
              </div>
              <div>
                <label style={labelStyle}>PRÉNOM</label>
                <input style={inputStyle(editing)} value={form.prenom || ""} onChange={(e) => setForm({ ...form, prenom: e.target.value })} disabled={!editing} />
              </div>
              <div>
                <label style={labelStyle}>EMAIL</label>
                <input style={inputStyle(editing)} value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={!editing} />
              </div>
              <div>
                <label style={labelStyle}>TÉLÉPHONE</label>
                <input style={inputStyle(editing)} value={form.telephone || ""} onChange={(e) => setForm({ ...form, telephone: e.target.value })} disabled={!editing} placeholder="Non renseigné" />
              </div>
              <div>
                <label style={labelStyle}>MATRICULE</label>
                <input style={inputStyle(editing)} value={form.matricule || ""} onChange={(e) => setForm({ ...form, matricule: e.target.value })} disabled={!editing} placeholder="Non renseigné" />
              </div>
              <div>
                <label style={labelStyle}>CIN</label>
                <input style={inputStyle(editing)} value={form.cin || ""} onChange={(e) => setForm({ ...form, cin: e.target.value })} disabled={!editing} placeholder="Non renseigné" />
              </div>
              <div>
                <label style={labelStyle}>CNSS</label>
                <input style={inputStyle(editing)} value={form.cnss || ""} onChange={(e) => setForm({ ...form, cnss: e.target.value })} disabled={!editing} placeholder="Non renseigné" />
              </div>
              <div>
                <label style={labelStyle}>STATUT</label>
                <select style={inputStyle(editing)} value={form.statut || ""} onChange={(e) => setForm({ ...form, statut: e.target.value })} disabled={!editing}>
                  {STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>RÔLE</label>
                <select style={inputStyle(editing)} value={form.role || ""} onChange={(e) => setForm({ ...form, role: e.target.value })} disabled={!editing}>
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>POSTE</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <select
                    style={{ ...inputStyle(editing), flex: 1 }}
                    value={form.posteId || ""}
                    onChange={(e) => setForm({ ...form, posteId: e.target.value })}
                    disabled={!editing}
                  >
                    <option value="">— Sélectionner —</option>
                    {refs.postes.map((p) => <option key={p.id} value={p.id}>{p.nom}</option>)}
                  </select>
                  {editing && (
                    <button
                      onClick={() => setShowAddRef("poste")}
                      style={{ padding: "8px 12px", background: "#f0f9ff", border: "1px solid #0070f3", borderRadius: "6px", color: "#0070f3", cursor: "pointer", fontWeight: "bold", whiteSpace: "nowrap" }}
                    >
                      + Nouveau
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTRAT */}
        {activeTab === "contrat" && (
          <div style={{ background: "white", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "bold", color: "#1a1a1a" }}>
              Contrat & Rémunération
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>TYPE DE CONTRAT</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <select
                    style={{ ...inputStyle(editing), flex: 1 }}
                    value={form.typeContratId || ""}
                    onChange={(e) => setForm({ ...form, typeContratId: e.target.value })}
                    disabled={!editing}
                  >
                    <option value="">— Sélectionner —</option>
                    {refs.typesContrat.map((t) => <option key={t.id} value={t.id}>{t.nom}</option>)}
                  </select>
                  {editing && (
                    <button
                      onClick={() => setShowAddRef("typeContrat")}
                      style={{ padding: "8px 12px", background: "#f0f9ff", border: "1px solid #0070f3", borderRadius: "6px", color: "#0070f3", cursor: "pointer", fontWeight: "bold", whiteSpace: "nowrap" }}
                    >
                      + Nouveau
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label style={labelStyle}>TAUX HORAIRE (DH)</label>
                <input type="number" style={inputStyle(editing)} value={form.tauxHoraire || ""} onChange={(e) => setForm({ ...form, tauxHoraire: parseFloat(e.target.value) })} disabled={!editing} placeholder="0.00" />
              </div>
              <div>
                <label style={labelStyle}>SALAIRE DE BASE (DH)</label>
                <input type="number" style={inputStyle(editing)} value={form.salaireBase || ""} onChange={(e) => setForm({ ...form, salaireBase: parseFloat(e.target.value) })} disabled={!editing} placeholder="0.00" />
              </div>
              <div>
                <label style={labelStyle}>INDEMNITÉ TRANSPORT (DH)</label>
                <input type="number" style={inputStyle(editing)} value={form.indemniteTransport || ""} onChange={(e) => setForm({ ...form, indemniteTransport: parseFloat(e.target.value) })} disabled={!editing} placeholder="0.00" />
              </div>
              <div>
                <label style={labelStyle}>AUTRE INDEMNITÉ (DH)</label>
                <input type="number" style={inputStyle(editing)} value={form.autreIndemnite || ""} onChange={(e) => setForm({ ...form, autreIndemnite: parseFloat(e.target.value) })} disabled={!editing} placeholder="0.00" />
              </div>
              <div>
                <label style={labelStyle}>DATE DÉBUT CONTRAT</label>
                <input type="date" style={inputStyle(editing)} value={form.dateDebutContrat ? form.dateDebutContrat.split("T")[0] : ""} onChange={(e) => setForm({ ...form, dateDebutContrat: e.target.value })} disabled={!editing} />
              </div>
              <div>
                <label style={labelStyle}>DATE FIN CONTRAT</label>
                <input type="date" style={inputStyle(editing)} value={form.dateFinContrat ? form.dateFinContrat.split("T")[0] : ""} onChange={(e) => setForm({ ...form, dateFinContrat: e.target.value })} disabled={!editing} />
              </div>
            </div>

            {/* Résumé coût */}
            <div style={{ marginTop: "24px", background: "#f0f9ff", borderRadius: "8px", padding: "16px", border: "1px solid #bae6fd" }}>
              <h4 style={{ margin: "0 0 12px", fontSize: "14px", color: "#0369a1" }}>Résumé Rémunération</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[
                  { label: "Taux Horaire", value: `${employe.tauxHoraire || 0} DH/h` },
                  { label: "Salaire Base", value: `${employe.salaireBase || 0} DH` },
                  { label: "Total Indemnités", value: `${(employe.indemniteTransport || 0) + (employe.autreIndemnite || 0)} DH` },
                ].map((item) => (
                  <div key={item.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: "bold", color: "#0070f3" }}>{item.value}</div>
                    <div style={{ fontSize: "11px", color: "#666" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB SECURITE */}
        {activeTab === "securite" && (
          <div style={{ background: "white", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold", color: "#1a1a1a" }}>
                Habilitations & Sécurité
              </h3>
              <button
                onClick={() => setShowAddHab(true)}
                style={{ padding: "8px 16px", background: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}
              >
                + Ajouter habilitation
              </button>
            </div>

            {(employe.habilitations || []).length === 0 ? (
              <p style={{ color: "#999", textAlign: "center", padding: "20px" }}>Aucune habilitation enregistrée</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>TYPE</th>
                    <th style={{ padding: "10px 14px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>DATE EXPIRATION</th>
                    <th style={{ padding: "10px 14px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>STATUT</th>
                  </tr>
                </thead>
                <tbody>
                  {employe.habilitations.map((h) => {
                    const expired = new Date(h.dateFin) < new Date();
                    const soon = !expired && (new Date(h.dateFin).getTime() - Date.now()) < 30 * 24 * 60 * 60 * 1000;
                    return (
                      <tr key={h.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "10px 14px", fontWeight: "bold", fontSize: "14px" }}>{h.type.nom}</td>
                        <td style={{ padding: "10px 14px", textAlign: "center", fontSize: "13px" }}>
                          {new Date(h.dateFin).toLocaleDateString("fr-FR")}
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>
                          <span style={{
                            padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold",
                            background: expired ? "#fee2e2" : soon ? "#fef3c7" : "#d1fae5",
                            color: expired ? "#ef4444" : soon ? "#f59e0b" : "#10b981",
                          }}>
                            {expired ? "EXPIRÉ" : soon ? "BIENTÔT" : "VALIDE"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* TAB EPI */}
        {activeTab === "epi" && (
          <div style={{ background: "white", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "bold", color: "#1a1a1a" }}>
              Historique EPI
            </h3>
            {(employe.epiDistribues || []).length === 0 ? (
              <p style={{ color: "#999", textAlign: "center", padding: "20px" }}>Aucun EPI distribué</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>EPI</th>
                    <th style={{ padding: "10px 14px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>DATE</th>
                    <th style={{ padding: "10px 14px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>ÉTAT</th>
                  </tr>
                </thead>
                <tbody>
                  {employe.epiDistribues.map((e) => (
                    <tr key={e.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px 14px", fontWeight: "bold", fontSize: "14px" }}>{e.epi.nom}</td>
                      <td style={{ padding: "10px 14px", textAlign: "center", fontSize: "13px" }}>
                        {new Date(e.date).toLocaleDateString("fr-FR")}
                      </td>
                      <td style={{ padding: "10px 14px", textAlign: "center" }}>
                        <span style={{
                          padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold",
                          background: e.etat === "NEUF" ? "#d1fae5" : "#fef3c7",
                          color: e.etat === "NEUF" ? "#10b981" : "#f59e0b",
                        }}>
                          {e.etat}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {/* TAB DOCUMENTS */}
        {activeTab === "documents" && (
          <div style={{ background: "white", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "bold", color: "#1a1a1a" }}>
              Documents
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[
                { label: "Photo de profil", type: "photo", url: employe.photoUrl, accept: "image/*", icon: "🖼️" },
                { label: "Copie CIN", type: "cin", url: employe.cinUrl, accept: "image/*,application/pdf", icon: "🪪" },
                { label: "Copie CNSS", type: "cnss", url: employe.cnssUrl, accept: "image/*,application/pdf", icon: "📄" },
                { label: "Contrat signé", type: "contrat", url: employe.contratUrl, accept: "application/pdf", icon: "📋" },
              ].map((doc) => (
                <DocumentCard
                  key={doc.type}
                  label={doc.label}
                  type={doc.type}
                  url={doc.url}
                  accept={doc.accept}
                  icon={doc.icon}
                  userId={employe.id}
                  onUploaded={(newUrl) => setEmploye((prev) => prev ? { ...prev, [`${doc.type}Url`]: newUrl } : prev)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal ajout référence */}
      {showAddRef && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "24px", width: "400px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "16px" }}>
              Ajouter {showAddRef === "poste" ? "un poste" : "un type de contrat"}
            </h3>
            <input
              type="text"
              placeholder="Nom..."
              value={newRefNom}
              onChange={(e) => setNewRefNom(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" }}
              autoFocus
            />
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowAddRef(null)} style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={() => handleAddRef(showAddRef)} style={{ padding: "8px 16px", background: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal ajout habilitation */}
      {showAddHab && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "24px", width: "400px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "16px" }}>Ajouter une habilitation</h3>
            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>TYPE D'HABILITATION</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <select
                  value={newHab.typeId}
                  onChange={(e) => setNewHab({ ...newHab, typeId: e.target.value })}
                  style={{ flex: 1, padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
                >
                  <option value="">— Sélectionner —</option>
                  {refs.typesHabilitation.map((t) => <option key={t.id} value={t.id}>{t.nom}</option>)}
                </select>
                <button
                  onClick={() => setShowAddRef("typeHabilitation")}
                  style={{ padding: "8px 12px", background: "#f0f9ff", border: "1px solid #0070f3", borderRadius: "6px", color: "#0070f3", cursor: "pointer", fontWeight: "bold" }}
                >
                  + Nouveau
                </button>
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>DATE D'EXPIRATION</label>
              <input
                type="date"
                value={newHab.dateFin}
                onChange={(e) => setNewHab({ ...newHab, dateFin: e.target.value })}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowAddHab(false)} style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={handleAddHabilitation} style={{ padding: "8px 16px", background: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}