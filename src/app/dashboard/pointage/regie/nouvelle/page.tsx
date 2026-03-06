"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Zone = {
  id: string;
  nom: string;
  projet: {
    nom: string;
    code: string;
    contrat: { client: { nom: string } };
  };
};

type Employe = {
  id: string;
  nom: string;
  prenom: string;
  matricule: string | null;
  tauxHoraire: number | null;
  poste: { nom: string } | null;
};

type Materiel = {
  id: string;
  nom: string;
  code: string;
  prixLocationJour: number | null;
  categorie: { nom: string } | null;
};

type LigneMO = {
  userId: string;
  nom: string;
  prenom: string;
  matricule: string | null;
  poste: string;
  heures: number;
  tauxHoraire: number;
  montant: number;
};

type LigneMat = {
  materielId: string;
  nom: string;
  code: string;
  categorie: string;
  joursFactures: number;
  prixLocationJour: number;
  montant: number;
};

export default function NouvelleFeuillePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("mo");
  const [zones, setZones] = useState<Zone[]>([]);
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [materiels, setMateriels] = useState<Materiel[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [zoneId, setZoneId] = useState("");
  const [lignesMO, setLignesMO] = useState<LigneMO[]>([]);
  const [lignesMat, setLignesMat] = useState<LigneMat[]>([]);

  useEffect(() => {
    fetch("/api/zones")
      .then((r) => r.json())
      .then((data) => {
        setZones(Array.isArray(data) ? data : []);
        setLoading(false);
      });
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => setEmployes(Array.isArray(data) ? data.filter((u: any) => u.role === "OUVRIER" || u.role === "CHEF_CHANTIER" || u.role === "SUPERVISEUR") : []));
    fetch("/api/admin/materiel")
      .then((r) => r.json())
      .then((data) => setMateriels(Array.isArray(data) ? data.filter((m: any) => m.statut === "OPERATIONNEL") : []));
  }, []);

  const addEmploye = (emp: Employe) => {
    if (lignesMO.find((l) => l.userId === emp.id)) return;
    setLignesMO((prev) => [...prev, {
      userId: emp.id,
      nom: emp.nom,
      prenom: emp.prenom,
      matricule: emp.matricule,
      poste: emp.poste?.nom || "—",
      heures: 8,
      tauxHoraire: emp.tauxHoraire || 0,
      montant: 8 * (emp.tauxHoraire || 0),
    }]);
  };

  const addMateriel = (mat: Materiel) => {
    if (lignesMat.find((l) => l.materielId === mat.id)) return;
    setLignesMat((prev) => [...prev, {
      materielId: mat.id,
      nom: mat.nom,
      code: mat.code,
      categorie: mat.categorie?.nom || "—",
      joursFactures: 1,
      prixLocationJour: mat.prixLocationJour || 0,
      montant: mat.prixLocationJour || 0,
    }]);
  };

  const updateHeures = (userId: string, heures: number) => {
    setLignesMO((prev) => prev.map((l) =>
      l.userId === userId
        ? { ...l, heures, montant: heures * l.tauxHoraire }
        : l
    ));
  };

  const updateTaux = (userId: string, taux: number) => {
    setLignesMO((prev) => prev.map((l) =>
      l.userId === userId
        ? { ...l, tauxHoraire: taux, montant: l.heures * taux }
        : l
    ));
  };

  const updateJours = (materielId: string, jours: number) => {
    setLignesMat((prev) => prev.map((l) =>
      l.materielId === materielId
        ? { ...l, joursFactures: jours, montant: jours * l.prixLocationJour }
        : l
    ));
  };

  const updatePrix = (materielId: string, prix: number) => {
    setLignesMat((prev) => prev.map((l) =>
      l.materielId === materielId
        ? { ...l, prixLocationJour: prix, montant: l.joursFactures * prix }
        : l
    ));
  };

  const removeMO = (userId: string) => setLignesMO((prev) => prev.filter((l) => l.userId !== userId));
  const removeMat = (materielId: string) => setLignesMat((prev) => prev.filter((l) => l.materielId !== materielId));

  const totalMO = lignesMO.reduce((sum, l) => sum + l.montant, 0);
  const totalMat = lignesMat.reduce((sum, l) => sum + l.montant, 0);
  const totalHT = totalMO + totalMat;
  const tva = totalHT * 0.20;
  const totalTTC = totalHT + tva;

  const handleSave = async () => {
    if (!zoneId) { setError("Sélectionnez une zone"); return; }
    if (lignesMO.length === 0 && lignesMat.length === 0) { setError("Ajoutez au moins un employé ou un matériel"); return; }

    setSaving(true);
    setError("");

    const res = await fetch("/api/pointage/regie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        zoneId,
        lignes: lignesMO.map((l) => ({
          userId: l.userId,
          heures: l.heures,
          tauxHoraire: l.tauxHoraire,
          montant: l.montant,
        })),
        affectationsMat: lignesMat.map((l) => ({
          materielId: l.materielId,
          dateDebut: date,
          joursFactures: l.joursFactures,
          prixLocationJour: l.prixLocationJour,
          montant: l.montant,
        })),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur");
      setSaving(false);
      return;
    }

    router.push("/dashboard/pointage");
  };

  const zoneSelectionnee = zones.find((z) => z.id === zoneId);

  const inputStyle = {
    padding: "6px 10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "13px",
    width: "100%",
    boxSizing: "border-box" as const,
  };

  if (loading) return (
    <div style={{ padding: 40, textAlign: "center", color: "#999" }}>Chargement...</div>
  );

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" }}>
            📋 Nouvelle feuille de régie
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            {zoneSelectionnee ? `${zoneSelectionnee.projet.client?.nom || zoneSelectionnee.projet.contrat.client.nom} · ${zoneSelectionnee.projet.code} · ${zoneSelectionnee.nom}` : "Sélectionnez une zone pour commencer"}
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/pointage")}
          style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer", fontSize: "14px" }}
        >
          ← Retour
        </button>
      </div>

      {/* Sélection date et zone */}
      <div style={{ background: "white", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", display: "flex", gap: "16px", alignItems: "flex-end", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
        <div>
          <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>DATE</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "11px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "4px" }}>ZONE</label>
          <select value={zoneId} onChange={(e) => setZoneId(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}>
            <option value="">— Sélectionner une zone —</option>
            {zones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.nom} — {z.projet.code} ({z.projet.contrat.client.nom})
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "12px 16px", marginBottom: "16px", color: "#dc2626", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{ display: "flex", borderBottom: "2px solid #e5e7eb" }}>
          {[
            { id: "mo", label: `👷 Main d'œuvre (${lignesMO.length})`, color: "#0070f3" },
            { id: "materiel", label: `🔧 Matériel (${lignesMat.length})`, color: "#f59e0b" },
            { id: "recap", label: "📊 Récapitulatif", color: "#10b981" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1,
              padding: "14px 20px",
              border: "none",
              background: "transparent",
              borderBottom: activeTab === tab.id ? `3px solid ${tab.color}` : "3px solid transparent",
              color: activeTab === tab.id ? tab.color : "#666",
              fontWeight: activeTab === tab.id ? "bold" : "normal",
              cursor: "pointer",
              fontSize: "14px",
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "20px" }}>

          {/* TAB MAIN D'OEUVRE */}
          {activeTab === "mo" && (
            <div>
              {/* Sélecteur employés */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "8px" }}>
                  AJOUTER UN EMPLOYÉ
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {employes
                    .filter((e) => !lignesMO.find((l) => l.userId === e.id))
                    .map((e) => (
                      <button key={e.id} onClick={() => addEmploye(e)} style={{
                        padding: "6px 14px",
                        background: "#f0f9ff",
                        border: "1px solid #0070f3",
                        borderRadius: "20px",
                        color: "#0070f3",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}>
                        + {e.nom} {e.prenom}
                      </button>
                    ))}
                  {employes.filter((e) => !lignesMO.find((l) => l.userId === e.id)).length === 0 && (
                    <span style={{ color: "#999", fontSize: "13px" }}>Tous les employés sont ajoutés</span>
                  )}
                </div>
              </div>

              {/* Table MO */}
              {lignesMO.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#999", background: "#f8fafc", borderRadius: "8px" }}>
                  Cliquez sur un employé ci-dessus pour l'ajouter
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                      <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>EMPLOYÉ</th>
                      <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>POSTE</th>
                      <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>HEURES</th>
                      <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>TAUX (DH/H)</th>
                      <th style={{ padding: "10px 12px", textAlign: "right", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MONTANT</th>
                      <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>—</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lignesMO.map((l) => (
                      <tr key={l.userId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "10px 12px" }}>
                          <div style={{ fontWeight: "bold", fontSize: "14px" }}>{l.nom} {l.prenom}</div>
                          <div style={{ fontSize: "11px", color: "#999" }}>{l.matricule || "—"}</div>
                        </td>
                        <td style={{ padding: "10px 12px", fontSize: "13px", color: "#555" }}>{l.poste}</td>
                        <td style={{ padding: "10px 12px", textAlign: "center" }}>
                          <input
                            type="number"
                            value={l.heures}
                            min={0.5}
                            max={24}
                            step={0.5}
                            onChange={(e) => updateHeures(l.userId, parseFloat(e.target.value) || 0)}
                            style={{ ...inputStyle, width: "80px", textAlign: "center" }}
                          />
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "center" }}>
                          <input
                            type="number"
                            value={l.tauxHoraire}
                            min={0}
                            step={0.5}
                            onChange={(e) => updateTaux(l.userId, parseFloat(e.target.value) || 0)}
                            style={{ ...inputStyle, width: "90px", textAlign: "center" }}
                          />
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: "bold", color: "#0070f3", fontSize: "14px" }}>
                          {l.montant.toFixed(2)} DH
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "center" }}>
                          <button onClick={() => removeMO(l.userId)} style={{
                            background: "#fee2e2", color: "#ef4444", border: "none",
                            borderRadius: "4px", cursor: "pointer", padding: "4px 10px", fontSize: "13px",
                          }}>✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: "#f0f9ff", borderTop: "2px solid #e5e7eb" }}>
                      <td colSpan={4} style={{ padding: "10px 12px", fontWeight: "bold", fontSize: "14px" }}>
                        Total Main d'œuvre
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: "bold", color: "#0070f3", fontSize: "16px" }}>
                        {totalMO.toFixed(2)} DH
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          )}

          {/* TAB MATERIEL */}
          {activeTab === "materiel" && (
            <div>
              {/* Sélecteur matériel */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "8px" }}>
                  AJOUTER DU MATÉRIEL
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {materiels
                    .filter((m) => !lignesMat.find((l) => l.materielId === m.id))
                    .map((m) => (
                      <button key={m.id} onClick={() => addMateriel(m)} style={{
                        padding: "6px 14px",
                        background: "#fffbeb",
                        border: "1px solid #f59e0b",
                        borderRadius: "20px",
                        color: "#d97706",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}>
                        + {m.nom} ({m.code})
                      </button>
                    ))}
                  {materiels.filter((m) => !lignesMat.find((l) => l.materielId === m.id)).length === 0 && (
                    <span style={{ color: "#999", fontSize: "13px" }}>Tout le matériel est ajouté</span>
                  )}
                </div>
              </div>

              {/* Table matériel */}
              {lignesMat.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#999", background: "#f8fafc", borderRadius: "8px" }}>
                  Cliquez sur un équipement ci-dessus pour l'ajouter
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                      <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MATÉRIEL</th>
                      <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>CATÉGORIE</th>
                      <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>JOURS FACTURÉS</th>
                      <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>PRIX/JOUR (DH)</th>
                      <th style={{ padding: "10px 12px", textAlign: "right", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MONTANT</th>
                      <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>—</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lignesMat.map((l) => (
                      <tr key={l.materielId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "10px 12px" }}>
                          <div style={{ fontWeight: "bold", fontSize: "14px" }}>{l.nom}</div>
                          <div style={{ fontSize: "11px", color: "#999" }}>{l.code}</div>
                        </td>
                        <td style={{ padding: "10px 12px", fontSize: "13px", color: "#555" }}>{l.categorie}</td>
                        <td style={{ padding: "10px 12px", textAlign: "center" }}>
                          <input
                            type="number"
                            value={l.joursFactures}
                            min={0.5}
                            max={31}
                            step={0.5}
                            onChange={(e) => updateJours(l.materielId, parseFloat(e.target.value) || 0)}
                            style={{ ...inputStyle, width: "80px", textAlign: "center" }}
                          />
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "center" }}>
                          <input
                            type="number"
                            value={l.prixLocationJour}
                            min={0}
                            step={1}
                            onChange={(e) => updatePrix(l.materielId, parseFloat(e.target.value) || 0)}
                            style={{ ...inputStyle, width: "100px", textAlign: "center" }}
                          />
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: "bold", color: "#f59e0b", fontSize: "14px" }}>
                          {l.montant.toFixed(2)} DH
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "center" }}>
                          <button onClick={() => removeMat(l.materielId)} style={{
                            background: "#fee2e2", color: "#ef4444", border: "none",
                            borderRadius: "4px", cursor: "pointer", padding: "4px 10px", fontSize: "13px",
                          }}>✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: "#fffbeb", borderTop: "2px solid #e5e7eb" }}>
                      <td colSpan={4} style={{ padding: "10px 12px", fontWeight: "bold", fontSize: "14px" }}>
                        Total Matériel
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: "bold", color: "#f59e0b", fontSize: "16px" }}>
                        {totalMat.toFixed(2)} DH
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          )}

          {/* TAB RECAP */}
          {activeTab === "recap" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>

                {/* Résumé MO */}
                <div style={{ background: "#f0f9ff", borderRadius: "10px", padding: "20px", border: "1px solid #bae6fd" }}>
                  <h4 style={{ margin: "0 0 16px", color: "#0369a1", fontSize: "15px" }}>👷 Main d'œuvre</h4>
                  {lignesMO.length === 0 ? (
                    <p style={{ color: "#999", fontSize: "13px" }}>Aucun employé ajouté</p>
                  ) : (
                    <>
                      {lignesMO.map((l) => (
                        <div key={l.userId} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                          <span>{l.nom} {l.prenom} — {l.heures}h</span>
                          <span style={{ fontWeight: "bold" }}>{l.montant.toFixed(2)} DH</span>
                        </div>
                      ))}
                      <div style={{ borderTop: "1px solid #bae6fd", paddingTop: "8px", display: "flex", justifyContent: "space-between", fontWeight: "bold", color: "#0070f3" }}>
                        <span>Sous-total MO</span>
                        <span>{totalMO.toFixed(2)} DH</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Résumé Matériel */}
                <div style={{ background: "#fffbeb", borderRadius: "10px", padding: "20px", border: "1px solid #fde68a" }}>
                  <h4 style={{ margin: "0 0 16px", color: "#d97706", fontSize: "15px" }}>🔧 Matériel</h4>
                  {lignesMat.length === 0 ? (
                    <p style={{ color: "#999", fontSize: "13px" }}>Aucun matériel ajouté</p>
                  ) : (
                    <>
                      {lignesMat.map((l) => (
                        <div key={l.materielId} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                          <span>{l.nom} — {l.joursFactures}j</span>
                          <span style={{ fontWeight: "bold" }}>{l.montant.toFixed(2)} DH</span>
                        </div>
                      ))}
                      <div style={{ borderTop: "1px solid #fde68a", paddingTop: "8px", display: "flex", justifyContent: "space-between", fontWeight: "bold", color: "#f59e0b" }}>
                        <span>Sous-total Matériel</span>
                        <span>{totalMat.toFixed(2)} DH</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Total général */}
              <div style={{ background: "white", borderRadius: "10px", padding: "20px", border: "2px solid #0070f3" }}>
                <h4 style={{ margin: "0 0 16px", color: "#1a1a1a", fontSize: "16px" }}>💰 Total Général</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { label: "Total Main d'œuvre", value: totalMO, color: "#0070f3" },
                    { label: "Total Matériel", value: totalMat, color: "#f59e0b" },
                    { label: "Total HT", value: totalHT, color: "#1a1a1a", bold: true },
                    { label: "TVA (20%)", value: tva, color: "#6b7280" },
                    { label: "Total TTC", value: totalTTC, color: "#0070f3", bold: true, large: true },
                  ].map((item) => (
                    <div key={item.label} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: item.large ? "12px 0" : "4px 0",
                      borderTop: item.bold ? "1px solid #e5e7eb" : "none",
                    }}>
                      <span style={{ fontSize: item.large ? "16px" : "14px", fontWeight: item.bold ? "bold" : "normal", color: "#333" }}>
                        {item.label}
                      </span>
                      <span style={{ fontSize: item.large ? "20px" : "14px", fontWeight: "bold", color: item.color }}>
                        {item.value.toFixed(2)} DH
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              
            </div>
          )}
        </div>
      </div>
      {/* Bouton sauvegarder — toujours visible */}
      <div style={{ 
        display: "flex", gap: "12px", justifyContent: "flex-end", 
        marginTop: "20px", 
        background: "white", borderRadius: "10px", 
        padding: "16px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" 
      }}>
        <div style={{ flex: 1, fontSize: "13px", color: "#666", alignSelf: "center" }}>
          {lignesMO.length > 0 || lignesMat.length > 0 ? (
            <span>
              <strong style={{ color: "#0070f3" }}>{lignesMO.length} employé{lignesMO.length > 1 ? "s" : ""}</strong>
              {lignesMat.length > 0 && <span> · <strong style={{ color: "#f59e0b" }}>{lignesMat.length} matériel{lignesMat.length > 1 ? "s" : ""}</strong></span>}
              {" · "}
              <strong style={{ color: "#10b981" }}>Total : {totalHT.toFixed(2)} DH HT</strong>
            </span>
          ) : (
            <span style={{ color: "#ccc" }}>Aucun élément ajouté</span>
          )}
        </div>
        <button
          onClick={() => router.push("/dashboard/pointage")}
          style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "14px" }}
        >
          Annuler
        </button>
        <button
          onClick={handleSave}
          disabled={saving || (!lignesMO.length && !lignesMat.length) || !zoneId}
          style={{ 
            padding: "10px 28px", 
            background: saving || (!lignesMO.length && !lignesMat.length) || !zoneId ? "#ccc" : "#0070f3", 
            color: "white", border: "none", borderRadius: "8px", cursor: "pointer", 
            fontSize: "14px", fontWeight: "bold" 
          }}
        >
          {saving ? "Sauvegarde..." : "✓ Enregistrer la feuille"}
        </button>
      </div>
    </div>
  );
}