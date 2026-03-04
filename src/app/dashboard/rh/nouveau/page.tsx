"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Ref = {
  postes: { id: string; nom: string }[];
  typesContrat: { id: string; nom: string }[];
};

const ROLES = ["OUVRIER", "CHEF_CHANTIER", "SUPERVISEUR", "RH", "ADMIN", "CLIENT", "SOUS_TRAITANT"];

export default function NouvelEmployePage() {
  const router = useRouter();
  const [refs, setRefs] = useState<Ref>({ postes: [], typesContrat: [] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showAddRef, setShowAddRef] = useState<string | null>(null);
  const [newRefNom, setNewRefNom] = useState("");

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    matricule: "",
    cin: "",
    cnss: "",
    role: "OUVRIER",
    statut: "ACTIF",
    password: "Chantier2024!",
    posteId: "",
    typeContratId: "",
    tauxHoraire: "",
    salaireBase: "",
    indemniteTransport: "",
    autreIndemnite: "",
    dateDebutContrat: "",
    dateFinContrat: "",
  });

  useEffect(() => {
    fetch("/api/ref")
      .then((r) => r.json())
      .then((data) => setRefs(data));
  }, []);

  const handleAddRef = async (table: string) => {
    if (!newRefNom.trim()) return;
    const res = await fetch("/api/ref", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, data: { nom: newRefNom } }),
    });
    const newItem = await res.json();
    setRefs((prev) => {
      const key = table === "poste" ? "postes" : "typesContrat";
      return { ...prev, [key]: [...prev[key], newItem] };
    });
    setNewRefNom("");
    setShowAddRef(null);
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.prenom) {
      setError("Le nom et le prénom sont obligatoires");
      return;
    }

    const email = form.email || `${form.nom.toLowerCase()}.${form.prenom.toLowerCase()}@chantier.local`;

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          email,
          tauxHoraire: form.tauxHoraire ? parseFloat(form.tauxHoraire) : null,
          salaireBase: form.salaireBase ? parseFloat(form.salaireBase) : null,
          indemniteTransport: form.indemniteTransport ? parseFloat(form.indemniteTransport) : null,
          autreIndemnite: form.autreIndemnite ? parseFloat(form.autreIndemnite) : null,
          posteId: form.posteId || null,
          typeContratId: form.typeContratId || null,
          dateDebutContrat: form.dateDebutContrat || null,
          dateFinContrat: form.dateFinContrat || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erreur lors de la création");
        setSaving(false);
        return;
      }

      const newUser = await res.json();
      router.push(`/dashboard/rh/${newUser.id}`);
    } catch (err) {
      setError("Erreur réseau");
      setSaving(false);
    }
  };

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

  const sectionStyle = {
    background: "white",
    borderRadius: "10px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" }}>
            👤 Nouvel Employé
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            Remplissez les informations pour créer un nouveau profil
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/rh")}
          style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer", fontSize: "14px" }}
        >
          ← Retour
        </button>
      </div>

      {error && (
        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "12px 16px", marginBottom: "16px", color: "#dc2626", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Section Identité */}
      <div style={sectionStyle}>
        <h3 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "bold", color: "#1a1a1a", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
          Identité
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>NOM <span style={{ color: "#ef4444" }}>*</span></label>
            <input style={inputStyle} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Nom de famille" />
          </div>
          <div>
            <label style={labelStyle}>PRÉNOM <span style={{ color: "#ef4444" }}>*</span></label>
            <input style={inputStyle} value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} placeholder="Prénom" />
          </div>
          <div>
            <label style={labelStyle}>EMAIL</label>
            <input style={inputStyle} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Auto-généré si vide" />
          </div>
          <div>
            <label style={labelStyle}>TÉLÉPHONE</label>
            <input style={inputStyle} value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} placeholder="06XXXXXXXX" />
          </div>
          <div>
            <label style={labelStyle}>MATRICULE</label>
            <input style={inputStyle} value={form.matricule} onChange={(e) => setForm({ ...form, matricule: e.target.value })} placeholder="Ex: SII-001" />
          </div>
          <div>
            <label style={labelStyle}>CIN</label>
            <input style={inputStyle} value={form.cin} onChange={(e) => setForm({ ...form, cin: e.target.value })} placeholder="Carte d'identité nationale" />
          </div>
          <div>
            <label style={labelStyle}>CNSS</label>
            <input style={inputStyle} value={form.cnss} onChange={(e) => setForm({ ...form, cnss: e.target.value })} placeholder="Numéro CNSS" />
          </div>
          <div>
            <label style={labelStyle}>RÔLE</label>
            <select style={inputStyle} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>POSTE</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <select style={{ ...inputStyle, flex: 1 }} value={form.posteId} onChange={(e) => setForm({ ...form, posteId: e.target.value })}>
                <option value="">— Sélectionner —</option>
                {refs.postes.map((p) => <option key={p.id} value={p.id}>{p.nom}</option>)}
              </select>
              <button
                onClick={() => setShowAddRef("poste")}
                style={{ padding: "8px 12px", background: "#f0f9ff", border: "1px solid #0070f3", borderRadius: "6px", color: "#0070f3", cursor: "pointer", fontWeight: "bold", whiteSpace: "nowrap" }}
              >
                + Nouveau
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Contrat */}
      <div style={sectionStyle}>
        <h3 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "bold", color: "#1a1a1a", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
          Contrat & Rémunération
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>TYPE DE CONTRAT</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <select style={{ ...inputStyle, flex: 1 }} value={form.typeContratId} onChange={(e) => setForm({ ...form, typeContratId: e.target.value })}>
                <option value="">— Sélectionner —</option>
                {refs.typesContrat.map((t) => <option key={t.id} value={t.id}>{t.nom}</option>)}
              </select>
              <button
                onClick={() => setShowAddRef("typeContrat")}
                style={{ padding: "8px 12px", background: "#f0f9ff", border: "1px solid #0070f3", borderRadius: "6px", color: "#0070f3", cursor: "pointer", fontWeight: "bold", whiteSpace: "nowrap" }}
              >
                + Nouveau
              </button>
            </div>
          </div>
          <div>
            <label style={labelStyle}>TAUX HORAIRE (DH)</label>
            <input style={inputStyle} type="number" value={form.tauxHoraire} onChange={(e) => setForm({ ...form, tauxHoraire: e.target.value })} placeholder="0.00" />
          </div>
          <div>
            <label style={labelStyle}>SALAIRE DE BASE (DH)</label>
            <input style={inputStyle} type="number" value={form.salaireBase} onChange={(e) => setForm({ ...form, salaireBase: e.target.value })} placeholder="0.00" />
          </div>
          <div>
            <label style={labelStyle}>INDEMNITÉ TRANSPORT (DH)</label>
            <input style={inputStyle} type="number" value={form.indemniteTransport} onChange={(e) => setForm({ ...form, indemniteTransport: e.target.value })} placeholder="0.00" />
          </div>
          <div>
            <label style={labelStyle}>DATE DÉBUT CONTRAT</label>
            <input style={inputStyle} type="date" value={form.dateDebutContrat} onChange={(e) => setForm({ ...form, dateDebutContrat: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>DATE FIN CONTRAT</label>
            <input style={inputStyle} type="date" value={form.dateFinContrat} onChange={(e) => setForm({ ...form, dateFinContrat: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Bouton soumettre */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
        <button
          onClick={() => router.push("/dashboard/rh")}
          style={{ padding: "12px 24px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "14px" }}
        >
          Annuler
        </button>
        <button
          onClick={handleSubmit}
          disabled={saving}
          style={{ padding: "12px 24px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
        >
          {saving ? "Création en cours..." : "✓ Créer l'employé"}
        </button>
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
              onKeyDown={(e) => e.key === "Enter" && handleAddRef(showAddRef)}
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
    </div>
  );
}