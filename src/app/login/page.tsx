"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Appel à NextAuth pour vérifier les identifiants
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // On gère la redirection nous-même
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      // Connexion réussie : on envoie vers le Dashboard
      router.push("/dashboard");
      router.refresh(); // Force le rafraîchissement des données
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* En-tête */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={titleStyle}>GCP-SII</h1>
          <p style={subtitleStyle}>Plateforme de Gestion de Chantier</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Adresse Email</label>
            <input
              name="email"
              type="email"
              placeholder="admin@gcp-sii.com"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Mot de passe</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" disabled={loading} style={loading ? buttonLoadingStyle : buttonStyle}>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div style={footerStyle}>
          <p style={{ color: "#888", fontSize: "12px" }}>Version Industrielle 1.0</p>
        </div>
      </div>
    </div>
  );
}

// --- Styles CSS (Design "Classe Mondial") ---

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f2f5", // Fond gris clair pro
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "50px",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  width: "100%",
  maxWidth: "420px",
  border: "1px solid #eee",
};

const titleStyle = {
  margin: 0,
  fontSize: "32px",
  fontWeight: "bold",
  color: "#0f172a",
  letterSpacing: "-1px",
};

const subtitleStyle = {
  margin: "5px 0 0 0",
  color: "#64748b",
  fontSize: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#334155",
  fontWeight: "500",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box" as "border-box", // Fix width issue
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
  transition: "background 0.2s",
};

const buttonLoadingStyle = {
  ...buttonStyle,
  backgroundColor: "#a3a3a3",
  cursor: "default",
};

const errorStyle = {
  color: "#ef4444",
  textAlign: "center" as "center",
  fontSize: "14px",
  marginTop: "10px",
};

const footerStyle = {
  marginTop: "30px",
  textAlign: "center" as "center",
};