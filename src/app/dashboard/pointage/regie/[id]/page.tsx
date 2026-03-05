"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type FeuilleRegie = {
  id: string;
  date: string;
  semaine: number;
  mois: number;
  annee: number;
  statut: string;
  totalHeures: number;
  totalCoutMO: number;
  totalCoutMat: number;
  totalGeneral: number;
  valideChefId: string | null;
  dateValidChef: string | null;
  valideClientId: string | null;
  dateValidClient: string | null;
  zone: {
    id: string;
    nom: string;
    projet: {
      nom: string;
      code: string;
      contrat: {
        numero: string;
        client: { id: string; nom: string };
      };
    };
  };
  lignes: {
    id: string;
    heures: number;
    tauxHoraire: number;
    montant: number;
    user: {
      id: string;
      nom: string;
      prenom: string;
      matricule: string | null;
      poste: { nom: string } | null;
    };
  }[];
  affectationsMat: {
    id: string;
    joursFactures: number;
    montant: number;
    materiel: {
      id: string;
      nom: string;
      code: string;
      prixLocationJour: number | null;
      categorie: { nom: string } | null;
    };
  }[];
};

const statutColor: Record<string, string> = {
  BROUILLON: "#6b7280",
  SOUMIS: "#f59e0b",
  VALIDE_CHEF: "#0070f3",
  VALIDE_CLIENT: "#10b981",
};

const statutLabel: Record<string, string> = {
  BROUILLON: "Brouillon",
  SOUMIS: "Soumis",
  VALIDE_CHEF: "Validé Chef",
  VALIDE_CLIENT: "Validé Client",
};

