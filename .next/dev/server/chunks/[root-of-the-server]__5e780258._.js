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
"[project]/src/app/api/admin/materiel/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
async function GET() {
    try {
        const materiels = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].materiel.findMany({
            include: {
                categorie: {
                    select: {
                        id: true,
                        nom: true
                    }
                },
                affectations: {
                    where: {
                        dateFin: null
                    },
                    include: {
                        zone: {
                            select: {
                                id: true,
                                nom: true,
                                projet: {
                                    select: {
                                        nom: true,
                                        code: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                nom: "asc"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(materiels);
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
        const { nom, code, numeroSerie, proprietaire, statut, coutJournalier, prixLocationJour, categorieId, attestationElectrique, dateAttestElec, certificatLevage, dateCertLevage, ficheControleOutillage, dateControleOutillage, carnetBord, dateCarnetBord, ficheEPI, prochaineInspElec, prochaineInspLevage, prochaineInspOutillage } = body;
        if (!nom || !code) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Nom et code obligatoires"
            }, {
                status: 400
            });
        }
        const materiel = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].materiel.create({
            data: {
                nom,
                code,
                numeroSerie: numeroSerie || null,
                proprietaire: proprietaire || "INTERNE",
                statut: statut || "OPERATIONNEL",
                coutJournalier: coutJournalier ? parseFloat(coutJournalier) : null,
                prixLocationJour: prixLocationJour ? parseFloat(prixLocationJour) : null,
                categorieId: categorieId || null,
                attestationElectrique: attestationElectrique || null,
                dateAttestElec: dateAttestElec ? new Date(dateAttestElec) : null,
                certificatLevage: certificatLevage || null,
                dateCertLevage: dateCertLevage ? new Date(dateCertLevage) : null,
                ficheControleOutillage: ficheControleOutillage || null,
                dateControleOutillage: dateControleOutillage ? new Date(dateControleOutillage) : null,
                carnetBord: carnetBord || null,
                dateCarnetBord: dateCarnetBord ? new Date(dateCarnetBord) : null,
                ficheEPI: ficheEPI || null,
                prochaineInspElec: prochaineInspElec ? new Date(prochaineInspElec) : null,
                prochaineInspLevage: prochaineInspLevage ? new Date(prochaineInspLevage) : null,
                prochaineInspOutillage: prochaineInspOutillage ? new Date(prochaineInspOutillage) : null
            },
            include: {
                categorie: true
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(materiel);
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
        const { id, ...data } = body;
        const materiel = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].materiel.update({
            where: {
                id
            },
            data: {
                ...data,
                coutJournalier: data.coutJournalier ? parseFloat(data.coutJournalier) : null,
                prixLocationJour: data.prixLocationJour ? parseFloat(data.prixLocationJour) : null,
                dateAttestElec: data.dateAttestElec ? new Date(data.dateAttestElec) : null,
                dateCertLevage: data.dateCertLevage ? new Date(data.dateCertLevage) : null,
                dateControleOutillage: data.dateControleOutillage ? new Date(data.dateControleOutillage) : null,
                dateCarnetBord: data.dateCarnetBord ? new Date(data.dateCarnetBord) : null,
                prochaineInspElec: data.prochaineInspElec ? new Date(data.prochaineInspElec) : null,
                prochaineInspLevage: data.prochaineInspLevage ? new Date(data.prochaineInspLevage) : null,
                prochaineInspOutillage: data.prochaineInspOutillage ? new Date(data.prochaineInspOutillage) : null
            },
            include: {
                categorie: true
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(materiel);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__5e780258._.js.map