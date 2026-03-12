(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/pointage/presence/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresenceListePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const MOIS = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
];
function PresenceListePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const today = new Date();
    const [mois, setMois] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(today.getMonth() + 1);
    const [annee, setAnnee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(today.getFullYear());
    const [fiches, setFiches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PresenceListePage.useEffect": ()=>{
            loadFiches();
        }
    }["PresenceListePage.useEffect"], [
        mois,
        annee
    ]);
    const loadFiches = async ()=>{
        setLoading(true);
        const res = await fetch(`/api/presence?mois=${mois}&annee=${annee}`);
        const data = await res.json();
        // Grouper par date
        const parDate = {};
        if (Array.isArray(data)) {
            data.forEach((p)=>{
                const d = new Date(p.date).toISOString().split("T")[0];
                if (!parDate[d]) parDate[d] = [];
                parDate[d].push(p);
            });
        }
        const result = Object.entries(parDate).map(([date, lignes])=>({
                date,
                total: lignes.length,
                presents: lignes.filter((l)=>l.statut === "PRESENT").length,
                absents: lignes.filter((l)=>l.statut === "ABSENT").length,
                retards: lignes.filter((l)=>l.statut === "RETARD").length,
                autres: lignes.filter((l)=>[
                        "CONGE",
                        "MISSION",
                        "ARRET_MALADIE"
                    ].includes(l.statut)).length,
                statut: lignes[0]?.statutFiche || "BROUILLON"
            })).sort((a, b)=>b.date.localeCompare(a.date));
        setFiches(result);
        setLoading(false);
    };
    const todayStr = today.toISOString().split("T")[0];
    const ficheDuJour = fiches.find((f)=>f.date === todayStr);
    const statutConfig = {
        BROUILLON: {
            label: "Brouillon",
            color: "#6b7280",
            bg: "#f9fafb"
        },
        VALIDE_CHEF: {
            label: "Validé chef",
            color: "#0070f3",
            bg: "#eff6ff"
        },
        VALIDE_RH: {
            label: "Validé RH",
            color: "#059669",
            bg: "#f0fdf4"
        }
    };
    // Générer calendrier du mois
    const premierJour = new Date(annee, mois - 1, 1).getDay();
    const nbJours = new Date(annee, mois, 0).getDate();
    const joursCalendrier = [];
    for(let i = 0; i < (premierJour === 0 ? 6 : premierJour - 1); i++)joursCalendrier.push(null);
    for(let i = 1; i <= nbJours; i++)joursCalendrier.push(i);
    const getFicheForDay = (jour)=>{
        const dateStr = `${annee}-${String(mois).padStart(2, "0")}-${String(jour).padStart(2, "0")}`;
        return fiches.find((f)=>f.date === dateStr);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "#f4f6f9",
            minHeight: "100vh",
            paddingBottom: 80
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    padding: "16px 20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        margin: 0,
                                        fontSize: "clamp(16px,4vw,22px)",
                                        fontWeight: "bold"
                                    },
                                    children: "📋 Présences"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: "2px 0 0",
                                        color: "#888",
                                        fontSize: 13
                                    },
                                    children: "Historique et gestion des fiches de présence"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push(`/dashboard/pointage/presence/${todayStr}`),
                            style: {
                                padding: "10px 20px",
                                background: "#0070f3",
                                color: "white",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: 14,
                                minHeight: 44
                            },
                            children: "📋 Appel du jour"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "16px 20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: ficheDuJour ? "#f0fdf4" : "#fffbeb",
                            border: `2px solid ${ficheDuJour ? "#6ee7b7" : "#fde68a"}`,
                            borderRadius: 12,
                            padding: "16px 20px",
                            marginBottom: 20,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: "bold",
                                            fontSize: 15,
                                            color: "#1a1a1a"
                                        },
                                        children: ficheDuJour ? "✅ Fiche d'aujourd'hui enregistrée" : "⚠️ Pas encore de fiche pour aujourd'hui"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 13,
                                            color: "#666",
                                            marginTop: 4
                                        },
                                        children: [
                                            today.toLocaleDateString("fr-FR", {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            }),
                                            ficheDuJour && ` · ${ficheDuJour.presents} présents / ${ficheDuJour.total}`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push(`/dashboard/pointage/presence/${todayStr}`),
                                style: {
                                    padding: "10px 20px",
                                    minHeight: 44,
                                    background: ficheDuJour ? "#059669" : "#f59e0b",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 8,
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: 13
                                },
                                children: ficheDuJour ? "✏️ Modifier" : "➕ Faire l'appel"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "white",
                            borderRadius: 12,
                            padding: "14px 16px",
                            marginBottom: 16,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (mois === 1) {
                                                setMois(12);
                                                setAnnee((a)=>a - 1);
                                            } else setMois((m)=>m - 1);
                                        },
                                        style: {
                                            padding: "6px 14px",
                                            border: "1px solid #ddd",
                                            borderRadius: 8,
                                            background: "white",
                                            cursor: "pointer",
                                            fontSize: 18,
                                            minHeight: 40
                                        },
                                        children: "‹"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: "bold",
                                            fontSize: 16
                                        },
                                        children: [
                                            MOIS[mois - 1],
                                            " ",
                                            annee
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (mois === 12) {
                                                setMois(1);
                                                setAnnee((a)=>a + 1);
                                            } else setMois((m)=>m + 1);
                                        },
                                        style: {
                                            padding: "6px 14px",
                                            border: "1px solid #ddd",
                                            borderRadius: 8,
                                            background: "white",
                                            cursor: "pointer",
                                            fontSize: 18,
                                            minHeight: 40
                                        },
                                        children: "›"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(7, 1fr)",
                                    gap: 4,
                                    marginBottom: 8
                                },
                                children: [
                                    [
                                        "L",
                                        "M",
                                        "M",
                                        "J",
                                        "V",
                                        "S",
                                        "D"
                                    ].map((j, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: "center",
                                                fontSize: 11,
                                                fontWeight: "bold",
                                                color: "#aaa",
                                                padding: "4px 0"
                                            },
                                            children: j
                                        }, i, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this)),
                                    joursCalendrier.map((jour, i)=>{
                                        if (!jour) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, i, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                            lineNumber: 142,
                                            columnNumber: 33
                                        }, this);
                                        const fiche = getFicheForDay(jour);
                                        const dateStr = `${annee}-${String(mois).padStart(2, "0")}-${String(jour).padStart(2, "0")}`;
                                        const isToday = dateStr === todayStr;
                                        const isFutur = new Date(dateStr) > today;
                                        const taux = fiche ? Math.round(fiche.presents / fiche.total * 100) : null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>!isFutur && router.push(`/dashboard/pointage/presence/${dateStr}`),
                                            style: {
                                                borderRadius: 8,
                                                padding: "6px 4px",
                                                textAlign: "center",
                                                cursor: isFutur ? "default" : "pointer",
                                                border: isToday ? "2px solid #0070f3" : "1px solid #f1f5f9",
                                                background: fiche ? fiche.statut === "VALIDE_RH" ? "#f0fdf4" : fiche.statut === "VALIDE_CHEF" ? "#eff6ff" : "#fffbeb" : isToday ? "#eff6ff" : isFutur ? "#fafafa" : "white",
                                                opacity: isFutur ? 0.4 : 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 13,
                                                        fontWeight: isToday ? "bold" : "normal",
                                                        color: isToday ? "#0070f3" : "#333"
                                                    },
                                                    children: jour
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 19
                                                }, this),
                                                fiche && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 9,
                                                        color: taux >= 80 ? "#059669" : "#dc2626",
                                                        fontWeight: "bold"
                                                    },
                                                    children: [
                                                        taux,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 21
                                                }, this),
                                                !fiche && !isFutur && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 9,
                                                        color: "#ddd"
                                                    },
                                                    children: "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                            lineNumber: 150,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "white",
                            borderRadius: 12,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                            overflow: "hidden"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "14px 16px",
                                    borderBottom: "1px solid #f1f5f9",
                                    fontWeight: "bold",
                                    fontSize: 14
                                },
                                children: [
                                    "Fiches du mois (",
                                    fiches.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: 40,
                                    textAlign: "center",
                                    color: "#999"
                                },
                                children: "Chargement..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this) : fiches.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: 40,
                                    textAlign: "center",
                                    color: "#999"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 32,
                                            marginBottom: 8
                                        },
                                        children: "📭"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this),
                                    "Aucune fiche ce mois-ci"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this) : fiches.map((f)=>{
                                const st = statutConfig[f.statut] || statutConfig.BROUILLON;
                                const taux = f.total > 0 ? Math.round(f.presents / f.total * 100) : 0;
                                const date = new Date(f.date);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>router.push(`/dashboard/pointage/presence/${f.date}`),
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 14,
                                        padding: "14px 16px",
                                        borderBottom: "1px solid #f1f5f9",
                                        cursor: "pointer"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#f8fafc",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: "center",
                                                minWidth: 48,
                                                background: "#f8fafc",
                                                borderRadius: 10,
                                                padding: "8px 6px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#0070f3"
                                                    },
                                                    children: date.getDate()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: "#aaa"
                                                    },
                                                    children: MOIS[date.getMonth()].slice(0, 3)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                            lineNumber: 205,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1,
                                                minWidth: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: "bold",
                                                        fontSize: 14,
                                                        marginBottom: 4
                                                    },
                                                    children: date.toLocaleDateString("fr-FR", {
                                                        weekday: "long",
                                                        day: "numeric",
                                                        month: "long"
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: 12,
                                                        fontSize: 12,
                                                        flexWrap: "wrap"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: "#059669"
                                                            },
                                                            children: [
                                                                "✅ ",
                                                                f.presents,
                                                                " présents"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 23
                                                        }, this),
                                                        f.absents > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: "#dc2626"
                                                            },
                                                            children: [
                                                                "❌ ",
                                                                f.absents,
                                                                " absents"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 41
                                                        }, this),
                                                        f.retards > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: "#d97706"
                                                            },
                                                            children: [
                                                                "⏰ ",
                                                                f.retards,
                                                                " retards"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                            lineNumber: 218,
                                                            columnNumber: 41
                                                        }, this),
                                                        f.autres > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: "#7c3aed"
                                                            },
                                                            children: [
                                                                "📌 ",
                                                                f.autres,
                                                                " autres"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                            lineNumber: 219,
                                                            columnNumber: 40
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: "center",
                                                minWidth: 52
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: taux >= 80 ? "#059669" : taux >= 60 ? "#d97706" : "#dc2626"
                                                    },
                                                    children: [
                                                        taux,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: "#aaa"
                                                    },
                                                    children: [
                                                        f.total,
                                                        " total"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                            lineNumber: 224,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                background: st.bg,
                                                color: st.color,
                                                padding: "3px 10px",
                                                borderRadius: 20,
                                                fontSize: 11,
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap"
                                            },
                                            children: st.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                            lineNumber: 232,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#ccc",
                                                fontSize: 16
                                            },
                                            children: "›"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                            lineNumber: 236,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, f.date, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/pointage/presence/page.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(PresenceListePage, "ETrSpLZA4mtDOzgSAjoFac15hDw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PresenceListePage;
var _c;
__turbopack_context__.k.register(_c, "PresenceListePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_pointage_presence_page_tsx_b88af49a._.js.map