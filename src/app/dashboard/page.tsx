"use client";

import Link from "next/link";

export default function DashboardHome() {
  return (
    <div style={{ padding: "0", minHeight: "100vh", background: "#f4f6f9" }}>
      
      {/* Header Simple et Efficace */}
      <div style={{ 
        background: "linear-gradient(to right, #0f172a, #1e293b)", 
        padding: "40px", 
        color: "white",
        marginBottom: "30px"
      }}>
        <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>Centre de Commandement</h1>
        <p style={{ margin: "10px 0 0 0", opacity: 0.8 }}>Bienvenue. Sélectionnez un module pour commencer.</p>
      </div>

      {/* Grille des Modules */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "25px", 
        padding: "0 40px 40px 40px" 
      }}>
        
        {/* Module RH */}
        <Link href="/dashboard/rh" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>
            <div style={iconStyle}>👥</div>
            <h2 style={titleStyle}>Ressources Humaines</h2>
            <p style={descStyle}>Gestion des employés, contrats, salaires et compétences.</p>
            <button style={btnStyle}>Accéder</button>
          </div>
        </Link>

        {/* Module Pointage */}
        <Link href="/dashboard/pointage" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>
            <div style={iconStyle}>⏱️</div>
            <h2 style={titleStyle}>Pointage & Régie</h2>
            <p style={descStyle}>Feuilles de présence, validation client et calcul des coûts.</p>
            <button style={btnStyle}>Accéder</button>
          </div>
        </Link>

        {/* Module HSE */}
        <Link href="/dashboard/epi" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>
            <div style={iconStyle}>🦺</div>
            <h2 style={titleStyle}>HSE & Sécurité</h2>
            <p style={descStyle}>Gestion des EPI, habilitations et normes de sécurité.</p>
            <button style={btnStyle}>Accéder</button>
          </div>
        </Link>

        {/* Module Chantier */}
        <Link href="/dashboard/chantier" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>
            <div style={iconStyle}>🏗️</div>
            <h2 style={titleStyle}>Chantiers & Projets</h2>
            <p style={descStyle}>Suivi des zones, rapports et avancement.</p>
            <button style={btnStyle}>Accéder</button>
          </div>
        </Link>

        {/* Module Matériel */}
        <Link href="/dashboard/materiel" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>
            <div style={iconStyle}>🔧</div>
            <h2 style={titleStyle}>Matériel & Équipements</h2>
            <p style={descStyle}>Stocks, locations et affectations.</p>
            <button style={btnStyle}>Accéder</button>
          </div>
        </Link>

        {/* Module Facturation */}
        <Link href="/dashboard/facturation" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>
            <div style={iconStyle}>💰</div>
            <h2 style={titleStyle}>Facturation & Coûts</h2>
            <p style={descStyle}>Analyse des coûts et génération des factures.</p>
            <button style={btnStyle}>Accéder</button>
          </div>
        </Link>

      </div>
    </div>
  );
}

// Styles CSS en JS pour un rendu pro immédiat
const cardStyle = {
  backgroundColor: "white",
  borderRadius: "15px",
  padding: "30px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  border: "1px solid #e2e8f0",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  height: "100%",
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "flex-start",
  cursor: "pointer"
};

const iconStyle = {
  fontSize: "40px",
  marginBottom: "15px"
};

const titleStyle = {
  color: "#0f172a",
  fontSize: "22px",
  margin: "0 0 10px 0",
  fontWeight: "600"
};

const descStyle = {
  color: "#64748b",
  fontSize: "15px",
  margin: "0 0 20px 0",
  flexGrow: 1
};

const btnStyle = {
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  width: "100%",
  textAlign: "center" as "center"
};