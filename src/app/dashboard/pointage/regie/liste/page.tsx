"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  zone: {
    id: string;
    nom: string;
    projet: {
      nom: string;
      code: string;
      contrat: { client: { nom: string } };
    };
  };
  lignes: { id: string }[];
  affectationsMat: { id: string }[];
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

export default function ListeFeuillesPage() {
  const router = useRouter();
  const [feuilles, setFeuilles] = useState<FeuilleRegie[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatut, setFilterStatut] = useState("");
  const [filterMois, setFilterMois] = useState(new Date().getMonth() + 1);
  const [filterAnnee, setFilterAnnee] = useState(new Date().getFullYear());

  useEffect(() => {
    loadFeuilles();
  }, [filterStatut, filterMois, filterAnnee]);

  const loadFeuilles = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterStatut) params.append("statut", filterStatut);
    if (filterMois) params.append("mois", filterMois.toString());
    if (filterAnnee) params.append("annee", filterAnnee.toString());

    fetch(`/api/pointage/regie?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setFeuilles(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  const totalMO = feuilles.reduce((sum, f) => sum + f.totalCoutMO, 0);
  const totalMat = feuilles.reduce((sum, f) => sum + f.totalCoutMat, 0);
  const totalGeneral = feuilles.reduce((sum, f) => sum + f.totalGeneral, 0);

  const mois = [
    { value: 1, label: "Janvier" }, { value: 2, label: "Février" },
    { value: 3, label: "Mars" }, { value: 4, label: "Avril" },
    { value: 5, label: "Mai" }, { value: 6, label: "Juin" },
    { value: 7, label: "Juillet" }, { value: 8, label: "Août" },
    { value: 9, label: "Septembre" }, { value: 10, label: "Octobre" },
    { value: 11, label: "Novembre" }, { value: 12, label: "Décembre" },
  ];

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" }}>
            📋 Feuilles de Régie
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            {feuilles.length} feuille(s) trouvée(s)
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => router.push("/dashboard/pointage")}
            style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer", fontSize: "14px" }}
          >
            ← Retour
          </button>
          <button
            onClick={() => router.push("/dashboard/pointage/regie/nouvelle")}
            style={{ background: "#0070f3", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}
          >
            + Nouvelle feuille
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
        <div>
          <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>MOIS</label>
          <select
            value={filterMois}
            onChange={(e) => setFilterMois(parseInt(e.target.value))}
            style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
          >
            <option value={0}>Tous les mois</option>
            {mois.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>ANNÉE</label>
          <select
            value={filterAnnee}
            onChange={(e) => setFilterAnnee(parseInt(e.target.value))}
            style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
          >
            {[2024, 2025, 2026, 2027].map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>STATUT</label>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
          >
            <option value="">Tous les statuts</option>
            {Object.keys(statutLabel).map((s) => <option key={s} value={s}>{statutLabel[s]}</option>)}
          </select>
        </div>

        {/* Totaux rapides */}
        {feuilles.length > 0 && (
          <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
            <div style={{ background: "#f0f9ff", padding: "8px 16px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0070f3" }}>{totalMO.toLocaleString("fr-FR")} DH</div>
              <div style={{ fontSize: "11px", color: "#666" }}>Total MO</div>
            </div>
            <div style={{ background: "#fffbeb", padding: "8px 16px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: "#f59e0b" }}>{totalMat.toLocaleString("fr-FR")} DH</div>
              <div style={{ fontSize: "11px", color: "#666" }}>Total Matériel</div>
            </div>
            <div style={{ background: "#f0fdf4", padding: "8px 16px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: "#10b981" }}>{totalGeneral.toLocaleString("fr-FR")} DH</div>
              <div style={{ fontSize: "11px", color: "#666" }}>Total Général</div>
            </div>
          </div>
        )}
      </div>

      {/* Liste */}
      {loading ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>
          Chargement...
        </div>
      ) : feuilles.length === 0 ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "60px", textAlign: "center", color: "#999" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
          <div style={{ fontSize: "16px", marginBottom: "8px" }}>Aucune feuille de régie pour cette période</div>
          <button
            onClick={() => router.push("/dashboard/pointage/regie/nouvelle")}
            style={{ marginTop: "16px", padding: "10px 24px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
          >
            + Créer la première feuille
          </button>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>DATE</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>ZONE / PROJET</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>CLIENT</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MO</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MATÉRIEL</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", color: "#666", fontWeight: "bold" }}>TOTAL HT</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>STATUT</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {feuilles.map((f) => (
                <tr key={f.id} style={{ borderBottom: "1px solid #f1f5f9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                      {new Date(f.date).toLocaleDateString("fr-FR")}
                    </div>
                    <div style={{ fontSize: "11px", color: "#999" }}>
                      Sem. {f.semaine}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>{f.zone.nom}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>{f.zone.projet.code} — {f.zone.projet.nom}</div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#333" }}>
                    {f.zone.projet.contrat.client.nom}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center", fontSize: "13px" }}>
                    <span style={{ background: "#f0f9ff", color: "#0070f3", padding: "2px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                      {f.lignes.length} pers.
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center", fontSize: "13px" }}>
                    <span style={{ background: "#fffbeb", color: "#f59e0b", padding: "2px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                      {f.affectationsMat.length} équip.
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "bold", color: "#1a1a1a", fontSize: "14px" }}>
                    {f.totalGeneral.toLocaleString("fr-FR")} DH
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span style={{
                      background: `${statutColor[f.statut]}20`,
                      color: statutColor[f.statut],
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}>
                      {statutLabel[f.statut]}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button
                      onClick={() => router.push(`/dashboard/pointage/regie/${f.id}`)}
                      style={{ padding: "6px 14px", background: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}
                    >
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}