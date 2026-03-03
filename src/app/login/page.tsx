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

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      backgroundColor: "#f4f6f9",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ 
        background: "white", 
        padding: "40px", 
        borderRadius: "10px", 
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>GCP-SII</h1>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "5px", fontSize: "16px" }} 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Mot de passe" 
            required 
            style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "5px", fontSize: "16px" }} 
          />
          
          {error && <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              padding: "12px", 
              background: loading ? "#ccc" : "#0070f3", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              fontSize: "16px", 
              cursor: "pointer" 
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}