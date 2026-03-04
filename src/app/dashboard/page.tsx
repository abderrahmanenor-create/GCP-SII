"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const modules = [
  { label: "RH & Ouvriers", icon: "👥", href: "/dashboard/rh", color: "#0070f3", desc: "Employés, contrats, habilitations" },
  { label: "Pointage", icon: "⏱️", href: "/dashboard/pointage", color: "#f59e0b", desc: "Présence, feuilles de régie" },
  { label: "HSE & EPI", icon: "🦺", href: "/dashboard/epi", color: "#10b981", desc: "Équipements de protection" },
  { label: "Chantiers", icon: "🏗️", href: "/dashboard/chantier", color: "#6366f1", desc: "Projets, zones, rapports" },
  { label: "Facturation", icon: "💰", href: "/dashboard/facturation", color: "#ef4444", desc: "Coûts, factures, budget" },
  { label: "Administration", icon: "⚙️", href: "/dashboard/admin", color: "#8b5cf6", desc: "Utilisateurs, paramètres" },
];

const alerts = [
  "⚠️ Habilitation électrique de Mohamed A. expire dans 7 jours",
  "🦺 Stock casques de sécurité sous le seuil d'alerte",
  "📋 Feuille de pointage Zone A en attente de validation",
  "🏗️ Rapport chantier du 01/03 non soumis",
  "⚠️ Habilitation soudure de Karim B. expire dans 3 jours",
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [tickerIndex, setTickerIndex] = useState(0);
  const [now, setNow] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % alerts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(d.toLocaleDateString("fr-FR", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      }));
    };
    tick();
    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Barre de bienvenue */}
      <div style={{
        background: "linear-gradient(135deg, #0070f3, #0050b3)",
        borderRadius: "12px",
        padding: "20px 28px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        boxShadow: "0 4px 15px rgba(0,112,243,0.3)"
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold" }}>
            Bonjour, {session?.user?.prenom || "Utilisateur"} 👋
          </h1>
          <p style={{ margin: "4px 0 0", opacity: 0.85, fontSize: "14px" }}>
            {now} · Rôle : {session?.user?.role || "—"}
          </p>
        </div>
        <div style={{ fontSize: "40px" }}>🏭</div>
      </div>

      {/* Bandeau alertes défilant */}
      <div style={{
        background: "#fff3cd",
        border: "1px solid #ffc107",
        borderRadius: "8px",
        padding: "10px 20px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        overflow: "hidden"
      }}>
        <span style={{ fontWeight: "bold", color: "#856404", whiteSpace: "nowrap" }}>ALERTES</span>
        <div style={{
          color: "#856404",
          fontSize: "14px",
          transition: "opacity 0.5s ease",
          flex: 1
        }}>
          {alerts[tickerIndex]}
        </div>
      </div>

      {/* Statistiques rapides */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "16px",
        marginBottom: "28px"
      }}>
        {[
          { label: "Ouvriers actifs", value: "—", icon: "👷", color: "#0070f3" },
          { label: "Chantiers en cours", value: "—", icon: "🏗️", color: "#6366f1" },
          { label: "EPI distribués", value: "—", icon: "🦺", color: "#10b981" },
          { label: "Pointages en attente", value: "—", icon: "⏱️", color: "#f59e0b" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "white",
            borderRadius: "10px",
            padding: "16px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
            borderTop: `4px solid ${stat.color}`,
            textAlign: "center"
          }}>
            <div style={{ fontSize: "28px" }}>{stat.icon}</div>
            <div style={{ fontSize: "26px", fontWeight: "bold", color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#333", marginBottom: "14px" }}>
        Accès rapide aux modules
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px"
      }}>
        {modules.map((mod) => (
          <Link key={mod.href} href={mod.href} style={{ textDecoration: "none" }}>
            <div style={{
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              borderLeft: `5px solid ${mod.color}`,
              cursor: "pointer",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 6px rgba(0,0,0,0.08)";
              }}
            >
              <div style={{ fontSize: "32px" }}>{mod.icon}</div>
              <div>
                <div style={{ fontWeight: "bold", color: "#1a1a1a", fontSize: "15px" }}>{mod.label}</div>
                <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{mod.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}