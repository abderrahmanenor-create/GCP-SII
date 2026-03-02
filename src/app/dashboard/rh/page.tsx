"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Type simple pour l'affichage
type SimpleUser = {
  id: string;
  nom: string;
  prenom: string;
  matricule: string | null;
  role: string;
};

export default function RhPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState<SimpleUser[]>([]);

  // Charger la liste
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setWorkers(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const data = {
      nom: formData.get("nom"),
      prenom: formData.get("prenom"),
      email: formData.get("email") || `${formData.get("nom")}@chantier.local`,
      matricule: formData.get("matricule"),
      cin: formData.get("cin"),
      cnss: formData.get("cnss"),
      tauxHoraire: parseFloat(formData.get("tauxHoraire") as string) || 0,
      role: "OUVRIER",
      password: "password123",
      statut: "ACTIF",
    };

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    if (res.ok) {
      const newUser = await res.json();
      setWorkers([newUser, ...workers]);
      alert("Ouvrier ajouté !");
    } else {
      alert("Erreur !");
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "white", minHeight: "100vh", color: "black" }}>
      <h1>Module RH</h1>

      {/* Formulaire d'ajout rapide */}
      <details style={{ marginBottom: "20px" }}>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>+ Ajouter un nouvel ouvrier</summary>
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px", border: "1px solid #ccc", padding: "15px", borderRadius: "8px", background: "#f9f9f9" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <input name="nom" placeholder="Nom" required style={{ padding: 8 }} />
            <input name="prenom" placeholder="Prénom" required style={{ padding: 8 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <input name="matricule" placeholder="Matricule" style={{ padding: 8 }} />
            <input name="tauxHoraire" type="number" placeholder="Taux Horaire" style={{ padding: 8 }} />
          </div>
          <button type="submit" disabled={loading} style={{ padding: "10px", background: "#0070f3", color: "white", border: "none" }}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </details>

      {/* Liste des ouvriers */}
      <h3>Liste des employés ({workers.length})</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
            <th style={{ padding: 10 }}>Nom Complet</th>
            <th style={{ padding: 10 }}>Matricule</th>
            <th style={{ padding: 10 }}>Rôle</th>
            <th style={{ padding: 10 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((w) => (
            <tr key={w.id} style={{ borderBottom: "1px solid #eee", cursor: "pointer" }}>
              <td style={{ padding: 10 }}>{w.nom} {w.prenom}</td>
              <td style={{ padding: 10 }}>{w.matricule || "-"}</td>
              <td style={{ padding: 10 }}>{w.role}</td>
              <td style={{ padding: 10 }}>
                <button 
                  onClick={() => router.push(`/dashboard/rh/${w.id}`)}
                  style={{ padding: "5px 10px", background: "#eee", border: "1px solid #ccc", cursor: "pointer" }}
                >
                  Voir Fiche
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}