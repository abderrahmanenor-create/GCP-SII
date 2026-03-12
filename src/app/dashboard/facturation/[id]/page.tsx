"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type Facture = {
  id: string;
  numero: string;
  statut: string;
  dateEmission: string;
  dateEcheance: string | null;
  totalHT: number;
  montantTVA: number;
  tauxTVA: number;
  tauxRetenue: number;
  montantRetenue: number;
  totalTTC: number;
  netAPayer: number;
  notes: string | null;
  client: {
    id: string;
    nom: string;
    adresse?: string;
    telephone?: string;
    email?: string;
    ice?: string;
  };
  feuilles: {
    id: string;
    date: string;
    totalGeneral: number;
    totalHeures: number;
    totalCoutMO: number;
    totalCoutMat: number;
    zone: {
      nom: string;
      projet: {
        nom: string;
        code: string;
        contrat: { numero: string; client: { nom: string } };
      };
    };
    lignes: {
      id: string;
      heures: number;
      tauxHoraire: number;
      montant: number;
      user: { nom: string; prenom: string; matricule: string | null; poste: { nom: string } | null };
    }[];
    affectationsMat: {
      id: string;
      joursFactures: number;
      montant: number;
      materiel: { nom: string; code: string; categorie: { nom: string } | null };
    }[];
  }[];
};

const statutConfig: Record<string, { label: string; color: string; bg: string }> = {
  BROUILLON: { label: "Brouillon", color: "#6b7280", bg: "#f9fafb" },
  EMISE:     { label: "Émise",     color: "#0070f3", bg: "#f0f9ff" },
  PAYEE:     { label: "Payée",     color: "#10b981", bg: "#f0fdf4" },
  ANNULEE:   { label: "Annulée",   color: "#ef4444", bg: "#fef2f2" },
};

