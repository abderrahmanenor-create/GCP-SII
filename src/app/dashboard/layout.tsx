"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const linkStyle = (path: string) => ({
    display: "block",
    padding: "10px 15px",
    color: pathname === path ? "white" : "#ccc",
    backgroundColor: pathname === path ? "#0070f3" : "transparent",
    textDecoration: "none",
    marginBottom: "5px",
    borderRadius: "4px",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      
      {/* Menu Latéral (Sidebar) */}
      <aside style={{ 
        width: "250px", 
        backgroundColor: "#333", 
        color: "white", 
        padding: "20px", 
        display: "flex", 
        flexDirection: "column" 
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", borderBottom: "1px solid #555", paddingBottom: "10px" }}>
          GCP-SII
        </h2>

        <nav style={{ flex: 1 }}>
          <Link href="/dashboard" style={linkStyle("/dashboard")}>
            🏠 Accueil
          </Link>
          <Link href="/dashboard/rh" style={linkStyle("/dashboard/rh")}>
            👥 RH & Ouvriers
          </Link>
          <Link href="/dashboard/pointage" style={linkStyle("/dashboard/pointage")}>
            ⏱️ Pointage
          </Link>
          <Link href="/dashboard/epi" style={linkStyle("/dashboard/epi")}>
            🦺 HSE & EPI
          </Link>
          <Link href="/dashboard/chantier" style={linkStyle("/dashboard/chantier")}>
            🏗️ Chantiers
          </Link>
        </nav>

        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{ 
            padding: "10px", 
            background: "#d9534f", 
            color: "white", 
            border: "none", 
            cursor: "pointer",
            borderRadius: "4px"
          }}
        >
          Déconnexion
        </button>
      </aside>

      {/* Zone Principale */}
      <main style={{ 
        flex: 1, 
        backgroundColor: "white", 
        color: "black",
        padding: "20px",
        overflowY: "auto"
      }}>
        {children}
      </main>
    </div>
  );
}