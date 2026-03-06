"use client";

import { useState, useEffect } from "react";

type Habilitation = {
  id: string;
  typeHabilitation: { nom: string; code: string };
  dateObtention: string;
  dateExpiration: string | null;
};

type EPI = {
  id: string;
  epi: { nom: string };
  statut: string;
};

type User = {
  id: string;
  nom: string;
  prenom: string;
  email: string | null;
  matricule: string | null;
  cin: string | null;
  telephone: string | null;
  statut: string;
  role: string;
  dateEmbauche: string | null;
  salaire: number | null;
  adresse: string | null;
  photo: string | null;
  poste: { id: string; nom: string } | null;
  habilitations: Habilitation[];
  distributions: EPI[];
};

const ROLES = ["ADMIN", "CHEF", "RH", "OUVRIER"];
const STATUTS_USER = ["ACTIF", "INACTIF", "CONGE", "SUSPENDU"];

const statutConfig: Record<string, { label: string; color: string; bg: string }> = {
  ACTIF:     { label: "Actif",     color: "#10b981", bg: "#f0fdf4" },
  INACTIF:   { label: "Inactif",   color: "#6b7280", bg: "#f9fafb" },
  CONGE:     { label: "Congé",     color: "#f59e0b", bg: "#fffbeb" },
  SUSPENDU:  { label: "Suspendu",  color: "#ef4444", bg: "#fef2f2" },
};

const roleConfig: Record<string, { label: string; color: string }> = {
  ADMIN:   { label: "Admin",   color: "#6366f1" },
  CHEF:    { label: "Chef",    color: "#0070f3" },
  RH:      { label: "RH",      color: "#7c3aed" },
  OUVRIER: { label: "Ouvrier", color: "#0891b2" },
};

