"use client";

import Link from "next/link";

const sections = [
  {
    label: "Sociétés & Clients",
    icon: "🏢",
    href: "/dashboard/admin/societes",
    color: "#0070f3",
    desc: "Clients, sous-traitants, sociétés internes"
  },
  {
    label: "Contrats",
    icon: "📑",
    href: "/dashboard/admin/contrats",
    color: "#6366f1",
    desc: "Contrats clients, budget, validations"
  },
  {
    label: "Projets & Zones",
    icon: "🗂️",
    href: "/dashboard/admin/projets",
    color: "#10b981",
    desc: "Projets, zones de travail"
  },
  {
    label: "Matériel JESA",
    icon: "🔧",
    href: "/dashboard/admin/materiel",
    color: "#f59e0b",
    desc: "Fiches matériel, certifications, inspections"
  },
  {
    label: "Tables de référence",
    icon: "📋",
    href: "/dashboard/admin/references",
    color: "#8b5cf6",
    desc: "Postes, types contrat, habilitations, EPI"
  },
];

export default function AdminPage() {
  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" }}>
          ⚙️ Administration
        </h1>
        <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
          Gestion des structures, contrats et matériel
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        {sections.map((s) => (
          <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "24px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                borderLeft: `5px solid ${s.color}`,
                cursor: "pointer",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>{s.icon}</div>
              <div style={{ fontWeight: "bold", fontSize: "16px", color: "#1a1a1a" }}>{s.label}</div>
              <div style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>{s.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}