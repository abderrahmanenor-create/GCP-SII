"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type KPIs = {
  totalOuvriers: number;
  feuillesEnAttente: number;
  feuillesValidees: number;
  totalFacturableMois: number;
  totalHeuresMois: number;
  contratsActifs: number;
  projetsActifs: number;
  distributionsAlertes: number;
  habilitationsExpirent: number;
};

type Feuille = {
  id: string;
  date: string;
  statut: string;
  totalGeneral: number;
  totalHeures: number;
  zone: {
    nom: string;
    projet: {
      nom: string;
      contrat: { client: { nom: string } };
    };
  };
};

type Alerte = {
  id: string;
  datePeremption: string | null;
  dateProchVGP: string | null;
  epi: { nom: string; norme: string | null };
  user: { nom: string; prenom: string };
};

type EvolutionItem = {
  mois: string;
  heures: number;
  montant: number;
};

const statutConfig: Record<string, { label: string; color: string; bg: string }> = {
  BROUILLON:      { label: "Brouillon",       color: "#6b7280", bg: "#f9fafb" },
  SOUMIS:         { label: "Soumis",          color: "#f59e0b", bg: "#fef3c7" },
  VALIDE_CHEF:    { label: "Validé chef",     color: "#0070f3", bg: "#f0f9ff" },
  VALIDE_CLIENT:  { label: "Validé client",   color: "#10b981", bg: "#f0fdf4" },
};

