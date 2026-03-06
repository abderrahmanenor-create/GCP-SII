"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Ferme le menu quand on change de page
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/dashboard", label: "Accueil", icon: "🏠", exact: true },
    { href: "/dashboard/rh", label: "RH & Ouvriers", icon: "👷" },
    { href: "/dashboard/pointage", label: "Pointage NFI", icon: "⏱️" },
    { href: "/dashboard/pointage/presence", label: "Présence", icon: "📋" },
    { href: "/dashboard/facturation", label: "Facturation", icon: "🧾" },
    { href: "/dashboard/epi/stock", label: "HSE & EPI", icon: "🦺" },
    { href: "/dashboard/chantier", label: "Chantiers", icon: "🏗️" },
    { href: "/dashboard/admin", label: "Administration", icon: "⚙️" },
  ];

  const isActive = (link: { href: string; exact?: boolean }) =>
    link.exact ? pathname === link.href : pathname === link.href || pathname.startsWith(link.href + "/");

  const NavContent = () => (
    <>
      <h2 style={{
        textAlign: "center", marginBottom: "28px",
        borderBottom: "1px solid #333", paddingBottom: "14px",
        fontSize: "18px", letterSpacing: "1px", color: "white",
      }}>
        GCP-SII
      </h2>
      <nav style={{ flex: 1 }}>
        {navLinks.map((link) => {
          const active = isActive(link);
          return (
            <Link key={link.href} href={link.href} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 14px", marginBottom: "4px", borderRadius: "6px",
              color: active ? "white" : "#aab4c4",
              backgroundColor: active ? "#0070f3" : "transparent",
              textDecoration: "none", fontSize: "14px",
              fontWeight: active ? "bold" : "normal",
            }}>
              <span style={{ fontSize: "18px" }}>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button onClick={() => signOut({ callbackUrl: "/login" })} style={{
        padding: "10px", background: "#d9534f", color: "white",
        border: "none", cursor: "pointer", borderRadius: "6px",
        fontSize: "14px", fontWeight: "bold", width: "100%",
      }}>
        Déconnexion
      </button>
    </>
  );

  if (isMobile) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f4f6f9", fontFamily: "Arial, sans-serif" }}>

        {/* Contenu principal */}
        <main style={{ flex: 1, color: "black", overflowY: "auto", minHeight: "100vh", paddingBottom: "80px" }}>
          {children}
        </main>

        {/* Overlay */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
              zIndex: 998, backdropFilter: "blur(2px)",
            }}
          />
        )}

        {/* Drawer menu */}
        <div style={{
          position: "fixed", left: 0, top: 0, bottom: 0,
          width: "260px", backgroundColor: "#1e2432", color: "white",
          padding: "20px 14px", display: "flex", flexDirection: "column",
          zIndex: 999,
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          boxShadow: menuOpen ? "4px 0 20px rgba(0,0,0,0.3)" : "none",
        }}>
          <NavContent />
        </div>

        {/* Bouton flottant */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            position: "fixed", bottom: "24px", right: "24px",
            width: "56px", height: "56px", borderRadius: "50%",
            background: menuOpen ? "rgba(239,68,68,0.9)" : "rgba(0,112,243,0.85)",
            color: "white", border: "none", cursor: "pointer",
            fontSize: "24px", zIndex: 1000,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    );
  }

  // Desktop — sidebar classique
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <aside style={{
        width: "240px", backgroundColor: "#1e2432", color: "white",
        padding: "20px 14px", display: "flex", flexDirection: "column", flexShrink: 0,
      }}>
        <NavContent />
      </aside>
      <main style={{
        flex: 1, backgroundColor: "#f4f6f9", color: "black",
        overflowY: "auto", minHeight: "100vh",
      }}>
        {children}
      </main>
    </div>
  );
}