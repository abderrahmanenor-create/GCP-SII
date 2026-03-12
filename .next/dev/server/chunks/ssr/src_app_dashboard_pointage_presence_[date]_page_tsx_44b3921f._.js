module.exports = [
"[project]/src/app/dashboard/pointage/presence/[date]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppelPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const STATUTS = {
    PRESENT: {
        label: "Présent",
        color: "#059669",
        bg: "#f0fdf4",
        icon: "✅",
        border: "#6ee7b7"
    },
    RETARD: {
        label: "Retard",
        color: "#d97706",
        bg: "#fffbeb",
        icon: "⏰",
        border: "#fde68a"
    },
    ABSENT: {
        label: "Absent",
        color: "#dc2626",
        bg: "#fef2f2",
        icon: "❌",
        border: "#fca5a5"
    },
    CONGE: {
        label: "Congé",
        color: "#7c3aed",
        bg: "#f5f3ff",
        icon: "🏖️",
        border: "#ddd6fe"
    },
    MISSION: {
        label: "Mission",
        color: "#0070f3",
        bg: "#eff6ff",
        icon: "🚗",
        border: "#bfdbfe"
    },
    ARRET_MALADIE: {
        label: "Maladie",
        color: "#be123c",
        bg: "#fff1f2",
        icon: "🏥",
        border: "#fecdd3"
    }
};
const SHIFTS = {
    JOUR: {
        label: "Shift Jour",
        icon: "☀️",
        color: "#d97706",
        bg: "#fffbeb",
        debut: "07:00",
        fin: "19:00"
    },
    NUIT: {
        label: "Shift Nuit",
        icon: "🌙",
        color: "#4f46e5",
        bg: "#eef2ff",
        debut: "19:00",
        fin: "07:00"
    },
    RAMADAN: {
        label: "Shift Ramadan",
        icon: "🌙✨",
        color: "#059669",
        bg: "#f0fdf4",
        debut: "08:00",
        fin: "16:00"
    }
};
const ORDRE_STATUTS = [
    "PRESENT",
    "RETARD",
    "ABSENT",
    "CONGE",
    "MISSION",
    "ARRET_MALADIE"
];
function Avatar({ user, size = 44 }) {
    const initials = `${user.prenom[0]}${user.nom[0]}`.toUpperCase();
    const colors = [
        "#0070f3",
        "#059669",
        "#7c3aed",
        "#d97706",
        "#dc2626",
        "#0891b2"
    ];
    const color = colors[(user.nom.charCodeAt(0) + user.prenom.charCodeAt(0)) % colors.length];
    if (user.photoUrl) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: user.photoUrl,
        alt: initials,
        style: {
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0
        }
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
        lineNumber: 52,
        columnNumber: 29
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: size,
            height: size,
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: size * 0.32,
            flexShrink: 0
        },
        children: initials
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
function AppelPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const dateStr = params.date;
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [zones, setZones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [equipes, setEquipes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [presences, setPresences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [etape, setEtape] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("appel");
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editUser, setEditUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [shiftActif, setShiftActif] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("JOUR");
    const [shiftRamadanDebut, setShiftRamadanDebut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("08:00");
    const [shiftRamadanFin, setShiftRamadanFin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("16:00");
    const touchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const MOVE_THRESHOLD = 10;
    const LONG_PRESS = 600;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadData();
    }, [
        dateStr
    ]);
    const loadData = async ()=>{
        const [usersRes, presencesRes, veilleRes, zonesRes, equipesRes] = await Promise.all([
            fetch("/api/users").then((r)=>r.json()),
            fetch(`/api/presence?date=${dateStr}`).then((r)=>r.json()),
            fetch(`/api/presence/veille?date=${dateStr}`).then((r)=>r.json()),
            fetch("/api/zones").then((r)=>r.json()),
            fetch("/api/equipes").then((r)=>r.json())
        ]);
        const actifs = Array.isArray(usersRes) ? usersRes.filter((u)=>u.statut === "ACTIF") : [];
        setUsers(actifs);
        setZones(Array.isArray(zonesRes) ? zonesRes : []);
        setEquipes(Array.isArray(equipesRes) ? equipesRes : []);
        const map = {};
        if (Array.isArray(veilleRes)) {
            veilleRes.forEach((p)=>{
                map[p.userId] = {
                    statut: p.statut,
                    shift: p.shift || "JOUR",
                    heureDebutShift: p.heureDebutShift || "07:00",
                    heureFinShift: p.heureFinShift || "19:00",
                    heureArrivee: p.heureArrivee || "",
                    heureDepart: p.heureDepart || "",
                    remarque: "",
                    zoneId: p.zoneId || "",
                    equipeId: p.equipeId || ""
                };
            });
        }
        if (Array.isArray(presencesRes)) {
            presencesRes.forEach((p)=>{
                map[p.userId] = {
                    statut: p.statut,
                    shift: p.shift || "JOUR",
                    heureDebutShift: p.heureDebutShift || "07:00",
                    heureFinShift: p.heureFinShift || "19:00",
                    heureArrivee: p.heureArrivee || "",
                    heureDepart: p.heureDepart || "",
                    remarque: p.remarque || "",
                    zoneId: p.zoneId || "",
                    equipeId: p.equipeId || ""
                };
            });
        }
        setPresences(map);
        setLoading(false);
    };
    const getPresence = (userId)=>presences[userId] || {
            statut: "PRESENT",
            shift: shiftActif,
            heureDebutShift: SHIFTS[shiftActif].debut,
            heureFinShift: SHIFTS[shiftActif].fin,
            heureArrivee: "",
            heureDepart: "",
            remarque: "",
            zoneId: "",
            equipeId: ""
        };
    const setStatut = (userId, statut)=>{
        setPresences((prev)=>({
                ...prev,
                [userId]: {
                    ...getPresence(userId),
                    statut
                }
            }));
        setMenuOpen(null);
    };
    const updateField = (userId, field, value)=>{
        setPresences((prev)=>({
                ...prev,
                [userId]: {
                    ...getPresence(userId),
                    [field]: value
                }
            }));
    };
    const handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const touch = e.touches[0];
        touchStart.current = {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now()
        };
    }, []);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userId, e)=>{
        if (!touchStart.current) return;
        const touch = e.changedTouches[0];
        const dx = Math.abs(touch.clientX - touchStart.current.x);
        const dy = Math.abs(touch.clientY - touchStart.current.y);
        const dt = Date.now() - touchStart.current.time;
        touchStart.current = null;
        if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) return; // scroll → ignorer
        if (dt >= LONG_PRESS) {
            e.preventDefault();
            setMenuOpen((prev)=>prev === userId ? null : userId);
        } else {
            const current = getPresence(userId).statut;
            setStatut(userId, current === "PRESENT" ? "ABSENT" : "PRESENT");
        }
    }, [
        presences,
        shiftActif
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userId)=>{
        const current = getPresence(userId).statut;
        setStatut(userId, current === "PRESENT" ? "ABSENT" : "PRESENT");
    }, [
        presences
    ]);
    // Applique le shift actif à tous les ouvriers
    const appliquerShift = (shift)=>{
        setShiftActif(shift);
        const debut = shift === "RAMADAN" ? shiftRamadanDebut : SHIFTS[shift].debut;
        const fin = shift === "RAMADAN" ? shiftRamadanFin : SHIFTS[shift].fin;
        setPresences((prev)=>{
            const newP = {
                ...prev
            };
            users.forEach((u)=>{
                newP[u.id] = {
                    ...getPresence(u.id),
                    shift,
                    heureDebutShift: debut,
                    heureFinShift: fin
                };
            });
            return newP;
        });
    };
    const setAllStatut = (statut)=>{
        setPresences((prev)=>{
            const newP = {
                ...prev
            };
            users.forEach((u)=>{
                newP[u.id] = {
                    ...getPresence(u.id),
                    statut
                };
            });
            return newP;
        });
    };
    const handleSave = async ()=>{
        setSaving(true);
        const lignes = users.map((u)=>({
                userId: u.id,
                ...getPresence(u.id)
            }));
        await fetch("/api/presence", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: dateStr,
                lignes
            })
        });
        setSaving(false);
        setEtape("confirme");
        setTimeout(()=>router.push("/dashboard/pointage/presence"), 2000);
    };
    const filtered = users.filter((u)=>!search || `${u.nom} ${u.prenom} ${u.matricule || ""}`.toLowerCase().includes(search.toLowerCase()));
    const stats = {
        total: users.length,
        presents: users.filter((u)=>getPresence(u.id).statut === "PRESENT").length,
        retards: users.filter((u)=>getPresence(u.id).statut === "RETARD").length,
        absents: users.filter((u)=>getPresence(u.id).statut === "ABSENT").length,
        conge: users.filter((u)=>getPresence(u.id).statut === "CONGE").length,
        mission: users.filter((u)=>getPresence(u.id).statut === "MISSION").length,
        maladie: users.filter((u)=>getPresence(u.id).statut === "ARRET_MALADIE").length
    };
    const date = new Date(dateStr);
    const dateLabel = date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const shiftInfo = SHIFTS[shiftActif];
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 48
                },
                children: "📋"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: "#999",
                    marginTop: 12
                },
                children: "Chargement de l'appel..."
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
        lineNumber: 232,
        columnNumber: 5
    }, this);
    if (etape === "confirme") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            gap: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 64
                },
                children: "✅"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#059669"
                },
                children: "Fiche sauvegardée !"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: "#666"
                },
                children: [
                    stats.presents,
                    " présents · ",
                    stats.absents,
                    " absents"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
    // ===== ÉCRAN RÉVISION =====
    if (etape === "revision") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "#f4f6f9",
            minHeight: "100vh",
            paddingBottom: 100
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    padding: "16px 20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setEtape("appel"),
                            style: {
                                padding: "6px 14px",
                                border: "1px solid #ddd",
                                borderRadius: 8,
                                background: "white",
                                cursor: "pointer",
                                fontSize: 14,
                                minHeight: 40
                            },
                            children: "← Retour"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                            lineNumber: 251,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        margin: 0,
                                        fontSize: "clamp(15px,4vw,20px)",
                                        fontWeight: "bold"
                                    },
                                    children: "📊 Révision avant validation"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                    lineNumber: 253,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: "#888"
                                    },
                                    children: [
                                        dateLabel,
                                        " · ",
                                        shiftInfo.icon,
                                        " ",
                                        shiftInfo.label
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                            lineNumber: 252,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                    lineNumber: 250,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "16px 20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: shiftInfo.bg,
                            border: `1px solid ${shiftInfo.color}33`,
                            borderRadius: 12,
                            padding: "12px 16px",
                            marginBottom: 16,
                            display: "flex",
                            gap: 16,
                            alignItems: "center",
                            flexWrap: "wrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 24
                                },
                                children: shiftInfo.icon
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: "bold",
                                            color: shiftInfo.color
                                        },
                                        children: shiftInfo.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 13,
                                            color: "#666"
                                        },
                                        children: users[0] ? `${getPresence(users[0].id).heureDebutShift} → ${getPresence(users[0].id).heureFinShift}` : `${shiftInfo.debut} → ${shiftInfo.fin}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginLeft: "auto",
                                    textAlign: "right"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 22,
                                            fontWeight: "bold",
                                            color: "#059669"
                                        },
                                        children: stats.presents + stats.retards
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 11,
                                            color: "#aaa"
                                        },
                                        children: [
                                            "/ ",
                                            stats.total,
                                            " présents"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                            gap: 8,
                            marginBottom: 16
                        },
                        children: [
                            {
                                label: "Présents",
                                value: stats.presents,
                                color: "#059669",
                                bg: "#f0fdf4",
                                icon: "✅"
                            },
                            {
                                label: "Retards",
                                value: stats.retards,
                                color: "#d97706",
                                bg: "#fffbeb",
                                icon: "⏰"
                            },
                            {
                                label: "Absents",
                                value: stats.absents,
                                color: "#dc2626",
                                bg: "#fef2f2",
                                icon: "❌"
                            },
                            {
                                label: "Congés",
                                value: stats.conge,
                                color: "#7c3aed",
                                bg: "#f5f3ff",
                                icon: "🏖️"
                            },
                            {
                                label: "Missions",
                                value: stats.mission,
                                color: "#0070f3",
                                bg: "#eff6ff",
                                icon: "🚗"
                            },
                            {
                                label: "Maladie",
                                value: stats.maladie,
                                color: "#be123c",
                                bg: "#fff1f2",
                                icon: "🏥"
                            }
                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: s.bg,
                                    borderRadius: 10,
                                    padding: "8px",
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 16
                                        },
                                        children: s.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            color: s.color
                                        },
                                        children: s.value
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 9,
                                            color: "#666"
                                        },
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, s.label, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    ORDRE_STATUTS.filter((s)=>users.some((u)=>getPresence(u.id).statut === s)).map((statut)=>{
                        const st = STATUTS[statut];
                        const ouvriers = users.filter((u)=>getPresence(u.id).statut === statut);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: "white",
                                borderRadius: 12,
                                marginBottom: 12,
                                overflow: "hidden",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "10px 16px",
                                        background: st.bg,
                                        borderBottom: `2px solid ${st.border}`,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 16
                                            },
                                            children: st.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                            lineNumber: 300,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontWeight: "bold",
                                                color: st.color
                                            },
                                            children: st.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                            lineNumber: 301,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                background: "white",
                                                color: st.color,
                                                padding: "1px 8px",
                                                borderRadius: 20,
                                                fontSize: 11,
                                                fontWeight: "bold",
                                                marginLeft: "auto"
                                            },
                                            children: ouvriers.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                            lineNumber: 302,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this),
                                ouvriers.map((u, i)=>{
                                    const p = getPresence(u.id);
                                    const zone = zones.find((z)=>z.id === p.zoneId);
                                    const equipe = equipes.find((e)=>e.id === p.equipeId);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                            padding: "10px 16px",
                                            borderBottom: i < ouvriers.length - 1 ? "1px solid #f1f5f9" : "none"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                                user: u,
                                                size: 32
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 310,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: "bold",
                                                            fontSize: 13
                                                        },
                                                        children: [
                                                            u.prenom,
                                                            " ",
                                                            u.nom
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: "#aaa"
                                                        },
                                                        children: [
                                                            equipe ? `👥 ${equipe.nom}` : "",
                                                            " ",
                                                            zone ? `· 📍 ${zone.nom}` : ""
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 21
                                            }, this),
                                            ![
                                                "ABSENT",
                                                "CONGE",
                                                "ARRET_MALADIE"
                                            ].includes(statut) && (p.heureArrivee || p.heureDepart) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    color: "#666",
                                                    whiteSpace: "nowrap"
                                                },
                                                children: [
                                                    p.heureArrivee || "--:--",
                                                    " → ",
                                                    p.heureDepart || "--:--"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 23
                                            }, this),
                                            p.remarque && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 10,
                                                    color: "#0070f3",
                                                    maxWidth: 100,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap"
                                                },
                                                children: [
                                                    "💬 ",
                                                    p.remarque
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, u.id, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 309,
                                        columnNumber: 19
                                    }, this);
                                })
                            ]
                        }, statut, true, {
                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                            lineNumber: 298,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "white",
                    padding: "14px 20px",
                    boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
                    display: "flex",
                    gap: 12,
                    zIndex: 99
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setEtape("appel"),
                        style: {
                            flex: 1,
                            padding: 14,
                            border: "1px solid #ddd",
                            borderRadius: 10,
                            background: "white",
                            cursor: "pointer",
                            fontSize: 14
                        },
                        children: "✏️ Modifier"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSave,
                        disabled: saving,
                        style: {
                            flex: 2,
                            padding: 14,
                            background: "#059669",
                            color: "white",
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: 15,
                            minHeight: 52
                        },
                        children: saving ? "⏳ Sauvegarde..." : "✅ Confirmer et valider"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 331,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
    // ===== ÉCRAN APPEL PRINCIPAL =====
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "#f4f6f9",
            minHeight: "100vh",
            paddingBottom: 100
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    padding: "14px 20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    position: "sticky",
                    top: 0,
                    zIndex: 100
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 10
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push("/dashboard/pointage/presence"),
                                    style: {
                                        padding: "6px 12px",
                                        border: "1px solid #ddd",
                                        borderRadius: 8,
                                        background: "white",
                                        cursor: "pointer",
                                        fontSize: 14,
                                        minHeight: 38
                                    },
                                    children: "←"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                    lineNumber: 348,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontWeight: "bold",
                                                fontSize: "clamp(14px,3.5vw,18px)"
                                            },
                                            children: [
                                                "📋 Appel · ",
                                                shiftInfo.icon,
                                                " ",
                                                shiftInfo.label
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 11,
                                                color: "#888"
                                            },
                                            children: dateLabel
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                            lineNumber: 351,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                            lineNumber: 347,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 6,
                                fontSize: 13
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#059669",
                                        fontWeight: "bold"
                                    },
                                    children: [
                                        "✅ ",
                                        stats.presents
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                    lineNumber: 355,
                                    columnNumber: 13
                                }, this),
                                stats.retards > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#d97706",
                                        fontWeight: "bold"
                                    },
                                    children: [
                                        "⏰ ",
                                        stats.retards
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 35
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#dc2626",
                                        fontWeight: "bold"
                                    },
                                    children: [
                                        "❌ ",
                                        stats.absents
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                    lineNumber: 357,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#aaa"
                                    },
                                    children: [
                                        "/ ",
                                        stats.total
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                    lineNumber: 358,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                            lineNumber: 354,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                    lineNumber: 346,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "14px 16px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "white",
                            borderRadius: 12,
                            padding: "14px 16px",
                            marginBottom: 14,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: "bold",
                                    color: "#aaa",
                                    marginBottom: 10
                                },
                                children: "SHIFT DE LA FEUILLE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 8,
                                    flexWrap: "wrap"
                                },
                                children: [
                                    "JOUR",
                                    "NUIT",
                                    "RAMADAN"
                                ].map((s)=>{
                                    const sh = SHIFTS[s];
                                    const actif = shiftActif === s;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>appliquerShift(s),
                                        style: {
                                            flex: 1,
                                            minWidth: 100,
                                            padding: "10px 8px",
                                            background: actif ? sh.bg : "white",
                                            border: `2px solid ${actif ? sh.color : "#e5e7eb"}`,
                                            borderRadius: 10,
                                            cursor: "pointer",
                                            textAlign: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 20
                                                },
                                                children: sh.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 379,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                    color: actif ? sh.color : "#666"
                                                },
                                                children: sh.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 380,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 10,
                                                    color: "#aaa"
                                                },
                                                children: [
                                                    sh.debut,
                                                    "→",
                                                    sh.fin
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 381,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, s, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 373,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this),
                            shiftActif === "RAMADAN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 12,
                                    display: "flex",
                                    gap: 12,
                                    alignItems: "center",
                                    flexWrap: "wrap"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 12,
                                            color: "#666"
                                        },
                                        children: "Horaires Ramadan :"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "time",
                                        value: shiftRamadanDebut,
                                        onChange: (e)=>setShiftRamadanDebut(e.target.value),
                                        style: {
                                            padding: "6px 10px",
                                            border: "1px solid #ddd",
                                            borderRadius: 8,
                                            fontSize: 14,
                                            minHeight: 38
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "#aaa"
                                        },
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 394,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "time",
                                        value: shiftRamadanFin,
                                        onChange: (e)=>setShiftRamadanFin(e.target.value),
                                        style: {
                                            padding: "6px 10px",
                                            border: "1px solid #ddd",
                                            borderRadius: 8,
                                            fontSize: 14,
                                            minHeight: 38
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>appliquerShift("RAMADAN"),
                                        style: {
                                            padding: "6px 14px",
                                            background: "#059669",
                                            color: "white",
                                            border: "none",
                                            borderRadius: 8,
                                            cursor: "pointer",
                                            fontSize: 12,
                                            fontWeight: "bold"
                                        },
                                        children: "Appliquer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "white",
                            borderRadius: 12,
                            padding: "12px 14px",
                            marginBottom: 14,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 8,
                                    marginBottom: 10
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "🔍 Rechercher un ouvrier...",
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value),
                                    style: {
                                        flex: 1,
                                        padding: "8px 12px",
                                        border: "1px solid #ddd",
                                        borderRadius: 8,
                                        fontSize: 14,
                                        minHeight: 42,
                                        outline: "none"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 408,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 6,
                                    flexWrap: "wrap",
                                    alignItems: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 10,
                                            color: "#aaa",
                                            fontWeight: "bold"
                                        },
                                        children: "TOUT :"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 414,
                                        columnNumber: 13
                                    }, this),
                                    ORDRE_STATUTS.map((s)=>{
                                        const st = STATUTS[s];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setAllStatut(s),
                                            style: {
                                                padding: "4px 10px",
                                                background: st.bg,
                                                color: st.color,
                                                border: `1px solid ${st.border}`,
                                                borderRadius: 20,
                                                cursor: "pointer",
                                                fontSize: 11,
                                                fontWeight: "bold",
                                                minHeight: 30
                                            },
                                            children: [
                                                st.icon,
                                                " ",
                                                st.label
                                            ]
                                        }, s, true, {
                                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                            lineNumber: 418,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 413,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            color: "#bbb",
                            textAlign: "center",
                            marginBottom: 10
                        },
                        children: "👆 Tap = présent/absent · Appui long = choisir statut"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(min(150px, 44vw), 1fr))",
                            gap: 10
                        },
                        children: filtered.map((u)=>{
                            const p = getPresence(u.id);
                            const st = STATUTS[p.statut];
                            const isMenu = menuOpen === u.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onTouchStart: handleTouchStart,
                                        onTouchEnd: (e)=>handleTouchEnd(u.id, e),
                                        onClick: ()=>handleClick(u.id),
                                        style: {
                                            background: st.bg,
                                            border: `2px solid ${st.border}`,
                                            borderRadius: 12,
                                            padding: "14px 10px",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            userSelect: "none",
                                            WebkitUserSelect: "none",
                                            touchAction: "pan-y"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    marginBottom: 8
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                                    user: u,
                                                    size: 42
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 454,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: "bold",
                                                    color: "#1a1a1a",
                                                    lineHeight: 1.2
                                                },
                                                children: u.prenom
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 457,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    color: "#555",
                                                    marginBottom: 6
                                                },
                                                children: u.nom
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 458,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 3,
                                                    padding: "3px 8px",
                                                    borderRadius: 20,
                                                    background: "white",
                                                    border: `1px solid ${st.border}`,
                                                    fontSize: 11,
                                                    fontWeight: "bold",
                                                    color: st.color
                                                },
                                                children: [
                                                    st.icon,
                                                    " ",
                                                    st.label
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 459,
                                                columnNumber: 19
                                            }, this),
                                            u.poste && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 9,
                                                    color: "#bbb",
                                                    marginTop: 4
                                                },
                                                children: u.poste.nom
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 462,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 443,
                                        columnNumber: 17
                                    }, this),
                                    isMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            top: "105%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            background: "white",
                                            borderRadius: 12,
                                            padding: 8,
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                                            zIndex: 200,
                                            minWidth: 180,
                                            border: "1px solid #e5e7eb"
                                        },
                                        onClick: (e)=>e.stopPropagation(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    color: "#aaa",
                                                    padding: "4px 8px 8px",
                                                    fontWeight: "bold"
                                                },
                                                children: [
                                                    u.prenom,
                                                    " ",
                                                    u.nom
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 469,
                                                columnNumber: 21
                                            }, this),
                                            ORDRE_STATUTS.map((s)=>{
                                                const sst = STATUTS[s];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setStatut(u.id, s),
                                                    style: {
                                                        width: "100%",
                                                        padding: "9px 12px",
                                                        textAlign: "left",
                                                        background: p.statut === s ? sst.bg : "white",
                                                        border: "none",
                                                        borderRadius: 8,
                                                        cursor: "pointer",
                                                        fontSize: 13,
                                                        color: sst.color,
                                                        fontWeight: p.statut === s ? "bold" : "normal",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 8
                                                    },
                                                    children: [
                                                        sst.icon,
                                                        " ",
                                                        sst.label,
                                                        p.statut === s && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                marginLeft: "auto"
                                                            },
                                                            children: "✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                            lineNumber: 481,
                                                            columnNumber: 46
                                                        }, this)
                                                    ]
                                                }, s, true, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                    lineNumber: 473,
                                                    columnNumber: 25
                                                }, this);
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    borderTop: "1px solid #f1f5f9",
                                                    marginTop: 4,
                                                    paddingTop: 4
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setEditUser(u.id);
                                                        setMenuOpen(null);
                                                    },
                                                    style: {
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        background: "white",
                                                        border: "none",
                                                        borderRadius: 8,
                                                        cursor: "pointer",
                                                        fontSize: 12,
                                                        color: "#0070f3",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 8
                                                    },
                                                    children: "🕐 Modifier les heures / zone"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                    lineNumber: 486,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 485,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 467,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, u.id, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 442,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 435,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    zIndex: 199
                },
                onClick: ()=>setMenuOpen(null)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 502,
                columnNumber: 20
            }, this),
            editUser && (()=>{
                const u = users.find((x)=>x.id === editUser);
                const p = getPresence(editUser);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        zIndex: 1000
                    },
                    onClick: ()=>setEditUser(null),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: (e)=>e.stopPropagation(),
                        style: {
                            background: "white",
                            borderRadius: "16px 16px 0 0",
                            padding: 24,
                            width: "100%",
                            maxWidth: 480,
                            boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
                            maxHeight: "85vh",
                            overflowY: "auto"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: "bold",
                                            fontSize: 16
                                        },
                                        children: [
                                            "⚙️ ",
                                            u.prenom,
                                            " ",
                                            u.nom
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 513,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setEditUser(null),
                                        style: {
                                            background: "none",
                                            border: "none",
                                            fontSize: 22,
                                            cursor: "pointer"
                                        },
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 514,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 512,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: "bold",
                                    color: "#aaa",
                                    marginBottom: 8
                                },
                                children: "HEURES RÉELLES (si différentes du shift)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 518,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 12,
                                    marginBottom: 16
                                },
                                children: [
                                    {
                                        label: "ARRIVÉE",
                                        field: "heureArrivee"
                                    },
                                    {
                                        label: "DÉPART",
                                        field: "heureDepart"
                                    }
                                ].map(({ label, field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: "bold",
                                                    color: "#666",
                                                    display: "block",
                                                    marginBottom: 6
                                                },
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 522,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "time",
                                                value: p[field],
                                                onChange: (e)=>updateField(editUser, field, e.target.value),
                                                style: {
                                                    width: "100%",
                                                    padding: "10px 12px",
                                                    border: "1px solid #ddd",
                                                    borderRadius: 8,
                                                    fontSize: 16,
                                                    minHeight: 48
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 523,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, field, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 521,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 519,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            fontSize: 11,
                                            fontWeight: "bold",
                                            color: "#666",
                                            display: "block",
                                            marginBottom: 6
                                        },
                                        children: "📍 ZONE DE TRAVAIL"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 532,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: p.zoneId,
                                        onChange: (e)=>updateField(editUser, "zoneId", e.target.value),
                                        style: {
                                            width: "100%",
                                            padding: "10px 12px",
                                            border: "1px solid #ddd",
                                            borderRadius: 8,
                                            fontSize: 14,
                                            minHeight: 48
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "— Non assigné —"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 535,
                                                columnNumber: 19
                                            }, this),
                                            zones.map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: z.id,
                                                    children: z.nom
                                                }, z.id, false, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                    lineNumber: 536,
                                                    columnNumber: 35
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 533,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 531,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            fontSize: 11,
                                            fontWeight: "bold",
                                            color: "#666",
                                            display: "block",
                                            marginBottom: 6
                                        },
                                        children: "👥 ÉQUIPE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 542,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: p.equipeId,
                                        onChange: (e)=>updateField(editUser, "equipeId", e.target.value),
                                        style: {
                                            width: "100%",
                                            padding: "10px 12px",
                                            border: "1px solid #ddd",
                                            borderRadius: 8,
                                            fontSize: 14,
                                            minHeight: 48
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "— Non assigné —"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                lineNumber: 545,
                                                columnNumber: 19
                                            }, this),
                                            equipes.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: e.id,
                                                    children: e.nom
                                                }, e.id, false, {
                                                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                                    lineNumber: 546,
                                                    columnNumber: 37
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 543,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 541,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            fontSize: 11,
                                            fontWeight: "bold",
                                            color: "#666",
                                            display: "block",
                                            marginBottom: 6
                                        },
                                        children: "REMARQUE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 552,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: p.remarque,
                                        placeholder: "Optionnel...",
                                        onChange: (e)=>updateField(editUser, "remarque", e.target.value),
                                        style: {
                                            width: "100%",
                                            padding: "10px 12px",
                                            border: "1px solid #ddd",
                                            borderRadius: 8,
                                            fontSize: 14,
                                            minHeight: 44
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                        lineNumber: 553,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 551,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setEditUser(null),
                                style: {
                                    width: "100%",
                                    padding: 14,
                                    background: "#0070f3",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 10,
                                    cursor: "pointer",
                                    fontSize: 15,
                                    fontWeight: "bold"
                                },
                                children: "✓ Confirmer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 558,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 511,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                    lineNumber: 509,
                    columnNumber: 11
                }, this);
            })(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "white",
                    padding: "12px 20px",
                    boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    zIndex: 99
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            fontSize: 13,
                            color: "#666"
                        },
                        children: [
                            shiftInfo.icon,
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#059669",
                                    fontWeight: "bold"
                                },
                                children: stats.presents
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 569,
                                columnNumber: 28
                            }, this),
                            " présents",
                            stats.absents > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#dc2626",
                                    fontWeight: "bold"
                                },
                                children: [
                                    " · ",
                                    stats.absents
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 570,
                                columnNumber: 33
                            }, this),
                            stats.absents > 0 && " absents",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#aaa"
                                },
                                children: [
                                    " / ",
                                    stats.total
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                                lineNumber: 572,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 568,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setEtape("revision"),
                        style: {
                            padding: "10px 24px",
                            background: "#0070f3",
                            color: "white",
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: 14,
                            minHeight: 46
                        },
                        children: "Réviser →"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                        lineNumber: 574,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
                lineNumber: 567,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/pointage/presence/[date]/page.tsx",
        lineNumber: 342,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_dashboard_pointage_presence_%5Bdate%5D_page_tsx_44b3921f._.js.map