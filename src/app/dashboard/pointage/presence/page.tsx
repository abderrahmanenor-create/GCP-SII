"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type FicheJour = {
  date: string;
  total: number;
  presents: number;
  absents: number;
  retards: number;
  autres: number;
  statut: string; // BROUILLON, VALIDE_CHEF, VALIDE_RH
};

const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

export default function PresenceListePage() {
  const router = useRouter();
  const today = new Date();
  const [mois, setMois] = useState(today.getMonth() + 1);
  const [annee, setAnnee] = useState(today.getFullYear());
  const [fiches, setFiches] = useState<FicheJour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadFiches(); }, [mois, annee]);

  const loadFiches = async () => {
    setLoading(true);
    const res = await fetch(`/api/presence?mois=${mois}&annee=${annee}`);
    const data = await res.json();

    // Grouper par date
    const parDate: Record<string, any[]> = {};
    if (Array.isArray(data)) {
      data.forEach((p: any) => {
        const d = new Date(p.date).toISOString().split("T")[0];
        if (!parDate[d]) parDate[d] = [];
        parDate[d].push(p);
      });
    }

    const result: FicheJour[] = Object.entries(parDate).map(([date, lignes]) => ({
      date,
      total: lignes.length,
      presents: lignes.filter(l => l.statut === "PRESENT").length,
      absents: lignes.filter(l => l.statut === "ABSENT").length,
      retards: lignes.filter(l => l.statut === "RETARD").length,
      autres: lignes.filter(l => ["CONGE","MISSION","ARRET_MALADIE"].includes(l.statut)).length,
      statut: lignes[0]?.statutFiche || "BROUILLON",
    })).sort((a, b) => b.date.localeCompare(a.date));

    setFiches(result);
    setLoading(false);
  };

  const todayStr = today.toISOString().split("T")[0];
  const ficheDuJour = fiches.find(f => f.date === todayStr);

  const statutConfig: Record<string, { label: string; color: string; bg: string }> = {
    BROUILLON:   { label: "Brouillon",    color: "#6b7280", bg: "#f9fafb" },
    VALIDE_CHEF: { label: "Validé chef",  color: "#0070f3", bg: "#eff6ff" },
    VALIDE_RH:   { label: "Validé RH",    color: "#059669", bg: "#f0fdf4" },
  };

  // Générer calendrier du mois
  const premierJour = new Date(annee, mois - 1, 1).getDay();
  const nbJours = new Date(annee, mois, 0).getDate();
  const joursCalendrier: (number | null)[] = [];
  for (let i = 0; i < (premierJour === 0 ? 6 : premierJour - 1); i++) joursCalendrier.push(null);
  for (let i = 1; i <= nbJours; i++) joursCalendrier.push(i);

  const getFicheForDay = (jour: number) => {
    const dateStr = `${annee}-${String(mois).padStart(2,"0")}-${String(jour).padStart(2,"0")}`;
    return fiches.find(f => f.date === dateStr);
  };

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "white", padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(16px,4vw,22px)", fontWeight: "bold" }}>📋 Présences</h1>
            <p style={{ margin: "2px 0 0", color: "#888", fontSize: 13 }}>Historique et gestion des fiches de présence</p>
          </div>
          <button
            onClick={() => router.push(`/dashboard/pointage/presence/${todayStr}`)}
            style={{ padding: "10px 20px", background: "#0070f3", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: "bold", fontSize: 14, minHeight: 44 }}>
            📋 Appel du jour
          </button>
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>

        {/* Fiche du jour — mise en avant */}
        <div style={{
          background: ficheDuJour ? "#f0fdf4" : "#fffbeb",
          border: `2px solid ${ficheDuJour ? "#6ee7b7" : "#fde68a"}`,
          borderRadius: 12, padding: "16px 20px", marginBottom: 20,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <div style={{ fontWeight: "bold", fontSize: 15, color: "#1a1a1a" }}>
              {ficheDuJour ? "✅ Fiche d'aujourd'hui enregistrée" : "⚠️ Pas encore de fiche pour aujourd'hui"}
            </div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
              {today.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              {ficheDuJour && ` · ${ficheDuJour.presents} présents / ${ficheDuJour.total}`}
            </div>
          </div>
          <button
            onClick={() => router.push(`/dashboard/pointage/presence/${todayStr}`)}
            style={{
              padding: "10px 20px", minHeight: 44,
              background: ficheDuJour ? "#059669" : "#f59e0b",
              color: "white", border: "none", borderRadius: 8,
              cursor: "pointer", fontWeight: "bold", fontSize: 13,
            }}>
            {ficheDuJour ? "✏️ Modifier" : "➕ Faire l'appel"}
          </button>
        </div>

        {/* Navigation mois */}
        <div style={{ background: "white", borderRadius: 12, padding: "14px 16px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button onClick={() => { if (mois === 1) { setMois(12); setAnnee(a => a-1); } else setMois(m => m-1); }}
              style={{ padding: "6px 14px", border: "1px solid #ddd", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 18, minHeight: 40 }}>‹</button>
            <span style={{ fontWeight: "bold", fontSize: 16 }}>{MOIS[mois-1]} {annee}</span>
            <button onClick={() => { if (mois === 12) { setMois(1); setAnnee(a => a+1); } else setMois(m => m+1); }}
              style={{ padding: "6px 14px", border: "1px solid #ddd", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 18, minHeight: 40 }}>›</button>
          </div>

          {/* Calendrier */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
            {["L","M","M","J","V","S","D"].map((j, i) => (
              <div key={i} style={{ textAlign: "center", fontSize: 11, fontWeight: "bold", color: "#aaa", padding: "4px 0" }}>{j}</div>
            ))}
            {joursCalendrier.map((jour, i) => {
              if (!jour) return <div key={i} />;
              const fiche = getFicheForDay(jour);
              const dateStr = `${annee}-${String(mois).padStart(2,"0")}-${String(jour).padStart(2,"0")}`;
              const isToday = dateStr === todayStr;
              const isFutur = new Date(dateStr) > today;
              const taux = fiche ? Math.round((fiche.presents / fiche.total) * 100) : null;

              return (
                <div key={i}
                  onClick={() => !isFutur && router.push(`/dashboard/pointage/presence/${dateStr}`)}
                  style={{
                    borderRadius: 8, padding: "6px 4px", textAlign: "center",
                    cursor: isFutur ? "default" : "pointer",
                    border: isToday ? "2px solid #0070f3" : "1px solid #f1f5f9",
                    background: fiche
                      ? fiche.statut === "VALIDE_RH" ? "#f0fdf4"
                      : fiche.statut === "VALIDE_CHEF" ? "#eff6ff"
                      : "#fffbeb"
                      : isToday ? "#eff6ff" : isFutur ? "#fafafa" : "white",
                    opacity: isFutur ? 0.4 : 1,
                  }}>
                  <div style={{ fontSize: 13, fontWeight: isToday ? "bold" : "normal", color: isToday ? "#0070f3" : "#333" }}>{jour}</div>
                  {fiche && (
                    <div style={{ fontSize: 9, color: taux! >= 80 ? "#059669" : "#dc2626", fontWeight: "bold" }}>{taux}%</div>
                  )}
                  {!fiche && !isFutur && (
                    <div style={{ fontSize: 9, color: "#ddd" }}>—</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Liste fiches */}
        <div style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontWeight: "bold", fontSize: 14 }}>
            Fiches du mois ({fiches.length})
          </div>
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#999" }}>Chargement...</div>
          ) : fiches.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
              Aucune fiche ce mois-ci
            </div>
          ) : (
            fiches.map(f => {
              const st = statutConfig[f.statut] || statutConfig.BROUILLON;
              const taux = f.total > 0 ? Math.round((f.presents / f.total) * 100) : 0;
              const date = new Date(f.date);
              return (
                <div key={f.date}
                  onClick={() => router.push(`/dashboard/pointage/presence/${f.date}`)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderBottom: "1px solid #f1f5f9",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={e => (e.currentTarget.style.background = "white")}
                >
                  {/* Date */}
                  <div style={{ textAlign: "center", minWidth: 48, background: "#f8fafc", borderRadius: 10, padding: "8px 6px" }}>
                    <div style={{ fontSize: 18, fontWeight: "bold", color: "#0070f3" }}>{date.getDate()}</div>
                    <div style={{ fontSize: 10, color: "#aaa" }}>{MOIS[date.getMonth()].slice(0,3)}</div>
                  </div>

                  {/* Infos */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}>
                      {date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                    </div>
                    <div style={{ display: "flex", gap: 12, fontSize: 12, flexWrap: "wrap" }}>
                      <span style={{ color: "#059669" }}>✅ {f.presents} présents</span>
                      {f.absents > 0 && <span style={{ color: "#dc2626" }}>❌ {f.absents} absents</span>}
                      {f.retards > 0 && <span style={{ color: "#d97706" }}>⏰ {f.retards} retards</span>}
                      {f.autres > 0 && <span style={{ color: "#7c3aed" }}>📌 {f.autres} autres</span>}
                    </div>
                  </div>

                  {/* Taux */}
                  <div style={{ textAlign: "center", minWidth: 52 }}>
                    <div style={{ fontSize: 18, fontWeight: "bold", color: taux >= 80 ? "#059669" : taux >= 60 ? "#d97706" : "#dc2626" }}>
                      {taux}%
                    </div>
                    <div style={{ fontSize: 10, color: "#aaa" }}>{f.total} total</div>
                  </div>

                  {/* Statut */}
                  <span style={{ background: st.bg, color: st.color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: "bold", whiteSpace: "nowrap" }}>
                    {st.label}
                  </span>

                  <span style={{ color: "#ccc", fontSize: 16 }}>›</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}