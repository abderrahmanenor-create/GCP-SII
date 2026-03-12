"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type EPI = {
  id: string;
  nom: string;
  reference: string | null;
  marque: string | null;
  norme: string | null;
  categorieSec: string;
  stockActuel: number;
  stockInitial: number;
  seuilAlerte: number;
  prixUnitaire: number | null;
  dureeVieAns: number | null;
  nbLavagesMax: number | null;
  vgpRequise: boolean;
  vgpPeriodeMois: number | null;
  datePeremption: string | null;
  categorie: { id: string; nom: string } | null;
  _count: { distributions: number; mouvements: number };
  distributions: { id: string }[];
};

const CATEGORIES_SEC: Record<string, { label: string; color: string; bg: string }> = {
  "I":   { label: "Cat. I — Risques mineurs",  color: "#10b981", bg: "#f0fdf4" },
  "II":  { label: "Cat. II — Risques moyens",  color: "#f59e0b", bg: "#fffbeb" },
  "III": { label: "Cat. III — Risques graves", color: "#ef4444", bg: "#fef2f2" },
};

const EPI_TYPES = [
  "Casque de chantier", "Harnais antichute", "Gants mécaniques",
  "Gants chimiques", "Chaussures sécurité", "Gilet haute visibilité",
  "Masque FFP2", "Masque FFP3", "Lunettes protection",
  "Protection auditive", "Longe antichute", "Autre"
];

