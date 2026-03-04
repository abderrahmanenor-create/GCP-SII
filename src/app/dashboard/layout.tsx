"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  const linkStyle = (path: string) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    color: isActive(path) ? "white" : "#ccc",
    backgroundColor: isActive(path) ? "#0070f3" : "transparent",
    textDecoration: "none",
    marginBottom: "4px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: isActive(path) ? "bold" : "normal",
    transition: "background 0.15s",
  });

  const navLinks = [
    { href: "/dashboard", label: "Accueil", icon: "🏠", exact: true },
    { href: "/dashboard/rh", label: "RH & Ouvriers", icon: "👥" },
    { href: "/dashboard/pointage", label: "Pointage", icon: "⏱️" },
    { href: "/dashboard/epi", label: "HSE & EPI", icon: "🦺" },
    { href: "/dashboard/chantier", label: "Chantiers", icon: "🏗️" },
    { href: "/dashboard/admin", label: "Administration", icon: "⚙️" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

      {/* Sidebar */}
      <aside style={{
        width: "240px",
        backgroundColor: "#1e2432",
        color: "white",
        padding: "20px 14px",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "28px",
          borderBottom: "1px solid #333",
          paddingBottom: "14px",
          fontSize: "18px",
          letterSpacing: "1px",
          color: "white",
        }}>
          GCP-SII
        </h2>

        <nav style={{ flex: 1 }}>
          {navLinks.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  color: active ? "white" : "#aab4c4",
                  backgroundColor: active ? "#0070f3" : "transparent",
                  textDecoration: "none",
                  marginBottom: "4px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: active ? "bold" : "normal",
                }}
              >
                <span style={{ fontSize: "16px" }}>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            padding: "10px",
            background: "#d9534f",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Déconnexion
        </button>
      </aside>

      {/* Zone principale */}
      <main style={{
        flex: 1,
        backgroundColor: "#f4f6f9",
        color: "black",
        overflowY: "auto",
        minHeight: "100vh",
      }}>
        {children}
      </main>
    </div>
  );
}