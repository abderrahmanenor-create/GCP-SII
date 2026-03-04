"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  const handleLogin = () => {
    // Pour l'instant, on simule la connexion pour voir si ça marche
    router.push("/dashboard");
  };

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <h1 style={{ color: "#333" }}>Connexion</h1>
        <p style={{ color: "#666" }}>Page de test simplifiée</p>
        <button 
          onClick={handleLogin}
          style={{ marginTop: "20px", padding: "10px 30px", background: "#0070f3", color: "white", border: "none", cursor: "pointer", fontSize: "16px" }}
        >
          Aller au Dashboard
        </button>
      </div>
    </div>
  );
}