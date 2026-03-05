"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type Tarif = {
  id: string;
  type: string;
  unite: string;
  tauxFacture: number;
  tauxRevient: number | null;
  poste: { id: string; nom: string } | null;
  materiel: { id: string; nom: string; code: string } | null;
};

type Contrat = {
  id: string;
  numero: string;
  objet: string;
  client: { nom: string };
};

type Ref = {
  postes: { id: string; nom: string }[];
};

type Materiel = {
  id: string;
  nom: string;
  code: string;
};

export default function TarifsContratPage() {
  const params = useParams();
  const router = useRouter();
  const [contrat, setContrat] = useState<Contrat | null>(null);
  const [tarifs, setTarifs] = useState<Tarif[]>([]);
  const [postes, setPostes] = useState<{ id: string; nom: string }[]>([]);
  const [materiels, setMateriels] = useState<Materiel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const emptyForm = {
    type: "MO",
    posteId: "",
    materielId: "",
    tauxFacture: "",
    tauxRevient: "",
    unite: "HEURE",
  };
  const [form, setForm] = useState<any>(emptyForm);

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    const [contratsRes, tarifsRes, refsRes, materielsRes] = await Promise.all([
      fetch("/api/admin/contrats").then((r) => r.json()),
      fetch(`/api/admin/contrats/${params.id}/tarifs`).then((r) => r.json()),
      fetch("/api/ref").then((r) => r.json()),
      fetch("/api/admin/materiel").then((r) => r.json()),
    ]);

    const contratFound = Array.isArray(contratsRes)
      ? contratsRes.find((c: Contrat) => c.id === params.id)
      : null;

    setContrat(contratFound || null);
    setTarifs(Array.isArray(tarifsRes) ? tarifsRes : []);
    setPostes(refsRes.postes || []);
    setMateriels(Array.isArray(materielsRes) ? materielsRes : []);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!form.tauxFacture) {
      setError("Taux facturable obligatoire");
      return;
    }
    if (form.type === "MO" && !form.posteId) {
      setError("Sélectionnez un poste");
      return;
    }
    if (form.type === "MATERIEL" && !form.materielId) {
      setError("Sélectionnez un matériel");
      return;
    }

    setSaving(true);
    setError("");

    const res = await fetch(`/api/admin/contrats/${params.id}/tarifs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur");
      setSaving(false);
      return;
    }

    await loadData();
    setShowModal(false);
    setForm(emptyForm);
    setSaving(false);
  };

  const handleDelete = async (tarifId: string) => {
    if (!confirm("Supprimer ce tarif ?")) return;
    await fetch(`/api/admin/contrats/${params.id}/tarifs?tarifId=${tarifId}`, {
      method: "DELETE",
    });
    await loadData();
  };

  const tarifsMO = tarifs.filter((t) => t.type === "MO");
  const tarifsMat = tarifs.filter((t) => t.type === "MATERIEL");

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontSize: "11px",
    fontWeight: "bold" as const,
    color: "#666",
    marginBottom: "4px",
    display: "block",
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
            💰 Tarifs du contrat
          </h1>
          {contrat && (
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
              {contrat.numero} — {contrat.objet} · {contrat.client.nom}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => router.push("/dashboard/admin/contrats")}
            style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "6px", background: "white", cursor: "pointer", fontSize: "14px" }}
          >
            ← Retour
          </button>
          <button
            onClick={() => { setForm(emptyForm); setShowModal(true); }}
            style={{ background: "#0070f3", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}
          >
            + Ajouter un tarif
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "10px", padding: "14px 18px", marginBottom: "20px", fontSize: "13px", color: "#0369a1" }}>
        💡 Les tarifs définis ici seront utilisés automatiquement pour la valorisation des feuilles de régie.
        Le taux facturable est le prix facturé au client. Le taux de revient est votre coût interne (optionnel).
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        {/* Tarifs MO */}
        <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: "15px" }}>👷 Main d'œuvre</div>
            <span style={{ background: "#f0f9ff", color: "#0070f3", padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
              {tarifsMO.length} tarif(s)
            </span>
          </div>

          {tarifsMO.length === 0 ? (
            <div style={{ padding: "30px", textAlign: "center", color: "#999", fontSize: "13px" }}>
              Aucun tarif MO défini
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>POSTE</th>
                  <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>TAUX CLIENT</th>
                  <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>TAUX REVIENT</th>
                  <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MARGE</th>
                  <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>—</th>
                </tr>
              </thead>
              <tbody>
                {tarifsMO.map((t) => {
                  const marge = t.tauxRevient ? t.tauxFacture - t.tauxRevient : null;
                  const margePercent = t.tauxRevient ? ((marge! / t.tauxFacture) * 100).toFixed(1) : null;
                  return (
                    <tr key={t.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px 16px", fontWeight: "bold", fontSize: "14px" }}>
                        {t.poste?.nom || "—"}
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: "bold", color: "#0070f3" }}>
                        {t.tauxFacture} DH/h
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "center", fontSize: "13px", color: "#666" }}>
                        {t.tauxRevient ? `${t.tauxRevient} DH/h` : "—"}
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "center" }}>
                        {marge !== null ? (
                          <span style={{ background: "#f0fdf4", color: "#10b981", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                            +{marge.toFixed(2)} DH ({margePercent}%)
                          </span>
                        ) : <span style={{ color: "#ccc" }}>—</span>}
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "center" }}>
                        <button
                          onClick={() => handleDelete(t.id)}
                          style={{ background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "4px", cursor: "pointer", padding: "4px 10px", fontSize: "13px" }}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Tarifs Matériel */}
        <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: "15px" }}>🔧 Matériel</div>
            <span style={{ background: "#fffbeb", color: "#f59e0b", padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
              {tarifsMat.length} tarif(s)
            </span>
          </div>

          {tarifsMat.length === 0 ? (
            <div style={{ padding: "30px", textAlign: "center", color: "#999", fontSize: "13px" }}>
              Aucun tarif matériel défini
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MATÉRIEL</th>
                  <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>PRIX CLIENT</th>
                  <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>COÛT REVIENT</th>
                  <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>MARGE</th>
                  <th style={{ padding: "10px 16px", textAlign: "center", fontSize: "12px", color: "#666", fontWeight: "bold" }}>—</th>
                </tr>
              </thead>
              <tbody>
                {tarifsMat.map((t) => {
                  const marge = t.tauxRevient ? t.tauxFacture - t.tauxRevient : null;
                  const margePercent = t.tauxRevient ? ((marge! / t.tauxFacture) * 100).toFixed(1) : null;
                  return (
                    <tr key={t.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px 16px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "14px" }}>{t.materiel?.nom || "—"}</div>
                        <div style={{ fontSize: "11px", color: "#999" }}>{t.materiel?.code}</div>
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: "bold", color: "#f59e0b" }}>
                        {t.tauxFacture} DH/j
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "center", fontSize: "13px", color: "#666" }}>
                        {t.tauxRevient ? `${t.tauxRevient} DH/j` : "—"}
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "center" }}>
                        {marge !== null ? (
                          <span style={{ background: "#f0fdf4", color: "#10b981", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                            +{marge.toFixed(2)} DH ({margePercent}%)
                          </span>
                        ) : <span style={{ color: "#ccc" }}>—</span>}
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "center" }}>
                        <button
                          onClick={() => handleDelete(t.id)}
                          style={{ background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "4px", cursor: "pointer", padding: "4px 10px", fontSize: "13px" }}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "28px", width: "480px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: "bold" }}>
              Nouveau tarif
            </h3>

            {error && (
              <div style={{ background: "#fee2e2", borderRadius: "6px", padding: "10px 14px", marginBottom: "16px", color: "#dc2626", fontSize: "13px" }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={labelStyle}>TYPE DE TARIF</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {["MO", "MATERIEL"].map((t) => (
                    <button key={t} onClick={() => setForm({ ...form, type: t, unite: t === "MO" ? "HEURE" : "JOUR" })} style={{
                      flex: 1, padding: "10px", border: `2px solid ${form.type === t ? "#0070f3" : "#ddd"}`,
                      borderRadius: "8px", background: form.type === t ? "#f0f9ff" : "white",
                      color: form.type === t ? "#0070f3" : "#333", cursor: "pointer", fontWeight: "bold",
                    }}>
                      {t === "MO" ? "👷 Main d'œuvre" : "🔧 Matériel"}
                    </button>
                  ))}
                </div>
              </div>

              {form.type === "MO" && (
                <div>
                  <label style={labelStyle}>POSTE <span style={{ color: "#ef4444" }}>*</span></label>
                  <select style={inputStyle} value={form.posteId} onChange={(e) => setForm({ ...form, posteId: e.target.value })}>
                    <option value="">— Sélectionner un poste —</option>
                    {postes.map((p) => <option key={p.id} value={p.id}>{p.nom}</option>)}
                  </select>
                </div>
              )}

              {form.type === "MATERIEL" && (
                <div>
                  <label style={labelStyle}>MATÉRIEL <span style={{ color: "#ef4444" }}>*</span></label>
                  <select style={inputStyle} value={form.materielId} onChange={(e) => setForm({ ...form, materielId: e.target.value })}>
                    <option value="">— Sélectionner un matériel —</option>
                    {materiels.map((m) => <option key={m.id} value={m.id}>{m.nom} ({m.code})</option>)}
                  </select>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>
                    TAUX FACTURABLE CLIENT (DH/{form.type === "MO" ? "h" : "j"}) <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input type="number" style={inputStyle} value={form.tauxFacture}
                    onChange={(e) => setForm({ ...form, tauxFacture: e.target.value })}
                    placeholder="0.00" min={0} step={0.5} />
                </div>
                <div>
                  <label style={labelStyle}>
                    TAUX DE REVIENT INTERNE (DH/{form.type === "MO" ? "h" : "j"})
                  </label>
                  <input type="number" style={inputStyle} value={form.tauxRevient}
                    onChange={(e) => setForm({ ...form, tauxRevient: e.target.value })}
                    placeholder="Optionnel" min={0} step={0.5} />
                </div>
              </div>

              {/* Aperçu marge */}
              {form.tauxFacture && form.tauxRevient && (
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "12px 16px" }}>
                  <div style={{ fontSize: "13px", color: "#166534", fontWeight: "bold" }}>
                    Marge : {(parseFloat(form.tauxFacture) - parseFloat(form.tauxRevient)).toFixed(2)} DH
                    ({((( parseFloat(form.tauxFacture) - parseFloat(form.tauxRevient)) / parseFloat(form.tauxFacture)) * 100).toFixed(1)}%)
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px" }}>
              <button onClick={() => { setShowModal(false); setError(""); }}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "14px" }}>
                Annuler
              </button>
              <button onClick={handleSubmit} disabled={saving}
                style={{ padding: "10px 20px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}>
                {saving ? "Sauvegarde..." : "Ajouter le tarif"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}