export default function FactureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [facture, setFacture] = useState<Facture | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/facturation/${params.id}`)
      .then(r => r.json())
      .then(data => { setFacture(data); setLoading(false); });
  }, [params.id]);

  const handleStatut = async (statut: string) => {
    setUpdating(true);
    await fetch("/api/facturation", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: params.id, statut }),
    });
    const updated = await fetch(`/api/facturation/${params.id}`).then(r => r.json());
    setFacture(updated);
    setUpdating(false);
  };

  if (loading) return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🧾</div>
      <div style={{ color: "#999" }}>Chargement...</div>
    </div>
  );

  if (!facture) return (
    <div style={{ padding: 60, textAlign: "center", color: "#999" }}>Facture non trouvée</div>
  );

  const st = statutConfig[facture.statut];

  // Totaux globaux MO et matériel
  const totalMO = facture.feuilles.reduce((s, f) => s + f.totalCoutMO, 0);
  const totalMat = facture.feuilles.reduce((s, f) => s + f.totalCoutMat, 0);
  const totalHeures = facture.feuilles.reduce((s, f) => s + f.totalHeures, 0);

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Barre actions — masquée à l'impression */}
      <div className="no-print" style={{
        background: "white", padding: "16px 28px", borderBottom: "1px solid #e5e7eb",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button onClick={() => router.push("/dashboard/facturation")}
            style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer", fontSize: "13px" }}>
            ← Retour
          </button>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>{facture.numero}</h2>
          <span style={{ background: st.bg, color: st.color, padding: "3px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
            {st.label}
          </span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {facture.statut === "BROUILLON" && (
            <button onClick={() => handleStatut("EMISE")} disabled={updating}
              style={{ padding: "8px 18px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}>
              📤 Émettre
            </button>
          )}
          {facture.statut === "EMISE" && (
            <button onClick={() => handleStatut("PAYEE")} disabled={updating}
              style={{ padding: "8px 18px", background: "#10b981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}>
              ✅ Marquer payée
            </button>
          )}
          {facture.statut !== "ANNULEE" && facture.statut !== "PAYEE" && (
            <button onClick={() => handleStatut("ANNULEE")} disabled={updating}
              style={{ padding: "8px 18px", background: "#fef2f2", color: "#ef4444", border: "1px solid #fca5a5", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
              ✕ Annuler
            </button>
          )}
          <button onClick={() => window.print()}
            style={{ padding: "8px 18px", background: "#f4f6f9", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>
            🖨️ Imprimer / PDF
          </button>
        </div>
      </div>

      {/* DOCUMENT FACTURE */}
      <div id="facture-print" style={{ maxWidth: "900px", margin: "28px auto", padding: "0 24px" }}>
        <div style={{ background: "white", borderRadius: "12px", padding: "48px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>

          {/* En-tête */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", paddingBottom: "28px", borderBottom: "3px solid #0070f3" }}>
            <div>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0070f3", marginBottom: "4px" }}>SII TSP</div>
              <div style={{ fontSize: "12px", color: "#666", lineHeight: "1.6" }}>
                Société d'Ingénierie et d'Innovation<br />
                Partenaire JESA OCP<br />
                Maroc
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#1a1a1a", marginBottom: "6px" }}>FACTURE</div>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#0070f3", marginBottom: "8px" }}>{facture.numero}</div>
              <span style={{ background: st.bg, color: st.color, padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
                {st.label}
              </span>
            </div>
          </div>

          {/* Infos émission + client */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "36px" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: "bold", color: "#0070f3", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Informations facture
              </div>
              {[
                { label: "Date d'émission", value: new Date(facture.dateEmission).toLocaleDateString("fr-FR") },
                { label: "Date d'échéance", value: facture.dateEcheance ? new Date(facture.dateEcheance).toLocaleDateString("fr-FR") : "—" },
                { label: "NFI incluses", value: `${facture.feuilles.length} feuille${facture.feuilles.length > 1 ? "s" : ""}` },
                { label: "Heures totales", value: `${totalHeures}h` },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f1f5f9", fontSize: "13px" }}>
                  <span style={{ color: "#666" }}>{item.label}</span>
                  <span style={{ fontWeight: "500" }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "18px" }}>
              <div style={{ fontSize: "11px", fontWeight: "bold", color: "#0070f3", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Facturé à
              </div>
              <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "6px" }}>{facture.client.nom}</div>
              {facture.client.adresse && <div style={{ fontSize: "12px", color: "#666", marginBottom: "3px" }}>{facture.client.adresse}</div>}
              {facture.client.telephone && <div style={{ fontSize: "12px", color: "#666", marginBottom: "3px" }}>📞 {facture.client.telephone}</div>}
              {facture.client.email && <div style={{ fontSize: "12px", color: "#0070f3" }}>✉️ {facture.client.email}</div>}
              {facture.client.ice && <div style={{ fontSize: "12px", color: "#666", marginTop: "6px" }}>ICE: {facture.client.ice}</div>}
            </div>
          </div>

          {/* NFI incluses */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "12px", color: "#1a1a1a" }}>
              📋 NFI incluses dans cette facture
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f0f9ff" }}>
                  {["DATE", "ZONE / PROJET", "HEURES MO", "MO (DH)", "MATÉRIEL (DH)", "TOTAL HT"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: h === "DATE" || h === "ZONE / PROJET" ? "left" : "right", fontSize: "11px", color: "#0369a1", fontWeight: "bold", borderBottom: "2px solid #bae6fd" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {facture.feuilles.map(f => (
                  <tr key={f.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px 12px", fontSize: "13px" }}>{new Date(f.date).toLocaleDateString("fr-FR")}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ fontSize: "13px", fontWeight: "500" }}>{f.zone.nom}</div>
                      <div style={{ fontSize: "11px", color: "#999" }}>{f.zone.projet.code}</div>
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "right", fontSize: "13px" }}>{f.totalHeures}h</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", fontSize: "13px" }}>{f.totalCoutMO.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", fontSize: "13px" }}>{f.totalCoutMat.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: "bold", color: "#0070f3" }}>{f.totalGeneral.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: "#f8fafc", borderTop: "2px solid #e5e7eb" }}>
                  <td colSpan={2} style={{ padding: "10px 12px", fontWeight: "bold", fontSize: "13px" }}>TOTAL</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: "bold" }}>{totalHeures}h</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: "bold" }}>{totalMO.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: "bold" }}>{totalMat.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: "bold", color: "#0070f3" }}>{facture.totalHT.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Détail MO consolidé */}
          {facture.feuilles.some(f => f.lignes.length > 0) && (
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "12px", color: "#1a1a1a" }}>
                👷 Détail Main d'Œuvre
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["EMPLOYÉ", "POSTE", "HEURES", "TAUX (DH/h)", "MONTANT"].map(h => (
                      <th key={h} style={{ padding: "9px 12px", textAlign: h === "EMPLOYÉ" || h === "POSTE" ? "left" : "right", fontSize: "11px", color: "#666", fontWeight: "bold", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {facture.feuilles.flatMap(f => f.lignes).map(l => (
                    <tr key={l.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "8px 12px", fontSize: "13px", fontWeight: "500" }}>{l.user.prenom} {l.user.nom}</td>
                      <td style={{ padding: "8px 12px", fontSize: "12px", color: "#555" }}>{l.user.poste?.nom || "—"}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontSize: "13px" }}>{l.heures}h</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontSize: "13px" }}>{l.tauxHoraire}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: "bold", color: "#0070f3" }}>{l.montant.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Détail Matériel consolidé */}
          {facture.feuilles.some(f => f.affectationsMat.length > 0) && (
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "12px", color: "#1a1a1a" }}>
                🔧 Détail Matériel / Engins
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["MATÉRIEL", "CATÉGORIE", "JOURS", "MONTANT"].map(h => (
                      <th key={h} style={{ padding: "9px 12px", textAlign: h === "MATÉRIEL" || h === "CATÉGORIE" ? "left" : "right", fontSize: "11px", color: "#666", fontWeight: "bold", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {facture.feuilles.flatMap(f => f.affectationsMat).map(a => (
                    <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "8px 12px" }}>
                        <div style={{ fontSize: "13px", fontWeight: "500" }}>{a.materiel.nom}</div>
                        <div style={{ fontSize: "11px", color: "#999" }}>{a.materiel.code}</div>
                      </td>
                      <td style={{ padding: "8px 12px", fontSize: "12px", color: "#555" }}>{a.materiel.categorie?.nom || "—"}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontSize: "13px" }}>{a.joursFactures}j</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: "bold", color: "#f59e0b" }}>{a.montant.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Récapitulatif financier */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "40px" }}>
            <div style={{ width: "340px", background: "#f8fafc", borderRadius: "10px", padding: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "14px", color: "#1a1a1a" }}>Récapitulatif Financier</div>
              {[
                { label: "Main d'œuvre", value: totalMO, color: "#0070f3" },
                { label: "Matériel / Engins", value: totalMat, color: "#f59e0b" },
                { label: "Total HT", value: facture.totalHT, color: "#1a1a1a", bold: true, border: true },
                { label: `TVA (${facture.tauxTVA}%)`, value: facture.montantTVA, color: "#6b7280" },
                { label: "Total TTC", value: facture.totalTTC, color: "#1a1a1a", bold: true },
                ...(facture.tauxRetenue > 0 ? [{ label: `Retenue de garantie (${facture.tauxRetenue}%)`, value: -facture.montantRetenue, color: "#ef4444" }] : []),
                { label: "NET À PAYER", value: facture.netAPayer, color: "#10b981", bold: true, large: true, border: true },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "7px 0",
                  borderTop: item.border ? "2px solid #e5e7eb" : "none",
                  marginTop: item.border ? "6px" : "0",
                }}>
                  <span style={{ fontSize: item.large ? "15px" : "13px", fontWeight: item.bold ? "bold" : "normal", color: "#333" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: item.large ? "20px" : "14px", fontWeight: "bold", color: item.color }}>
                    {item.value.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} DH
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {facture.notes && (
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "8px", padding: "14px 16px", marginBottom: "32px" }}>
              <div style={{ fontSize: "11px", fontWeight: "bold", color: "#92400e", marginBottom: "4px" }}>NOTES</div>
              <div style={{ fontSize: "13px", color: "#78350f" }}>{facture.notes}</div>
            </div>
          )}

          {/* Zone signatures */}
          <div style={{ borderTop: "2px solid #e5e7eb", paddingTop: "32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
              {["Pour SII TSP — Chef de Projet", `Pour ${facture.client.nom} — Client`].map(label => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold", color: "#666", marginBottom: "70px" }}>{label}</div>
                  <div style={{ borderTop: "2px solid #333", paddingTop: "8px", fontSize: "11px", color: "#999" }}>
                    Nom, Prénom, Cachet & Date
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Styles impression */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          #facture-print { margin: 0 !important; padding: 0 !important; max-width: 100% !important; }
          #facture-print > div { box-shadow: none !important; border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );
}