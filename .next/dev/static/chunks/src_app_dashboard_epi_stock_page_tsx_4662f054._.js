(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/epi/stock/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EPIStockPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const CATEGORIES_SEC = {
    "I": {
        label: "Cat. I — Risques mineurs",
        color: "#10b981",
        bg: "#f0fdf4"
    },
    "II": {
        label: "Cat. II — Risques moyens",
        color: "#f59e0b",
        bg: "#fffbeb"
    },
    "III": {
        label: "Cat. III — Risques graves",
        color: "#ef4444",
        bg: "#fef2f2"
    }
};
const EPI_TYPES = [
    "Casque de chantier",
    "Harnais antichute",
    "Gants mécaniques",
    "Gants chimiques",
    "Chaussures sécurité",
    "Gilet haute visibilité",
    "Masque FFP2",
    "Masque FFP3",
    "Lunettes protection",
    "Protection auditive",
    "Longe antichute",
    "Autre"
];
function EPIStockPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [epis, setEpis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMouvModal, setShowMouvModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filtreAlerte, setFiltreAlerte] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const emptyForm = {
        nom: "",
        reference: "",
        marque: "",
        taille: "",
        norme: "",
        categorieSec: "II",
        stockInitial: "0",
        seuilAlerte: "5",
        prixUnitaire: "",
        categorieId: "",
        dureeVieAns: "",
        nbLavagesMax: "",
        vgpRequise: false,
        vgpPeriodeMois: "12",
        datePeremption: ""
    };
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    const [mouvForm, setMouvForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: "ENTREE",
        quantite: "1",
        motif: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EPIStockPage.useEffect": ()=>{
            loadData();
        }
    }["EPIStockPage.useEffect"], []);
    const loadData = async ()=>{
        const [episRes, refsRes] = await Promise.all([
            fetch("/api/epi/stock").then((r)=>r.json()),
            fetch("/api/ref").then((r)=>r.json())
        ]);
        setEpis(Array.isArray(episRes) ? episRes : []);
        setCategories(refsRes.categoriesEPI || []);
        setLoading(false);
    };
    // Auto-remplir normes selon type EPI
    const handleNomChange = (nom)=>{
        const defaults = {
            "Casque de chantier": {
                norme: "EN 397",
                categorieSec: "II",
                dureeVieAns: "4",
                vgpRequise: false
            },
            "Harnais antichute": {
                norme: "EN 361",
                categorieSec: "III",
                dureeVieAns: "5",
                vgpRequise: true,
                vgpPeriodeMois: "12"
            },
            "Gants mécaniques": {
                norme: "EN 388",
                categorieSec: "II",
                dureeVieAns: "2",
                vgpRequise: false
            },
            "Gants chimiques": {
                norme: "EN 374",
                categorieSec: "III",
                dureeVieAns: "2",
                vgpRequise: false
            },
            "Chaussures sécurité": {
                norme: "EN 20345",
                categorieSec: "II",
                dureeVieAns: "3",
                vgpRequise: false
            },
            "Gilet haute visibilité": {
                norme: "EN 20471",
                categorieSec: "II",
                dureeVieAns: "3",
                nbLavagesMax: "25",
                vgpRequise: false
            },
            "Masque FFP2": {
                norme: "EN 149",
                categorieSec: "III",
                dureeVieAns: "1",
                vgpRequise: false
            },
            "Masque FFP3": {
                norme: "EN 149",
                categorieSec: "III",
                dureeVieAns: "1",
                vgpRequise: false
            },
            "Lunettes protection": {
                norme: "EN 166",
                categorieSec: "II",
                dureeVieAns: "3",
                vgpRequise: false
            },
            "Protection auditive": {
                norme: "EN 352",
                categorieSec: "II",
                dureeVieAns: "2",
                vgpRequise: false
            },
            "Longe antichute": {
                norme: "EN 354",
                categorieSec: "III",
                dureeVieAns: "5",
                vgpRequise: true,
                vgpPeriodeMois: "12"
            }
        };
        setForm({
            ...form,
            nom,
            ...defaults[nom] || {}
        });
    };
    const handleSubmit = async ()=>{
        if (!form.nom) {
            setError("Nom obligatoire");
            return;
        }
        setSaving(true);
        setError("");
        const res = await fetch("/api/epi/stock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });
        if (!res.ok) {
            const d = await res.json();
            setError(d.error);
            setSaving(false);
            return;
        }
        await loadData();
        setShowModal(false);
        setForm(emptyForm);
        setSaving(false);
    };
    const handleMouvement = async ()=>{
        if (!showMouvModal) return;
        setSaving(true);
        await fetch("/api/epi/stock", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: showMouvModal.id,
                action: "MOUVEMENT",
                ...mouvForm
            })
        });
        await loadData();
        setShowMouvModal(null);
        setMouvForm({
            type: "ENTREE",
            quantite: "1",
            motif: ""
        });
        setSaving(false);
    };
    const episFiltres = epis.filter((e)=>{
        const matchSearch = e.nom.toLowerCase().includes(search.toLowerCase()) || (e.reference || "").toLowerCase().includes(search.toLowerCase());
        const matchAlerte = !filtreAlerte || e.stockActuel <= e.seuilAlerte;
        return matchSearch && matchAlerte;
    });
    const totalAlertes = epis.filter((e)=>e.stockActuel <= e.seuilAlerte).length;
    const inputStyle = {
        width: "100%",
        padding: "8px 12px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        fontSize: "14px",
        boxSizing: "border-box"
    };
    const labelStyle = {
        fontSize: "11px",
        fontWeight: "bold",
        color: "#666",
        marginBottom: "4px",
        display: "block"
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 40,
            textAlign: "center",
            color: "#999"
        },
        children: "Chargement..."
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
        lineNumber: 139,
        columnNumber: 23
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
                                children: "🦺 Stock EPI"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "4px 0 0",
                                    color: "#666",
                                    fontSize: "14px"
                                },
                                children: "Gestion des équipements de protection individuelle"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "10px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/dashboard/epi/distribution"),
                                style: {
                                    padding: "10px 18px",
                                    background: "#f0fdf4",
                                    border: "1px solid #10b981",
                                    borderRadius: "8px",
                                    color: "#10b981",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "14px"
                                },
                                children: "👷 Dotations ouvriers"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setForm(emptyForm);
                                    setShowModal(true);
                                },
                                style: {
                                    background: "#0070f3",
                                    color: "white",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    border: "none",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                },
                                children: "+ Nouvel EPI"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "12px",
                    marginBottom: "20px"
                },
                children: [
                    {
                        label: "Total EPI",
                        value: epis.length,
                        color: "#0070f3",
                        bg: "#f0f9ff",
                        icon: "📦"
                    },
                    {
                        label: "En alerte stock",
                        value: totalAlertes,
                        color: "#ef4444",
                        bg: "#fef2f2",
                        icon: "⚠️"
                    },
                    {
                        label: "Distribués actifs",
                        value: epis.reduce((a, e)=>a + e.distributions.length, 0),
                        color: "#f59e0b",
                        bg: "#fffbeb",
                        icon: "👷"
                    },
                    {
                        label: "Nécessitent VGP",
                        value: epis.filter((e)=>e.vgpRequise).length,
                        color: "#6366f1",
                        bg: "#f5f3ff",
                        icon: "🔍"
                    }
                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: item.bg,
                            borderRadius: "10px",
                            padding: "16px",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "24px",
                                    marginBottom: "4px"
                                },
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "22px",
                                    fontWeight: "bold",
                                    color: item.color
                                },
                                children: item.value
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "2px"
                                },
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.label, true, {
                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    marginBottom: "16px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "🔍 Rechercher un EPI...",
                        value: search,
                        onChange: (e)=>setSearch(e.target.value),
                        style: {
                            ...inputStyle,
                            flex: 1,
                            maxWidth: "300px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFiltreAlerte(!filtreAlerte),
                        style: {
                            padding: "8px 16px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            background: filtreAlerte ? "#ef4444" : "#f4f6f9",
                            color: filtreAlerte ? "white" : "#666",
                            fontWeight: "bold",
                            fontSize: "13px"
                        },
                        children: [
                            "⚠️ Alertes stock (",
                            totalAlertes,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "#999",
                            fontSize: "13px"
                        },
                        children: [
                            episFiltres.length,
                            " EPI trouvé(s)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                    overflow: "hidden"
                },
                children: episFiltres.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "60px",
                        textAlign: "center",
                        color: "#999"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: "48px",
                                marginBottom: "16px"
                            },
                            children: "🦺"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 206,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: "16px"
                            },
                            children: "Aucun EPI dans le stock"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 207,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowModal(true),
                            style: {
                                marginTop: "16px",
                                padding: "10px 20px",
                                background: "#0070f3",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            },
                            children: "+ Ajouter un EPI"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                    lineNumber: 205,
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
                                    background: "#f8fafc",
                                    borderBottom: "2px solid #e5e7eb"
                                },
                                children: [
                                    "EPI",
                                    "NORME",
                                    "CATÉGORIE",
                                    "STOCK",
                                    "DURÉE VIE",
                                    "VGP",
                                    "DISTRIBUÉS",
                                    "ACTIONS"
                                ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: "12px 16px",
                                            textAlign: h === "STOCK" || h === "DISTRIBUÉS" ? "center" : "left",
                                            fontSize: "12px",
                                            color: "#666",
                                            fontWeight: "bold"
                                        },
                                        children: h
                                    }, h, false, {
                                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                        lineNumber: 217,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                lineNumber: 215,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 214,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: episFiltres.map((epi)=>{
                                const alerte = epi.stockActuel <= epi.seuilAlerte;
                                const cat = CATEGORIES_SEC[epi.categorieSec];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        borderBottom: "1px solid #f1f5f9",
                                        background: alerte ? "#fff5f5" : "white"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: "bold",
                                                        fontSize: "14px"
                                                    },
                                                    children: epi.nom
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "11px",
                                                        color: "#999"
                                                    },
                                                    children: [
                                                        epi.reference && `Réf: ${epi.reference}`,
                                                        epi.marque && ` · ${epi.marque}`
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 227,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: epi.norme ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: "#f0f9ff",
                                                    color: "#0070f3",
                                                    padding: "2px 8px",
                                                    borderRadius: "4px",
                                                    fontSize: "12px",
                                                    fontWeight: "bold"
                                                },
                                                children: epi.norme
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 25
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#ccc"
                                                },
                                                children: "—"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 234,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: cat?.bg,
                                                    color: cat?.color,
                                                    padding: "2px 8px",
                                                    borderRadius: "4px",
                                                    fontSize: "11px",
                                                    fontWeight: "bold"
                                                },
                                                children: [
                                                    "Cat. ",
                                                    epi.categorieSec
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 241,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                textAlign: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    gap: "2px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontWeight: "bold",
                                                            fontSize: "18px",
                                                            color: alerte ? "#ef4444" : "#10b981"
                                                        },
                                                        children: epi.stockActuel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: "10px",
                                                            color: "#999"
                                                        },
                                                        children: [
                                                            "seuil: ",
                                                            epi.seuilAlerte
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 25
                                                    }, this),
                                                    alerte && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: "10px",
                                                            background: "#fee2e2",
                                                            color: "#ef4444",
                                                            padding: "1px 6px",
                                                            borderRadius: "4px"
                                                        },
                                                        children: "⚠️ ALERTE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 36
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                lineNumber: 247,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: epi.dureeVieAns ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "13px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: "bold"
                                                        },
                                                        children: [
                                                            epi.dureeVieAns,
                                                            " ans"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 27
                                                    }, this),
                                                    epi.nbLavagesMax && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: "11px",
                                                            color: "#999"
                                                        },
                                                        children: [
                                                            epi.nbLavagesMax,
                                                            " lavages max"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 48
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                lineNumber: 257,
                                                columnNumber: 25
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#ccc"
                                                },
                                                children: "—"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                lineNumber: 261,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 255,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: epi.vgpRequise ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: "#fef3c7",
                                                    color: "#d97706",
                                                    padding: "2px 8px",
                                                    borderRadius: "4px",
                                                    fontSize: "12px",
                                                    fontWeight: "bold"
                                                },
                                                children: "✓ Annuelle"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                lineNumber: 265,
                                                columnNumber: 25
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#ccc",
                                                    fontSize: "12px"
                                                },
                                                children: "Non requise"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                lineNumber: 268,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 263,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                textAlign: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontWeight: "bold",
                                                    color: "#f59e0b"
                                                },
                                                children: epi.distributions.length
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: "6px"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowMouvModal(epi),
                                                    style: {
                                                        padding: "5px 10px",
                                                        background: "#f0f9ff",
                                                        color: "#0070f3",
                                                        border: "1px solid #0070f3",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "12px",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "± Stock"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 275,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, epi.id, true, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                    lineNumber: 213,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                lineNumber: 203,
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
                    zIndex: 1000,
                    overflowY: "auto"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "white",
                        borderRadius: "12px",
                        padding: "28px",
                        width: "580px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                        margin: "20px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: "0 0 20px",
                                fontSize: "18px",
                                fontWeight: "bold"
                            },
                            children: "Nouvel EPI"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 296,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: "#fee2e2",
                                borderRadius: "6px",
                                padding: "10px",
                                marginBottom: "16px",
                                color: "#dc2626",
                                fontSize: "13px"
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 298,
                            columnNumber: 23
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "14px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "12px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                gridColumn: "1 / -1"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: [
                                                        "TYPE D'EPI ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: "#ef4444"
                                                            },
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 56
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    style: inputStyle,
                                                    value: form.nom,
                                                    onChange: (e)=>handleNomChange(e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "— Sélectionner —"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 21
                                                        }, this),
                                                        EPI_TYPES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: t,
                                                                children: t
                                                            }, t, false, {
                                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                                lineNumber: 307,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 303,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "RÉFÉRENCE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    style: inputStyle,
                                                    value: form.reference,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            reference: e.target.value
                                                        }),
                                                    placeholder: "Ex: REF-001"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 311,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "MARQUE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    style: inputStyle,
                                                    value: form.marque,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            marque: e.target.value
                                                        }),
                                                    placeholder: "Ex: 3M, MSA..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "TAILLE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    style: inputStyle,
                                                    value: form.taille,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            taille: e.target.value
                                                        }),
                                                    placeholder: "M, L, XL, 42..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 320,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "CATÉGORIE EPI"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 325,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    style: inputStyle,
                                                    value: form.categorieId,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            categorieId: e.target.value
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "— Catégorie —"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 21
                                                        }, this),
                                                        categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: c.id,
                                                                children: c.nom
                                                            }, c.id, false, {
                                                                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                                lineNumber: 328,
                                                                columnNumber: 42
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 324,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 302,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: "#f8fafc",
                                        borderRadius: "8px",
                                        padding: "14px",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: "10px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "NORME"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    style: inputStyle,
                                                    value: form.norme,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            norme: e.target.value
                                                        }),
                                                    placeholder: "EN 397..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 335,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "CATÉGORIE SÉCURITÉ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    style: inputStyle,
                                                    value: form.categorieSec,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            categorieSec: e.target.value
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "I",
                                                            children: "I — Risques mineurs"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "II",
                                                            children: "II — Risques moyens"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "III",
                                                            children: "III — Risques graves"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 339,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "DURÉE VIE (ANS)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    style: inputStyle,
                                                    value: form.dureeVieAns,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            dureeVieAns: e.target.value
                                                        }),
                                                    placeholder: "Ex: 5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 347,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 334,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "16px",
                                        padding: "12px 16px",
                                        background: form.vgpRequise ? "#fef3c7" : "#f8fafc",
                                        borderRadius: "8px",
                                        border: `1px solid ${form.vgpRequise ? "#fcd34d" : "#e5e7eb"}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                                fontSize: "14px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: form.vgpRequise,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            vgpRequise: e.target.checked
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 19
                                                }, this),
                                                "VGP requise (Vérification Générale Périodique)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 17
                                        }, this),
                                        form.vgpRequise && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#666"
                                                    },
                                                    children: "Périodicité :"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: form.vgpPeriodeMois,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            vgpPeriodeMois: e.target.value
                                                        }),
                                                    style: {
                                                        ...inputStyle,
                                                        width: "70px"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#666"
                                                    },
                                                    children: "mois"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 360,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 354,
                                    columnNumber: 15
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
                                                    style: labelStyle,
                                                    children: "STOCK INITIAL"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    style: inputStyle,
                                                    value: form.stockInitial,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            stockInitial: e.target.value
                                                        }),
                                                    min: 0
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 370,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "SEUIL ALERTE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 375,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    style: inputStyle,
                                                    value: form.seuilAlerte,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            seuilAlerte: e.target.value
                                                        }),
                                                    min: 0
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 374,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "PRIX UNITAIRE (DH)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    style: inputStyle,
                                                    value: form.prixUnitaire,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            prixUnitaire: e.target.value
                                                        }),
                                                    placeholder: "0.00"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 378,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 369,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "DATE PÉREMPTION FIXE (si applicable)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 385,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            style: inputStyle,
                                            value: form.datePeremption,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    datePeremption: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 386,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 384,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 300,
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
                                    onClick: ()=>{
                                        setShowModal(false);
                                        setError("");
                                    },
                                    style: {
                                        padding: "10px 20px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        background: "white",
                                        cursor: "pointer"
                                    },
                                    children: "Annuler"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 392,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSubmit,
                                    disabled: saving,
                                    style: {
                                        padding: "10px 20px",
                                        background: "#0070f3",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    },
                                    children: saving ? "Sauvegarde..." : "Ajouter l'EPI"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 396,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 391,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                    lineNumber: 295,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                lineNumber: 294,
                columnNumber: 9
            }, this),
            showMouvModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        borderRadius: "12px",
                        padding: "28px",
                        width: "420px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: "0 0 6px",
                                fontSize: "18px",
                                fontWeight: "bold"
                            },
                            children: "Mouvement de stock"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: "0 0 20px",
                                color: "#666",
                                fontSize: "14px"
                            },
                            children: [
                                showMouvModal.nom,
                                " — Stock actuel : ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: showMouvModal.stockActuel
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 410,
                                    columnNumber: 117
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 410,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "14px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "TYPE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 414,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "8px"
                                            },
                                            children: [
                                                {
                                                    value: "ENTREE",
                                                    label: "📥 Entrée",
                                                    color: "#10b981"
                                                },
                                                {
                                                    value: "SORTIE",
                                                    label: "📤 Sortie",
                                                    color: "#ef4444"
                                                },
                                                {
                                                    value: "PERTE",
                                                    label: "🗑️ Perte",
                                                    color: "#6b7280"
                                                }
                                            ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setMouvForm({
                                                            ...mouvForm,
                                                            type: t.value
                                                        }),
                                                    style: {
                                                        flex: 1,
                                                        padding: "8px",
                                                        border: `2px solid ${mouvForm.type === t.value ? t.color : "#ddd"}`,
                                                        borderRadius: "6px",
                                                        background: mouvForm.type === t.value ? `${t.color}15` : "white",
                                                        color: mouvForm.type === t.value ? t.color : "#666",
                                                        cursor: "pointer",
                                                        fontWeight: "bold",
                                                        fontSize: "13px"
                                                    },
                                                    children: t.label
                                                }, t.value, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                                    lineNumber: 421,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 415,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "QUANTITÉ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 432,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            style: inputStyle,
                                            value: mouvForm.quantite,
                                            onChange: (e)=>setMouvForm({
                                                    ...mouvForm,
                                                    quantite: e.target.value
                                                }),
                                            min: 1
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 433,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 431,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "MOTIF"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 437,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            style: inputStyle,
                                            value: mouvForm.motif,
                                            onChange: (e)=>setMouvForm({
                                                    ...mouvForm,
                                                    motif: e.target.value
                                                }),
                                            placeholder: "Ex: Réception commande, Perte chantier..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                            lineNumber: 438,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 436,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 412,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "10px",
                                justifyContent: "flex-end",
                                marginTop: "20px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowMouvModal(null),
                                    style: {
                                        padding: "10px 20px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        background: "white",
                                        cursor: "pointer"
                                    },
                                    children: "Annuler"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 445,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleMouvement,
                                    disabled: saving,
                                    style: {
                                        padding: "10px 20px",
                                        background: "#0070f3",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    },
                                    children: saving ? "..." : "Confirmer"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                                    lineNumber: 449,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                            lineNumber: 444,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                    lineNumber: 408,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
                lineNumber: 407,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/epi/stock/page.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_s(EPIStockPage, "+M1ruvILV+zAOvAv6CVV/XxSj4k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = EPIStockPage;
var _c;
__turbopack_context__.k.register(_c, "EPIStockPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_epi_stock_page_tsx_4662f054._.js.map