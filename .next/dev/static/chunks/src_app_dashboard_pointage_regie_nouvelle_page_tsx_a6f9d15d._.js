(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NouvelleFeuillePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function NouvelleFeuillePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("mo");
    const [zones, setZones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [employes, setEmployes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [materiels, setMateriels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().toISOString().split("T")[0]);
    const [zoneId, setZoneId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [lignesMO, setLignesMO] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lignesMat, setLignesMat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NouvelleFeuillePage.useEffect": ()=>{
            fetch("/api/zones").then({
                "NouvelleFeuillePage.useEffect": (r)=>r.json()
            }["NouvelleFeuillePage.useEffect"]).then({
                "NouvelleFeuillePage.useEffect": (data)=>{
                    setZones(Array.isArray(data) ? data : []);
                    setLoading(false);
                }
            }["NouvelleFeuillePage.useEffect"]);
            fetch("/api/users").then({
                "NouvelleFeuillePage.useEffect": (r)=>r.json()
            }["NouvelleFeuillePage.useEffect"]).then({
                "NouvelleFeuillePage.useEffect": (data)=>setEmployes(Array.isArray(data) ? data.filter({
                        "NouvelleFeuillePage.useEffect": (u)=>u.role === "OUVRIER" || u.role === "CHEF_CHANTIER" || u.role === "SUPERVISEUR"
                    }["NouvelleFeuillePage.useEffect"]) : [])
            }["NouvelleFeuillePage.useEffect"]);
            fetch("/api/admin/materiel").then({
                "NouvelleFeuillePage.useEffect": (r)=>r.json()
            }["NouvelleFeuillePage.useEffect"]).then({
                "NouvelleFeuillePage.useEffect": (data)=>setMateriels(Array.isArray(data) ? data.filter({
                        "NouvelleFeuillePage.useEffect": (m)=>m.statut === "OPERATIONNEL"
                    }["NouvelleFeuillePage.useEffect"]) : [])
            }["NouvelleFeuillePage.useEffect"]);
        }
    }["NouvelleFeuillePage.useEffect"], []);
    const addEmploye = (emp)=>{
        if (lignesMO.find((l)=>l.userId === emp.id)) return;
        setLignesMO((prev)=>[
                ...prev,
                {
                    userId: emp.id,
                    nom: emp.nom,
                    prenom: emp.prenom,
                    matricule: emp.matricule,
                    poste: emp.poste?.nom || "—",
                    heures: 8,
                    tauxHoraire: emp.tauxHoraire || 0,
                    montant: 8 * (emp.tauxHoraire || 0)
                }
            ]);
    };
    const addMateriel = (mat)=>{
        if (lignesMat.find((l)=>l.materielId === mat.id)) return;
        setLignesMat((prev)=>[
                ...prev,
                {
                    materielId: mat.id,
                    nom: mat.nom,
                    code: mat.code,
                    categorie: mat.categorie?.nom || "—",
                    joursFactures: 1,
                    prixLocationJour: mat.prixLocationJour || 0,
                    montant: mat.prixLocationJour || 0
                }
            ]);
    };
    const updateHeures = (userId, heures)=>{
        setLignesMO((prev)=>prev.map((l)=>l.userId === userId ? {
                    ...l,
                    heures,
                    montant: heures * l.tauxHoraire
                } : l));
    };
    const updateTaux = (userId, taux)=>{
        setLignesMO((prev)=>prev.map((l)=>l.userId === userId ? {
                    ...l,
                    tauxHoraire: taux,
                    montant: l.heures * taux
                } : l));
    };
    const updateJours = (materielId, jours)=>{
        setLignesMat((prev)=>prev.map((l)=>l.materielId === materielId ? {
                    ...l,
                    joursFactures: jours,
                    montant: jours * l.prixLocationJour
                } : l));
    };
    const updatePrix = (materielId, prix)=>{
        setLignesMat((prev)=>prev.map((l)=>l.materielId === materielId ? {
                    ...l,
                    prixLocationJour: prix,
                    montant: l.joursFactures * prix
                } : l));
    };
    const removeMO = (userId)=>setLignesMO((prev)=>prev.filter((l)=>l.userId !== userId));
    const removeMat = (materielId)=>setLignesMat((prev)=>prev.filter((l)=>l.materielId !== materielId));
    const totalMO = lignesMO.reduce((sum, l)=>sum + l.montant, 0);
    const totalMat = lignesMat.reduce((sum, l)=>sum + l.montant, 0);
    const totalHT = totalMO + totalMat;
    const tva = totalHT * 0.20;
    const totalTTC = totalHT + tva;
    const handleSave = async ()=>{
        if (!zoneId) {
            setError("Sélectionnez une zone");
            return;
        }
        if (lignesMO.length === 0 && lignesMat.length === 0) {
            setError("Ajoutez au moins un employé ou un matériel");
            return;
        }
        setSaving(true);
        setError("");
        const res = await fetch("/api/pointage/regie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date,
                zoneId,
                lignes: lignesMO.map((l)=>({
                        userId: l.userId,
                        heures: l.heures,
                        tauxHoraire: l.tauxHoraire,
                        montant: l.montant
                    })),
                affectationsMat: lignesMat.map((l)=>({
                        materielId: l.materielId,
                        dateDebut: date,
                        joursFactures: l.joursFactures,
                        prixLocationJour: l.prixLocationJour,
                        montant: l.montant
                    }))
            })
        });
        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Erreur");
            setSaving(false);
            return;
        }
        router.push("/dashboard/pointage");
    };
    const zoneSelectionnee = zones.find((z)=>z.id === zoneId);
    const inputStyle = {
        padding: "6px 10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        fontSize: "13px",
        width: "100%",
        boxSizing: "border-box"
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 40,
            textAlign: "center",
            color: "#999"
        },
        children: "Chargement..."
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
        lineNumber: 203,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "24px",
            backgroundColor: "#f4f6f9",
            minHeight: "100vh"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    margin: 0,
                                    fontSize: "22px",
                                    fontWeight: "bold",
                                    color: "#1a1a1a"
                                },
                                children: "📋 Nouvelle feuille de régie"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "4px 0 0",
                                    color: "#666",
                                    fontSize: "14px"
                                },
                                children: zoneSelectionnee ? `${zoneSelectionnee.projet.client?.nom || zoneSelectionnee.projet.contrat.client.nom} · ${zoneSelectionnee.projet.code} · ${zoneSelectionnee.nom}` : "Sélectionnez une zone pour commencer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/dashboard/pointage"),
                        style: {
                            padding: "8px 16px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            background: "white",
                            cursor: "pointer",
                            fontSize: "14px"
                        },
                        children: "← Retour"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    marginBottom: "20px",
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-end",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                    color: "#666",
                                    display: "block",
                                    marginBottom: "4px"
                                },
                                children: "DATE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: date,
                                onChange: (e)=>setDate(e.target.value),
                                style: {
                                    padding: "8px 12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    fontSize: "14px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                    color: "#666",
                                    display: "block",
                                    marginBottom: "4px"
                                },
                                children: "ZONE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: zoneId,
                                onChange: (e)=>setZoneId(e.target.value),
                                style: {
                                    width: "100%",
                                    padding: "8px 12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    fontSize: "14px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "— Sélectionner une zone —"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, this),
                                    zones.map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: z.id,
                                            children: [
                                                z.nom,
                                                " — ",
                                                z.projet.code,
                                                " (",
                                                z.projet.contrat.client.nom,
                                                ")"
                                            ]
                                        }, z.id, true, {
                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#fee2e2",
                    border: "1px solid #fca5a5",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    marginBottom: "16px",
                    color: "#dc2626",
                    fontSize: "14px"
                },
                children: [
                    "⚠️ ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                lineNumber: 249,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            borderBottom: "2px solid #e5e7eb"
                        },
                        children: [
                            {
                                id: "mo",
                                label: `👷 Main d'œuvre (${lignesMO.length})`,
                                color: "#0070f3"
                            },
                            {
                                id: "materiel",
                                label: `🔧 Matériel (${lignesMat.length})`,
                                color: "#f59e0b"
                            },
                            {
                                id: "recap",
                                label: "📊 Récapitulatif",
                                color: "#10b981"
                            }
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(tab.id),
                                style: {
                                    flex: 1,
                                    padding: "14px 20px",
                                    border: "none",
                                    background: "transparent",
                                    borderBottom: activeTab === tab.id ? `3px solid ${tab.color}` : "3px solid transparent",
                                    color: activeTab === tab.id ? tab.color : "#666",
                                    fontWeight: activeTab === tab.id ? "bold" : "normal",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                },
                                children: tab.label
                            }, tab.id, false, {
                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "20px"
                        },
                        children: [
                            activeTab === "mo" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: "16px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                    color: "#666",
                                                    display: "block",
                                                    marginBottom: "8px"
                                                },
                                                children: "AJOUTER UN EMPLOYÉ"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 285,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: "8px"
                                                },
                                                children: [
                                                    employes.filter((e)=>!lignesMO.find((l)=>l.userId === e.id)).map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>addEmploye(e),
                                                            style: {
                                                                padding: "6px 14px",
                                                                background: "#f0f9ff",
                                                                border: "1px solid #0070f3",
                                                                borderRadius: "20px",
                                                                color: "#0070f3",
                                                                cursor: "pointer",
                                                                fontSize: "13px",
                                                                fontWeight: "500"
                                                            },
                                                            children: [
                                                                "+ ",
                                                                e.nom,
                                                                " ",
                                                                e.prenom
                                                            ]
                                                        }, e.id, true, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 292,
                                                            columnNumber: 23
                                                        }, this)),
                                                    employes.filter((e)=>!lignesMO.find((l)=>l.userId === e.id)).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "#999",
                                                            fontSize: "13px"
                                                        },
                                                        children: "Tous les employés sont ajoutés"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 288,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 15
                                    }, this),
                                    lignesMO.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "center",
                                            padding: "40px",
                                            color: "#999",
                                            background: "#f8fafc",
                                            borderRadius: "8px"
                                        },
                                        children: "Cliquez sur un employé ci-dessus pour l'ajouter"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                        lineNumber: 313,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        style: {
                                            width: "100%",
                                            borderCollapse: "collapse"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        background: "#f8fafc",
                                                        borderBottom: "2px solid #e5e7eb"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "left",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "EMPLOYÉ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "left",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "POSTE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "center",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "HEURES"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 322,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "center",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "TAUX (DH/H)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "right",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "MONTANT"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "center",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: lignesMO.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        style: {
                                                            borderBottom: "1px solid #f1f5f9"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontWeight: "bold",
                                                                            fontSize: "14px"
                                                                        },
                                                                        children: [
                                                                            l.nom,
                                                                            " ",
                                                                            l.prenom
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                        lineNumber: 332,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: "11px",
                                                                            color: "#999"
                                                                        },
                                                                        children: l.matricule || "—"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                        lineNumber: 333,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 331,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px",
                                                                    fontSize: "13px",
                                                                    color: "#555"
                                                                },
                                                                children: l.poste
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 335,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px",
                                                                    textAlign: "center"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    value: l.heures,
                                                                    min: 0.5,
                                                                    max: 24,
                                                                    step: 0.5,
                                                                    onChange: (e)=>updateHeures(l.userId, parseFloat(e.target.value) || 0),
                                                                    style: {
                                                                        ...inputStyle,
                                                                        width: "80px",
                                                                        textAlign: "center"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                    lineNumber: 337,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px",
                                                                    textAlign: "center"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    value: l.tauxHoraire,
                                                                    min: 0,
                                                                    step: 0.5,
                                                                    onChange: (e)=>updateTaux(l.userId, parseFloat(e.target.value) || 0),
                                                                    style: {
                                                                        ...inputStyle,
                                                                        width: "90px",
                                                                        textAlign: "center"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                    lineNumber: 348,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px",
                                                                    textAlign: "right",
                                                                    fontWeight: "bold",
                                                                    color: "#0070f3",
                                                                    fontSize: "14px"
                                                                },
                                                                children: [
                                                                    l.montant.toFixed(2),
                                                                    " DH"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 357,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px",
                                                                    textAlign: "center"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>removeMO(l.userId),
                                                                    style: {
                                                                        background: "#fee2e2",
                                                                        color: "#ef4444",
                                                                        border: "none",
                                                                        borderRadius: "4px",
                                                                        cursor: "pointer",
                                                                        padding: "4px 10px",
                                                                        fontSize: "13px"
                                                                    },
                                                                    children: "✕"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                    lineNumber: 361,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 360,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, l.userId, true, {
                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 328,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        background: "#f0f9ff",
                                                        borderTop: "2px solid #e5e7eb"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            colSpan: 4,
                                                            style: {
                                                                padding: "10px 12px",
                                                                fontWeight: "bold",
                                                                fontSize: "14px"
                                                            },
                                                            children: "Total Main d'œuvre"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 371,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "right",
                                                                fontWeight: "bold",
                                                                color: "#0070f3",
                                                                fontSize: "16px"
                                                            },
                                                            children: [
                                                                totalMO.toFixed(2),
                                                                " DH"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 374,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {}, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 377,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 369,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                        lineNumber: 317,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this),
                            activeTab === "materiel" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: "16px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                    color: "#666",
                                                    display: "block",
                                                    marginBottom: "8px"
                                                },
                                                children: "AJOUTER DU MATÉRIEL"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: "8px"
                                                },
                                                children: [
                                                    materiels.filter((m)=>!lignesMat.find((l)=>l.materielId === m.id)).map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>addMateriel(m),
                                                            style: {
                                                                padding: "6px 14px",
                                                                background: "#fffbeb",
                                                                border: "1px solid #f59e0b",
                                                                borderRadius: "20px",
                                                                color: "#d97706",
                                                                cursor: "pointer",
                                                                fontSize: "13px",
                                                                fontWeight: "500"
                                                            },
                                                            children: [
                                                                "+ ",
                                                                m.nom,
                                                                " (",
                                                                m.code,
                                                                ")"
                                                            ]
                                                        }, m.id, true, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 397,
                                                            columnNumber: 23
                                                        }, this)),
                                                    materiels.filter((m)=>!lignesMat.find((l)=>l.materielId === m.id)).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "#999",
                                                            fontSize: "13px"
                                                        },
                                                        children: "Tout le matériel est ajouté"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                        lineNumber: 411,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 393,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                        lineNumber: 389,
                                        columnNumber: 15
                                    }, this),
                                    lignesMat.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "center",
                                            padding: "40px",
                                            color: "#999",
                                            background: "#f8fafc",
                                            borderRadius: "8px"
                                        },
                                        children: "Cliquez sur un équipement ci-dessus pour l'ajouter"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                        lineNumber: 418,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        style: {
                                            width: "100%",
                                            borderCollapse: "collapse"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        background: "#f8fafc",
                                                        borderBottom: "2px solid #e5e7eb"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "left",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "MATÉRIEL"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 425,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "left",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "CATÉGORIE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 426,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "center",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "JOURS FACTURÉS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 427,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "center",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "PRIX/JOUR (DH)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 428,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "right",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "MONTANT"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 429,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "center",
                                                                fontSize: "12px",
                                                                color: "#666",
                                                                fontWeight: "bold"
                                                            },
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 430,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                    lineNumber: 424,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 423,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: lignesMat.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        style: {
                                                            borderBottom: "1px solid #f1f5f9"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontWeight: "bold",
                                                                            fontSize: "14px"
                                                                        },
                                                                        children: l.nom
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                        lineNumber: 437,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: "11px",
                                                                            color: "#999"
                                                                        },
                                                                        children: l.code
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                        lineNumber: 438,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 436,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px",
                                                                    fontSize: "13px",
                                                                    color: "#555"
                                                                },
                                                                children: l.categorie
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 440,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px",
                                                                    textAlign: "center"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    value: l.joursFactures,
                                                                    min: 0.5,
                                                                    max: 31,
                                                                    step: 0.5,
                                                                    onChange: (e)=>updateJours(l.materielId, parseFloat(e.target.value) || 0),
                                                                    style: {
                                                                        ...inputStyle,
                                                                        width: "80px",
                                                                        textAlign: "center"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                    lineNumber: 442,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 441,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px",
                                                                    textAlign: "center"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    value: l.prixLocationJour,
                                                                    min: 0,
                                                                    step: 1,
                                                                    onChange: (e)=>updatePrix(l.materielId, parseFloat(e.target.value) || 0),
                                                                    style: {
                                                                        ...inputStyle,
                                                                        width: "100px",
                                                                        textAlign: "center"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                    lineNumber: 453,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 452,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px",
                                                                    textAlign: "right",
                                                                    fontWeight: "bold",
                                                                    color: "#f59e0b",
                                                                    fontSize: "14px"
                                                                },
                                                                children: [
                                                                    l.montant.toFixed(2),
                                                                    " DH"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 462,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: "10px 12px",
                                                                    textAlign: "center"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>removeMat(l.materielId),
                                                                    style: {
                                                                        background: "#fee2e2",
                                                                        color: "#ef4444",
                                                                        border: "none",
                                                                        borderRadius: "4px",
                                                                        cursor: "pointer",
                                                                        padding: "4px 10px",
                                                                        fontSize: "13px"
                                                                    },
                                                                    children: "✕"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                    lineNumber: 466,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 465,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, l.materielId, true, {
                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 433,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        background: "#fffbeb",
                                                        borderTop: "2px solid #e5e7eb"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            colSpan: 4,
                                                            style: {
                                                                padding: "10px 12px",
                                                                fontWeight: "bold",
                                                                fontSize: "14px"
                                                            },
                                                            children: "Total Matériel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 476,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: "10px 12px",
                                                                textAlign: "right",
                                                                fontWeight: "bold",
                                                                color: "#f59e0b",
                                                                fontSize: "16px"
                                                            },
                                                            children: [
                                                                totalMat.toFixed(2),
                                                                " DH"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 479,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {}, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 474,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                        lineNumber: 422,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                lineNumber: 387,
                                columnNumber: 13
                            }, this),
                            activeTab === "recap" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "20px",
                                            marginBottom: "24px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: "#f0f9ff",
                                                    borderRadius: "10px",
                                                    padding: "20px",
                                                    border: "1px solid #bae6fd"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            margin: "0 0 16px",
                                                            color: "#0369a1",
                                                            fontSize: "15px"
                                                        },
                                                        children: "👷 Main d'œuvre"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 19
                                                    }, this),
                                                    lignesMO.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            color: "#999",
                                                            fontSize: "13px"
                                                        },
                                                        children: "Aucun employé ajouté"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            lignesMO.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        marginBottom: "8px",
                                                                        fontSize: "13px"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                l.nom,
                                                                                " ",
                                                                                l.prenom,
                                                                                " — ",
                                                                                l.heures,
                                                                                "h"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                            lineNumber: 504,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontWeight: "bold"
                                                                            },
                                                                            children: [
                                                                                l.montant.toFixed(2),
                                                                                " DH"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                            lineNumber: 505,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, l.userId, true, {
                                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                    lineNumber: 503,
                                                                    columnNumber: 25
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    borderTop: "1px solid #bae6fd",
                                                                    paddingTop: "8px",
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    fontWeight: "bold",
                                                                    color: "#0070f3"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Sous-total MO"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                        lineNumber: 509,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            totalMO.toFixed(2),
                                                                            " DH"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                        lineNumber: 510,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 496,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: "#fffbeb",
                                                    borderRadius: "10px",
                                                    padding: "20px",
                                                    border: "1px solid #fde68a"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            margin: "0 0 16px",
                                                            color: "#d97706",
                                                            fontSize: "15px"
                                                        },
                                                        children: "🔧 Matériel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 19
                                                    }, this),
                                                    lignesMat.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            color: "#999",
                                                            fontSize: "13px"
                                                        },
                                                        children: "Aucun matériel ajouté"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            lignesMat.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        marginBottom: "8px",
                                                                        fontSize: "13px"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                l.nom,
                                                                                " — ",
                                                                                l.joursFactures,
                                                                                "j"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                            lineNumber: 525,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontWeight: "bold"
                                                                            },
                                                                            children: [
                                                                                l.montant.toFixed(2),
                                                                                " DH"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                            lineNumber: 526,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, l.materielId, true, {
                                                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                    lineNumber: 524,
                                                                    columnNumber: 25
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    borderTop: "1px solid #fde68a",
                                                                    paddingTop: "8px",
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    fontWeight: "bold",
                                                                    color: "#f59e0b"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Sous-total Matériel"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                        lineNumber: 530,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            totalMat.toFixed(2),
                                                                            " DH"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                        lineNumber: 531,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 517,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                        lineNumber: 493,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: "white",
                                            borderRadius: "10px",
                                            padding: "20px",
                                            border: "2px solid #0070f3"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                style: {
                                                    margin: "0 0 16px",
                                                    color: "#1a1a1a",
                                                    fontSize: "16px"
                                                },
                                                children: "💰 Total Général"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 540,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "10px"
                                                },
                                                children: [
                                                    {
                                                        label: "Total Main d'œuvre",
                                                        value: totalMO,
                                                        color: "#0070f3"
                                                    },
                                                    {
                                                        label: "Total Matériel",
                                                        value: totalMat,
                                                        color: "#f59e0b"
                                                    },
                                                    {
                                                        label: "Total HT",
                                                        value: totalHT,
                                                        color: "#1a1a1a",
                                                        bold: true
                                                    },
                                                    {
                                                        label: "TVA (20%)",
                                                        value: tva,
                                                        color: "#6b7280"
                                                    },
                                                    {
                                                        label: "Total TTC",
                                                        value: totalTTC,
                                                        color: "#0070f3",
                                                        bold: true,
                                                        large: true
                                                    }
                                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            padding: item.large ? "12px 0" : "4px 0",
                                                            borderTop: item.bold ? "1px solid #e5e7eb" : "none"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: item.large ? "16px" : "14px",
                                                                    fontWeight: item.bold ? "bold" : "normal",
                                                                    color: "#333"
                                                                },
                                                                children: item.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 556,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: item.large ? "20px" : "14px",
                                                                    fontWeight: "bold",
                                                                    color: item.color
                                                                },
                                                                children: [
                                                                    item.value.toFixed(2),
                                                                    " DH"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                                lineNumber: 559,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, item.label, true, {
                                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                                lineNumber: 541,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                        lineNumber: 539,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                lineNumber: 492,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "12px",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                    background: "white",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            fontSize: "13px",
                            color: "#666",
                            alignSelf: "center"
                        },
                        children: lignesMO.length > 0 || lignesMat.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    style: {
                                        color: "#0070f3"
                                    },
                                    children: [
                                        lignesMO.length,
                                        " employé",
                                        lignesMO.length > 1 ? "s" : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                    lineNumber: 582,
                                    columnNumber: 15
                                }, this),
                                lignesMat.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        " · ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            style: {
                                                color: "#f59e0b"
                                            },
                                            children: [
                                                lignesMat.length,
                                                " matériel",
                                                lignesMat.length > 1 ? "s" : ""
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                            lineNumber: 583,
                                            columnNumber: 49
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                    lineNumber: 583,
                                    columnNumber: 40
                                }, this),
                                " · ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    style: {
                                        color: "#10b981"
                                    },
                                    children: [
                                        "Total : ",
                                        totalHT.toFixed(2),
                                        " DH HT"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                                    lineNumber: 585,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                            lineNumber: 581,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: "#ccc"
                            },
                            children: "Aucun élément ajouté"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                            lineNumber: 588,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                        lineNumber: 579,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/dashboard/pointage"),
                        style: {
                            padding: "10px 20px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            background: "white",
                            cursor: "pointer",
                            fontSize: "14px"
                        },
                        children: "Annuler"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                        lineNumber: 591,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSave,
                        disabled: saving || !lignesMO.length && !lignesMat.length || !zoneId,
                        style: {
                            padding: "10px 28px",
                            background: saving || !lignesMO.length && !lignesMat.length || !zoneId ? "#ccc" : "#0070f3",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold"
                        },
                        children: saving ? "Sauvegarde..." : "✓ Enregistrer la feuille"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                        lineNumber: 597,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
                lineNumber: 573,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/pointage/regie/nouvelle/page.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
_s(NouvelleFeuillePage, "DkIimuvxNsP5ig54TgHOX1cXovA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = NouvelleFeuillePage;
var _c;
__turbopack_context__.k.register(_c, "NouvelleFeuillePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_pointage_regie_nouvelle_page_tsx_a6f9d15d._.js.map