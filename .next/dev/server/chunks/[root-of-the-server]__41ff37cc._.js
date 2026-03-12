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
"[project]/src/app/api/facturation/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
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
async function genererNumero() {
    const annee = new Date().getFullYear();
    const derniere = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].facture.findFirst({
        where: {
            numero: {
                startsWith: `FAC-${annee}-`
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    let seq = 1;
    if (derniere) {
        const parts = derniere.numero.split("-");
        seq = parseInt(parts[2]) + 1;
    }
    return `FAC-${annee}-${seq.toString().padStart(4, "0")}`;
}
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const clientId = searchParams.get("clientId") || "";
        const statut = searchParams.get("statut") || "";
        const where = {};
        if (clientId) where.clientId = clientId;
        if (statut) where.statut = statut;
        const factures = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].facture.findMany({
            where,
            include: {
                client: true,
                feuilles: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(factures);
    } catch (error) {
        console.error("GET /api/facturation:", error.message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const body = await req.json();
        const { clientId, feuilleIds, tauxTVA, tauxRetenue, dateEcheance, notes } = body;
        if (!clientId || !feuilleIds?.length) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Client et feuilles obligatoires"
            }, {
                status: 400
            });
        }
        const feuilles = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].feuilleRegie.findMany({
            where: {
                id: {
                    in: feuilleIds
                }
            }
        });
        if (feuilles.some((f)=>f.statut !== "VALIDE_CLIENT")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Toutes les feuilles doivent être validées client"
            }, {
                status: 400
            });
        }
        if (feuilles.some((f)=>f.factureId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Certaines feuilles sont déjà facturées"
            }, {
                status: 400
            });
        }
        const totalHT = feuilles.reduce((sum, f)=>sum + f.totalGeneral, 0);
        const tva = parseFloat(tauxTVA) || 20;
        const retenue = parseFloat(tauxRetenue) || 0;
        const montantTVA = totalHT * (tva / 100);
        const totalTTC = totalHT + montantTVA;
        const montantRetenue = totalTTC * (retenue / 100);
        const netAPayer = totalTTC - montantRetenue;
        const numero = await genererNumero();
        const facture = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].facture.create({
            data: {
                numero,
                clientId,
                totalHT,
                tauxTVA: tva,
                montantTVA,
                tauxRetenue: retenue,
                montantRetenue,
                totalTTC,
                netAPayer,
                dateEcheance: dateEcheance ? new Date(dateEcheance) : null,
                notes: notes || null,
                feuilles: {
                    connect: feuilleIds.map((id)=>({
                            id
                        }))
                }
            },
            include: {
                client: true,
                feuilles: {
                    include: {
                        lignes: {
                            include: {
                                user: {
                                    include: {
                                        poste: true
                                    }
                                }
                            }
                        },
                        affectationsMat: {
                            include: {
                                materiel: true
                            }
                        },
                        zone: {
                            include: {
                                projet: {
                                    include: {
                                        contrat: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(facture, {
            status: 201
        });
    } catch (error) {
        console.error("POST /api/facturation:", error.message);
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
        const { id, statut, notes, dateEcheance, tauxRetenue, tauxTVA } = body;
        if (!id) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ID manquant"
        }, {
            status: 400
        });
        const current = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].facture.findUnique({
            where: {
                id
            }
        });
        if (!current) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Facture non trouvée"
        }, {
            status: 404
        });
        const data = {};
        if (statut) data.statut = statut;
        if (notes !== undefined) data.notes = notes;
        if (dateEcheance) data.dateEcheance = new Date(dateEcheance);
        if (tauxTVA !== undefined || tauxRetenue !== undefined) {
            const tva = tauxTVA !== undefined ? parseFloat(tauxTVA) : current.tauxTVA;
            const retenue = tauxRetenue !== undefined ? parseFloat(tauxRetenue) : current.tauxRetenue;
            const montantTVA = current.totalHT * (tva / 100);
            const totalTTC = current.totalHT + montantTVA;
            const montantRetenue = totalTTC * (retenue / 100);
            data.tauxTVA = tva;
            data.montantTVA = montantTVA;
            data.tauxRetenue = retenue;
            data.montantRetenue = montantRetenue;
            data.totalTTC = totalTTC;
            data.netAPayer = totalTTC - montantRetenue;
        }
        const facture = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].facture.update({
            where: {
                id
            },
            data,
            include: {
                client: true,
                feuilles: true
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(facture);
    } catch (error) {
        console.error("PATCH /api/facturation:", error.message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ID manquant"
        }, {
            status: 400
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].feuilleRegie.updateMany({
            where: {
                factureId: id
            },
            data: {
                factureId: null
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].facture.delete({
            where: {
                id
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error("DELETE /api/facturation:", error.message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__41ff37cc._.js.map