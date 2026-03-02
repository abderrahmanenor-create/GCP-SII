"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type Employee = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  matricule: string | null;
  cin: string | null;
  cnss: string | null;
  photoUrl: string | null;
  role: string;
  statut: string;
  tauxHoraire: number | null;
  typeContrat: string | null;
  dateDebutContrat: string | null;
  dateFinContrat: string | null;
  indemniteTransport: number | null;
  autreIndemnite: number | null;
  habilitations?: { id: string; nom: string; dateFin: string }[]; // Ajout de ? pour optionnel
  epiDistribues?: { id: string; date: string; epi: { nom: string } }[]; // Ajout de ? pour optionnel
};

export default function FicheEmployePage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("infos");

  useEffect(() => {
    if (params.id) {
      fetch(`/api/users/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setEmployee(data);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) return <div style={{ padding: 20 }}>Chargement...</div>;
  if (!employee) return <div style={{ padding: 20 }}>Employé non trouvé.</div>;

  // Sécurité : si les listes n'existent pas, on prend un tableau vide
  const habilitations = employee.habilitations || [];
  const epiDistribues = employee.epiDistribues || [];
  const initialeNom = employee.nom ? employee.nom[0].toUpperCase() : "?";

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", color: "black" }}>
      {/* Header de la fiche */}
      <div style={{ background: "#f4f6f8", padding: "20px", borderBottom: "1px solid #ddd", display: "flex", alignItems: "center", gap: "20px" }}>
        
        {/* Photo */}
        <div style={{ width: 100, height: 100, borderRadius: "50%", background: "#0070f3", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", fontWeight: "bold" }}>
          {employee.photoUrl ? <img src={employee.photoUrl} alt="Photo" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} /> : initialeNom}
        </div>

        {/* Identité */}
        <div>
          <h1 style={{ margin: 0 }}>{employee.nom} {employee.prenom}</h1>
          <p style={{ margin: "5px 0", color: "#666" }}>
            {employee.role} • {employee.statut}
          </p>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            Matricule: {employee.matricule || "N/A"} | CIN: {employee.cin || "N/A"} | CNSS: {employee.cnss || "N/A"}
          </p>
        </div>

        <button onClick={() => router.push("/dashboard/rh")} style={{ marginLeft: "auto", padding: "10px", background: "#eee", border: "none", cursor: "pointer" }}>
          ← Retour à la liste
        </button>
      </div>

      {/* Navigation Onglets */}
      <div style={{ display: "flex", borderBottom: "1px solid #ccc", background: "white" }}>
        {["infos", "contrat", "securite", "epi"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "15px 25px",
              border: "none",
              borderBottom: activeTab === tab ? "3px solid #0070f3" : "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: activeTab === tab ? "bold" : "normal",
              color: activeTab === tab ? "#0070f3" : "black",
            }}
          >
            {tab === "infos" && "Informations Générales"}
            {tab === "contrat" && "Contrat & Coût"}
            {tab === "securite" && "Sécurité & Habilitations"}
            {tab === "epi" && "Historique EPI"}
          </button>
        ))}
      </div>

      {/* Contenu des Onglets */}
      <div style={{ padding: "20px" }}>
        
        {/* Onglet INFOS */}
        {activeTab === "infos" && (
          <div style={{ background: "#f9f9f9", padding: 20, borderRadius: 8 }}>
            <h3>Coordonnées</h3>
            <p>Email : {employee.email}</p>
          </div>
        )}

        {/* Onglet CONTRAT */}
        {activeTab === "contrat" && (
          <div style={{ background: "#f9f9f9", padding: 20, borderRadius: 8 }}>
            <h3>Détails du Contrat</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: 15 }}>
              <div>
                <label style={{ fontWeight: "bold" }}>Type de Contrat</label>
                <p style={{ background: "white", padding: 10, border: "1px solid #ddd", borderRadius: 4 }}>
                  {employee.typeContrat || "Non défini"}
                </p>
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Taux Horaire</label>
                <p style={{ background: "white", padding: 10, border: "1px solid #ddd", borderRadius: 4 }}>
                  {employee.tauxHoraire || 0} DH
                </p>
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Date Début</label>
                <p style={{ background: "white", padding: 10, border: "1px solid #ddd", borderRadius: 4 }}>
                  {employee.dateDebutContrat ? new Date(employee.dateDebutContrat).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Date Fin</label>
                <p style={{ background: "white", padding: 10, border: "1px solid #ddd", borderRadius: 4 }}>
                  {employee.dateFinContrat ? new Date(employee.dateFinContrat).toLocaleDateString() : "CDI"}
                </p>
              </div>
            </div>
            
            <h3 style={{ marginTop: 30 }}>Indemnités & Primes</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: 15 }}>
              <div>
                <label style={{ fontWeight: "bold" }}>Indemnité Transport</label>
                <p style={{ background: "white", padding: 10, border: "1px solid #ddd", borderRadius: 4 }}>
                  {employee.indemniteTransport || 0} DH
                </p>
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Autres Indemnités</label>
                <p style={{ background: "white", padding: 10, border: "1px solid #ddd", borderRadius: 4 }}>
                  {employee.autreIndemnite || 0} DH
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Onglet SECURITE */}
        {activeTab === "securite" && (
          <div style={{ background: "#f9f9f9", padding: 20, borderRadius: 8 }}>
            <h3>Habilitations & Certifications</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
                  <th style={{ padding: 10 }}>Habilitation</th>
                  <th style={{ padding: 10 }}>Date Expiration</th>
                  <th style={{ padding: 10 }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {habilitations.length === 0 && (
                  <tr><td colSpan={3} style={{ padding: 10, color: "#888" }}>Aucune habilitation enregistrée.</td></tr>
                )}
                {habilitations.map((h) => (
                  <tr key={h.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 10 }}>{h.nom}</td>
                    <td style={{ padding: 10 }}>{new Date(h.dateFin).toLocaleDateString()}</td>
                    <td style={{ padding: 10 }}>
                      {new Date(h.dateFin) > new Date() ? <span style={{ color: "green" }}>Valide</span> : <span style={{ color: "red" }}>Expiré</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Onglet EPI */}
        {activeTab === "epi" && (
          <div style={{ background: "#f9f9f9", padding: 20, borderRadius: 8 }}>
            <h3>Historique des dotations EPI</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
                  <th style={{ padding: 10 }}>Date</th>
                  <th style={{ padding: 10 }}>Équipement</th>
                </tr>
              </thead>
              <tbody>
                {epiDistribues.length === 0 && (
                  <tr><td colSpan={2} style={{ padding: 10, color: "#888" }}>Aucun EPI distribué.</td></tr>
                )}
                {epiDistribues.map((e) => (
                  <tr key={e.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 10 }}>{new Date(e.date).toLocaleDateString()}</td>
                    <td style={{ padding: 10 }}>{e.epi.nom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}