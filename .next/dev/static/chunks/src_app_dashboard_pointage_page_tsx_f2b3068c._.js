(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/pointage/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PointagePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const STATUTS = [
    "PRESENT",
    "ABSENT",
    "CONGE",
    "MALADIE"
];
const statutColor = {
    PRESENT: "#10b981",
    ABSENT: "#ef4444",
    CONGE: "#f59e0b",
    MALADIE: "#6366f1"
};
function PointagePage() {
    _s();
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().toISOString().split("T")[0]);
    const [zoneId, setZoneId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [zones, setZones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [presences, setPresences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PointagePage.useEffect": ()=>{
            fetch("/api/ref").then({
                "PointagePage.useEffect": (r)=>r.json()
            }["PointagePage.useEffect"]).then({
                "PointagePage.useEffect": ()=>{}
            }["PointagePage.useEffect"]);
            // Charger les zones depuis les projets
            fetch("/api/zones").then({
                "PointagePage.useEffect": (r)=>r.json()
            }["PointagePage.useEffect"]).then({
                "PointagePage.useEffect": (data)=>setZones(Array.isArray(data) ? data : [])
            }["PointagePage.useEffect"]);
        }
    }["PointagePage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PointagePage.useEffect": ()=>{
            if (!zoneId) return;
            setLoading(true);
            fetch(`/api/pointage/presence?date=${date}&zoneId=${zoneId}`).then({
                "PointagePage.useEffect": (r)=>r.json()
            }["PointagePage.useEffect"]).then({
                "PointagePage.useEffect": (data)=>{
                    setPresences(Array.isArray(data) ? data : []);
                    setLoading(false);
                }
            }["PointagePage.useEffect"]);
        }
    }["PointagePage.useEffect"], [
        date,
        zoneId
    ]);
    const updateStatut = async (userId, statut)=>{
        setSaving(userId);
        await fetch("/api/pointage/presence", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                date,
                statut,
                zoneId
            })
        });
        setSaving(null);
        // Rafraîchir
        fetch(`/api/pointage/presence?date=${date}&zoneId=${zoneId}`).then((r)=>r.json()).then((data)=>setPresences(Array.isArray(data) ? data : []));
    };
    const totalPresents = presences.filter((p)=>p.statut === "PRESENT").length;
    const totalAbsents = presences.filter((p)=>p.statut === "ABSENT").length;
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
                                children: "⏱️ Pointage"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "4px 0 0",
                                    color: "#666",
                                    fontSize: "14px"
                                },
                                children: "Gestion des présences et feuilles de régie"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard/pointage/regie/nouvelle",
                        style: {
                            background: "#0070f3",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: "bold"
                        },
                        children: "+ Nouvelle feuille de régie"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                lineNumber: 86,
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
                    alignItems: "center",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: "12px",
                                    color: "#666",
                                    fontWeight: "bold"
                                },
                                children: "DATE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                lineNumber: 120,
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
                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: "12px",
                                    color: "#666",
                                    fontWeight: "bold"
                                },
                                children: "ZONE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: zoneId,
                                onChange: (e)=>setZoneId(e.target.value),
                                style: {
                                    padding: "8px 12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    minWidth: "200px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Sélectionner une zone"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    zones.map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: z.id,
                                            children: z.nom
                                        }, z.id, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    presences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginLeft: "auto",
                            display: "flex",
                            gap: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "#d1fae5",
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#10b981"
                                        },
                                        children: totalPresents
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "11px",
                                            color: "#065f46"
                                        },
                                        children: "Présents"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "#fee2e2",
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#ef4444"
                                        },
                                        children: totalAbsents
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "11px",
                                            color: "#991b1b"
                                        },
                                        children: "Absents"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            !zoneId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    padding: "40px",
                    textAlign: "center",
                    color: "#999"
                },
                children: "Sélectionnez une zone pour afficher les présences"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                lineNumber: 159,
                columnNumber: 9
            }, this) : loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    padding: "40px",
                    textAlign: "center",
                    color: "#999"
                },
                children: "Chargement..."
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, this) : presences.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    padding: "40px",
                    textAlign: "center",
                    color: "#999"
                },
                children: "Aucune présence enregistrée pour cette zone et cette date"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                    overflow: "hidden"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
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
                                            padding: "12px 16px",
                                            textAlign: "left",
                                            fontSize: "12px",
                                            color: "#666",
                                            fontWeight: "bold"
                                        },
                                        children: "EMPLOYÉ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: "12px 16px",
                                            textAlign: "left",
                                            fontSize: "12px",
                                            color: "#666",
                                            fontWeight: "bold"
                                        },
                                        children: "POSTE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: "12px 16px",
                                            textAlign: "center",
                                            fontSize: "12px",
                                            color: "#666",
                                            fontWeight: "bold"
                                        },
                                        children: "STATUT"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: "12px 16px",
                                            textAlign: "center",
                                            fontSize: "12px",
                                            color: "#666",
                                            fontWeight: "bold"
                                        },
                                        children: "VALIDÉ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                lineNumber: 174,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: presences.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        borderBottom: "1px solid #f1f5f9"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: "36px",
                                                            height: "36px",
                                                            borderRadius: "50%",
                                                            background: "#0070f3",
                                                            color: "white",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontWeight: "bold",
                                                            fontSize: "14px"
                                                        },
                                                        children: p.user.nom[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontWeight: "bold",
                                                                    fontSize: "14px"
                                                                },
                                                                children: [
                                                                    p.user.nom,
                                                                    " ",
                                                                    p.user.prenom
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                                                lineNumber: 195,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: "12px",
                                                                    color: "#999"
                                                                },
                                                                children: p.user.matricule || "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                                                lineNumber: 196,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                            lineNumber: 184,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                fontSize: "13px",
                                                color: "#666"
                                            },
                                            children: p.user.poste?.nom || "—"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                            lineNumber: 200,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                textAlign: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: p.statut,
                                                onChange: (e)=>updateStatut(p.user.id, e.target.value),
                                                disabled: saving === p.user.id || p.valide,
                                                style: {
                                                    padding: "6px 10px",
                                                    borderRadius: "6px",
                                                    border: `2px solid ${statutColor[p.statut] || "#ddd"}`,
                                                    color: statutColor[p.statut] || "#333",
                                                    fontWeight: "bold",
                                                    fontSize: "13px",
                                                    background: "white",
                                                    cursor: p.valide ? "not-allowed" : "pointer"
                                                },
                                                children: STATUTS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: s,
                                                        children: s
                                                    }, s, false, {
                                                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px",
                                                textAlign: "center"
                                            },
                                            children: p.valide ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#10b981",
                                                    fontWeight: "bold",
                                                    fontSize: "18px"
                                                },
                                                children: "✓"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                                lineNumber: 226,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#ddd",
                                                    fontSize: "18px"
                                                },
                                                children: "○"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                            lineNumber: 224,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, p.id, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                    lineNumber: 172,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                lineNumber: 171,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: "24px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px"
                },
                children: [
                    {
                        label: "Feuilles de régie",
                        icon: "📋",
                        href: "/dashboard/pointage/regie/liste",
                        color: "#0070f3"
                    },
                    {
                        label: "Rapport journalier",
                        icon: "📅",
                        href: "/dashboard/pointage/rapport?type=JOURNALIER",
                        color: "#10b981"
                    },
                    {
                        label: "Rapport hebdomadaire",
                        icon: "📊",
                        href: "/dashboard/pointage/rapport?type=HEBDOMADAIRE",
                        color: "#f59e0b"
                    },
                    {
                        label: "Rapport mensuel valorisé",
                        icon: "💰",
                        href: "/dashboard/pointage/rapport?type=MENSUEL_VALORISE",
                        color: "#ef4444"
                    }
                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: item.href,
                        style: {
                            textDecoration: "none"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: "white",
                                borderRadius: "10px",
                                padding: "16px 20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                                borderLeft: `4px solid ${item.color}`,
                                cursor: "pointer"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "24px"
                                    },
                                    children: item.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        color: "#1a1a1a"
                                    },
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                                    lineNumber: 259,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, this)
                    }, item.href, false, {
                        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/page.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/pointage/page.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(PointagePage, "e+9Or8sAxjnhc/KslgI7w1+jt8U=");
_c = PointagePage;
var _c;
__turbopack_context__.k.register(_c, "PointagePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_pointage_page_tsx_f2b3068c._.js.map