function joursRestants(dateStr: string | null): number | null {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

function Avatar({ user }: { user: User }) {
  const initials = `${user.prenom[0]}${user.nom[0]}`.toUpperCase();
  const colors = ["#0070f3", "#10b981", "#6366f1", "#f59e0b", "#ef4444", "#0891b2"];
  const color = colors[(user.nom.charCodeAt(0) + user.prenom.charCodeAt(0)) % colors.length];
  if (user.photo) return (
    <img src={user.photo} alt={initials} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
  );
  return (
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "14px", flexShrink: 0 }}>
      {initials}
    </div>
  );
}
function DocumentsSection({ userId }: { userId: string }) {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: "CIN", nom: "", expiration: "", remarque: "" });

  const TYPES_DOC = [
    { value: "CIN", label: "Carte d'identité", icon: "🪪" },
    { value: "CNSS", label: "CNSS", icon: "🏥" },
    { value: "CONTRAT", label: "Contrat de travail", icon: "📄" },
    { value: "DIPLOME", label: "Diplôme", icon: "🎓" },
    { value: "VISITE_MEDICALE", label: "Visite médicale", icon: "🩺" },
    { value: "CACES", label: "CACES", icon: "🏗️" },
    { value: "HABILITATION", label: "Habilitation", icon: "⚡" },
    { value: "AUTRE", label: "Autre", icon: "📎" },
  ];

  useEffect(() => { loadDocs(); }, [userId]);

  const loadDocs = async () => {
    setLoading(true);
    const res = await fetch(`/api/rh/documents?userId=${userId}`);
    const data = await res.json();
    setDocs(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("userId", userId);
    fd.append("type", form.type);

    const uploadRes = await fetch("/api/rh/upload", { method: "POST", body: fd });
    const uploadData = await uploadRes.json();

    if (uploadData.url) {
      await fetch("/api/rh/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          type: form.type,
          nom: form.nom || file.name,
          url: uploadData.url,
          taille: uploadData.taille,
          expiration: form.expiration || null,
          remarque: form.remarque || null,
        }),
      });
      await loadDocs();
      setShowForm(false);
      setForm({ type: "CIN", nom: "", expiration: "", remarque: "" });
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce document ?")) return;
    await fetch(`/api/rh/documents?id=${id}`, { method: "DELETE" });
    await loadDocs();
  };

  const typeInfo = (type: string) => TYPES_DOC.find(t => t.value === type) || { icon: "📎", label: type };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#666", textTransform: "uppercase" }}>
          Documents ({docs.length})
        </div>
        <button onClick={() => setShowForm(!showForm)}
          style={{ fontSize: "11px", background: "#f0f9ff", color: "#0070f3", border: "1px solid #bae6fd", borderRadius: "5px", padding: "3px 10px", cursor: "pointer", fontWeight: "bold" }}>
          + Ajouter
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "12px", marginBottom: "10px", border: "1px solid #e5e7eb" }}>
          <div style={{ marginBottom: "8px" }}>
            <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "3px" }}>TYPE</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
              style={{ width: "100%", padding: "6px 10px", border: "1px solid #ddd", borderRadius: "5px", fontSize: "13px" }}>
              {TYPES_DOC.map(t => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "3px" }}>NOM DU DOCUMENT</label>
            <input type="text" placeholder="Ex: CIN recto-verso" value={form.nom}
              onChange={e => setForm({ ...form, nom: e.target.value })}
              style={{ width: "100%", padding: "6px 10px", border: "1px solid #ddd", borderRadius: "5px", fontSize: "13px", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "3px" }}>DATE EXPIRATION (optionnel)</label>
            <input type="date" value={form.expiration} onChange={e => setForm({ ...form, expiration: e.target.value })}
              style={{ width: "100%", padding: "6px 10px", border: "1px solid #ddd", borderRadius: "5px", fontSize: "13px", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "3px" }}>REMARQUE</label>
            <input type="text" placeholder="Optionnel..." value={form.remarque}
              onChange={e => setForm({ ...form, remarque: e.target.value })}
              style={{ width: "100%", padding: "6px 10px", border: "1px solid #ddd", borderRadius: "5px", fontSize: "13px", boxSizing: "border-box" }} />
          </div>
          <label style={{
            display: "block", padding: "10px", textAlign: "center",
            background: uploading ? "#f1f5f9" : "#0070f3", color: uploading ? "#999" : "white",
            borderRadius: "6px", cursor: uploading ? "not-allowed" : "pointer",
            fontSize: "13px", fontWeight: "bold",
          }}>
            {uploading ? "⏳ Upload en cours..." : "📎 Choisir un fichier et uploader"}
            <input type="file" style={{ display: "none" }} onChange={handleUpload} disabled={uploading}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
          </label>
        </div>
      )}

      {loading ? (
        <div style={{ fontSize: "12px", color: "#ccc", textAlign: "center", padding: "10px" }}>Chargement...</div>
      ) : docs.length === 0 ? (
        <div style={{ fontSize: "12px", color: "#ccc", textAlign: "center", padding: "10px" }}>Aucun document</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {docs.map(doc => {
            const t = typeInfo(doc.type);
            const expJ = doc.expiration ? Math.ceil((new Date(doc.expiration).getTime() - Date.now()) / 86400000) : null;
            const expAlert = expJ !== null && expJ <= 30;
            return (
              <div key={doc.id} style={{
                padding: "8px 12px", borderRadius: "7px",
                background: expAlert ? "#fef2f2" : "#f8fafc",
                border: `1px solid ${expAlert ? "#fca5a5" : "#e5e7eb"}`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span>{t.icon}</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.nom}</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>
                    {t.label}
                    {doc.expiration && (
                      <span style={{ marginLeft: "8px", color: expAlert ? "#ef4444" : "#10b981", fontWeight: "bold" }}>
                        {expJ! < 0 ? `⛔ Expiré (${Math.abs(expJ!)}j)` : expJ! <= 30 ? `⚠️ Expire dans ${expJ}j` : `✅ ${new Date(doc.expiration).toLocaleDateString("fr-FR")}`}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "4px", marginLeft: "8px" }}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer"
                    style={{ padding: "3px 8px", background: "#f0f9ff", color: "#0070f3", borderRadius: "4px", fontSize: "11px", textDecoration: "none", border: "1px solid #bae6fd" }}>
                    👁️
                  </a>
                  <button onClick={() => handleDelete(doc.id)}
                    style={{ padding: "3px 8px", background: "#fef2f2", color: "#ef4444", border: "1px solid #fca5a5", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}>
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default function RHPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [postes, setPostes] = useState<{ id: string; nom: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("");
  const [filtrePoste, setFiltrePoste] = useState("");
  const [selected, setSelected] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("liste");

  const emptyForm = {
    nom: "", prenom: "", email: "", matricule: "", cin: "",
    telephone: "", posteId: "", role: "OUVRIER", statut: "ACTIF",
    dateEmbauche: "", salaire: "", adresse: "",
  };
  const [form, setForm] = useState<any>(emptyForm);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    const [usersRes, refRes] = await Promise.all([
      fetch("/api/rh").then(r => r.json()),
      fetch("/api/ref").then(r => r.json()),
    ]);
    setUsers(Array.isArray(usersRes) ? usersRes : []);
    setPostes(refRes.postes || []);
    setLoading(false);
  };

  const filtered = users.filter(u => {
    const matchSearch = !search || `${u.nom} ${u.prenom} ${u.matricule} ${u.cin}`.toLowerCase().includes(search.toLowerCase());
    const matchStatut = !filtreStatut || u.statut === filtreStatut;
    const matchPoste = !filtrePoste || u.poste?.id === filtrePoste;
    return matchSearch && matchStatut && matchPoste;
  });

  const stats = {
    total: users.length,
    actifs: users.filter(u => u.statut === "ACTIF").length,
    conges: users.filter(u => u.statut === "CONGE").length,
    habilitationsAlert: users.reduce((acc, u) => acc + u.habilitations.filter(h => {
      const j = joursRestants(h.dateExpiration);
      return j !== null && j <= 30;
    }).length, 0),
    episActifs: users.reduce((acc, u) => acc + u.distributions.length, 0),
  };

  const handleCreate = () => {
    setForm(emptyForm);
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (u: User) => {
    setForm({
      id: u.id,
      nom: u.nom, prenom: u.prenom,
      email: u.email || "", matricule: u.matricule || "",
      cin: u.cin || "", telephone: u.telephone || "",
      posteId: u.poste?.id || "", role: u.role, statut: u.statut,
      dateEmbauche: u.dateEmbauche ? u.dateEmbauche.split("T")[0] : "",
      salaire: u.salaire?.toString() || "",
      adresse: u.adresse || "",
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.prenom) return;
    setSaving(true);
    const method = editMode ? "PATCH" : "POST";
    await fetch("/api/rh", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    await loadAll();
    setShowModal(false);
    setSaving(false);
  };

  const handleArchive = async (id: string) => {
    if (!confirm("Archiver cet employé ?")) return;
    await fetch(`/api/rh?id=${id}`, { method: "DELETE" });
    await loadAll();
    setSelected(null);
  };

  const inputStyle = {
    width: "100%", padding: "8px 12px",
    border: "1px solid #ddd", borderRadius: "6px",
    fontSize: "14px", boxSizing: "border-box" as const,
  };
  const labelStyle = {
    fontSize: "11px", fontWeight: "bold" as const,
    color: "#666", marginBottom: "4px", display: "block",
  };

  if (loading) return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>👷</div>
      <div style={{ color: "#999" }}>Chargement des employés...</div>
    </div>
  );

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#1a1a1a" }}>👷 Ressources Humaines</h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>Gestion des employés, habilitations et EPI</p>
        </div>
        <button onClick={handleCreate} style={{
          padding: "10px 20px", background: "#0070f3", color: "white",
          border: "none", borderRadius: "8px", cursor: "pointer",
          fontWeight: "bold", fontSize: "14px",
        }}>
          + Nouvel employé
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {[
          { icon: "👥", label: "Total employés", value: stats.total, color: "#0070f3", bg: "#f0f9ff" },
          { icon: "✅", label: "Actifs", value: stats.actifs, color: "#10b981", bg: "#f0fdf4" },
          { icon: "🏖️", label: "En congé", value: stats.conges, color: "#f59e0b", bg: "#fffbeb" },
          { icon: "⚠️", label: "Habilitations alertes", value: stats.habilitationsAlert, color: stats.habilitationsAlert > 0 ? "#ef4444" : "#10b981", bg: stats.habilitationsAlert > 0 ? "#fef2f2" : "#f0fdf4" },
          { icon: "🦺", label: "EPI distribués", value: stats.episActifs, color: "#6366f1", bg: "#f5f3ff" },
        ].map(k => (
          <div key={k.label} style={{ background: k.bg, borderRadius: "10px", padding: "14px 16px", border: `1px solid ${k.color}22`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "22px", marginBottom: "4px" }}>{k.icon}</div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: k.color }}>{k.value}</div>
            <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs vue */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "16px", background: "white", borderRadius: "10px", padding: "4px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", width: "fit-content" }}>
        {[
          { id: "liste", label: "📋 Liste" },
          { id: "grille", label: "🃏 Grille" },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: "8px 20px", border: "none", borderRadius: "8px", cursor: "pointer",
            background: activeTab === t.id ? "#0070f3" : "transparent",
            color: activeTab === t.id ? "white" : "#666",
            fontWeight: activeTab === t.id ? "bold" : "normal",
            fontSize: "13px",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "16px", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <input
          placeholder="🔍 Rechercher nom, matricule, CIN..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: "200px" }}
        />
        <select value={filtreStatut} onChange={e => setFiltreStatut(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}>
          <option value="">Tous les statuts</option>
          {STATUTS_USER.map(s => <option key={s} value={s}>{statutConfig[s].label}</option>)}
        </select>
        <select value={filtrePoste} onChange={e => setFiltrePoste(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}>
          <option value="">Tous les postes</option>
          {postes.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
        </select>
        {(search || filtreStatut || filtrePoste) && (
          <button onClick={() => { setSearch(""); setFiltreStatut(""); setFiltrePoste(""); }}
            style={{ padding: "8px 14px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer", fontSize: "13px", color: "#666" }}>
            ✕ Effacer
          </button>
        )}
        <span style={{ fontSize: "12px", color: "#999", whiteSpace: "nowrap" }}>
          {filtered.length} employé{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* VUE LISTE */}
      {activeTab === "liste" && (
        <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "60px", textAlign: "center", color: "#999" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>👷</div>
              <div>Aucun employé trouvé</div>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["EMPLOYÉ", "POSTE", "CONTACT", "HABILITATIONS", "EPI", "STATUT", ""].map(h => (
                    <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: "11px", color: "#666", fontWeight: "bold", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => {
                  const habAlerts = u.habilitations.filter(h => {
                    const j = joursRestants(h.dateExpiration);
                    return j !== null && j <= 30;
                  });
                  const st = statutConfig[u.statut];
                  return (
                    <tr key={u.id}
                      style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                      onClick={() => setSelected(selected?.id === u.id ? null : u)}
                      onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                      onMouseLeave={e => (e.currentTarget.style.background = "white")}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <Avatar user={u} />
                          <div>
                            <div style={{ fontWeight: "bold", fontSize: "14px" }}>{u.prenom} {u.nom}</div>
                            <div style={{ fontSize: "11px", color: "#999" }}>
                              {u.matricule && <span>#{u.matricule}</span>}
                              {u.cin && <span style={{ marginLeft: "6px" }}>CIN: {u.cin}</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontSize: "13px" }}>{u.poste?.nom || "—"}</div>
                        <span style={{ fontSize: "10px", background: `${roleConfig[u.role]?.color}18`, color: roleConfig[u.role]?.color, padding: "1px 7px", borderRadius: "10px", fontWeight: "bold" }}>
                          {roleConfig[u.role]?.label}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {u.telephone && <div style={{ fontSize: "12px", color: "#555" }}>📞 {u.telephone}</div>}
                        {u.email && <div style={{ fontSize: "12px", color: "#0070f3" }}>✉️ {u.email}</div>}
                        {!u.telephone && !u.email && <span style={{ color: "#ccc", fontSize: "12px" }}>—</span>}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {u.habilitations.length === 0 ? (
                          <span style={{ color: "#ccc", fontSize: "12px" }}>Aucune</span>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            {u.habilitations.slice(0, 2).map(h => {
                              const j = joursRestants(h.dateExpiration);
                              const alert = j !== null && j <= 30;
                              return (
                                <span key={h.id} style={{
                                  fontSize: "10px", padding: "2px 7px", borderRadius: "4px", fontWeight: "bold",
                                  background: alert ? "#fef2f2" : "#f0f9ff",
                                  color: alert ? "#ef4444" : "#0070f3",
                                }}>
                                  {h.typeHabilitation.code} {alert && `⚠️ ${j}j`}
                                </span>
                              );
                            })}
                            {u.habilitations.length > 2 && (
                              <span style={{ fontSize: "10px", color: "#999" }}>+{u.habilitations.length - 2}</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {u.distributions.length > 0 ? (
                          <span style={{ fontSize: "12px", background: "#f5f3ff", color: "#6366f1", padding: "2px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                            🦺 {u.distributions.length} EPI
                          </span>
                        ) : (
                          <span style={{ color: "#ccc", fontSize: "12px" }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: st.bg, color: st.color, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold" }}>
                          {st.label}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button onClick={e => { e.stopPropagation(); handleEdit(u); }}
                            style={{ padding: "4px 10px", background: "#f0f9ff", color: "#0070f3", border: "1px solid #bae6fd", borderRadius: "5px", cursor: "pointer", fontSize: "12px" }}>
                            ✏️
                          </button>
                          <button onClick={e => { e.stopPropagation(); handleArchive(u.id); }}
                            style={{ padding: "4px 10px", background: "#fef2f2", color: "#ef4444", border: "1px solid #fca5a5", borderRadius: "5px", cursor: "pointer", fontSize: "12px" }}>
                            🗄️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* VUE GRILLE */}
      {activeTab === "grille" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
          {filtered.map(u => {
            const st = statutConfig[u.statut];
            const habAlerts = u.habilitations.filter(h => {
              const j = joursRestants(h.dateExpiration);
              return j !== null && j <= 30;
            });
            return (
              <div key={u.id}
                onClick={() => setSelected(selected?.id === u.id ? null : u)}
                style={{
                  background: "white", borderRadius: "12px", padding: "18px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.08)", cursor: "pointer",
                  border: selected?.id === u.id ? "2px solid #0070f3" : "2px solid transparent",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.08)")}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <Avatar user={u} />
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{u.prenom} {u.nom}</div>
                      <div style={{ fontSize: "11px", color: "#999" }}>{u.matricule ? `#${u.matricule}` : "—"}</div>
                    </div>
                  </div>
                  <span style={{ background: st.bg, color: st.color, padding: "2px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "bold" }}>
                    {st.label}
                  </span>
                </div>

                <div style={{ fontSize: "12px", color: "#555", marginBottom: "10px" }}>
                  <div>💼 {u.poste?.nom || "—"}</div>
                  {u.telephone && <div style={{ marginTop: "2px" }}>📞 {u.telephone}</div>}
                  {u.dateEmbauche && <div style={{ marginTop: "2px", color: "#999" }}>📅 {new Date(u.dateEmbauche).toLocaleDateString("fr-FR")}</div>}
                </div>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "10px", background: `${roleConfig[u.role]?.color}18`, color: roleConfig[u.role]?.color, padding: "2px 8px", borderRadius: "10px", fontWeight: "bold" }}>
                    {roleConfig[u.role]?.label}
                  </span>
                  {u.distributions.length > 0 && (
                    <span style={{ fontSize: "10px", background: "#f5f3ff", color: "#6366f1", padding: "2px 8px", borderRadius: "10px", fontWeight: "bold" }}>
                      🦺 {u.distributions.length}
                    </span>
                  )}
                  {habAlerts.length > 0 && (
                    <span style={{ fontSize: "10px", background: "#fef2f2", color: "#ef4444", padding: "2px 8px", borderRadius: "10px", fontWeight: "bold" }}>
                      ⚠️ {habAlerts.length} hab.
                    </span>
                  )}
                </div>

                <div style={{ marginTop: "12px", display: "flex", gap: "6px" }}>
                  <button onClick={e => { e.stopPropagation(); handleEdit(u); }}
                    style={{ flex: 1, padding: "6px", background: "#f0f9ff", color: "#0070f3", border: "1px solid #bae6fd", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>
                    ✏️ Modifier
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PANNEAU DÉTAIL latéral */}
      {selected && (
        <div style={{
          position: "fixed", right: 0, top: 0, bottom: 0,
          width: "380px", background: "white",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
          zIndex: 500, overflowY: "auto",
          padding: "24px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>Fiche employé</h3>
            <button onClick={() => setSelected(null)}
              style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#666" }}>×</button>
          </div>

          {/* En-tête fiche */}
          <div style={{ textAlign: "center", marginBottom: "20px", padding: "20px", background: "#f8fafc", borderRadius: "12px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <Avatar user={selected} />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>{selected.prenom} {selected.nom}</div>
            <div style={{ color: "#666", fontSize: "13px", marginTop: "2px" }}>{selected.poste?.nom || "—"}</div>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "10px" }}>
              <span style={{ background: statutConfig[selected.statut].bg, color: statutConfig[selected.statut].color, padding: "3px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
                {statutConfig[selected.statut].label}
              </span>
              <span style={{ background: `${roleConfig[selected.role]?.color}18`, color: roleConfig[selected.role]?.color, padding: "3px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
                {roleConfig[selected.role]?.label}
              </span>
            </div>
          </div>

          {/* Infos */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: "#666", marginBottom: "10px", textTransform: "uppercase" }}>Informations</div>
            {[
              { label: "Matricule", value: selected.matricule || "—" },
              { label: "CIN", value: selected.cin || "—" },
              { label: "Téléphone", value: selected.telephone || "—" },
              { label: "Email", value: selected.email || "—" },
              { label: "Adresse", value: selected.adresse || "—" },
              { label: "Date embauche", value: selected.dateEmbauche ? new Date(selected.dateEmbauche).toLocaleDateString("fr-FR") : "—" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f1f5f9", fontSize: "13px" }}>
                <span style={{ color: "#666" }}>{item.label}</span>
                <span style={{ fontWeight: "500", color: "#1a1a1a" }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Habilitations */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: "#666", marginBottom: "10px", textTransform: "uppercase" }}>
              Habilitations ({selected.habilitations.length})
            </div>
            {selected.habilitations.length === 0 ? (
              <div style={{ fontSize: "12px", color: "#ccc", textAlign: "center", padding: "10px" }}>Aucune habilitation</div>
            ) : (
              selected.habilitations.map(h => {
                const j = joursRestants(h.dateExpiration);
                const alert = j !== null && j <= 30;
                return (
                  <div key={h.id} style={{
                    padding: "10px 12px", borderRadius: "8px", marginBottom: "6px",
                    background: alert ? "#fef2f2" : "#f8fafc",
                    border: `1px solid ${alert ? "#fca5a5" : "#e5e7eb"}`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: "bold" }}>{h.typeHabilitation.nom}</div>
                        <div style={{ fontSize: "11px", color: "#999" }}>Code: {h.typeHabilitation.code}</div>
                      </div>
                      {h.dateExpiration && (
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "11px", color: alert ? "#ef4444" : "#10b981", fontWeight: "bold" }}>
                            {j! < 0 ? `⛔ Exp. (${Math.abs(j!)}j)` : j! <= 30 ? `⚠️ ${j}j` : `✅ ${j}j`}
                          </div>
                          <div style={{ fontSize: "10px", color: "#999" }}>
                            {new Date(h.dateExpiration).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* EPI actifs */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: "#666", marginBottom: "10px", textTransform: "uppercase" }}>
              EPI distribués ({selected.distributions.length})
            </div>
            {selected.distributions.length === 0 ? (
              <div style={{ fontSize: "12px", color: "#ccc", textAlign: "center", padding: "10px" }}>Aucun EPI actif</div>
            ) : (
              selected.distributions.map(d => (
                <div key={d.id} style={{ padding: "8px 12px", borderRadius: "6px", background: "#f5f3ff", border: "1px solid #ddd6fe", marginBottom: "4px", fontSize: "13px" }}>
                  🦺 {d.epi.nom}
                </div>
              ))
            )}
          </div>
          {/* Documents */}
          <DocumentsSection userId={selected.id} />

          {/* Actions */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => handleEdit(selected)}
              style={{ flex: 1, padding: "10px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}>
              ✏️ Modifier
            </button>
            <button onClick={() => handleArchive(selected.id)}
              style={{ padding: "10px 14px", background: "#fef2f2", color: "#ef4444", border: "1px solid #fca5a5", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
              🗄️ Archiver
            </button>
          </div>
        </div>
      )}

      {/* MODAL créer/modifier */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "14px", padding: "28px", width: "560px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: "bold" }}>
              {editMode ? "✏️ Modifier l'employé" : "➕ Nouvel employé"}
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {[
                { key: "prenom", label: "PRÉNOM *", type: "text", placeholder: "Prénom" },
                { key: "nom", label: "NOM *", type: "text", placeholder: "Nom" },
                { key: "matricule", label: "MATRICULE", type: "text", placeholder: "MAT-001" },
                { key: "cin", label: "CIN", type: "text", placeholder: "AB123456" },
                { key: "telephone", label: "TÉLÉPHONE", type: "tel", placeholder: "06 00 00 00 00" },
                { key: "email", label: "EMAIL", type: "email", placeholder: "nom@sii.ma" },
              ].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type={f.type} style={inputStyle} placeholder={f.placeholder}
                    value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                </div>
              ))}

              <div>
                <label style={labelStyle}>POSTE</label>
                <select style={inputStyle} value={form.posteId} onChange={e => setForm({ ...form, posteId: e.target.value })}>
                  <option value="">— Sélectionner —</option>
                  {postes.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>RÔLE</label>
                <select style={inputStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  {ROLES.map(r => <option key={r} value={r}>{roleConfig[r].label}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>STATUT</label>
                <select style={inputStyle} value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}>
                  {STATUTS_USER.map(s => <option key={s} value={s}>{statutConfig[s].label}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>DATE EMBAUCHE</label>
                <input type="date" style={inputStyle} value={form.dateEmbauche}
                  onChange={e => setForm({ ...form, dateEmbauche: e.target.value })} />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>ADRESSE</label>
                <input type="text" style={inputStyle} placeholder="Adresse complète"
                  value={form.adresse} onChange={e => setForm({ ...form, adresse: e.target.value })} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px" }}>
              <button onClick={() => setShowModal(false)}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "14px" }}>
                Annuler
              </button>
              <button onClick={handleSubmit} disabled={saving || !form.nom || !form.prenom}
                style={{ padding: "10px 24px", background: !form.nom || !form.prenom ? "#ccc" : "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}>
                {saving ? "Sauvegarde..." : editMode ? "Enregistrer" : "Créer l'employé"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}