"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Employe = {
  id: string;
  nom: string;
  prenom: string;
  matricule: string | null;
  role: string;
  statut: string;
  photoUrl: string | null;
  poste: { nom: string } | null;
  equipe: { nom: string } | null;
};

const roleColor: Record<string, string> = {
  ADMIN: "#6366f1",
  CHEF_CHANTIER: "#0070f3",
  SUPERVISEUR: "#f59e0b",
  RH: "#10b981",
  OUVRIER: "#6b7280",
  CLIENT: "#ef4444",
  SOUS_TRAITANT: "#8b5cf6",
};

const statutColor: Record<string, string> = {
  ACTIF: "#10b981",
  INACTIF: "#6b7280",
  SUSPENDU: "#ef4444",
};

export default function RhPage() {
  const router = useRouter();
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [filtered, setFiltered] = useState<Employe[]>([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatut, setFilterStatut] = useState("ACTIF");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => {
        setEmployes(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = employes;
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.nom.toLowerCase().includes(s) ||
          e.prenom.toLowerCase().includes(s) ||
          (e.matricule && e.matricule.toLowerCase().includes(s))
      );
    }
    if (filterRole) result = result.filter((e) => e.role === filterRole);
    if (filterStatut) result = result.filter((e) => e.statut === filterStatut);
    setFiltered(result);
  }, [search, filterRole, filterStatut, employes]);

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" }}>
            👥 Ressources Humaines
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            {filtered.length} employé(s) trouvé(s)
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/rh/nouveau")}
          style={{
            background: "#0070f3",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          + Ajouter un employé
        </button>
      </div>

      {/* Filtres */}
      <div style={{
        background: "white",
        borderRadius: "10px",
        padding: "16px 20px",
        marginBottom: "20px",
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
      }}>
        <input
          type="text"
          placeholder="🔍 Rechercher par nom, prénom, matricule..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "250px",
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
        >
          <option value="">Tous les rôles</option>
          {Object.keys(roleColor).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <select
          value={filterStatut}
          onChange={(e) => setFilterStatut(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
        >
          <option value="">Tous les statuts</option>
          <option value="ACTIF">ACTIF</option>
          <option value="INACTIF">INACTIF</option>
          <option value="SUSPENDU">SUSPENDU</option>
        </select>
        {(search || filterRole || filterStatut !== "ACTIF") && (
          <button
            onClick={() => { setSearch(""); setFilterRole(""); setFilterStatut("ACTIF"); }}
            style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer", fontSize: "13px" }}
          >
            ✕ Réinitialiser
          </button>
        )}
      </div>

      {/* Liste */}
      {loading ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>
          Chargement...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#999" }}>
          Aucun employé trouvé
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>EMPLOYÉ</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>POSTE</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>ÉQUIPE</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>RÔLE</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>STATUT</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr
                  key={e.id}
                  style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.background = "white")}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "38px", height: "38px", borderRadius: "50%",
                        background: roleColor[e.role] || "#6b7280",
                        color: "white", display: "flex", alignItems: "center",
                        justifyContent: "center", fontWeight: "bold", fontSize: "15px",
                        flexShrink: 0,
                      }}>
                        {e.photoUrl ? (
                          <img src={e.photoUrl} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                        ) : (
                          e.nom[0].toUpperCase()
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: "bold", fontSize: "14px" }}>{e.nom} {e.prenom}</div>
                        <div style={{ fontSize: "12px", color: "#999" }}>{e.matricule || "Sans matricule"}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#555" }}>
                    {e.poste?.nom || <span style={{ color: "#ccc" }}>—</span>}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#555" }}>
                    {e.equipe?.nom || <span style={{ color: "#ccc" }}>—</span>}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span style={{
                      background: `${roleColor[e.role]}20`,
                      color: roleColor[e.role] || "#333",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}>
                      {e.role}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span style={{
                      background: `${statutColor[e.statut]}20`,
                      color: statutColor[e.statut] || "#333",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}>
                      {e.statut}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button
                      onClick={() => router.push(`/dashboard/rh/${e.id}`)}
                      style={{
                        padding: "6px 14px",
                        background: "#0070f3",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Voir fiche
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}