"use client";

import { useState, useEffect } from "react";

type Rapport = {
  type: string;
  periode: { dateDebut: string; dateFin: string };
  resumeEmployes: {
    user: { id: string; nom: string; prenom: string; matricule: string | null; poste: { nom: string } | null };
    totalHeures: number;
    totalMontant: number;
    jours: number;
  }[];
  resumeMateriel: {
    materiel: { id: string; nom: string; code: string; prixLocationJour: number | null; categorie: { nom: string } | null };
    totalJours: number;
    totalMontant: number;
  }[];
  totaux: {
    totalHeures: number;
    totalCoutMO: number;
    totalCoutMat: number;
    totalHT: number;
    tva: number;
    totalTTC: number;
  };
  genereLe: string;
};

type Zone = {
  id: string;
  nom: string;
  projet: { nom: string; code: string; contrat: { client: { nom: string } } };
};

const TYPES = [
  { value: "JOURNALIER", label: "Rapport Journalier", icon: "📅", color: "#10b981" },
  { value: "HEBDOMADAIRE", label: "Rapport Hebdomadaire", icon: "📊", color: "#0070f3" },
  { value: "MENSUEL", label: "Rapport Mensuel", icon: "📆", color: "#6366f1" },
  { value: "MENSUEL_VALORISE", label: "Rapport Mensuel Valorisé", icon: "💰", color: "#ef4444" },
];

