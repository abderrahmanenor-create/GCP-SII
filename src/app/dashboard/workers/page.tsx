"use client";

import { useState, useEffect } from "react";

type Worker = {
  id: string;
  firstName: string;
  lastName: string;
  matricule: string | null;
  skills: string[];
};

export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [matricule, setMatricule] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    fetch("/api/workers")
      .then((res) => res.json())
      .then((data) => setWorkers(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/workers", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        matricule,
        skills: skills.split(",").map((s) => s.trim()),
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const newWorker = await res.json();
      setWorkers([newWorker, ...workers]);
      setFirstName("");
      setLastName("");
      setMatricule("");
      setSkills("");
      alert("Ouvrier ajouté avec succès !");
    } else {
      alert("Erreur lors de l'ajout");
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "white", color: "black", minHeight: "100vh" }}>
      <h1>Module RH - Gestion des Ouvriers</h1>

      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", background: "#f9f9f9", borderRadius: "8px" }}>
        <h3 style={{ color: "#333" }}>Ajouter un nouvel ouvrier</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", color: "black", backgroundColor: "white" }}
          />
          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", color: "black", backgroundColor: "white" }}
          />
          <input
            type="text"
            placeholder="Matricule (Optionnel)"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", color: "black", backgroundColor: "white" }}
          />
          <input
            type="text"
            placeholder="Compétences (séparées par virgule : Elec, Mec)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", color: "black", backgroundColor: "white" }}
          />
          <button type="submit" style={{ padding: "10px", background: "#0070f3", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" }}>
            Enregistrer
          </button>
        </form>
      </div>

      <h3 style={{ color: "#333" }}>Liste des ouvriers ({workers.length})</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left", color: "#333" }}>
            <th style={{ padding: "8px" }}>Nom Complet</th>
            <th style={{ padding: "8px" }}>Matricule</th>
            <th style={{ padding: "8px" }}>Compétences</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((w) => (
            <tr key={w.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px", color: "black" }}>{w.firstName} {w.lastName}</td>
              <td style={{ padding: "8px", color: "black" }}>{w.matricule || "-"}</td>
              <td style={{ padding: "8px", color: "black" }}>{w.skills.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}