function joursRestants(dateStr: string | null): number | null {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<{
    kpis: KPIs;
    dernieresFeuilles: Feuille[];
    dernieresAlertes: Alerte[];
    evolution: EvolutionItem[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
      <div style={{ color: "#999", fontSize: 16 }}>Chargement du tableau de bord...</div>
    </div>
  );

  if (!data) return (
    <div style={{ padding: 40, textAlign: "center", color: "#ef4444" }}>
      Erreur de chargement — vérifiez la console
    </div>
  );

  const { kpis, dernieresFeuilles, dernieresAlertes, evolution } = data;
  const totalAlertes = kpis.distributionsAlertes + kpis.habilitationsExpirent + kpis.feuillesEnAttente;
  const maxHeures = Math.max(...evolution.map(e => e.heures), 1);

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#1a1a1a" }}>
          📊 Tableau de bord
        </h1>
        <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
          {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          {totalAlertes > 0 && (
            <span style={{ marginLeft: "12px", background: "#fee2e2", color: "#ef4444", padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
              ⚠️ {totalAlertes} alerte{totalAlertes > 1 ? "s" : ""} en attente
            </span>
          )}
        </p>
      </div>

      {/* KPI CARDS — Ligne 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "14px" }}>
        {[
          {
            icon: "👷", label: "Ouvriers actifs", value: kpis.totalOuvriers,
            color: "#0070f3", bg: "#f0f9ff",
            action: () => router.push("/dashboard/rh"),
            sub: "Cliquer pour voir la liste"
          },
          {
            icon: "📋", label: "Feuilles en attente", value: kpis.feuillesEnAttente,
            color: "#f59e0b", bg: "#fffbeb",
            action: () => router.push("/dashboard/pointage/regie/liste"),
            sub: kpis.feuillesEnAttente > 0 ? "⚠️ À valider" : "Tout est à jour"
          },
          {
            icon: "✅", label: "Feuilles validées (mois)", value: kpis.feuillesValidees,
            color: "#10b981", bg: "#f0fdf4",
            action: () => router.push("/dashboard/pointage/regie/liste"),
            sub: "Ce mois-ci"
          },
          {
            icon: "💰", label: "Facturable validé (mois)", value: `${kpis.totalFacturableMois.toLocaleString("fr-FR")} DH`,
            color: "#6366f1", bg: "#f5f3ff",
            action: () => router.push("/dashboard/pointage/rapport"),
            sub: "Feuilles VALIDE_CLIENT"
          },
        ].map(card => (
          <div key={card.label}
            onClick={card.action}
            style={{
              background: card.bg, borderRadius: "12px", padding: "18px",
              cursor: "pointer", transition: "transform 0.1s",
              boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              border: `1px solid ${card.color}22`,
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ fontSize: "26px", marginBottom: "6px" }}>{card.icon}</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: card.color }}>{card.value}</div>
            <div style={{ fontSize: "12px", color: "#333", fontWeight: "bold", marginTop: "4px" }}>{card.label}</div>
            <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* KPI CARDS — Ligne 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          {
            icon: "⏱️", label: "Heures pointées (mois)", value: `${kpis.totalHeuresMois.toFixed(1)}h`,
            color: "#0891b2", bg: "#ecfeff",
            action: () => router.push("/dashboard/pointage/rapport"),
            sub: "Toutes feuilles confondues"
          },
          {
            icon: "📄", label: "Contrats actifs", value: kpis.contratsActifs,
            color: "#7c3aed", bg: "#faf5ff",
            action: () => router.push("/dashboard/admin/contrats"),
            sub: "En cours"
          },
          {
            icon: "🏗️", label: "Projets en cours", value: kpis.projetsActifs,
            color: "#0f766e", bg: "#f0fdfa",
            action: () => router.push("/dashboard/admin/projets"),
            sub: "Zones actives"
          },
          {
            icon: "⚠️", label: "Alertes EPI", value: kpis.distributionsAlertes,
            color: kpis.distributionsAlertes > 0 ? "#ef4444" : "#10b981",
            bg: kpis.distributionsAlertes > 0 ? "#fef2f2" : "#f0fdf4",
            action: () => router.push("/dashboard/epi/distribution"),
            sub: kpis.distributionsAlertes > 0 ? "Péremption / VGP < 30j" : "Aucune alerte"
          },
        ].map(card => (
          <div key={card.label}
            onClick={card.action}
            style={{
              background: card.bg, borderRadius: "12px", padding: "18px",
              cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              border: `1px solid ${card.color}22`,
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ fontSize: "26px", marginBottom: "6px" }}>{card.icon}</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: card.color }}>{card.value}</div>
            <div style={{ fontSize: "12px", color: "#333", fontWeight: "bold", marginTop: "4px" }}>{card.label}</div>
            <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* CONTENU PRINCIPAL — 2 colonnes */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>

        {/* Évolution heures — graphique barres */}
        <div style={{ background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "bold", color: "#1a1a1a" }}>
            📈 Évolution heures — 6 derniers mois
          </h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "140px" }}>
            {evolution.map((e, i) => {
              const hauteur = maxHeures > 0 ? Math.max((e.heures / maxHeures) * 120, 4) : 4;
              const isLast = i === evolution.length - 1;
              return (
                <div key={e.mois} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{ fontSize: "9px", color: "#666", fontWeight: "bold" }}>
                    {e.heures > 0 ? `${e.heures.toFixed(0)}h` : ""}
                  </div>
                  <div
                    style={{
                      width: "100%", height: `${hauteur}px`,
                      background: isLast ? "#0070f3" : "#bfdbfe",
                      borderRadius: "4px 4px 0 0",
                      transition: "height 0.3s",
                    }}
                    title={`${e.mois}: ${e.heures.toFixed(1)}h — ${e.montant.toLocaleString("fr-FR")} DH`}
                  />
                  <div style={{ fontSize: "9px", color: "#999", textAlign: "center" }}>{e.mois}</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "12px", padding: "8px", background: "#f8fafc", borderRadius: "6px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "11px", color: "#666" }}>Total ce mois</span>
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0070f3" }}>
              {evolution[evolution.length - 1]?.heures.toFixed(1)}h — {evolution[evolution.length - 1]?.montant.toLocaleString("fr-FR")} DH
            </span>
          </div>
        </div>

        {/* Alertes EPI */}
        <div style={{ background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "bold" }}>⚠️ Alertes EPI</h3>
            <button onClick={() => router.push("/dashboard/epi/distribution")}
              style={{ fontSize: "11px", color: "#0070f3", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>
              Voir tout →
            </button>
          </div>
          {dernieresAlertes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: "#10b981" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>✅</div>
              <div style={{ fontSize: "13px", fontWeight: "bold" }}>Aucune alerte EPI</div>
              <div style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>Tous les EPI sont conformes</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {dernieresAlertes.map(a => {
                const jPerem = joursRestants(a.datePeremption);
                const jVGP = joursRestants(a.dateProchVGP);
                const joursMin = Math.min(
                  jPerem !== null ? jPerem : 999,
                  jVGP !== null ? jVGP : 999
                );
                const isUrgent = joursMin < 0;
                return (
                  <div key={a.id} style={{
                    padding: "10px 12px", borderRadius: "8px",
                    background: isUrgent ? "#fef2f2" : "#fffbeb",
                    border: `1px solid ${isUrgent ? "#fca5a5" : "#fcd34d"}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1a1a1a" }}>
                        {a.epi.nom} {a.epi.norme && <span style={{ color: "#0070f3" }}>({a.epi.norme})</span>}
                      </div>
                      <div style={{ fontSize: "11px", color: "#666" }}>
                        {a.user.nom} {a.user.prenom}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      {jPerem !== null && jPerem <= 30 && (
                        <div style={{ fontSize: "10px", fontWeight: "bold", color: isUrgent ? "#ef4444" : "#d97706" }}>
                          {jPerem < 0 ? `⛔ Périmé (${Math.abs(jPerem)}j)` : `📅 ${jPerem}j`}
                        </div>
                      )}
                      {jVGP !== null && jVGP <= 30 && (
                        <div style={{ fontSize: "10px", fontWeight: "bold", color: "#d97706" }}>
                          {jVGP < 0 ? `⛔ VGP (${Math.abs(jVGP)}j)` : `🔍 VGP ${jVGP}j`}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Dernières feuilles de régie */}
      <div style={{ background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "bold" }}>📋 Dernières feuilles de régie</h3>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => router.push("/dashboard/pointage/regie/nouvelle")}
              style={{ padding: "6px 14px", background: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>
              + Nouvelle feuille
            </button>
            <button onClick={() => router.push("/dashboard/pointage/regie/liste")}
              style={{ padding: "6px 14px", background: "#f0f9ff", color: "#0070f3", border: "1px solid #0070f3", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>
              Voir tout →
            </button>
          </div>
        </div>

        {dernieresFeuilles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#999" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>📋</div>
            <div>Aucune feuille de régie</div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["DATE", "CLIENT / PROJET", "ZONE", "HEURES", "MONTANT", "STATUT", ""].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "11px", color: "#666", fontWeight: "bold", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dernieresFeuilles.map(f => {
                const st = statutConfig[f.statut];
                return (
                  <tr key={f.id} style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                    onClick={() => router.push(`/dashboard/pointage/regie/${f.id}`)}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                    onMouseLeave={e => (e.currentTarget.style.background = "white")}
                  >
                    <td style={{ padding: "10px 14px", fontSize: "13px" }}>
                      {new Date(f.date).toLocaleDateString("fr-FR")}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                        {f.zone?.projet?.contrat?.client?.nom || "—"}
                      </div>
                      <div style={{ fontSize: "11px", color: "#999" }}>
                        {f.zone?.projet?.nom || "—"}
                      </div>
                    </td>
                    <td style={{ padding: "10px 14px", fontSize: "12px", color: "#666" }}>
                      {f.zone?.nom || "—"}
                    </td>
                    <td style={{ padding: "10px 14px", fontSize: "13px", fontWeight: "bold" }}>
                      {(f.totalHeures || 0).toFixed(1)}h
                    </td>
                    <td style={{ padding: "10px 14px", fontSize: "13px", color: "#6366f1", fontWeight: "bold" }}>
                      {(f.totalGeneral || 0).toLocaleString("fr-FR")} DH
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{
                        background: st.bg, color: st.color,
                        padding: "3px 10px", borderRadius: "20px",
                        fontSize: "11px", fontWeight: "bold"
                      }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ color: "#0070f3", fontSize: "12px" }}>→</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Raccourcis modules */}
      <div style={{ background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "bold" }}>🚀 Accès rapide</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px" }}>
          {[
            { icon: "👷", label: "Ouvriers", path: "/dashboard/rh", color: "#0070f3" },
            { icon: "📋", label: "Régie", path: "/dashboard/pointage/regie/liste", color: "#f59e0b" },
            { icon: "📊", label: "Rapports", path: "/dashboard/pointage/rapport", color: "#6366f1" },
            { icon: "🦺", label: "EPI Stock", path: "/dashboard/epi/stock", color: "#ef4444" },
            { icon: "🏗️", label: "Admin", path: "/dashboard/admin", color: "#10b981" },
            { icon: "💰", label: "Tarifs", path: "/dashboard/admin/contrats", color: "#7c3aed" },
          ].map(item => (
            <button key={item.path}
              onClick={() => router.push(item.path)}
              style={{
                padding: "14px 8px", borderRadius: "10px", border: `1px solid ${item.color}33`,
                background: `${item.color}0d`, cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = `${item.color}22`)}
              onMouseLeave={e => (e.currentTarget.style.background = `${item.color}0d`)}
            >
              <span style={{ fontSize: "22px" }}>{item.icon}</span>
              <span style={{ fontSize: "11px", fontWeight: "bold", color: item.color }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}