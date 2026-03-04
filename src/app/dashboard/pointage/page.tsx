"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Presence = {
  id: string;
  statut: string;
  heureArrivee: string | null;
  heureDepart: string | null;
  valide: boolean;
  user: {
    id: string;
    nom: string;
    prenom: string;
    matricule: string | null;
    photoUrl: string | null;
    poste: { nom: string } | null;
  };
};

type Zone = {
  id: string;
  nom: string;
};

const STATUTS = ["PRESENT", "ABSENT", "CONGE", "MALADIE"];

const statutColor: Record<string, string> = {
  PRESENT: "#10b981",
  ABSENT: "#ef4444",
  CONGE: "#f59e0b",
  MALADIE: "#6366f1",
};

export default function PointagePage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [zoneId, setZoneId] = useState("");
  const [zones, setZones] = useState<Zone[]>([]);
  const [presences, setPresences] = useState<Presence[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/ref")
      .then((r) => r.json())
      .then(() => {});
    // Charger les zones depuis les projets
    fetch("/api/zones")
      .then((r) => r.json())
      .then((data) => setZones(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    if (!zoneId) return;
    setLoading(true);
    fetch(`/api/pointage/presence?date=${date}&zoneId=${zoneId}`)
      .then((r) => r.json())
      .then((data) => {
        setPresences(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [date, zoneId]);

  const updateStatut = async (userId: string, statut: string) => {
    setSaving(userId);
    await fetch("/api/pointage/presence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, date, statut, zoneId }),
    });
    setSaving(null);
    // Rafraîchir
    fetch(`/api/pointage/presence?date=${date}&zoneId=${zoneId}`)
      .then((r) => r.json())
      .then((data) => setPresences(Array.isArray(data) ? data : []));
  };

  const totalPresents = presences.filter((p) => p.statut === "PRESENT").length;
  const totalAbsents = presences.filter((p) => p.statut === "ABSENT").length;

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" }}>
            ⏱️ Pointage
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            Gestion des présences et feuilles de régie
          </p>
        </div>
        <Link href="/dashboard/pointage/regie/nouvelle" style={{
          background: "#0070f3",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: "bold",
        }}>
          + Nouvelle feuille de régie
        </Link>
      </div>

      {/* Filtres */}
      <div style={{
        background: "white",
        borderRadius: "10px",
        padding: "16px 20px",
        marginBottom: "20px",
        display: "flex",
        gap: "16px",
        alignItems: "center",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}>DATE</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}>ZONE</label>
          <select
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", minWidth: "200px" }}
          >
            <option value="">Sélectionner une zone</option>
            {zones.map((z) => (
              <option key={z.id} value={z.id}>{z.nom}</option>
            ))}
          </select>
        </div>

        {/* Compteurs */}
        {presences.length > 0 && (
          <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
            <div style={{ background: "#d1fae5", padding: "8px 16px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#10b981" }}>{totalPresents}</div>
              <div style={{ fontSize: "11px", color: "#065f46" }}>Présents</div>
            </div>
            <div style={{ background: "#fee2e2", padding: "8px 16px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#ef4444" }}>{totalAbsents}</div>
              <div style={{ fontSize: "11px", color: "#991b1b" }}>Absents</div>
            </div>
          </div>
        )}
      </div>

      {/* Liste présences */}
      {!zoneId ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>
          Sélectionnez une zone pour afficher les présences
        </div>
      ) : loading ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>
          Chargement...
        </div>
      ) : presences.length === 0 ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>
          Aucune présence enregistrée pour cette zone et cette date
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>EMPLOYÉ</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>POSTE</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>STATUT</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>VALIDÉ</th>
              </tr>
            </thead>
            <tbody>
              {presences.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: "#0070f3", color: "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: "bold", fontSize: "14px",
                      }}>
                        {p.user.nom[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: "bold", fontSize: "14px" }}>{p.user.nom} {p.user.prenom}</div>
                        <div style={{ fontSize: "12px", color: "#999" }}>{p.user.matricule || "—"}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#666" }}>
                    {p.user.poste?.nom || "—"}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <select
                      value={p.statut}
                      onChange={(e) => updateStatut(p.user.id, e.target.value)}
                      disabled={saving === p.user.id || p.valide}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: `2px solid ${statutColor[p.statut] || "#ddd"}`,
                        color: statutColor[p.statut] || "#333",
                        fontWeight: "bold",
                        fontSize: "13px",
                        background: "white",
                        cursor: p.valide ? "not-allowed" : "pointer",
                      }}
                    >
                      {STATUTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    {p.valide ? (
                      <span style={{ color: "#10b981", fontWeight: "bold", fontSize: "18px" }}>✓</span>
                    ) : (
                      <span style={{ color: "#ddd", fontSize: "18px" }}>○</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Liens rapides */}
      <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        {[
          { label: "Feuilles de régie", icon: "📋", href: "/dashboard/pointage/regie/liste", color: "#0070f3" },
          { label: "Rapport journalier", icon: "📅", href: "/dashboard/pointage/rapport?type=JOURNALIER", color: "#10b981" },
          { label: "Rapport hebdomadaire", icon: "📊", href: "/dashboard/pointage/rapport?type=HEBDOMADAIRE", color: "#f59e0b" },
          { label: "Rapport mensuel valorisé", icon: "💰", href: "/dashboard/pointage/rapport?type=MENSUEL_VALORISE", color: "#ef4444" },
        ].map((item) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
            <div style={{
              background: "white",
              borderRadius: "10px",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              borderLeft: `4px solid ${item.color}`,
              cursor: "pointer",
            }}>
              <span style={{ fontSize: "24px" }}>{item.icon}</span>
              <span style={{ fontWeight: "bold", fontSize: "14px", color: "#1a1a1a" }}>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}