export default function FeuillePage() {
  const params = useParams();
  const router = useRouter();
  const [feuille, setFeuille] = useState<FeuilleRegie | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("mo");
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    fetch(`/api/pointage/regie/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setFeuille(data);
        setLoading(false);
      });
  }, [params.id]);

  const handleAction = async (action: string) => {
    setValidating(true);
    await fetch(`/api/pointage/regie/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, userId: "current" }),
    });
    const updated = await fetch(`/api/pointage/regie/${params.id}`).then((r) => r.json());
    setFeuille(updated);
    setValidating(false);
  };

  const handlePrint = () => window.print();

  if (loading) return (
    <div style={{ padding: 40, textAlign: "center", color: "#999" }}>Chargement...</div>
  );

  if (!feuille) return (
    <div style={{ padding: 40, textAlign: "center", color: "#999" }}>Feuille non trouvée.</div>
  );

  const tva = feuille.totalGeneral * 0.20;
  const totalTTC = feuille.totalGeneral + tva;

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0070f3, #0050b3)",
        padding: "20px 28px",
        color: "white",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
              📋 Feuille de Régie — {new Date(feuille.date).toLocaleDateString("fr-FR")}
            </h1>
            <span style={{
              background: `${statutColor[feuille.statut]}`,
              color: "white",
              padding: "3px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "bold",
            }}>
              {statutLabel[feuille.statut]}
            </span>
          </div>
          <p style={{ margin: 0, opacity: 0.85, fontSize: "14px" }}>
            {feuille.zone.nom} · {feuille.zone.projet.code} · {feuille.zone.projet.contrat.client.nom}
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {feuille.statut === "BROUILLON" && (
            <button onClick={() => handleAction("SOUMETTRE")} disabled={validating} style={{
              padding: "8px 18px", background: "#f59e0b", color: "white",
              border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px",
            }}>
              Soumettre
            </button>
          )}
          {feuille.statut === "SOUMIS" && (
            <button onClick={() => handleAction("VALIDER_CHEF")} disabled={validating} style={{
              padding: "8px 18px", background: "white", color: "#0070f3",
              border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px",
            }}>
              ✓ Valider (Chef)
            </button>
          )}
          {feuille.statut === "VALIDE_CHEF" && (
            <button onClick={() => handleAction("VALIDER_CLIENT")} disabled={validating} style={{
              padding: "8px 18px", background: "#10b981", color: "white",
              border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px",
            }}>
              ✓ Valider (Client)
            </button>
          )}
          <button onClick={handlePrint} style={{
            padding: "8px 18px", background: "rgba(255,255,255,0.2)",
            color: "white", border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "8px", cursor: "pointer", fontSize: "13px",
          }}>
            🖨️ Imprimer
          </button>
          <button onClick={() => router.push("/dashboard/pointage/regie/liste")} style={{
            padding: "8px 18px", background: "rgba(255,255,255,0.1)",
            color: "white", border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "8px", cursor: "pointer", fontSize: "13px",
          }}>
            ← Retour
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "white", borderBottom: "2px solid #e5e7eb", display: "flex" }}>
        {[
          { id: "mo", label: `👷 Main d'œuvre (${feuille.lignes.length})` },
          { id: "materiel", label: `🔧 Matériel (${feuille.affectationsMat.length})` },
          { id: "recap", label: "📊 Récapitulatif" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "14px 24px", border: "none", background: "transparent",
            borderBottom: activeTab === tab.id ? "3px solid #0070f3" : "3px solid transparent",
            color: activeTab === tab.id ? "#0070f3" : "#666",
            fontWeight: activeTab === tab.id ? "bold" : "normal",
            cursor: "pointer", fontSize: "14px",
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div style={{ padding: "24px" }}>

        {/* TAB MO */}
        {activeTab === "mo" && (
          <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
            {feuille.lignes.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>Aucune ligne main d'œuvre</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>EMPLOYÉ</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>POSTE</th>
                    <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>HEURES</th>
                    <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>TAUX (DH/H)</th>
                    <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MONTANT</th>
                  </tr>
                </thead>
                <tbody>
                  {feuille.lignes.map((l) => (
                    <tr key={l.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "14px" }}>{l.user.nom} {l.user.prenom}</div>
                        <div style={{ fontSize: "11px", color: "#999" }}>{l.user.matricule || "—"}</div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#555" }}>
                        {l.user.poste?.nom || "—"}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center", fontWeight: "bold" }}>
                        {l.heures}h
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center", fontSize: "13px" }}>
                        {l.tauxHoraire} DH/h
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "bold", color: "#0070f3", fontSize: "14px" }}>
                        {l.montant.toFixed(2)} DH
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "#f0f9ff", borderTop: "2px solid #e5e7eb" }}>
                    <td colSpan={2} style={{ padding: "12px 16px", fontWeight: "bold" }}>
                      Total — {feuille.totalHeures}h travaillées
                    </td>
                    <td colSpan={3} style={{ padding: "12px 16px", textAlign: "right", fontWeight: "bold", color: "#0070f3", fontSize: "16px" }}>
                      {feuille.totalCoutMO.toFixed(2)} DH
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        )}

        {/* TAB MATERIEL */}
        {activeTab === "materiel" && (
          <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
            {feuille.affectationsMat.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>Aucun matériel sur cette feuille</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MATÉRIEL</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>CATÉGORIE</th>
                    <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>JOURS FACTURÉS</th>
                    <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>PRIX/JOUR</th>
                    <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MONTANT</th>
                  </tr>
                </thead>
                <tbody>
                  {feuille.affectationsMat.map((a) => (
                    <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "14px" }}>{a.materiel.nom}</div>
                        <div style={{ fontSize: "11px", color: "#999" }}>{a.materiel.code}</div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#555" }}>
                        {a.materiel.categorie?.nom || "—"}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center", fontWeight: "bold" }}>
                        {a.joursFactures} j
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center", fontSize: "13px" }}>
                        {a.materiel.prixLocationJour || "—"} DH/j
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "bold", color: "#f59e0b", fontSize: "14px" }}>
                        {a.montant.toFixed(2)} DH
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "#fffbeb", borderTop: "2px solid #e5e7eb" }}>
                    <td colSpan={4} style={{ padding: "12px 16px", fontWeight: "bold" }}>Total Matériel</td>
                    <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "bold", color: "#f59e0b", fontSize: "16px" }}>
                      {feuille.totalCoutMat.toFixed(2)} DH
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        )}

        {/* TAB RECAP */}
        {activeTab === "recap" && (
          <div style={{ maxWidth: "700px" }}>

            {/* Infos feuille */}
            <div style={{ background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", marginBottom: "16px" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "bold" }}>Informations</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px" }}>
                {[
                  { label: "Date", value: new Date(feuille.date).toLocaleDateString("fr-FR") },
                  { label: "Semaine", value: `Semaine ${feuille.semaine}` },
                  { label: "Zone", value: feuille.zone.nom },
                  { label: "Projet", value: `${feuille.zone.projet.code} — ${feuille.zone.projet.nom}` },
                  { label: "Client", value: feuille.zone.projet.contrat.client.nom },
                  { label: "Contrat", value: feuille.zone.projet.contrat.numero },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ fontSize: "11px", color: "#666", fontWeight: "bold", marginBottom: "2px" }}>{item.label}</div>
                    <div style={{ fontWeight: "500" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totaux */}
            <div style={{ background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", marginBottom: "16px" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "bold" }}>Récapitulatif Financier</h3>
              {[
                { label: "Main d'œuvre", value: feuille.totalCoutMO, color: "#0070f3" },
                { label: "Matériel", value: feuille.totalCoutMat, color: "#f59e0b" },
                { label: "Total HT", value: feuille.totalGeneral, color: "#1a1a1a", bold: true, border: true },
                { label: "TVA (20%)", value: tva, color: "#6b7280" },
                { label: "Total TTC", value: totalTTC, color: "#0070f3", bold: true, large: true },
              ].map((item) => (
                <div key={item.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0",
                  borderTop: item.border ? "2px solid #e5e7eb" : "none",
                  marginTop: item.border ? "8px" : "0",
                }}>
                  <span style={{ fontSize: item.large ? "16px" : "14px", fontWeight: item.bold ? "bold" : "normal", color: "#333" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: item.large ? "22px" : "15px", fontWeight: "bold", color: item.color }}>
                    {item.value.toFixed(2)} DH
                  </span>
                </div>
              ))}
            </div>

            {/* Statut validation */}
            <div style={{ background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "bold" }}>Suivi Validation</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  {
                    label: "Validation Chef",
                    done: !!feuille.valideChefId,
                    date: feuille.dateValidChef,
                  },
                  {
                    label: "Validation Client",
                    done: !!feuille.valideClientId,
                    date: feuille.dateValidClient,
                  },
                ].map((step) => (
                  <div key={step.label} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 16px", borderRadius: "8px",
                    background: step.done ? "#f0fdf4" : "#f8fafc",
                    border: `1px solid ${step.done ? "#bbf7d0" : "#e5e7eb"}`,
                  }}>
                    <span style={{ fontSize: "20px" }}>{step.done ? "✅" : "⏳"}</span>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "14px", color: step.done ? "#10b981" : "#666" }}>
                        {step.label}
                      </div>
                      {step.date && (
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          {new Date(step.date).toLocaleDateString("fr-FR")}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Style impression */}
      <style>{`
        @media print {
          aside, button, nav { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}