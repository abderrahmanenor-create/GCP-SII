(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/facturation/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FacturationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const statutConfig = {
    BROUILLON: {
        label: "Brouillon",
        color: "#6b7280",
        bg: "#f9fafb"
    },
    EMISE: {
        label: "Émise",
        color: "#0070f3",
        bg: "#f0f9ff"
    },
    PAYEE: {
        label: "Payée",
        color: "#10b981",
        bg: "#f0fdf4"
    },
    ANNULEE: {
        label: "Annulée",
        color: "#ef4444",
        bg: "#fef2f2"
    }
};
function FacturationPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [factures, setFactures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [feuilles, setFeuilles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [clients, setClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filtreStatut, setFiltreStatut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filtreClient, setFiltreClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        clientId: "",
        feuilleIds: [],
        tauxTVA: "20",
        tauxRetenue: "0",
        dateEcheance: "",
        notes: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FacturationPage.useEffect": ()=>{
            loadAll();
        }
    }["FacturationPage.useEffect"], []);
    const loadAll = async ()=>{
        const [facturesRes, feuillesRes, clientsRes] = await Promise.all([
            fetch("/api/facturation").then((r)=>r.json()),
            fetch("/api/pointage/regie").then((r)=>r.json()),
            fetch("/api/admin/societes").then((r)=>r.json())
        ]);
        setFactures(Array.isArray(facturesRes) ? facturesRes : []);
        setFeuilles(Array.isArray(feuillesRes) ? feuillesRes.filter((f)=>f.statut === "VALIDE_CLIENT" && !f.factureId) : []);
        setClients(Array.isArray(clientsRes) ? clientsRes : []);
        setLoading(false);
    };
    const feuillesFiltrees = feuilles.filter((f)=>!form.clientId || f.zone.projet.contrat.client.id === form.clientId);
    const feuillesSelectionnees = feuilles.filter((f)=>form.feuilleIds.includes(f.id));
    const totalHT = feuillesSelectionnees.reduce((s, f)=>s + f.totalGeneral, 0);
    const montantTVA = totalHT * (parseFloat(form.tauxTVA) / 100);
    const totalTTC = totalHT + montantTVA;
    const montantRetenue = totalTTC * (parseFloat(form.tauxRetenue) / 100);
    const netAPayer = totalTTC - montantRetenue;
    const toggleFeuille = (id)=>{
        setForm((prev)=>({
                ...prev,
                feuilleIds: prev.feuilleIds.includes(id) ? prev.feuilleIds.filter((i)=>i !== id) : [
                    ...prev.feuilleIds,
                    id
                ]
            }));
    };
    const handleCreate = async ()=>{
        if (!form.clientId || !form.feuilleIds.length) return;
        setSaving(true);
        const res = await fetch("/api/facturation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
            await loadAll();
            setShowModal(false);
            setForm({
                clientId: "",
                feuilleIds: [],
                tauxTVA: "20",
                tauxRetenue: "0",
                dateEcheance: "",
                notes: ""
            });
            router.push(`/dashboard/facturation/${data.id}`);
        }
        setSaving(false);
    };
    const handleStatut = async (id, statut)=>{
        await fetch("/api/facturation", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                statut
            })
        });
        await loadAll();
    };
    const filtered = factures.filter((f)=>{
        const matchStatut = !filtreStatut || f.statut === filtreStatut;
        const matchClient = !filtreClient || f.client.id === filtreClient;
        return matchStatut && matchClient;
    });
    const stats = {
        total: factures.length,
        brouillon: factures.filter((f)=>f.statut === "BROUILLON").length,
        emises: factures.filter((f)=>f.statut === "EMISE").length,
        payees: factures.filter((f)=>f.statut === "PAYEE").length,
        caHT: factures.filter((f)=>f.statut !== "ANNULEE").reduce((s, f)=>s + f.totalHT, 0),
        enAttente: factures.filter((f)=>f.statut === "EMISE").reduce((s, f)=>s + f.netAPayer, 0)
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 60,
            textAlign: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 40,
                    marginBottom: 12
                },
                children: "🧾"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: "#999"
                },
                children: "Chargement facturation..."
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
        lineNumber: 139,
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
                    alignItems: "flex-start",
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    margin: 0,
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#1a1a1a"
                                },
                                children: "🧾 Facturation"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "4px 0 0",
                                    color: "#666",
                                    fontSize: "14px"
                                },
                                children: "Génération des factures depuis les NFI validées"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowModal(true),
                        style: {
                            padding: "10px 20px",
                            background: "#0070f3",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "14px"
                        },
                        children: "+ Nouvelle facture"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "12px",
                    marginBottom: "20px"
                },
                children: [
                    {
                        icon: "🧾",
                        label: "Total factures",
                        value: stats.total,
                        color: "#0070f3",
                        bg: "#f0f9ff"
                    },
                    {
                        icon: "📝",
                        label: "Brouillons",
                        value: stats.brouillon,
                        color: "#6b7280",
                        bg: "#f9fafb"
                    },
                    {
                        icon: "📤",
                        label: "Émises",
                        value: stats.emises,
                        color: "#f59e0b",
                        bg: "#fffbeb"
                    },
                    {
                        icon: "✅",
                        label: "Payées",
                        value: stats.payees,
                        color: "#10b981",
                        bg: "#f0fdf4"
                    },
                    {
                        icon: "⏳",
                        label: "En attente (DH)",
                        value: `${stats.enAttente.toLocaleString("fr-FR", {
                            maximumFractionDigits: 0
                        })}`,
                        color: "#ef4444",
                        bg: "#fef2f2"
                    }
                ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: k.bg,
                            borderRadius: "10px",
                            padding: "14px 16px",
                            border: `1px solid ${k.color}22`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "22px",
                                    marginBottom: "4px"
                                },
                                children: k.icon
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: k.color
                                },
                                children: k.value
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "11px",
                                    color: "#555",
                                    marginTop: "2px"
                                },
                                children: k.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this)
                        ]
                    }, k.label, true, {
                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            feuilles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#fffbeb",
                    border: "1px solid #fde68a",
                    borderRadius: "10px",
                    padding: "14px 18px",
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: "13px",
                            color: "#92400e"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    "⚠️ ",
                                    feuilles.length,
                                    " NFI validée",
                                    feuilles.length > 1 ? "s" : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this),
                            " en attente de facturation"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowModal(true),
                        style: {
                            padding: "6px 14px",
                            background: "#f59e0b",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "bold"
                        },
                        children: "Facturer maintenant →"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                lineNumber: 181,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    marginBottom: "16px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filtreStatut,
                        onChange: (e)=>setFiltreStatut(e.target.value),
                        style: {
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Tous les statuts"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            Object.entries(statutConfig).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: k,
                                    children: v.label
                                }, k, false, {
                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 57
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filtreClient,
                        onChange: (e)=>setFiltreClient(e.target.value),
                        style: {
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Tous les clients"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            clients.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: c.id,
                                    children: c.nom
                                }, c.id, false, {
                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                    lineNumber: 204,
                                    columnNumber: 29
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    (filtreStatut || filtreClient) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setFiltreStatut("");
                            setFiltreClient("");
                        },
                        style: {
                            padding: "8px 14px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            background: "white",
                            cursor: "pointer",
                            fontSize: "13px",
                            color: "#666"
                        },
                        children: "✕ Effacer"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: "12px",
                            color: "#999",
                            alignSelf: "center"
                        },
                        children: [
                            filtered.length,
                            " facture",
                            filtered.length > 1 ? "s" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    overflow: "hidden"
                },
                children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "60px",
                        textAlign: "center",
                        color: "#999"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: "40px",
                                marginBottom: "12px"
                            },
                            children: "🧾"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                            lineNumber: 219,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Aucune facture"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                    lineNumber: 218,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: "100%",
                        borderCollapse: "collapse"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                style: {
                                    background: "#f8fafc"
                                },
                                children: [
                                    "N° FACTURE",
                                    "CLIENT",
                                    "NFI",
                                    "DATE",
                                    "TOTAL HT",
                                    "TVA",
                                    "RETENUE",
                                    "NET À PAYER",
                                    "STATUT",
                                    ""
                                ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: "11px 16px",
                                            textAlign: "left",
                                            fontSize: "11px",
                                            color: "#666",
                                            fontWeight: "bold",
                                            borderBottom: "2px solid #e5e7eb"
                                        },
                                        children: h
                                    }, h, false, {
                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                lineNumber: 225,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: filtered.map((f)=>{
                                const st = statutConfig[f.statut];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        borderBottom: "1px solid #f1f5f9",
                                        cursor: "pointer"
                                    },
                                    onClick: ()=>router.push(`/dashboard/facturation/${f.id}`),
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#f8fafc",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                fontWeight: "bold",
                                                color: "#0070f3"
                                            },
                                            children: f.numero
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 241,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                fontSize: "13px"
                                            },
                                            children: f.client.nom
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 242,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: "#f0f9ff",
                                                    color: "#0070f3",
                                                    padding: "2px 8px",
                                                    borderRadius: "10px",
                                                    fontSize: "11px",
                                                    fontWeight: "bold"
                                                },
                                                children: [
                                                    f.feuilles.length,
                                                    " NFI"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 243,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                fontSize: "12px",
                                                color: "#666"
                                            },
                                            children: [
                                                new Date(f.dateEmission).toLocaleDateString("fr-FR"),
                                                f.dateEcheance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "#f59e0b",
                                                        fontSize: "11px"
                                                    },
                                                    children: [
                                                        "Éch. ",
                                                        new Date(f.dateEcheance).toLocaleDateString("fr-FR")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 42
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                fontWeight: "bold"
                                            },
                                            children: [
                                                f.totalHT.toLocaleString("fr-FR", {
                                                    maximumFractionDigits: 2
                                                }),
                                                " DH"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                fontSize: "12px",
                                                color: "#666"
                                            },
                                            children: [
                                                f.tauxTVA,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 253,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                fontSize: "12px",
                                                color: f.tauxRetenue > 0 ? "#ef4444" : "#ccc"
                                            },
                                            children: f.tauxRetenue > 0 ? `-${f.montantRetenue.toLocaleString("fr-FR", {
                                                maximumFractionDigits: 2
                                            })} DH` : "—"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 254,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                fontWeight: "bold",
                                                color: "#10b981",
                                                fontSize: "15px"
                                            },
                                            children: [
                                                f.netAPayer.toLocaleString("fr-FR", {
                                                    maximumFractionDigits: 2
                                                }),
                                                " DH"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 257,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: st.bg,
                                                    color: st.color,
                                                    padding: "3px 10px",
                                                    borderRadius: "20px",
                                                    fontSize: "11px",
                                                    fontWeight: "bold"
                                                },
                                                children: st.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                lineNumber: 261,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 260,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: "4px"
                                                },
                                                onClick: (e)=>e.stopPropagation(),
                                                children: [
                                                    f.statut === "BROUILLON" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleStatut(f.id, "EMISE"),
                                                        style: {
                                                            padding: "4px 10px",
                                                            background: "#f0f9ff",
                                                            color: "#0070f3",
                                                            border: "1px solid #bae6fd",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                            fontSize: "11px",
                                                            fontWeight: "bold"
                                                        },
                                                        children: "📤 Émettre"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 27
                                                    }, this),
                                                    f.statut === "EMISE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleStatut(f.id, "PAYEE"),
                                                        style: {
                                                            padding: "4px 10px",
                                                            background: "#f0fdf4",
                                                            color: "#10b981",
                                                            border: "1px solid #bbf7d0",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                            fontSize: "11px",
                                                            fontWeight: "bold"
                                                        },
                                                        children: "✅ Payée"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                lineNumber: 266,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 265,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, f.id, true, {
                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                    lineNumber: 235,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                            lineNumber: 231,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                style: {
                                    background: "#f8fafc",
                                    borderTop: "2px solid #e5e7eb"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 4,
                                        style: {
                                            padding: "12px 16px",
                                            fontWeight: "bold",
                                            fontSize: "13px"
                                        },
                                        children: [
                                            "TOTAL (",
                                            filtered.length,
                                            " factures)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: "12px 16px",
                                            fontWeight: "bold"
                                        },
                                        children: [
                                            filtered.reduce((s, f)=>s + f.totalHT, 0).toLocaleString("fr-FR", {
                                                maximumFractionDigits: 2
                                            }),
                                            " DH"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                        lineNumber: 290,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 2
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                        lineNumber: 293,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: "12px 16px",
                                            fontWeight: "bold",
                                            color: "#10b981",
                                            fontSize: "15px"
                                        },
                                        children: [
                                            filtered.reduce((s, f)=>s + f.netAPayer, 0).toLocaleString("fr-FR", {
                                                maximumFractionDigits: 2
                                            }),
                                            " DH"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                        lineNumber: 294,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 2
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                        lineNumber: 297,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                lineNumber: 286,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                            lineNumber: 285,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                    lineNumber: 223,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "white",
                        borderRadius: "14px",
                        padding: "28px",
                        width: "640px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: "0 0 20px",
                                fontSize: "18px",
                                fontWeight: "bold"
                            },
                            children: "🧾 Nouvelle facture"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                            lineNumber: 308,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px"
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
                                            children: "CLIENT *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 314,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            style: {
                                                width: "100%",
                                                padding: "8px 12px",
                                                border: "1px solid #ddd",
                                                borderRadius: "6px",
                                                fontSize: "14px"
                                            },
                                            value: form.clientId,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    clientId: e.target.value,
                                                    feuilleIds: []
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "— Sélectionner un client —"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 19
                                                }, this),
                                                clients.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: c.id,
                                                        children: c.nom
                                                    }, c.id, false, {
                                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 37
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                    lineNumber: 313,
                                    columnNumber: 15
                                }, this),
                                form.clientId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: "11px",
                                                fontWeight: "bold",
                                                color: "#666",
                                                display: "block",
                                                marginBottom: "8px"
                                            },
                                            children: [
                                                "NFI VALIDÉES DISPONIBLES * (",
                                                feuillesFiltrees.length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 325,
                                            columnNumber: 19
                                        }, this),
                                        feuillesFiltrees.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: "20px",
                                                textAlign: "center",
                                                color: "#999",
                                                fontSize: "13px",
                                                background: "#f8fafc",
                                                borderRadius: "8px"
                                            },
                                            children: "Aucune NFI validée disponible pour ce client"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "6px",
                                                maxHeight: "200px",
                                                overflowY: "auto"
                                            },
                                            children: feuillesFiltrees.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>toggleFeuille(f.id),
                                                    style: {
                                                        padding: "10px 14px",
                                                        borderRadius: "8px",
                                                        cursor: "pointer",
                                                        border: `2px solid ${form.feuilleIds.includes(f.id) ? "#0070f3" : "#e5e7eb"}`,
                                                        background: form.feuilleIds.includes(f.id) ? "#f0f9ff" : "white",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: "13px",
                                                                        fontWeight: "bold"
                                                                    },
                                                                    children: [
                                                                        new Date(f.date).toLocaleDateString("fr-FR"),
                                                                        " — ",
                                                                        f.zone.nom
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                                    lineNumber: 344,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: "11px",
                                                                        color: "#666"
                                                                    },
                                                                    children: [
                                                                        f.zone.projet.code,
                                                                        " · ",
                                                                        f.totalHeures,
                                                                        "h"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                                    lineNumber: 347,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: "bold",
                                                                color: "#0070f3",
                                                                fontSize: "14px"
                                                            },
                                                            children: [
                                                                f.totalGeneral.toLocaleString("fr-FR", {
                                                                    maximumFractionDigits: 2
                                                                }),
                                                                " DH"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, f.id, true, {
                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 333,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                    lineNumber: 324,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: "12px"
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
                                                    children: "TVA (%)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: 0,
                                                    max: 100,
                                                    step: 1,
                                                    style: {
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "6px",
                                                        fontSize: "14px",
                                                        boxSizing: "border-box"
                                                    },
                                                    value: form.tauxTVA,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            tauxTVA: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 363,
                                            columnNumber: 17
                                        }, this),
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
                                                    children: "RETENUE DE GARANTIE (%)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: 0,
                                                    max: 100,
                                                    step: 0.5,
                                                    style: {
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "6px",
                                                        fontSize: "14px",
                                                        boxSizing: "border-box"
                                                    },
                                                    value: form.tauxRetenue,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            tauxRetenue: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 369,
                                            columnNumber: 17
                                        }, this),
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
                                                    children: "DATE ÉCHÉANCE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    style: {
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "6px",
                                                        fontSize: "14px",
                                                        boxSizing: "border-box"
                                                    },
                                                    value: form.dateEcheance,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            dateEcheance: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 375,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 15
                                }, this),
                                form.feuilleIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: "#f0f9ff",
                                        border: "1px solid #bae6fd",
                                        borderRadius: "10px",
                                        padding: "16px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "13px",
                                                fontWeight: "bold",
                                                marginBottom: "10px",
                                                color: "#0369a1"
                                            },
                                            children: [
                                                "📊 Récapitulatif — ",
                                                form.feuilleIds.length,
                                                " NFI sélectionnée",
                                                form.feuilleIds.length > 1 ? "s" : ""
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 386,
                                            columnNumber: 19
                                        }, this),
                                        [
                                            {
                                                label: "Total HT",
                                                value: totalHT,
                                                color: "#1a1a1a"
                                            },
                                            {
                                                label: `TVA (${form.tauxTVA}%)`,
                                                value: montantTVA,
                                                color: "#6b7280"
                                            },
                                            {
                                                label: `Total TTC`,
                                                value: totalTTC,
                                                color: "#0070f3",
                                                bold: true
                                            },
                                            {
                                                label: `Retenue (${form.tauxRetenue}%)`,
                                                value: -montantRetenue,
                                                color: "#ef4444"
                                            },
                                            {
                                                label: "Net à payer",
                                                value: netAPayer,
                                                color: "#10b981",
                                                bold: true,
                                                large: true
                                            }
                                        ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: "4px 0",
                                                    borderTop: item.large ? "2px solid #bae6fd" : "none",
                                                    marginTop: item.large ? "6px" : "0"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: item.large ? "15px" : "13px",
                                                            fontWeight: item.bold ? "bold" : "normal",
                                                            color: "#333"
                                                        },
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: item.large ? "18px" : "13px",
                                                            fontWeight: "bold",
                                                            color: item.color
                                                        },
                                                        children: [
                                                            item.value.toLocaleString("fr-FR", {
                                                                maximumFractionDigits: 2
                                                            }),
                                                            " DH"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, item.label, true, {
                                                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                                lineNumber: 396,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 17
                                }, this),
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
                                            children: "NOTES (optionnel)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 408,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            rows: 2,
                                            placeholder: "Observations...",
                                            style: {
                                                width: "100%",
                                                padding: "8px 12px",
                                                border: "1px solid #ddd",
                                                borderRadius: "6px",
                                                fontSize: "14px",
                                                boxSizing: "border-box",
                                                resize: "vertical"
                                            },
                                            value: form.notes,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    notes: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                            lineNumber: 409,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                    lineNumber: 407,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                            lineNumber: 310,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "10px",
                                justifyContent: "flex-end",
                                marginTop: "24px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowModal(false),
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
                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                    lineNumber: 416,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCreate,
                                    disabled: saving || !form.clientId || !form.feuilleIds.length,
                                    style: {
                                        padding: "10px 24px",
                                        background: !form.clientId || !form.feuilleIds.length ? "#ccc" : "#0070f3",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        fontWeight: "bold"
                                    },
                                    children: saving ? "Génération..." : "🧾 Générer la facture"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                                    lineNumber: 420,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                            lineNumber: 415,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                    lineNumber: 307,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/facturation/page.tsx",
                lineNumber: 306,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/facturation/page.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s(FacturationPage, "wbXywA19N+aE3q7sGnztSHmbyV0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = FacturationPage;
var _c;
__turbopack_context__.k.register(_c, "FacturationPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_facturation_page_tsx_d741c85c._.js.map