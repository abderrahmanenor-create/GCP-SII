-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'CHEF_PROJET', 'CHEF_CHANTIER', 'SUPERVISEUR', 'RH', 'AGENT', 'CLIENT', 'SOUS_TRAITANT');

-- CreateEnum
CREATE TYPE "StatutCompte" AS ENUM ('ACTIF', 'INACTIF', 'SUSPENDU', 'EN_ATTENTE');

-- CreateEnum
CREATE TYPE "TypeSociete" AS ENUM ('INTERNE', 'CLIENT', 'SOUS_TRAITANT', 'FOURNISSEUR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT,
    "photo" TEXT,
    "role" "Role" NOT NULL DEFAULT 'AGENT',
    "statut" "StatutCompte" NOT NULL DEFAULT 'EN_ATTENTE',
    "societeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "createdById" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Societe" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "TypeSociete" NOT NULL DEFAULT 'INTERNE',
    "adresse" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Societe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_societeId_idx" ON "User"("societeId");

-- CreateIndex
CREATE UNIQUE INDEX "Societe_code_key" ON "Societe"("code");

-- CreateIndex
CREATE INDEX "Societe_code_idx" ON "Societe"("code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_societeId_fkey" FOREIGN KEY ("societeId") REFERENCES "Societe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
