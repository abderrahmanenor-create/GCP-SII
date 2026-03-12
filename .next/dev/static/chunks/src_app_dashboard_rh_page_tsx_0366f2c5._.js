(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/rh/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RHPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const ROLES = [
    "ADMIN",
    "CHEF",
    "RH",
    "OUVRIER"
];
const STATUTS_USER = [
    "ACTIF",
    "INACTIF",
    "CONGE",
    "SUSPENDU"
];
const statutConfig = {
    ACTIF: {
        label: "Actif",
        color: "#10b981",
        bg: "#f0fdf4"
    },
    INACTIF: {
        label: "Inactif",
        color: "#6b7280",
        bg: "#f9fafb"
    },
    CONGE: {
        label: "Congé",
        color: "#f59e0b",
        bg: "#fffbeb"
    },
    SUSPENDU: {
        label: "Suspendu",
        color: "#ef4444",
        bg: "#fef2f2"
    }
};
const roleConfig = {
    ADMIN: {
        label: "Admin",
        color: "#6366f1"
    },
    CHEF: {
        label: "Chef",
        color: "#0070f3"
    },
    RH: {
        label: "RH",
        color: "#7c3aed"
    },
    OUVRIER: {
        label: "Ouvrier",
        color: "#0891b2"
    }
};
function joursRestants(dateStr) {
    if (!dateStr) return null;
    return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}
function Avatar({ user }) {
    const initials = `${user.prenom[0]}${user.nom[0]}`.toUpperCase();
    const colors = [
        "#0070f3",
        "#10b981",
        "#6366f1",
        "#f59e0b",
        "#ef4444",
        "#0891b2"
    ];
    const color = colors[(user.nom.charCodeAt(0) + user.prenom.charCodeAt(0)) % colors.length];
    if (user.photo) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: user.photo,
        alt: initials,
        style: {
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover"
        }
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/rh/page.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
            flexShrink: 0
        },
        children: initials
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/rh/page.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_c = Avatar;
function DocumentsSection({ userId }) {
    _s();
    const [docs, setDocs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: "CIN",
        nom: "",
        expiration: "",
        remarque: ""
    });
    const TYPES_DOC = [
        {
            value: "CIN",
            label: "Carte d'identité",
            icon: "🪪"
        },
        {
            value: "CNSS",
            label: "CNSS",
            icon: "🏥"
        },
        {
            value: "CONTRAT",
            label: "Contrat de travail",
            icon: "📄"
        },
        {
            value: "DIPLOME",
            label: "Diplôme",
            icon: "🎓"
        },
        {
            value: "VISITE_MEDICALE",
            label: "Visite médicale",
            icon: "🩺"
        },
        {
            value: "CACES",
            label: "CACES",
            icon: "🏗️"
        },
        {
            value: "HABILITATION",
            label: "Habilitation",
            icon: "⚡"
        },
        {
            value: "AUTRE",
            label: "Autre",
            icon: "📎"
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocumentsSection.useEffect": ()=>{
            loadDocs();
        }
    }["DocumentsSection.useEffect"], [
        userId
    ]);
    const loadDocs = async ()=>{
        setLoading(true);
        const res = await fetch(`/api/rh/documents?userId=${userId}`);
        const data = await res.json();
        setDocs(Array.isArray(data) ? data : []);
        setLoading(false);
    };
    const handleUpload = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const fd = new FormData();
        fd.append("file", file);
        fd.append("userId", userId);
        fd.append("type", form.type);
        const uploadRes = await fetch("/api/rh/upload", {
            method: "POST",
            body: fd
        });
        const uploadData = await uploadRes.json();
        if (uploadData.url) {
            await fetch("/api/rh/documents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    type: form.type,
                    nom: form.nom || file.name,
                    url: uploadData.url,
                    taille: uploadData.taille,
                    expiration: form.expiration || null,
                    remarque: form.remarque || null
                })
            });
            await loadDocs();
            setShowForm(false);
            setForm({
                type: "CIN",
                nom: "",
                expiration: "",
                remarque: ""
            });
        }
        setUploading(false);
        e.target.value = "";
    };
    const handleDelete = async (id)=>{
        if (!confirm("Supprimer ce document ?")) return;
        await fetch(`/api/rh/documents?id=${id}`, {
            method: "DELETE"
        });
        await loadDocs();
    };
    const typeInfo = (type)=>TYPES_DOC.find((t)=>t.value === type) || {
            icon: "📎",
            label: type
        };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: "20px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#666",
                            textTransform: "uppercase"
                        },
                        children: [
                            "Documents (",
                            docs.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowForm(!showForm),
                        style: {
                            fontSize: "11px",
                            background: "#f0f9ff",
                            color: "#0070f3",
                            border: "1px solid #bae6fd",
                            borderRadius: "5px",
                            padding: "3px 10px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        },
                        children: "+ Ajouter"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#f8fafc",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "10px",
                    border: "1px solid #e5e7eb"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                    color: "#666",
                                    display: "block",
                                    marginBottom: "3px"
                                },
                                children: "TYPE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: form.type,
                                onChange: (e)=>setForm({
                                        ...form,
                                        type: e.target.value
                                    }),
                                style: {
                                    width: "100%",
                                    padding: "6px 10px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    fontSize: "13px"
                                },
                                children: TYPES_DOC.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: t.value,
                                        children: [
                                            t.icon,
                                            " ",
                                            t.label
                                        ]
                                    }, t.value, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 35
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                    color: "#666",
                                    display: "block",
                                    marginBottom: "3px"
                                },
                                children: "NOM DU DOCUMENT"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Ex: CIN recto-verso",
                                value: form.nom,
                                onChange: (e)=>setForm({
                                        ...form,
                                        nom: e.target.value
                                    }),
                                style: {
                                    width: "100%",
                                    padding: "6px 10px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    fontSize: "13px",
                                    boxSizing: "border-box"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                    color: "#666",
                                    display: "block",
                                    marginBottom: "3px"
                                },
                                children: "DATE EXPIRATION (optionnel)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: form.expiration,
                                onChange: (e)=>setForm({
                                        ...form,
                                        expiration: e.target.value
                                    }),
                                style: {
                                    width: "100%",
                                    padding: "6px 10px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    fontSize: "13px",
                                    boxSizing: "border-box"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "10px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                    color: "#666",
                                    display: "block",
                                    marginBottom: "3px"
                                },
                                children: "REMARQUE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Optionnel...",
                                value: form.remarque,
                                onChange: (e)=>setForm({
                                        ...form,
                                        remarque: e.target.value
                                    }),
                                style: {
                                    width: "100%",
                                    padding: "6px 10px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    fontSize: "13px",
                                    boxSizing: "border-box"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 175,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            display: "block",
                            padding: "10px",
                            textAlign: "center",
                            background: uploading ? "#f1f5f9" : "#0070f3",
                            color: uploading ? "#999" : "white",
                            borderRadius: "6px",
                            cursor: uploading ? "not-allowed" : "pointer",
                            fontSize: "13px",
                            fontWeight: "bold"
                        },
                        children: [
                            uploading ? "⏳ Upload en cours..." : "📎 Choisir un fichier et uploader",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                style: {
                                    display: "none"
                                },
                                onChange: handleUpload,
                                disabled: uploading,
                                accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "12px",
                    color: "#ccc",
                    textAlign: "center",
                    padding: "10px"
                },
                children: "Chargement..."
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 195,
                columnNumber: 9
            }, this) : docs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "12px",
                    color: "#ccc",
                    textAlign: "center",
                    padding: "10px"
                },
                children: "Aucun document"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 197,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                },
                children: docs.map((doc)=>{
                    const t = typeInfo(doc.type);
                    const expJ = doc.expiration ? Math.ceil((new Date(doc.expiration).getTime() - Date.now()) / 86400000) : null;
                    const expAlert = expJ !== null && expJ <= 30;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "8px 12px",
                            borderRadius: "7px",
                            background: expAlert ? "#fef2f2" : "#f8fafc",
                            border: `1px solid ${expAlert ? "#fca5a5" : "#e5e7eb"}`,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap"
                                                },
                                                children: doc.nom
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 214,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "10px",
                                            color: "#999",
                                            marginTop: "2px"
                                        },
                                        children: [
                                            t.label,
                                            doc.expiration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    marginLeft: "8px",
                                                    color: expAlert ? "#ef4444" : "#10b981",
                                                    fontWeight: "bold"
                                                },
                                                children: expJ < 0 ? `⛔ Expiré (${Math.abs(expJ)}j)` : expJ <= 30 ? `⚠️ Expire dans ${expJ}j` : `✅ ${new Date(doc.expiration).toLocaleDateString("fr-FR")}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 219,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 211,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "4px",
                                    marginLeft: "8px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: doc.url,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        style: {
                                            padding: "3px 8px",
                                            background: "#f0f9ff",
                                            color: "#0070f3",
                                            borderRadius: "4px",
                                            fontSize: "11px",
                                            textDecoration: "none",
                                            border: "1px solid #bae6fd"
                                        },
                                        children: "👁️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleDelete(doc.id),
                                        style: {
                                            padding: "3px 8px",
                                            background: "#fef2f2",
                                            color: "#ef4444",
                                            border: "1px solid #fca5a5",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontSize: "11px"
                                        },
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 225,
                                columnNumber: 17
                            }, this)
                        ]
                    }, doc.id, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 205,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 199,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/rh/page.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_s(DocumentsSection, "HERKMehifh919EZcDRTDgOEm5Ug=");
_c1 = DocumentsSection;
function RHPage() {
    _s1();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [postes, setPostes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filtreStatut, setFiltreStatut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filtrePoste, setFiltrePoste] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editMode, setEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("liste");
    const emptyForm = {
        nom: "",
        prenom: "",
        email: "",
        matricule: "",
        cin: "",
        telephone: "",
        posteId: "",
        role: "OUVRIER",
        statut: "ACTIF",
        dateEmbauche: "",
        salaire: "",
        adresse: ""
    };
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RHPage.useEffect": ()=>{
            loadAll();
        }
    }["RHPage.useEffect"], []);
    const loadAll = async ()=>{
        const [usersRes, refRes] = await Promise.all([
            fetch("/api/rh").then((r)=>r.json()),
            fetch("/api/ref").then((r)=>r.json())
        ]);
        setUsers(Array.isArray(usersRes) ? usersRes : []);
        setPostes(refRes.postes || []);
        setLoading(false);
    };
    const filtered = users.filter((u)=>{
        const matchSearch = !search || `${u.nom} ${u.prenom} ${u.matricule} ${u.cin}`.toLowerCase().includes(search.toLowerCase());
        const matchStatut = !filtreStatut || u.statut === filtreStatut;
        const matchPoste = !filtrePoste || u.poste?.id === filtrePoste;
        return matchSearch && matchStatut && matchPoste;
    });
    const stats = {
        total: users.length,
        actifs: users.filter((u)=>u.statut === "ACTIF").length,
        conges: users.filter((u)=>u.statut === "CONGE").length,
        habilitationsAlert: users.reduce((acc, u)=>acc + u.habilitations.filter((h)=>{
                const j = joursRestants(h.dateExpiration);
                return j !== null && j <= 30;
            }).length, 0),
        episActifs: users.reduce((acc, u)=>acc + u.distributions.length, 0)
    };
    const handleCreate = ()=>{
        setForm(emptyForm);
        setEditMode(false);
        setShowModal(true);
    };
    const handleEdit = (u)=>{
        setForm({
            id: u.id,
            nom: u.nom,
            prenom: u.prenom,
            email: u.email || "",
            matricule: u.matricule || "",
            cin: u.cin || "",
            telephone: u.telephone || "",
            posteId: u.poste?.id || "",
            role: u.role,
            statut: u.statut,
            dateEmbauche: u.dateEmbauche ? u.dateEmbauche.split("T")[0] : "",
            salaire: u.salaire?.toString() || "",
            adresse: u.adresse || ""
        });
        setEditMode(true);
        setShowModal(true);
    };
    const handleSubmit = async ()=>{
        if (!form.nom || !form.prenom) return;
        setSaving(true);
        const method = editMode ? "PATCH" : "POST";
        await fetch("/api/rh", {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });
        await loadAll();
        setShowModal(false);
        setSaving(false);
    };
    const handleArchive = async (id)=>{
        if (!confirm("Archiver cet employé ?")) return;
        await fetch(`/api/rh?id=${id}`, {
            method: "DELETE"
        });
        await loadAll();
        setSelected(null);
    };
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
            padding: 60,
            textAlign: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 40,
                    marginBottom: 12
                },
                children: "👷"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 347,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: "#999"
                },
                children: "Chargement des employés..."
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/rh/page.tsx",
        lineNumber: 346,
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
                                children: "👷 Ressources Humaines"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 358,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "4px 0 0",
                                    color: "#666",
                                    fontSize: "14px"
                                },
                                children: "Gestion des employés, habilitations et EPI"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 359,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 357,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCreate,
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
                        children: "+ Nouvel employé"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 356,
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
                        icon: "👥",
                        label: "Total employés",
                        value: stats.total,
                        color: "#0070f3",
                        bg: "#f0f9ff"
                    },
                    {
                        icon: "✅",
                        label: "Actifs",
                        value: stats.actifs,
                        color: "#10b981",
                        bg: "#f0fdf4"
                    },
                    {
                        icon: "🏖️",
                        label: "En congé",
                        value: stats.conges,
                        color: "#f59e0b",
                        bg: "#fffbeb"
                    },
                    {
                        icon: "⚠️",
                        label: "Habilitations alertes",
                        value: stats.habilitationsAlert,
                        color: stats.habilitationsAlert > 0 ? "#ef4444" : "#10b981",
                        bg: stats.habilitationsAlert > 0 ? "#fef2f2" : "#f0fdf4"
                    },
                    {
                        icon: "🦺",
                        label: "EPI distribués",
                        value: stats.episActifs,
                        color: "#6366f1",
                        bg: "#f5f3ff"
                    }
                ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: k.bg,
                            borderRadius: "10px",
                            padding: "14px 16px",
                            border: `1px solid ${k.color}22`,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "22px",
                                    marginBottom: "4px"
                                },
                                children: k.icon
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: k.color
                                },
                                children: k.value
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 381,
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
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 382,
                                columnNumber: 13
                            }, this)
                        ]
                    }, k.label, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 371,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "4px",
                    marginBottom: "16px",
                    background: "white",
                    borderRadius: "10px",
                    padding: "4px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    width: "fit-content"
                },
                children: [
                    {
                        id: "liste",
                        label: "📋 Liste"
                    },
                    {
                        id: "grille",
                        label: "🃏 Grille"
                    }
                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(t.id),
                        style: {
                            padding: "8px 20px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            background: activeTab === t.id ? "#0070f3" : "transparent",
                            color: activeTab === t.id ? "white" : "#666",
                            fontWeight: activeTab === t.id ? "bold" : "normal",
                            fontSize: "13px"
                        },
                        children: t.label
                    }, t.id, false, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 393,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 388,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "white",
                    borderRadius: "10px",
                    padding: "16px",
                    marginBottom: "16px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        placeholder: "🔍 Rechercher nom, matricule, CIN...",
                        value: search,
                        onChange: (e)=>setSearch(e.target.value),
                        style: {
                            ...inputStyle,
                            flex: 1,
                            minWidth: "200px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
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
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this),
                            STATUTS_USER.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: s,
                                    children: statutConfig[s].label
                                }, s, false, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 416,
                                    columnNumber: 34
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 413,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filtrePoste,
                        onChange: (e)=>setFiltrePoste(e.target.value),
                        style: {
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Tous les postes"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 420,
                                columnNumber: 11
                            }, this),
                            postes.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: p.id,
                                    children: p.nom
                                }, p.id, false, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 421,
                                    columnNumber: 28
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 418,
                        columnNumber: 9
                    }, this),
                    (search || filtreStatut || filtrePoste) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setSearch("");
                            setFiltreStatut("");
                            setFiltrePoste("");
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
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 424,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: "12px",
                            color: "#999",
                            whiteSpace: "nowrap"
                        },
                        children: [
                            filtered.length,
                            " employé",
                            filtered.length > 1 ? "s" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 429,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 406,
                columnNumber: 7
            }, this),
            activeTab === "liste" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            children: "👷"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                            lineNumber: 439,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Aucun employé trouvé"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                            lineNumber: 440,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                    lineNumber: 438,
                    columnNumber: 13
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
                                    "EMPLOYÉ",
                                    "POSTE",
                                    "CONTACT",
                                    "HABILITATIONS",
                                    "EPI",
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
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 447,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 445,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                            lineNumber: 444,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: filtered.map((u)=>{
                                const habAlerts = u.habilitations.filter((h)=>{
                                    const j = joursRestants(h.dateExpiration);
                                    return j !== null && j <= 30;
                                });
                                const st = statutConfig[u.statut];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        borderBottom: "1px solid #f1f5f9",
                                        cursor: "pointer"
                                    },
                                    onClick: ()=>setSelected(selected?.id === u.id ? null : u),
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#f8fafc",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "white",
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                                        user: u
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 467,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontWeight: "bold",
                                                                    fontSize: "14px"
                                                                },
                                                                children: [
                                                                    u.prenom,
                                                                    " ",
                                                                    u.nom
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                                lineNumber: 469,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: "11px",
                                                                    color: "#999"
                                                                },
                                                                children: [
                                                                    u.matricule && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "#",
                                                                            u.matricule
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                                        lineNumber: 471,
                                                                        columnNumber: 47
                                                                    }, this),
                                                                    u.cin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            marginLeft: "6px"
                                                                        },
                                                                        children: [
                                                                            "CIN: ",
                                                                            u.cin
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                                        lineNumber: 472,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                                lineNumber: 470,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 466,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 465,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "13px"
                                                    },
                                                    children: u.poste?.nom || "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                    lineNumber: 478,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: "10px",
                                                        background: `${roleConfig[u.role]?.color}18`,
                                                        color: roleConfig[u.role]?.color,
                                                        padding: "1px 7px",
                                                        borderRadius: "10px",
                                                        fontWeight: "bold"
                                                    },
                                                    children: roleConfig[u.role]?.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 477,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: [
                                                u.telephone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#555"
                                                    },
                                                    children: [
                                                        "📞 ",
                                                        u.telephone
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                    lineNumber: 484,
                                                    columnNumber: 41
                                                }, this),
                                                u.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#0070f3"
                                                    },
                                                    children: [
                                                        "✉️ ",
                                                        u.email
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                    lineNumber: 485,
                                                    columnNumber: 37
                                                }, this),
                                                !u.telephone && !u.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#ccc",
                                                        fontSize: "12px"
                                                    },
                                                    children: "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                    lineNumber: 486,
                                                    columnNumber: 54
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 483,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: u.habilitations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#ccc",
                                                    fontSize: "12px"
                                                },
                                                children: "Aucune"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 490,
                                                columnNumber: 27
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "2px"
                                                },
                                                children: [
                                                    u.habilitations.slice(0, 2).map((h)=>{
                                                        const j = joursRestants(h.dateExpiration);
                                                        const alert = j !== null && j <= 30;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: "10px",
                                                                padding: "2px 7px",
                                                                borderRadius: "4px",
                                                                fontWeight: "bold",
                                                                background: alert ? "#fef2f2" : "#f0f9ff",
                                                                color: alert ? "#ef4444" : "#0070f3"
                                                            },
                                                            children: [
                                                                h.typeHabilitation.code,
                                                                " ",
                                                                alert && `⚠️ ${j}j`
                                                            ]
                                                        }, h.id, true, {
                                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                            lineNumber: 497,
                                                            columnNumber: 33
                                                        }, this);
                                                    }),
                                                    u.habilitations.length > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: "10px",
                                                            color: "#999"
                                                        },
                                                        children: [
                                                            "+",
                                                            u.habilitations.length - 2
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 507,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 492,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 488,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: "12px 16px"
                                            },
                                            children: u.distributions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: "12px",
                                                    background: "#f5f3ff",
                                                    color: "#6366f1",
                                                    padding: "2px 8px",
                                                    borderRadius: "4px",
                                                    fontWeight: "bold"
                                                },
                                                children: [
                                                    "🦺 ",
                                                    u.distributions.length,
                                                    " EPI"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 514,
                                                columnNumber: 27
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#ccc",
                                                    fontSize: "12px"
                                                },
                                                children: "—"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 518,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 512,
                                            columnNumber: 23
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
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 522,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 521,
                                            columnNumber: 23
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
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            handleEdit(u);
                                                        },
                                                        style: {
                                                            padding: "4px 10px",
                                                            background: "#f0f9ff",
                                                            color: "#0070f3",
                                                            border: "1px solid #bae6fd",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                            fontSize: "12px"
                                                        },
                                                        children: "✏️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 528,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            handleArchive(u.id);
                                                        },
                                                        style: {
                                                            padding: "4px 10px",
                                                            background: "#fef2f2",
                                                            color: "#ef4444",
                                                            border: "1px solid #fca5a5",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                            fontSize: "12px"
                                                        },
                                                        children: "🗄️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 532,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 527,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 526,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, u.id, true, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 459,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                            lineNumber: 451,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                    lineNumber: 443,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 436,
                columnNumber: 9
            }, this),
            activeTab === "grille" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "14px"
                },
                children: filtered.map((u)=>{
                    const st = statutConfig[u.statut];
                    const habAlerts = u.habilitations.filter((h)=>{
                        const j = joursRestants(h.dateExpiration);
                        return j !== null && j <= 30;
                    });
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setSelected(selected?.id === u.id ? null : u),
                        style: {
                            background: "white",
                            borderRadius: "12px",
                            padding: "18px",
                            boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                            cursor: "pointer",
                            border: selected?.id === u.id ? "2px solid #0070f3" : "2px solid transparent"
                        },
                        onMouseEnter: (e)=>e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)",
                        onMouseLeave: (e)=>e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.08)",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "12px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                                user: u
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 569,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: "bold",
                                                            fontSize: "14px"
                                                        },
                                                        children: [
                                                            u.prenom,
                                                            " ",
                                                            u.nom
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 571,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: "11px",
                                                            color: "#999"
                                                        },
                                                        children: u.matricule ? `#${u.matricule}` : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 572,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 570,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 568,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: st.bg,
                                            color: st.color,
                                            padding: "2px 8px",
                                            borderRadius: "12px",
                                            fontSize: "10px",
                                            fontWeight: "bold"
                                        },
                                        children: st.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 575,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 567,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "12px",
                                    color: "#555",
                                    marginBottom: "10px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "💼 ",
                                            u.poste?.nom || "—"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 581,
                                        columnNumber: 19
                                    }, this),
                                    u.telephone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: "2px"
                                        },
                                        children: [
                                            "📞 ",
                                            u.telephone
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 582,
                                        columnNumber: 35
                                    }, this),
                                    u.dateEmbauche && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: "2px",
                                            color: "#999"
                                        },
                                        children: [
                                            "📅 ",
                                            new Date(u.dateEmbauche).toLocaleDateString("fr-FR")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 583,
                                        columnNumber: 38
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 580,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "6px",
                                    flexWrap: "wrap"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "10px",
                                            background: `${roleConfig[u.role]?.color}18`,
                                            color: roleConfig[u.role]?.color,
                                            padding: "2px 8px",
                                            borderRadius: "10px",
                                            fontWeight: "bold"
                                        },
                                        children: roleConfig[u.role]?.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 587,
                                        columnNumber: 19
                                    }, this),
                                    u.distributions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "10px",
                                            background: "#f5f3ff",
                                            color: "#6366f1",
                                            padding: "2px 8px",
                                            borderRadius: "10px",
                                            fontWeight: "bold"
                                        },
                                        children: [
                                            "🦺 ",
                                            u.distributions.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 591,
                                        columnNumber: 21
                                    }, this),
                                    habAlerts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "10px",
                                            background: "#fef2f2",
                                            color: "#ef4444",
                                            padding: "2px 8px",
                                            borderRadius: "10px",
                                            fontWeight: "bold"
                                        },
                                        children: [
                                            "⚠️ ",
                                            habAlerts.length,
                                            " hab."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 596,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 586,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: "12px",
                                    display: "flex",
                                    gap: "6px"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        handleEdit(u);
                                    },
                                    style: {
                                        flex: 1,
                                        padding: "6px",
                                        background: "#f0f9ff",
                                        color: "#0070f3",
                                        border: "1px solid #bae6fd",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                        fontWeight: "bold"
                                    },
                                    children: "✏️ Modifier"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 603,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 602,
                                columnNumber: 17
                            }, this)
                        ]
                    }, u.id, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 557,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 549,
                columnNumber: 9
            }, this),
            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "380px",
                    background: "white",
                    boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
                    zIndex: 500,
                    overflowY: "auto",
                    padding: "24px"
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    margin: 0,
                                    fontSize: "16px",
                                    fontWeight: "bold"
                                },
                                children: "Fiche employé"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 624,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelected(null),
                                style: {
                                    background: "none",
                                    border: "none",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    color: "#666"
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 625,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 623,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            marginBottom: "20px",
                            padding: "20px",
                            background: "#f8fafc",
                            borderRadius: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "10px"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                    user: selected
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 632,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 631,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontWeight: "bold",
                                    fontSize: "18px"
                                },
                                children: [
                                    selected.prenom,
                                    " ",
                                    selected.nom
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 634,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: "#666",
                                    fontSize: "13px",
                                    marginTop: "2px"
                                },
                                children: selected.poste?.nom || "—"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 635,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px",
                                    justifyContent: "center",
                                    marginTop: "10px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: statutConfig[selected.statut].bg,
                                            color: statutConfig[selected.statut].color,
                                            padding: "3px 12px",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                            fontWeight: "bold"
                                        },
                                        children: statutConfig[selected.statut].label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 637,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: `${roleConfig[selected.role]?.color}18`,
                                            color: roleConfig[selected.role]?.color,
                                            padding: "3px 12px",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                            fontWeight: "bold"
                                        },
                                        children: roleConfig[selected.role]?.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 640,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 636,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 630,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "16px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "#666",
                                    marginBottom: "10px",
                                    textTransform: "uppercase"
                                },
                                children: "Informations"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 648,
                                columnNumber: 13
                            }, this),
                            [
                                {
                                    label: "Matricule",
                                    value: selected.matricule || "—"
                                },
                                {
                                    label: "CIN",
                                    value: selected.cin || "—"
                                },
                                {
                                    label: "Téléphone",
                                    value: selected.telephone || "—"
                                },
                                {
                                    label: "Email",
                                    value: selected.email || "—"
                                },
                                {
                                    label: "Adresse",
                                    value: selected.adresse || "—"
                                },
                                {
                                    label: "Date embauche",
                                    value: selected.dateEmbauche ? new Date(selected.dateEmbauche).toLocaleDateString("fr-FR") : "—"
                                }
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "6px 0",
                                        borderBottom: "1px solid #f1f5f9",
                                        fontSize: "13px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#666"
                                            },
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 658,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontWeight: "500",
                                                color: "#1a1a1a"
                                            },
                                            children: item.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 659,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.label, true, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 657,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 647,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "16px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "#666",
                                    marginBottom: "10px",
                                    textTransform: "uppercase"
                                },
                                children: [
                                    "Habilitations (",
                                    selected.habilitations.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 666,
                                columnNumber: 13
                            }, this),
                            selected.habilitations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "12px",
                                    color: "#ccc",
                                    textAlign: "center",
                                    padding: "10px"
                                },
                                children: "Aucune habilitation"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 670,
                                columnNumber: 15
                            }, this) : selected.habilitations.map((h)=>{
                                const j = joursRestants(h.dateExpiration);
                                const alert = j !== null && j <= 30;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "10px 12px",
                                        borderRadius: "8px",
                                        marginBottom: "6px",
                                        background: alert ? "#fef2f2" : "#f8fafc",
                                        border: `1px solid ${alert ? "#fca5a5" : "#e5e7eb"}`
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: "13px",
                                                            fontWeight: "bold"
                                                        },
                                                        children: h.typeHabilitation.nom
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 683,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: "11px",
                                                            color: "#999"
                                                        },
                                                        children: [
                                                            "Code: ",
                                                            h.typeHabilitation.code
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 684,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 682,
                                                columnNumber: 23
                                            }, this),
                                            h.dateExpiration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: "right"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: "11px",
                                                            color: alert ? "#ef4444" : "#10b981",
                                                            fontWeight: "bold"
                                                        },
                                                        children: j < 0 ? `⛔ Exp. (${Math.abs(j)}j)` : j <= 30 ? `⚠️ ${j}j` : `✅ ${j}j`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: "10px",
                                                            color: "#999"
                                                        },
                                                        children: new Date(h.dateExpiration).toLocaleDateString("fr-FR")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 691,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 687,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 681,
                                        columnNumber: 21
                                    }, this)
                                }, h.id, false, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 676,
                                    columnNumber: 19
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 665,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "20px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "#666",
                                    marginBottom: "10px",
                                    textTransform: "uppercase"
                                },
                                children: [
                                    "EPI distribués (",
                                    selected.distributions.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 705,
                                columnNumber: 13
                            }, this),
                            selected.distributions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "12px",
                                    color: "#ccc",
                                    textAlign: "center",
                                    padding: "10px"
                                },
                                children: "Aucun EPI actif"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 709,
                                columnNumber: 15
                            }, this) : selected.distributions.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        background: "#f5f3ff",
                                        border: "1px solid #ddd6fe",
                                        marginBottom: "4px",
                                        fontSize: "13px"
                                    },
                                    children: [
                                        "🦺 ",
                                        d.epi.nom
                                    ]
                                }, d.id, true, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 712,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 704,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DocumentsSection, {
                        userId: selected.id
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 719,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleEdit(selected),
                                style: {
                                    flex: 1,
                                    padding: "10px",
                                    background: "#0070f3",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "13px"
                                },
                                children: "✏️ Modifier"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 723,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleArchive(selected.id),
                                style: {
                                    padding: "10px 14px",
                                    background: "#fef2f2",
                                    color: "#ef4444",
                                    border: "1px solid #fca5a5",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "13px"
                                },
                                children: "🗄️ Archiver"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                lineNumber: 727,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                        lineNumber: 722,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 616,
                columnNumber: 9
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
                        width: "560px",
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
                            children: editMode ? "✏️ Modifier l'employé" : "➕ Nouvel employé"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                            lineNumber: 739,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "14px"
                            },
                            children: [
                                [
                                    {
                                        key: "prenom",
                                        label: "PRÉNOM *",
                                        type: "text",
                                        placeholder: "Prénom"
                                    },
                                    {
                                        key: "nom",
                                        label: "NOM *",
                                        type: "text",
                                        placeholder: "Nom"
                                    },
                                    {
                                        key: "matricule",
                                        label: "MATRICULE",
                                        type: "text",
                                        placeholder: "MAT-001"
                                    },
                                    {
                                        key: "cin",
                                        label: "CIN",
                                        type: "text",
                                        placeholder: "AB123456"
                                    },
                                    {
                                        key: "telephone",
                                        label: "TÉLÉPHONE",
                                        type: "tel",
                                        placeholder: "06 00 00 00 00"
                                    },
                                    {
                                        key: "email",
                                        label: "EMAIL",
                                        type: "email",
                                        placeholder: "nom@sii.ma"
                                    }
                                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: labelStyle,
                                                children: f.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 753,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: f.type,
                                                style: inputStyle,
                                                placeholder: f.placeholder,
                                                value: form[f.key],
                                                onChange: (e)=>setForm({
                                                        ...form,
                                                        [f.key]: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                lineNumber: 754,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, f.key, true, {
                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                        lineNumber: 752,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "POSTE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 760,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            style: inputStyle,
                                            value: form.posteId,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    posteId: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "— Sélectionner —"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                    lineNumber: 762,
                                                    columnNumber: 19
                                                }, this),
                                                postes.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: p.id,
                                                        children: p.nom
                                                    }, p.id, false, {
                                                        fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                        lineNumber: 763,
                                                        columnNumber: 36
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 761,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 759,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "RÔLE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 768,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            style: inputStyle,
                                            value: form.role,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    role: e.target.value
                                                }),
                                            children: ROLES.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: r,
                                                    children: roleConfig[r].label
                                                }, r, false, {
                                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                    lineNumber: 770,
                                                    columnNumber: 35
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 769,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 767,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "STATUT"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 775,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            style: inputStyle,
                                            value: form.statut,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    statut: e.target.value
                                                }),
                                            children: STATUTS_USER.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: s,
                                                    children: statutConfig[s].label
                                                }, s, false, {
                                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                                    lineNumber: 777,
                                                    columnNumber: 42
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 776,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 774,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "DATE EMBAUCHE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 782,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            style: inputStyle,
                                            value: form.dateEmbauche,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    dateEmbauche: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 783,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 781,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        gridColumn: "span 2"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: labelStyle,
                                            children: "ADRESSE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 788,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            style: inputStyle,
                                            placeholder: "Adresse complète",
                                            value: form.adresse,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    adresse: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                            lineNumber: 789,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 787,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                            lineNumber: 743,
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
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 795,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSubmit,
                                    disabled: saving || !form.nom || !form.prenom,
                                    style: {
                                        padding: "10px 24px",
                                        background: !form.nom || !form.prenom ? "#ccc" : "#0070f3",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        fontWeight: "bold"
                                    },
                                    children: saving ? "Sauvegarde..." : editMode ? "Enregistrer" : "Créer l'employé"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                                    lineNumber: 799,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/rh/page.tsx",
                            lineNumber: 794,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/rh/page.tsx",
                    lineNumber: 738,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rh/page.tsx",
                lineNumber: 737,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/rh/page.tsx",
        lineNumber: 353,
        columnNumber: 5
    }, this);
}
_s1(RHPage, "ktSyiOYx+bke9sWMYC4HX6XZUFg=");
_c2 = RHPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Avatar");
__turbopack_context__.k.register(_c1, "DocumentsSection");
__turbopack_context__.k.register(_c2, "RHPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_rh_page_tsx_0366f2c5._.js.map