module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
"[project]/src/app/api/epi/stock/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
// Durées de vie par défaut selon normes
const DUREES_VIE_DEFAUT = {
    "Casque de chantier": {
        ans: 4,
        vgp: false,
        categorie: "II",
        norme: "EN 397"
    },
    "Harnais antichute": {
        ans: 5,
        vgp: true,
        vgpMois: 12,
        categorie: "III",
        norme: "EN 361"
    },
    "Gants mécaniques": {
        ans: 2,
        vgp: false,
        categorie: "II",
        norme: "EN 388"
    },
    "Gants chimiques": {
        ans: 2,
        vgp: false,
        categorie: "III",
        norme: "EN 374"
    },
    "Chaussures sécurité": {
        ans: 3,
        vgp: false,
        categorie: "II",
        norme: "EN 20345"
    },
    "Gilet haute visibilité": {
        ans: 3,
        lavages: 25,
        vgp: false,
        categorie: "II",
        norme: "EN 20471"
    },
    "Masque FFP2": {
        ans: 1,
        vgp: false,
        categorie: "III",
        norme: "EN 149"
    },
    "Masque FFP3": {
        ans: 1,
        vgp: false,
        categorie: "III",
        norme: "EN 149"
    },
    "Lunettes protection": {
        ans: 3,
        vgp: false,
        categorie: "II",
        norme: "EN 166"
    },
    "Protection auditive": {
        ans: 2,
        vgp: false,
        categorie: "II",
        norme: "EN 352"
    },
    "Longe antichute": {
        ans: 5,
        vgp: true,
        vgpMois: 12,
        categorie: "III",
        norme: "EN 354"
    }
};
async function GET() {
    try {
        const epis = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].ePI.findMany({
            include: {
                categorie: {
                    select: {
                        id: true,
                        nom: true
                    }
                },
                _count: {
                    select: {
                        distributions: true,
                        mouvements: true
                    }
                },
                distributions: {
                    where: {
                        statut: "ACTIF"
                    },
                    select: {
                        id: true
                    }
                }
            },
            orderBy: {
                nom: "asc"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(epis);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur serveur"
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const body = await req.json();
        const { nom, reference, marque, taille, norme, categorieSec, stockInitial, seuilAlerte, prixUnitaire, categorieId, dureeVieAns, nbLavagesMax, vgpRequise, vgpPeriodeMois, datePeremption } = body;
        if (!nom) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Nom obligatoire"
        }, {
            status: 400
        });
        // Appliquer valeurs par défaut selon nom EPI
        const defauts = DUREES_VIE_DEFAUT[nom] || null;
        const epi = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].ePI.create({
            data: {
                nom,
                reference: reference || null,
                marque: marque || null,
                taille: taille || null,
                norme: norme || defauts?.norme || null,
                categorieSec: categorieSec || defauts?.categorie || "II",
                stockInitial: parseInt(stockInitial) || 0,
                stockActuel: parseInt(stockInitial) || 0,
                seuilAlerte: parseInt(seuilAlerte) || 5,
                prixUnitaire: prixUnitaire ? parseFloat(prixUnitaire) : null,
                categorieId: categorieId || null,
                dureeVieAns: dureeVieAns ? parseInt(dureeVieAns) : defauts?.ans || null,
                nbLavagesMax: nbLavagesMax ? parseInt(nbLavagesMax) : defauts?.lavages || null,
                vgpRequise: vgpRequise !== undefined ? vgpRequise : defauts?.vgp || false,
                vgpPeriodeMois: vgpPeriodeMois ? parseInt(vgpPeriodeMois) : defauts?.vgpMois || null,
                datePeremption: datePeremption ? new Date(datePeremption) : null
            },
            include: {
                categorie: true
            }
        });
        // Créer mouvement entrée initial
        if (parseInt(stockInitial) > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].mouvementEPI.create({
                data: {
                    type: "ENTREE",
                    quantite: parseInt(stockInitial),
                    motif: "Stock initial",
                    epiId: epi.id
                }
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(epi);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
async function PATCH(req) {
    try {
        const body = await req.json();
        const { id, action, type, quantite, motif, ...data } = body;
        if (action === "MOUVEMENT") {
            const epi = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].ePI.findUnique({
                where: {
                    id
                }
            });
            if (!epi) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "EPI non trouvé"
            }, {
                status: 404
            });
            let newStock = epi.stockActuel;
            if (type === "ENTREE" || type === "RETOUR") {
                newStock += parseInt(quantite);
            } else {
                newStock = Math.max(0, newStock - parseInt(quantite));
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].mouvementEPI.create({
                data: {
                    type,
                    quantite: parseInt(quantite),
                    motif: motif || null,
                    epiId: id
                }
            });
            const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].ePI.update({
                where: {
                    id
                },
                data: {
                    stockActuel: newStock
                },
                include: {
                    categorie: true
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updated);
        }
        const epi = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].ePI.update({
            where: {
                id
            },
            data: {
                nom: data.nom,
                reference: data.reference || null,
                marque: data.marque || null,
                taille: data.taille || null,
                norme: data.norme || null,
                categorieSec: data.categorieSec || "II",
                seuilAlerte: parseInt(data.seuilAlerte) || 5,
                prixUnitaire: data.prixUnitaire ? parseFloat(data.prixUnitaire) : null,
                categorieId: data.categorieId || null,
                dureeVieAns: data.dureeVieAns ? parseInt(data.dureeVieAns) : null,
                nbLavagesMax: data.nbLavagesMax ? parseInt(data.nbLavagesMax) : null,
                vgpRequise: data.vgpRequise || false,
                vgpPeriodeMois: data.vgpPeriodeMois ? parseInt(data.vgpPeriodeMois) : null,
                datePeremption: data.datePeremption ? new Date(data.datePeremption) : null
            },
            include: {
                categorie: true
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(epi);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__310125c5._.js.map