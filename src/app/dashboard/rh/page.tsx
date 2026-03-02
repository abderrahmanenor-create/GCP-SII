"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AjoutOuvrierPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Fonction pour envoyer les données
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nom: formData.get("nom"),
      prenom: formData.get("prenom"),
      email: formData.get("email") || `${formData.get("nom")}@chantier.local`, // Email fictif si vide
      matricule: formData.get("matricule"),
      cin: formData.get("cin"),
      cnss: formData.get("cnss"),
      tauxHoraire: parseFloat(formData.get("tauxHoraire") as string) || 0,
      role: "OUVRIER", // Définit le rôle automatiquement
      password: "password123", // Mot de passe par défaut simple
      statut: "ACTIF",
    };

    // Appel API pour créer l'ouvrier
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    if (res.ok) {
      alert("Ouvrier ajouté avec succès !");
      router.refresh(); // Rafraîchir la page
    } else {
      const error = await res.json();
      alert("Erreur: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "white", minHeight: "100vh", color: "black" }}>
      <h1>Module RH - Enregistrement Ouvrier</h1>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px", border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label>Nom *</label>
            <input name="nom" type="text" required style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} />
          </div>
          <div>
            <label>Prénom *</label>
            <input name="prenom" type="text" required style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label>Matricule</label>
            <input name="matricule" type="text" style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} />
          </div>
          <div>
            <label>Taux Horaire (DH)</label>
            <input name="tauxHoraire" type="number" step="0.01" style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label>CIN</label>
            <input name="cin" type="text" style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} />
          </div>
          <div>
            <label>CNSS</label>
            <input name="cnss" type="text" style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} />
          </div>
        </div>

        <div>
          <label>Email (Laisser vide si pas d'email)</label>
          <input name="email" type="email" style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} />
        </div>

        <button type="submit" disabled={loading} style={{ padding: "10px", background: "#0070f3", color: "white", border: "none", cursor: "pointer", fontSize: "16px" }}>
          {loading ? "Enregistrement..." : "Enregistrer l'Ouvrier"}
        </button>
      </form>
    </div>
  );
}