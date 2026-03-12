(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/epi/distribution/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DistributionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const statutColor = {
    ACTIF: {
        bg: "#f0fdf4",
        color: "#10b981",
        label: "Actif"
    },
    RETOURNE: {
        bg: "#f0f9ff",
        color: "#0070f3",
        label: "Retourné"
    },
    REFORME: {
        bg: "#fef2f2",
        color: "#ef4444",
        label: "Réformé"
    },
    PERDU: {
        bg: "#f9fafb",
        color: "#6b7280",
        label: "Perdu"
    }
};
function joursRestants(dateStr) {
    if (!dateStr) return null;
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
function AlerteBadge({ date, label }) {
    if (!date) return null;
    const jours = joursRestants(date);
    if (jours === null) return null;
    if (jours < 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            background: "#fee2e2",
            color: "#ef4444",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "10px",
            fontWeight: "bold",
            display: "block",
            marginTop: "2px"
        },
        children: [
            "⛔ ",
            label,
            " dépassé (",
            Math.abs(jours),
            "j)"
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
    if (jours <= 30) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            background: "#fef3c7",
            color: "#d97706",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "10px",
            fontWeight: "bold",
            display: "block",
            marginTop: "2px"
        },
        children: [
            "⚠️ ",
            label,
            " dans ",
            jours,
            "j"
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
    return null;
}
_c = AlerteBadge;
function DistributionPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [distributions, setDistributions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [epis, setEpis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showVGPModal, setShowVGPModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showReformeModal, setShowReformeModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filtreStatut, setFiltreStatut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ACTIF");
    const [filtreUser, setFiltreUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filtreAlertes, setFiltreAlertes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const emptyForm = {
        epiId: "",
        userId: "",
        quantite: "1",
        etat: "NEUF",
        taille: "",
        dateMiseEnService: new Date().toISOString().split("T")[0],
        remarque: ""
    };
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    const [vgpForm, setVgpForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        dateDerniereVGP: new Date().toISOString().split("T")[0],
        dateProchVGP: ""
    });
    const [motifReforme, setMotifReforme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DistributionPage.useEffect": ()=>{
            loadData();
        }
    }["DistributionPage.useEffect"], []);
    const loadData = async ()=>{
        const [distRes, episRes, usersRes] = await Promise.all([
            fetch("/api/epi/distribution").then((r)=>r.json()),
            fetch("/api/epi/stock").then((r)=>r.json()),
            fetch("/api/users").then((r)=>r.json())
        ]);
        setDistributions(Array.isArray(distRes) ? distRes : []);
        setEpis(Array.isArray(episRes) ? episRes : []);
        setUsers(Array.isArray(usersRes) ? usersRes : []);
        setLoading(false);
    };
    const handleSubmit = async ()=>{
        if (!form.epiId || !form.userId) {
            setError("EPI et employé obligatoires");
            return;
        }
        setSaving(true);
        setError("");
        const res = await fetch("/api/epi/distribution", {
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
    const handleAction = async (id, action, extra)=>{
        setSaving(true);
        await fetch("/api/epi/distribution", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                action,
                ...extra
            })
        });
        await loadData();
        setShowVGPModal(null);
        setShowReformeModal(null);
        setSaving(false);
    };
    const distFiltrees = distributions.filter((d)=>{
        const matchStatut = !filtreStatut || d.statut === filtreStatut;
        const matchUser = !filtreUser || d.user.id === filtreUser;
        const matchAlertes = !filtreAlertes || joursRestants(d.datePeremption) !== null && joursRestants(d.datePeremption) <= 30 || joursRestants(d.dateProchVGP) !== null && joursRestants(d.dateProchVGP) <= 30;
        return matchStatut && matchUser && matchAlertes;
    });
    const totalAlertes = distributions.filter((d)=>d.statut === "ACTIF" && (joursRestants(d.datePeremption) !== null && joursRestants(d.datePeremption) <= 30 || joursRestants(d.dateProchVGP) !== null && joursRestants(d.dateProchVGP) <= 30)).length;
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
        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
        lineNumber: 156,
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
                                    fontWeight: "bold"
                                },
                                children: "👷 Dotations EPI"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "4px 0 0",
                                    color: "#666",
                                    fontSize: "14px"
                                },
                                children: "Suivi individuel par ouvrier avec traçabilité complète"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "10px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/dashboard/epi/stock"),
                                style: {
                                    padding: "10px 18px",
                                    background: "#f0f9ff",
                                    border: "1px solid #0070f3",
                                    borderRadius: "8px",
                                    color: "#0070f3",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "14px"
                                },
                                children: "📦 Stock EPI"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setForm(emptyForm);
                                    setShowModal(true);
                                },
                                style: {
                                    background: "#10b981",
                                    color: "white",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    border: "none",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                },
                                children: "+ Nouvelle dotation"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                lineNumber: 162,
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
                        label: "Dotations actives",
                        value: distributions.filter((d)=>d.statut === "ACTIF").length,
                        color: "#10b981",
                        bg: "#f0fdf4",
                        icon: "✅"
                    },
                    {
                        label: "Alertes péremption/VGP",
                        value: totalAlertes,
                        color: "#ef4444",
                        bg: "#fef2f2",
                        icon: "⚠️"
                    },
                    {
                        label: "Retournés",
                        value: distributions.filter((d)=>d.statut === "RETOURNE").length,
                        color: "#0070f3",
                        bg: "#f0f9ff",
                        icon: "↩️"
                    },
                    {
                        label: "Réformés",
                        value: distributions.filter((d)=>d.statut === "REFORME").length,
                        color: "#6b7280",
                        bg: "#f9fafb",
                        icon: "🗑️"
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
                                    fontSize: "20px",
                                    marginBottom: "4px"
                                },
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 188,
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
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 189,
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
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.label, true, {
                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                        lineNumber: 187,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                lineNumber: 180,
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
                    alignItems: "center",
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filtreStatut,
                        onChange: (e)=>setFiltreStatut(e.target.value),
                        style: {
                            ...inputStyle,
                            width: "160px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Tous statuts"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "ACTIF",
                                children: "Actifs"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "RETOURNE",
                                children: "Retournés"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "REFORME",
                                children: "Réformés"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filtreUser,
                        onChange: (e)=>setFiltreUser(e.target.value),
                        style: {
                            ...inputStyle,
                            width: "200px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Tous les ouvriers"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            users.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: u.id,
                                    children: [
                                        u.nom,
                                        " ",
                                        u.prenom
                                    ]
                                }, u.id, true, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 27
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFiltreAlertes(!filtreAlertes),
                        style: {
                            padding: "8px 16px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            background: filtreAlertes ? "#ef4444" : "#f4f6f9",
                            color: filtreAlertes ? "white" : "#666",
                            fontWeight: "bold",
                            fontSize: "13px"
                        },
                        children: [
                            "⚠️ Alertes (",
                            totalAlertes,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "#999",
                            fontSize: "13px",
                            marginLeft: "auto"
                        },
                        children: [
                            distFiltrees.length,
                            " dotation(s)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                    overflow: "hidden"
                },
                children: distFiltrees.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            children: "👷"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 223,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Aucune dotation trouvée"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                    lineNumber: 222,
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
                                    "OUVRIER",
                                    "EPI",
                                    "QTÉ / ÉTAT",
                                    "DATE DOTATION",
                                    "PÉREMPTION / VGP",
                                    "STATUT",
                                    "ACTIONS"
                                ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: "12px 16px",
                                            textAlign: "left",
                                            fontSize: "12px",
                                            color: "#666",
                                            fontWeight: "bold"
                                        },
                                        children: h
                                    }, h, false, {
                                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                lineNumber: 229,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 228,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: distFiltrees.map((d)=>{
                                const st = statutColor[d.statut];
                                const hasAlerte = joursRestants(d.datePeremption) !== null && joursRestants(d.datePeremption) <= 30 || joursRestants(d.dateProchVGP) !== null && joursRestants(d.dateProchVGP) <= 30;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        borderBottom: "1px solid #f1f5f9",
                                        background: hasAlerte && d.statut === "ACTIF" ? "#fffbeb" : "white"
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
                                                    children: [
                                                        d.user.nom,
                                                        " ",
                                                        d.user.prenom
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "11px",
                                                        color: "#999"
                                                    },
                                                    children: [
                                                        d.user.matricule || "",
                                                        " ",
                                                        d.user.poste?.nom || ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 242,
                                            columnNumber: 21
                                        }, this),
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
                                                    children: d.epi.nom
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 23
                                                }, this),
                                                d.epi.norme && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: "#f0f9ff",
                                                        color: "#0070f3",
                                                        padding: "1px 6px",
                                                        borderRadius: "4px",
                                                        fontSize: "11px"
                                                    },
                                                    children: d.epi.norme
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 39
                                                }, this),
                                                d.taille && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "11px",
                                                        color: "#999",
                                                        marginTop: "2px"
                                                    },
                                                    children: [
                                                        "Taille: ",
                                                        d.taille
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 36
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: "bold"
                                                    },
                                                    children: [
                                                        d.quantite,
                                                        " unité(s)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: "11px",
                                                        background: "#f0f9ff",
                                                        color: "#0070f3",
                                                        padding: "1px 6px",
                                                        borderRadius: "4px"
                                                    },
                                                    children: d.etat
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 251,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                fontSize: "13px"
                                            },
                                            children: [
                                                new Date(d.date).toLocaleDateString("fr-FR"),
                                                d.dateMiseEnService && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "11px",
                                                        color: "#999"
                                                    },
                                                    children: [
                                                        "Service: ",
                                                        new Date(d.dateMiseEnService).toLocaleDateString("fr-FR")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 255,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: [
                                                d.datePeremption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "12px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                "📅 ",
                                                                new Date(d.datePeremption).toLocaleDateString("fr-FR")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlerteBadge, {
                                                            date: d.datePeremption,
                                                            label: "Péremption"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#ccc",
                                                        fontSize: "12px"
                                                    },
                                                    children: "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 27
                                                }, this),
                                                d.epi.vgpRequise && d.dateProchVGP && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        marginTop: "4px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                "🔍 VGP: ",
                                                                new Date(d.dateProchVGP).toLocaleDateString("fr-FR")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                            lineNumber: 272,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlerteBadge, {
                                                            date: d.dateProchVGP,
                                                            label: "VGP"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                            lineNumber: 273,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 263,
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
                                                    fontSize: "12px",
                                                    fontWeight: "bold"
                                                },
                                                children: st.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                lineNumber: 278,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 277,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: d.statut === "ACTIF" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: "4px",
                                                    flexWrap: "wrap"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleAction(d.id, "RETOUR"),
                                                        style: {
                                                            padding: "4px 8px",
                                                            background: "#f0f9ff",
                                                            color: "#0070f3",
                                                            border: "1px solid #0070f3",
                                                            borderRadius: "4px",
                                                            cursor: "pointer",
                                                            fontSize: "11px",
                                                            fontWeight: "bold"
                                                        },
                                                        children: "↩ Retour"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 27
                                                    }, this),
                                                    d.epi.vgpRequise && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setShowVGPModal(d);
                                                            setVgpForm({
                                                                dateDerniereVGP: new Date().toISOString().split("T")[0],
                                                                dateProchVGP: ""
                                                            });
                                                        },
                                                        style: {
                                                            padding: "4px 8px",
                                                            background: "#fef3c7",
                                                            color: "#d97706",
                                                            border: "1px solid #fcd34d",
                                                            borderRadius: "4px",
                                                            cursor: "pointer",
                                                            fontSize: "11px",
                                                            fontWeight: "bold"
                                                        },
                                                        children: "🔍 VGP"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setShowReformeModal(d);
                                                            setMotifReforme("");
                                                        },
                                                        style: {
                                                            padding: "4px 8px",
                                                            background: "#fee2e2",
                                                            color: "#ef4444",
                                                            border: "1px solid #fca5a5",
                                                            borderRadius: "4px",
                                                            cursor: "pointer",
                                                            fontSize: "11px",
                                                            fontWeight: "bold"
                                                        },
                                                        children: "🗑 Réforme"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                lineNumber: 284,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, d.id, true, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 235,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                    lineNumber: 227,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                lineNumber: 220,
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
                        borderRadius: "12px",
                        padding: "28px",
                        width: "520px",
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
                            children: "Nouvelle dotation EPI"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 314,
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
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 316,
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
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: [
                                                "OUVRIER ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#ef4444"
                                                    },
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 51
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 320,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            style: inputStyle,
                                            value: form.userId,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    userId: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "— Sélectionner un ouvrier —"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 19
                                                }, this),
                                                users.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: u.id,
                                                        children: [
                                                            u.nom,
                                                            " ",
                                                            u.prenom,
                                                            " ",
                                                            u.matricule ? `(${u.matricule})` : ""
                                                        ]
                                                    }, u.id, true, {
                                                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 35
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 321,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: [
                                                "EPI ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#ef4444"
                                                    },
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 47
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            style: inputStyle,
                                            value: form.epiId,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    epiId: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "— Sélectionner un EPI —"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 19
                                                }, this),
                                                epis.filter((e)=>e.stockActuel > 0).map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: e.id,
                                                        children: [
                                                            e.nom,
                                                            " ",
                                                            e.norme ? `(${e.norme})` : "",
                                                            " — Stock: ",
                                                            e.stockActuel
                                                        ]
                                                    }, e.id, true, {
                                                        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 328,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 326,
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
                                                    children: "QUANTITÉ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    style: inputStyle,
                                                    value: form.quantite,
                                                    min: 1,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            quantite: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 338,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 336,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "ÉTAT"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    style: inputStyle,
                                                    value: form.etat,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            etat: e.target.value
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "NEUF",
                                                            children: "Neuf"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "BON",
                                                            children: "Bon état"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "USE",
                                                            children: "Usé"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 341,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: labelStyle,
                                                    children: "TAILLE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    style: inputStyle,
                                                    value: form.taille,
                                                    placeholder: "S, M, L, 42...",
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            taille: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 349,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "DATE MISE EN SERVICE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 356,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            style: inputStyle,
                                            value: form.dateMiseEnService,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    dateMiseEnService: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 357,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 355,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "REMARQUE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 361,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            style: inputStyle,
                                            value: form.remarque,
                                            placeholder: "Observations...",
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    remarque: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 362,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 360,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 318,
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
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 368,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSubmit,
                                    disabled: saving,
                                    style: {
                                        padding: "10px 20px",
                                        background: "#10b981",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    },
                                    children: saving ? "..." : "Distribuer"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 372,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                    lineNumber: 313,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                lineNumber: 312,
                columnNumber: 9
            }, this),
            showVGPModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            children: "🔍 Enregistrer VGP"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 385,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: "0 0 20px",
                                color: "#666",
                                fontSize: "14px"
                            },
                            children: [
                                showVGPModal.epi.nom,
                                " — ",
                                showVGPModal.user.nom,
                                " ",
                                showVGPModal.user.prenom
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 386,
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
                                            children: "DATE DE LA VGP"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 391,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            style: inputStyle,
                                            value: vgpForm.dateDerniereVGP,
                                            onChange: (e)=>setVgpForm({
                                                    ...vgpForm,
                                                    dateDerniereVGP: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 390,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "PROCHAINE VGP"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 396,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            style: inputStyle,
                                            value: vgpForm.dateProchVGP,
                                            onChange: (e)=>setVgpForm({
                                                    ...vgpForm,
                                                    dateProchVGP: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                            lineNumber: 397,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 395,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 389,
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
                                    onClick: ()=>setShowVGPModal(null),
                                    style: {
                                        padding: "10px 20px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        background: "white",
                                        cursor: "pointer"
                                    },
                                    children: "Annuler"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 402,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleAction(showVGPModal.id, "VGP", vgpForm),
                                    disabled: saving,
                                    style: {
                                        padding: "10px 20px",
                                        background: "#f59e0b",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    },
                                    children: saving ? "..." : "Enregistrer"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 406,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 401,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                    lineNumber: 384,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                lineNumber: 383,
                columnNumber: 9
            }, this),
            showReformeModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            children: "🗑️ Réformer l'EPI"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 419,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: "0 0 20px",
                                color: "#666",
                                fontSize: "14px"
                            },
                            children: [
                                showReformeModal.epi.nom,
                                " — ",
                                showReformeModal.user.nom,
                                " ",
                                showReformeModal.user.prenom
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 420,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: labelStyle,
                                    children: "MOTIF DE RÉFORME"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    style: inputStyle,
                                    value: motifReforme,
                                    placeholder: "Péremption, usure, choc, détérioration...",
                                    onChange: (e)=>setMotifReforme(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 425,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 423,
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
                                    onClick: ()=>setShowReformeModal(null),
                                    style: {
                                        padding: "10px 20px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        background: "white",
                                        cursor: "pointer"
                                    },
                                    children: "Annuler"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 429,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleAction(showReformeModal.id, "REFORME", {
                                            motifReforme
                                        }),
                                    disabled: saving,
                                    style: {
                                        padding: "10px 20px",
                                        background: "#ef4444",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    },
                                    children: saving ? "..." : "Confirmer réforme"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                                    lineNumber: 433,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                            lineNumber: 428,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                    lineNumber: 418,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
                lineNumber: 417,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/epi/distribution/page.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_s(DistributionPage, "H8nQNPMozUyJb4A8cHBEd5cZ4QM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = DistributionPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "AlerteBadge");
__turbopack_context__.k.register(_c1, "DistributionPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_epi_distribution_page_tsx_de17b897._.js.map