const moisLabels = [
  "", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export default function RapportPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [rapport, setRapport] = useState<Rapport | null>(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const today = new Date();
  const [type, setType] = useState("JOURNALIER");
  const [zoneId, setZoneId] = useState("");
  const [date, setDate] = useState(today.toISOString().split("T")[0]);
  const [mois, setMois] = useState(today.getMonth() + 1);
  const [annee, setAnnee] = useState(today.getFullYear());
  const [semaine, setSemaine] = useState(getWeekNumber(today));

  useEffect(() => {
    fetch("/api/zones")
      .then((r) => r.json())
      .then((data) => setZones(Array.isArray(data) ? data : []));
  }, []);

  const genererRapport = () => {
    setLoading(true);
    setGenerated(false);

    const params = new URLSearchParams({ type });
    if (zoneId) params.append("zoneId", zoneId);
    if (type === "JOURNALIER") params.append("date", date);
    if (type === "HEBDOMADAIRE") {
      params.append("semaine", semaine.toString());
      params.append("annee", annee.toString());
    }
    if (type === "MENSUEL" || type === "MENSUEL_VALORISE") {
      params.append("mois", mois.toString());
      params.append("annee", annee.toString());
    }

    fetch(`/api/pointage/rapport?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setRapport(data);
        setLoading(false);
        setGenerated(true);
      });
  };

  const handlePrint = () => window.print();

  const typeInfo = TYPES.find((t) => t.value === type);
  const zoneInfo = zones.find((z) => z.id === zoneId);

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" }}>
          📊 Rapports
        </h1>
        <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
          Générer les rapports journaliers, hebdomadaires et mensuels
        </p>
      </div>

      {/* Sélection type */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {TYPES.map((t) => (
          <button key={t.value} onClick={() => { setType(t.value); setGenerated(false); }} style={{
            padding: "16px",
            background: type === t.value ? t.color : "white",
            color: type === t.value ? "white" : "#333",
            border: `2px solid ${type === t.value ? t.color : "#e5e7eb"}`,
            borderRadius: "10px",
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.15s",
          }}>
            <div style={{ fontSize: "24px", marginBottom: "6px" }}>{t.icon}</div>
            <div style={{ fontSize: "13px", fontWeight: "bold" }}>{t.label}</div>
          </button>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "20px", marginBottom: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-end", flexWrap: "wrap" }}>

          {/* Zone */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>ZONE (optionnel)</label>
            <select value={zoneId} onChange={(e) => setZoneId(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}>
              <option value="">Toutes les zones</option>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>{z.nom} — {z.projet.code}</option>
              ))}
            </select>
          </div>

          {/* Date pour journalier */}
          {type === "JOURNALIER" && (
            <div>
              <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>DATE</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }} />
            </div>
          )}

          {/* Semaine pour hebdomadaire */}
          {type === "HEBDOMADAIRE" && (
            <>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>SEMAINE</label>
                <input type="number" value={semaine} min={1} max={52}
                  onChange={(e) => setSemaine(parseInt(e.target.value))}
                  style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", width: "80px" }} />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>ANNÉE</label>
                <select value={annee} onChange={(e) => setAnnee(parseInt(e.target.value))}
                  style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}>
                  {[2024, 2025, 2026, 2027].map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </>
          )}

          {/* Mois/Année pour mensuel */}
          {(type === "MENSUEL" || type === "MENSUEL_VALORISE") && (
            <>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>MOIS</label>
                <select value={mois} onChange={(e) => setMois(parseInt(e.target.value))}
                  style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}>
                  {moisLabels.slice(1).map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>ANNÉE</label>
                <select value={annee} onChange={(e) => setAnnee(parseInt(e.target.value))}
                  style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}>
                  {[2024, 2025, 2026, 2027].map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </>
          )}

          <button onClick={genererRapport} disabled={loading} style={{
            padding: "10px 28px",
            background: typeInfo?.color || "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}>
            {loading ? "Génération..." : "▶ Générer"}
          </button>
        </div>
      </div>

      {/* Rapport généré */}
      {generated && rapport && (
        <div id="rapport-print">

          {/* En-tête rapport */}
          <div style={{ background: "white", borderRadius: "10px", padding: "24px", marginBottom: "16px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", borderLeft: `5px solid ${typeInfo?.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: "bold", color: typeInfo?.color, marginBottom: "4px" }}>
                  {typeInfo?.icon} {typeInfo?.label.toUpperCase()}
                </div>
                <h2 style={{ margin: "0 0 8px", fontSize: "20px", color: "#1a1a1a" }}>
                  {zoneInfo ? `${zoneInfo.nom} — ${zoneInfo.projet.code}` : "Toutes zones"}
                </h2>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  Période : {new Date(rapport.periode.dateDebut).toLocaleDateString("fr-FR")}
                  {rapport.periode.dateDebut !== rapport.periode.dateFin && ` → ${new Date(rapport.periode.dateFin).toLocaleDateString("fr-FR")}`}
                </p>
                {zoneInfo && (
                  <p style={{ margin: "4px 0 0", color: "#666", fontSize: "13px" }}>
                    Client : {zoneInfo.projet.contrat.client.nom}
                  </p>
                )}
              </div>
              <button onClick={handlePrint} style={{
                padding: "8px 18px", background: "#f4f6f9", border: "1px solid #ddd",
                borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "bold",
              }}>
                🖨️ Imprimer / PDF
              </button>
            </div>
          </div>

          {/* Totaux */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "16px" }}>
  {[
    { label: "Total Heures MO", value: `${rapport.totaux.totalHeures}h`, color: "#0070f3", bg: "#f0f9ff" },
    { label: "Employés", value: `${rapport.resumeEmployes.length} pers.`, color: "#6366f1", bg: "#f5f3ff" },
    { label: "Matériel", value: `${rapport.resumeMateriel.length} équip.`, color: "#f59e0b", bg: "#fffbeb" },
  ].map((item) => (
    <div key={item.label} style={{ background: item.bg, borderRadius: "10px", padding: "16px", textAlign: "center" }}>
      <div style={{ fontSize: "22px", fontWeight: "bold", color: item.color }}>{item.value}</div>
      <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{item.label}</div>
    </div>
  ))}
</div>

          {/* Tableau employés */}
         {rapport.resumeEmployes.length > 0 && (
  <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: "16px" }}>
    <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", fontWeight: "bold", fontSize: "15px" }}>
      👷 Récapitulatif Main d'œuvre
    </div>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
          <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>EMPLOYÉ</th>
          <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>POSTE</th>
          <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>JOURS</th>
          <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>HEURES</th>
          {type === "MENSUEL_VALORISE" && (
            <th style={{ padding: "10px 16px", textAlign: "right", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MONTANT</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rapport.resumeEmployes.map((e) => (
          <tr key={e.user.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
            <td style={{ padding: "10px 16px" }}>
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>{e.user.nom} {e.user.prenom}</div>
              <div style={{ fontSize: "11px", color: "#999" }}>{e.user.matricule || "—"}</div>
            </td>
            <td style={{ padding: "10px 16px", fontSize: "13px", color: "#555" }}>
              {e.user.poste?.nom || "—"}
            </td>
            <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: "bold" }}>
              {e.jours}
            </td>
            <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: "bold", color: "#0070f3" }}>
              {e.totalHeures}h
            </td>
            {type === "MENSUEL_VALORISE" && (
              <td style={{ padding: "10px 16px", textAlign: "right", fontWeight: "bold", color: "#0070f3" }}>
                {e.totalMontant.toFixed(2)} DH
              </td>
            )}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr style={{ background: "#f0f9ff", borderTop: "2px solid #e5e7eb" }}>
          <td colSpan={2} style={{ padding: "10px 16px", fontWeight: "bold" }}>TOTAL</td>
          <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: "bold" }}>—</td>
          <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: "bold", color: "#0070f3" }}>
            {rapport.totaux.totalHeures}h
          </td>
          {type === "MENSUEL_VALORISE" && (
            <td style={{ padding: "10px 16px", textAlign: "right", fontWeight: "bold", color: "#0070f3" }}>
              {rapport.totaux.totalCoutMO.toFixed(2)} DH
            </td>
          )}
        </tr>
      </tfoot>
    </table>
  </div>
)}

          {/* Tableau matériel */}
        {rapport.resumeMateriel.length > 0 && (
  <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: "16px" }}>
    <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", fontWeight: "bold", fontSize: "15px" }}>
      🔧 Récapitulatif Matériel
    </div>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
          <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MATÉRIEL</th>
          <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>CATÉGORIE</th>
          <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>JOURS</th>
          {type === "MENSUEL_VALORISE" && (
            <th style={{ padding: "10px 16px", textAlign: "right", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MONTANT</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rapport.resumeMateriel.map((m) => (
          <tr key={m.materiel.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
            <td style={{ padding: "10px 16px" }}>
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>{m.materiel.nom}</div>
              <div style={{ fontSize: "11px", color: "#999" }}>{m.materiel.code}</div>
            </td>
            <td style={{ padding: "10px 16px", fontSize: "13px", color: "#555" }}>
              {m.materiel.categorie?.nom || "—"}
            </td>
            <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: "bold" }}>
              {m.totalJours}j
            </td>
            {type === "MENSUEL_VALORISE" && (
              <td style={{ padding: "10px 16px", textAlign: "right", fontWeight: "bold", color: "#f59e0b" }}>
                {m.totalMontant.toFixed(2)} DH
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
          {/* Total valorisé */}
          {type === "MENSUEL_VALORISE" && (
            <div style={{ background: "white", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", marginBottom: "16px", border: "2px solid #0070f3" }}>
              <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "bold" }}>💰 Valorisation Totale</h3>
              {[
                { label: "Total Main d'œuvre", value: rapport.totaux.totalCoutMO, color: "#0070f3" },
                { label: "Total Matériel", value: rapport.totaux.totalCoutMat, color: "#f59e0b" },
                { label: "Total HT", value: rapport.totaux.totalHT, color: "#1a1a1a", bold: true, border: true },
                { label: "TVA (20%)", value: rapport.totaux.tva, color: "#6b7280" },
                { label: "Total TTC", value: rapport.totaux.totalTTC, color: "#0070f3", bold: true, large: true },
              ].map((item) => (
                <div key={item.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0",
                  borderTop: item.border ? "2px solid #e5e7eb" : "none",
                  marginTop: item.border ? "8px" : "0",
                }}>
                  <span style={{ fontSize: item.large ? "16px" : "14px", fontWeight: item.bold ? "bold" : "normal" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: item.large ? "24px" : "15px", fontWeight: "bold", color: item.color }}>
                    {item.value.toFixed(2)} DH
                  </span>
                </div>
              ))}

              {/* Zone signature */}
              <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                {["Visa Chef de Chantier", "Visa Client"].map((label) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#666", marginBottom: "60px" }}>{label}</div>
                    <div style={{ borderTop: "2px solid #333", paddingTop: "8px", fontSize: "12px", color: "#999" }}>
                      Nom, Prénom & Cachet
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {rapport.resumeEmployes.length === 0 && rapport.resumeMateriel.length === 0 && (
            <div style={{ background: "white", borderRadius: "10px", padding: "60px", textAlign: "center", color: "#999" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
              <div style={{ fontSize: "16px" }}>Aucune donnée pour cette période</div>
              <div style={{ fontSize: "13px", marginTop: "8px" }}>Vérifiez que des feuilles de régie validées existent pour cette période</div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media print {
          aside, nav, button { display: none !important; }
          body { background: white !important; }
          #rapport-print { padding: 20px; }
        }
      `}</style>
    </div>
  );
}