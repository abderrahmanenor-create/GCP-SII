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
"[project]/src/app/api/epi/distribution/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
function calculerDatePeremption(dateMiseEnService, dureeVieAns) {
    if (!dureeVieAns) return null;
    const date = new Date(dateMiseEnService);
    date.setFullYear(date.getFullYear() + dureeVieAns);
    return date;
}
function calculerProchVGP(dateMiseEnService, vgpPeriodeMois) {
    if (!vgpPeriodeMois) return null;
    const date = new Date(dateMiseEnService);
    date.setMonth(date.getMonth() + vgpPeriodeMois);
    return date;
}
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const epiId = searchParams.get("epiId");
        const statut = searchParams.get("statut");
        const alertes = searchParams.get("alertes");
        const where = {};
        if (userId) where.userId = userId;
        if (epiId) where.epiId = epiId;
        if (statut) where.statut = statut;
        // Filtre alertes : EPI périmés ou VGP dépassée
        if (alertes === "true") {
            const now = new Date();
            where.statut = "ACTIF";
            where.OR = [
                {
                    datePeremption: {
                        lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
                    }
                },
                {
                    dateProchVGP: {
                        lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
                    }
                }
            ];
        }
        const distributions = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].distributionEPI.findMany({
            where,
            include: {
                epi: {
                    select: {
                        id: true,
                        nom: true,
                        reference: true,
                        norme: true,
                        categorieSec: true,
                        vgpRequise: true,
                        dureeVieAns: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        matricule: true,
                        poste: {
                            select: {
                                nom: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                date: "desc"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(distributions);
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
        const { epiId, userId, quantite, etat, taille, dateMiseEnService, remarque } = body;
        if (!epiId || !userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "EPI et employé obligatoires"
            }, {
                status: 400
            });
        }
        const epi = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].ePI.findUnique({
            where: {
                id: epiId
            }
        });
        if (!epi) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "EPI non trouvé"
        }, {
            status: 404
        });
        if (epi.stockActuel < (parseInt(quantite) || 1)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Stock insuffisant"
            }, {
                status: 400
            });
        }
        const dateService = dateMiseEnService ? new Date(dateMiseEnService) : new Date();
        const datePeremption = epi.datePeremption || calculerDatePeremption(dateService, epi.dureeVieAns);
        const dateProchVGP = epi.vgpRequise ? calculerProchVGP(dateService, epi.vgpPeriodeMois) : null;
        const distribution = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].distributionEPI.create({
            data: {
                epiId,
                userId,
                quantite: parseInt(quantite) || 1,
                etat: etat || "NEUF",
                taille: taille || null,
                dateMiseEnService: dateService,
                datePeremption,
                dateProchVGP,
                remarque: remarque || null,
                statut: "ACTIF"
            },
            include: {
                epi: {
                    select: {
                        id: true,
                        nom: true,
                        norme: true,
                        categorieSec: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        matricule: true
                    }
                }
            }
        });
        // Décrémenter stock
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].ePI.update({
            where: {
                id: epiId
            },
            data: {
                stockActuel: {
                    decrement: parseInt(quantite) || 1
                }
            }
        });
        // Mouvement sortie
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].mouvementEPI.create({
            data: {
                type: "SORTIE",
                quantite: parseInt(quantite) || 1,
                motif: `Distribution à ${userId}`,
                epiId
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(distribution);
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
        const { id, action, motifReforme, dateDerniereVGP, dateProchVGP } = body;
        if (action === "RETOUR") {
            const dist = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].distributionEPI.update({
                where: {
                    id
                },
                data: {
                    statut: "RETOURNE",
                    dateRetour: new Date()
                },
                include: {
                    epi: true
                }
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].ePI.update({
                where: {
                    id: dist.epiId
                },
                data: {
                    stockActuel: {
                        increment: dist.quantite
                    }
                }
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].mouvementEPI.create({
                data: {
                    type: "RETOUR",
                    quantite: dist.quantite,
                    motif: "Retour EPI",
                    epiId: dist.epiId
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(dist);
        }
        if (action === "REFORME") {
            const dist = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].distributionEPI.update({
                where: {
                    id
                },
                data: {
                    statut: "REFORME",
                    motifReforme: motifReforme || "Réformé",
                    dateRetour: new Date()
                }
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].mouvementEPI.create({
                data: {
                    type: "PERTE",
                    quantite: 1,
                    motif: motifReforme || "Réforme EPI",
                    epiId: dist.epiId
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(dist);
        }
        if (action === "VGP") {
            const dist = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].distributionEPI.update({
                where: {
                    id
                },
                data: {
                    dateDerniereVGP: dateDerniereVGP ? new Date(dateDerniereVGP) : new Date(),
                    dateProchVGP: dateProchVGP ? new Date(dateProchVGP) : null
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(dist);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Action inconnue"
        }, {
            status: 400
        });
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

//# sourceMappingURL=%5Broot-of-the-server%5D__d0ceaeb6._.js.map