export default function EPIStockPage() {
  const router = useRouter();
  const [epis, setEpis] = useState<EPI[]>([]);
  const [categories, setCategories] = useState<{ id: string; nom: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showMouvModal, setShowMouvModal] = useState<EPI | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filtreAlerte, setFiltreAlerte] = useState(false);

  const emptyForm = {
    nom: "", reference: "", marque: "", taille: "", norme: "",
    categorieSec: "II", stockInitial: "0", seuilAlerte: "5",
    prixUnitaire: "", categorieId: "", dureeVieAns: "",
    nbLavagesMax: "", vgpRequise: false, vgpPeriodeMois: "12",
    datePeremption: "",
  };
  const [form, setForm] = useState<any>(emptyForm);
  const [mouvForm, setMouvForm] = useState({ type: "ENTREE", quantite: "1", motif: "" });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const [episRes, refsRes] = await Promise.all([
      fetch("/api/epi/stock").then(r => r.json()),
      fetch("/api/ref").then(r => r.json()),
    ]);
    setEpis(Array.isArray(episRes) ? episRes : []);
    setCategories(refsRes.categoriesEPI || []);
    setLoading(false);
  };

  // Auto-remplir normes selon type EPI
  const handleNomChange = (nom: string) => {
    const defaults: Record<string, any> = {
      "Casque de chantier":     { norme: "EN 397",   categorieSec: "II",  dureeVieAns: "4", vgpRequise: false },
      "Harnais antichute":      { norme: "EN 361",   categorieSec: "III", dureeVieAns: "5", vgpRequise: true,  vgpPeriodeMois: "12" },
      "Gants mécaniques":       { norme: "EN 388",   categorieSec: "II",  dureeVieAns: "2", vgpRequise: false },
      "Gants chimiques":        { norme: "EN 374",   categorieSec: "III", dureeVieAns: "2", vgpRequise: false },
      "Chaussures sécurité":    { norme: "EN 20345", categorieSec: "II",  dureeVieAns: "3", vgpRequise: false },
      "Gilet haute visibilité": { norme: "EN 20471", categorieSec: "II",  dureeVieAns: "3", nbLavagesMax: "25", vgpRequise: false },
      "Masque FFP2":            { norme: "EN 149",   categorieSec: "III", dureeVieAns: "1", vgpRequise: false },
      "Masque FFP3":            { norme: "EN 149",   categorieSec: "III", dureeVieAns: "1", vgpRequise: false },
      "Lunettes protection":    { norme: "EN 166",   categorieSec: "II",  dureeVieAns: "3", vgpRequise: false },
      "Protection auditive":    { norme: "EN 352",   categorieSec: "II",  dureeVieAns: "2", vgpRequise: false },
      "Longe antichute":        { norme: "EN 354",   categorieSec: "III", dureeVieAns: "5", vgpRequise: true,  vgpPeriodeMois: "12" },
    };
    setForm({ ...form, nom, ...(defaults[nom] || {}) });
  };

  const handleSubmit = async () => {
    if (!form.nom) { setError("Nom obligatoire"); return; }
    setSaving(true); setError("");
    const res = await fetch("/api/epi/stock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) { const d = await res.json(); setError(d.error); setSaving(false); return; }
    await loadData();
    setShowModal(false);
    setForm(emptyForm);
    setSaving(false);
  };

  const handleMouvement = async () => {
    if (!showMouvModal) return;
    setSaving(true);
    await fetch("/api/epi/stock", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: showMouvModal.id, action: "MOUVEMENT", ...mouvForm }),
    });
    await loadData();
    setShowMouvModal(null);
    setMouvForm({ type: "ENTREE", quantite: "1", motif: "" });
    setSaving(false);
  };

  const episFiltres = epis.filter(e => {
    const matchSearch = e.nom.toLowerCase().includes(search.toLowerCase()) ||
      (e.reference || "").toLowerCase().includes(search.toLowerCase());
    const matchAlerte = !filtreAlerte || e.stockActuel <= e.seuilAlerte;
    return matchSearch && matchAlerte;
  });

  const totalAlertes = epis.filter(e => e.stockActuel <= e.seuilAlerte).length;

  const inputStyle = {
    width: "100%", padding: "8px 12px", border: "1px solid #ddd",
    borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" as const,
  };
  const labelStyle = {
    fontSize: "11px", fontWeight: "bold" as const, color: "#666",
    marginBottom: "4px", display: "block",
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#999" }}>Chargement...</div>;

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" }}>
            🦺 Stock EPI
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            Gestion des équipements de protection individuelle
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => router.push("/dashboard/epi/distribution")}
            style={{ padding: "10px 18px", background: "#f0fdf4", border: "1px solid #10b981", borderRadius: "8px", color: "#10b981", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
            👷 Dotations ouvriers
          </button>
          <button onClick={() => { setForm(emptyForm); setShowModal(true); }}
            style={{ background: "#0070f3", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>
            + Nouvel EPI
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Total EPI", value: epis.length, color: "#0070f3", bg: "#f0f9ff", icon: "📦" },
          { label: "En alerte stock", value: totalAlertes, color: "#ef4444", bg: "#fef2f2", icon: "⚠️" },
          { label: "Distribués actifs", value: epis.reduce((a, e) => a + e.distributions.length, 0), color: "#f59e0b", bg: "#fffbeb", icon: "👷" },
          { label: "Nécessitent VGP", value: epis.filter(e => e.vgpRequise).length, color: "#6366f1", bg: "#f5f3ff", icon: "🔍" },
        ].map(item => (
          <div key={item.label} style={{ background: item.bg, borderRadius: "10px", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>{item.icon}</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: item.color }}>{item.value}</div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ background: "white", borderRadius: "10px", padding: "16px 20px", marginBottom: "16px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type="text" placeholder="🔍 Rechercher un EPI..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: 1, maxWidth: "300px" }}
        />
        <button
          onClick={() => setFiltreAlerte(!filtreAlerte)}
          style={{
            padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer",
            background: filtreAlerte ? "#ef4444" : "#f4f6f9",
            color: filtreAlerte ? "white" : "#666",
            fontWeight: "bold", fontSize: "13px",
          }}>
          ⚠️ Alertes stock ({totalAlertes})
        </button>
        <span style={{ color: "#999", fontSize: "13px" }}>{episFiltres.length} EPI trouvé(s)</span>
      </div>

      {/* Tableau */}
      <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        {episFiltres.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#999" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🦺</div>
            <div style={{ fontSize: "16px" }}>Aucun EPI dans le stock</div>
            <button onClick={() => setShowModal(true)} style={{ marginTop: "16px", padding: "10px 20px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
              + Ajouter un EPI
            </button>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                {["EPI", "NORME", "CATÉGORIE", "STOCK", "DURÉE VIE", "VGP", "DISTRIBUÉS", "ACTIONS"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: h === "STOCK" || h === "DISTRIBUÉS" ? "center" : "left", fontSize: "12px", color: "#666", fontWeight: "bold" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {episFiltres.map(epi => {
                const alerte = epi.stockActuel <= epi.seuilAlerte;
                const cat = CATEGORIES_SEC[epi.categorieSec];
                return (
                  <tr key={epi.id} style={{ borderBottom: "1px solid #f1f5f9", background: alerte ? "#fff5f5" : "white" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{epi.nom}</div>
                      <div style={{ fontSize: "11px", color: "#999" }}>
                        {epi.reference && `Réf: ${epi.reference}`}
                        {epi.marque && ` · ${epi.marque}`}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {epi.norme ? (
                        <span style={{ background: "#f0f9ff", color: "#0070f3", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                          {epi.norme}
                        </span>
                      ) : <span style={{ color: "#ccc" }}>—</span>}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: cat?.bg, color: cat?.color, padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" }}>
                        Cat. {epi.categorieSec}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                        <span style={{ fontWeight: "bold", fontSize: "18px", color: alerte ? "#ef4444" : "#10b981" }}>
                          {epi.stockActuel}
                        </span>
                        <span style={{ fontSize: "10px", color: "#999" }}>seuil: {epi.seuilAlerte}</span>
                        {alerte && <span style={{ fontSize: "10px", background: "#fee2e2", color: "#ef4444", padding: "1px 6px", borderRadius: "4px" }}>⚠️ ALERTE</span>}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {epi.dureeVieAns ? (
                        <div style={{ fontSize: "13px" }}>
                          <div style={{ fontWeight: "bold" }}>{epi.dureeVieAns} ans</div>
                          {epi.nbLavagesMax && <div style={{ fontSize: "11px", color: "#999" }}>{epi.nbLavagesMax} lavages max</div>}
                        </div>
                      ) : <span style={{ color: "#ccc" }}>—</span>}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {epi.vgpRequise ? (
                        <span style={{ background: "#fef3c7", color: "#d97706", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                          ✓ Annuelle
                        </span>
                      ) : <span style={{ color: "#ccc", fontSize: "12px" }}>Non requise</span>}
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <span style={{ fontWeight: "bold", color: "#f59e0b" }}>
                        {epi.distributions.length}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => setShowMouvModal(epi)}
                          style={{ padding: "5px 10px", background: "#f0f9ff", color: "#0070f3", border: "1px solid #0070f3", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>
                          ± Stock
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal ajout EPI */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, overflowY: "auto" }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "28px", width: "580px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", margin: "20px" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: "bold" }}>Nouvel EPI</h3>

            {error && <div style={{ background: "#fee2e2", borderRadius: "6px", padding: "10px", marginBottom: "16px", color: "#dc2626", fontSize: "13px" }}>{error}</div>}

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>TYPE D'EPI <span style={{ color: "#ef4444" }}>*</span></label>
                  <select style={inputStyle} value={form.nom} onChange={e => handleNomChange(e.target.value)}>
                    <option value="">— Sélectionner —</option>
                    {EPI_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>RÉFÉRENCE</label>
                  <input style={inputStyle} value={form.reference} onChange={e => setForm({ ...form, reference: e.target.value })} placeholder="Ex: REF-001" />
                </div>
                <div>
                  <label style={labelStyle}>MARQUE</label>
                  <input style={inputStyle} value={form.marque} onChange={e => setForm({ ...form, marque: e.target.value })} placeholder="Ex: 3M, MSA..." />
                </div>

                <div>
                  <label style={labelStyle}>TAILLE</label>
                  <input style={inputStyle} value={form.taille} onChange={e => setForm({ ...form, taille: e.target.value })} placeholder="M, L, XL, 42..." />
                </div>
                <div>
                  <label style={labelStyle}>CATÉGORIE EPI</label>
                  <select style={inputStyle} value={form.categorieId} onChange={e => setForm({ ...form, categorieId: e.target.value })}>
                    <option value="">— Catégorie —</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                  </select>
                </div>
              </div>

              {/* Infos normes — auto-remplies */}
              <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "14px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={labelStyle}>NORME</label>
                  <input style={inputStyle} value={form.norme} onChange={e => setForm({ ...form, norme: e.target.value })} placeholder="EN 397..." />
                </div>
                <div>
                  <label style={labelStyle}>CATÉGORIE SÉCURITÉ</label>
                  <select style={inputStyle} value={form.categorieSec} onChange={e => setForm({ ...form, categorieSec: e.target.value })}>
                    <option value="I">I — Risques mineurs</option>
                    <option value="II">II — Risques moyens</option>
                    <option value="III">III — Risques graves</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>DURÉE VIE (ANS)</label>
                  <input type="number" style={inputStyle} value={form.dureeVieAns} onChange={e => setForm({ ...form, dureeVieAns: e.target.value })} placeholder="Ex: 5" />
                </div>
              </div>

              {/* VGP */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 16px", background: form.vgpRequise ? "#fef3c7" : "#f8fafc", borderRadius: "8px", border: `1px solid ${form.vgpRequise ? "#fcd34d" : "#e5e7eb"}` }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
                  <input type="checkbox" checked={form.vgpRequise} onChange={e => setForm({ ...form, vgpRequise: e.target.checked })} />
                  VGP requise (Vérification Générale Périodique)
                </label>
                {form.vgpRequise && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "13px", color: "#666" }}>Périodicité :</span>
                    <input type="number" value={form.vgpPeriodeMois} onChange={e => setForm({ ...form, vgpPeriodeMois: e.target.value })}
                      style={{ ...inputStyle, width: "70px" }} />
                    <span style={{ fontSize: "13px", color: "#666" }}>mois</span>
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>STOCK INITIAL</label>
                  <input type="number" style={inputStyle} value={form.stockInitial} onChange={e => setForm({ ...form, stockInitial: e.target.value })} min={0} />
                </div>
                <div>
                  <label style={labelStyle}>SEUIL ALERTE</label>
                  <input type="number" style={inputStyle} value={form.seuilAlerte} onChange={e => setForm({ ...form, seuilAlerte: e.target.value })} min={0} />
                </div>
                <div>
                  <label style={labelStyle}>PRIX UNITAIRE (DH)</label>
                  <input type="number" style={inputStyle} value={form.prixUnitaire} onChange={e => setForm({ ...form, prixUnitaire: e.target.value })} placeholder="0.00" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>DATE PÉREMPTION FIXE (si applicable)</label>
                <input type="date" style={inputStyle} value={form.datePeremption} onChange={e => setForm({ ...form, datePeremption: e.target.value })} />
              </div>

            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px" }}>
              <button onClick={() => { setShowModal(false); setError(""); }}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={handleSubmit} disabled={saving}
                style={{ padding: "10px 20px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                {saving ? "Sauvegarde..." : "Ajouter l'EPI"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal mouvement stock */}
      {showMouvModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "28px", width: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ margin: "0 0 6px", fontSize: "18px", fontWeight: "bold" }}>Mouvement de stock</h3>
            <p style={{ margin: "0 0 20px", color: "#666", fontSize: "14px" }}>{showMouvModal.nom} — Stock actuel : <strong>{showMouvModal.stockActuel}</strong></p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={labelStyle}>TYPE</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[
                    { value: "ENTREE", label: "📥 Entrée", color: "#10b981" },
                    { value: "SORTIE", label: "📤 Sortie", color: "#ef4444" },
                    { value: "PERTE", label: "🗑️ Perte", color: "#6b7280" },
                  ].map(t => (
                    <button key={t.value} onClick={() => setMouvForm({ ...mouvForm, type: t.value })} style={{
                      flex: 1, padding: "8px", border: `2px solid ${mouvForm.type === t.value ? t.color : "#ddd"}`,
                      borderRadius: "6px", background: mouvForm.type === t.value ? `${t.color}15` : "white",
                      color: mouvForm.type === t.value ? t.color : "#666", cursor: "pointer", fontWeight: "bold", fontSize: "13px",
                    }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>QUANTITÉ</label>
                <input type="number" style={inputStyle} value={mouvForm.quantite}
                  onChange={e => setMouvForm({ ...mouvForm, quantite: e.target.value })} min={1} />
              </div>
              <div>
                <label style={labelStyle}>MOTIF</label>
                <input style={inputStyle} value={mouvForm.motif}
                  onChange={e => setMouvForm({ ...mouvForm, motif: e.target.value })}
                  placeholder="Ex: Réception commande, Perte chantier..." />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}>
              <button onClick={() => setShowMouvModal(null)}
                style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={handleMouvement} disabled={saving}
                style={{ padding: "10px 20px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                {saving ? "..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}