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
"[project]/src/app/api/dashboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const now = new Date();
        const debutMois = new Date(now.getFullYear(), now.getMonth(), 1);
        const fin30j = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        // Ouvriers
        const totalOuvriers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.count({
            where: {
                statut: "ACTIF"
            }
        });
        // Feuilles régie ce mois
        const feuillesMois = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].feuilleRegie.findMany({
            where: {
                date: {
                    gte: debutMois
                }
            },
            select: {
                statut: true,
                totalGeneral: true,
                totalHeures: true
            }
        });
        const feuillesEnAttente = feuillesMois.filter((f)=>f.statut === "SOUMIS" || f.statut === "VALIDE_CHEF").length;
        const feuillesValidees = feuillesMois.filter((f)=>f.statut === "VALIDE_CLIENT").length;
        const totalFacturableMois = feuillesMois.filter((f)=>f.statut === "VALIDE_CLIENT").reduce((sum, f)=>sum + (f.totalGeneral || 0), 0);
        const totalHeuresMois = feuillesMois.reduce((sum, f)=>sum + (f.totalHeures || 0), 0);
        // EPI — alertes stock
        const episAlertesStock = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].ePI.count({
            where: {
                stockActuel: {
                    lte: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].ePI.fields.seuilAlerte
                }
            }
        }).catch(()=>0);
        // EPI — alertes péremption / VGP dans 30j
        const distributionsAlertes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].distributionEPI.count({
            where: {
                statut: "ACTIF",
                OR: [
                    {
                        datePeremption: {
                            lte: fin30j
                        }
                    },
                    {
                        dateProchVGP: {
                            lte: fin30j
                        }
                    }
                ]
            }
        });
        // Habilitations qui expirent dans 30j
        const habilitationsExpirent = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].habilitation.count({
            where: {
                dateExpiration: {
                    lte: fin30j,
                    gte: now
                }
            }
        }).catch(()=>0);
        // Contrats actifs
        const contratsActifs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].contrat.count({
            where: {
                statut: "ACTIF"
            }
        });
        // Projets actifs
        const projetsActifs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].projet.count();
        // Dernières feuilles (5)
        const dernieresFeuilles = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].feuilleRegie.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            },
            select: {
                id: true,
                date: true,
                statut: true,
                totalGeneral: true,
                totalHeures: true,
                zone: {
                    select: {
                        nom: true,
                        projet: {
                            select: {
                                nom: true,
                                contrat: {
                                    select: {
                                        client: {
                                            select: {
                                                nom: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        // Dernières distributions EPI avec alerte
        const dernieresAlertes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].distributionEPI.findMany({
            where: {
                statut: "ACTIF",
                OR: [
                    {
                        datePeremption: {
                            lte: fin30j
                        }
                    },
                    {
                        dateProchVGP: {
                            lte: fin30j
                        }
                    }
                ]
            },
            take: 5,
            orderBy: {
                datePeremption: "asc"
            },
            select: {
                id: true,
                datePeremption: true,
                dateProchVGP: true,
                epi: {
                    select: {
                        nom: true,
                        norme: true
                    }
                },
                user: {
                    select: {
                        nom: true,
                        prenom: true
                    }
                }
            }
        });
        // Évolution heures 6 derniers mois
        const evolution = [];
        for(let i = 5; i >= 0; i--){
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const fin = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
            const feuilles = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].feuilleRegie.findMany({
                where: {
                    date: {
                        gte: d,
                        lte: fin
                    }
                },
                select: {
                    totalHeures: true,
                    totalGeneral: true
                }
            });
            evolution.push({
                mois: d.toLocaleDateString("fr-FR", {
                    month: "short",
                    year: "2-digit"
                }),
                heures: feuilles.reduce((s, f)=>s + (f.totalHeures || 0), 0),
                montant: feuilles.reduce((s, f)=>s + (f.totalGeneral || 0), 0)
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            kpis: {
                totalOuvriers,
                feuillesEnAttente,
                feuillesValidees,
                totalFacturableMois,
                totalHeuresMois,
                contratsActifs,
                projetsActifs,
                distributionsAlertes,
                habilitationsExpirent
            },
            dernieresFeuilles,
            dernieresAlertes,
            evolution
        });
    } catch (error) {
        console.error(error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d8bfabdd._.js.map