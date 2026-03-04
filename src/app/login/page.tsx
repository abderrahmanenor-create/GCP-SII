"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError("Identifiants incorrects");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#eee" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: 40, borderRadius: 8, width: 300 }}>
        <h1 style={{ textAlign: "center" }}>Connexion</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input name="email" type="email" placeholder="Email" required style={{ width: "100%", padding: 8, marginBottom: 10, boxSizing: "border-box" }} />
        <input name="password" type="password" placeholder="Mot de passe" required style={{ width: "100%", padding: 8, marginBottom: 10, boxSizing: "border-box" }} />
        <button type="submit" style={{ width: "100%", padding: 10, background: "#0070f3", color: "white", border: "none" }}>Se connecter</button>
      </form>
    </div>
  );
}