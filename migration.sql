-- ============================================================
-- GCP-SII - Migration MySQL complète
-- Compatible MariaDB 10.x / MySQL 5.7+
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;

-- ==========================================
-- TABLES DE RÉFÉRENCE
-- ==========================================

CREATE TABLE IF NOT EXISTS `RefPoste` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `actif` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefPoste_nom_key` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `RefTypeContrat` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `actif` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefTypeContrat_nom_key` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `RefTypeHabilitation` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `dureeValiditeMois` INT NOT NULL DEFAULT 12,
  `actif` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefTypeHabilitation_nom_key` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `RefCategorieEPI` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `actif` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefCategorieEPI_nom_key` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `RefCategoriesMateriel` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `actif` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefCategoriesMateriel_nom_key` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `RefMotifAbsence` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `paye` TINYINT(1) NOT NULL DEFAULT 0,
  `actif` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefMotifAbsence_nom_key` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `RefCodePointage` (
  `id` VARCHAR(36) NOT NULL,
  `code` VARCHAR(191) NOT NULL,
  `libelle` VARCHAR(191) NOT NULL,
  `facturable` TINYINT(1) NOT NULL DEFAULT 1,
  `actif` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefCodePointage_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- SOCIÉTÉS & STRUCTURE
-- ==========================================

CREATE TABLE IF NOT EXISTS `Societe` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `ice` VARCHAR(191) NULL,
  `email` VARCHAR(191) NULL,
  `tel` VARCHAR(50) NULL,
  `adresse` TEXT NULL,
  `actif` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Contrat` (
  `id` VARCHAR(36) NOT NULL,
  `numero` VARCHAR(191) NOT NULL,
  `objet` TEXT NOT NULL,
  `budget` DOUBLE NOT NULL,
  `dateDebut` DATETIME(3) NOT NULL,
  `dateFin` DATETIME(3) NULL,
  `statut` VARCHAR(50) NOT NULL DEFAULT 'ACTIF',
  `validationRequise` TINYINT(1) NOT NULL DEFAULT 1,
  `clientId` VARCHAR(36) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Contrat_numero_key` (`numero`),
  KEY `Contrat_clientId_fkey` (`clientId`),
  CONSTRAINT `Contrat_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Societe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Projet` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `code` VARCHAR(191) NOT NULL,
  `contratId` VARCHAR(36) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Projet_code_key` (`code`),
  KEY `Projet_contratId_fkey` (`contratId`),
  CONSTRAINT `Projet_contratId_fkey` FOREIGN KEY (`contratId`) REFERENCES `Contrat` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Zone` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `projetId` VARCHAR(36) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Zone_projetId_fkey` (`projetId`),
  CONSTRAINT `Zone_projetId_fkey` FOREIGN KEY (`projetId`) REFERENCES `Projet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Equipe` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `projetId` VARCHAR(36) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Equipe_projetId_fkey` (`projetId`),
  CONSTRAINT `Equipe_projetId_fkey` FOREIGN KEY (`projetId`) REFERENCES `Projet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- UTILISATEURS
-- ==========================================

CREATE TABLE IF NOT EXISTS `User` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `prenom` VARCHAR(191) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'OUVRIER',
  `statut` VARCHAR(50) NOT NULL DEFAULT 'ACTIF',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `matricule` VARCHAR(191) NULL,
  `cin` VARCHAR(191) NULL,
  `cnss` VARCHAR(191) NULL,
  `telephone` VARCHAR(50) NULL,
  `photoUrl` VARCHAR(500) NULL,
  `tauxHoraire` DOUBLE NULL,
  `salaireBase` DOUBLE NULL,
  `indemniteTransport` DOUBLE NULL,
  `autreIndemnite` DOUBLE NULL,
  `dateDebutContrat` DATETIME(3) NULL,
  `dateFinContrat` DATETIME(3) NULL,
  `posteId` VARCHAR(36) NULL,
  `typeContratId` VARCHAR(36) NULL,
  `societeId` VARCHAR(36) NULL,
  `equipeId` VARCHAR(36) NULL,
  `cinUrl` VARCHAR(500) NULL,
  `cnssUrl` VARCHAR(500) NULL,
  `contratUrl` VARCHAR(500) NULL,
  `visiteMedicaleUrl` VARCHAR(500) NULL,
  `ribUrl` VARCHAR(500) NULL,
  `adresse` TEXT NULL,
  `dateEmbauche` DATETIME(3) NULL,
  `salaire` DOUBLE NULL,
  `photo` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_matricule_key` (`matricule`),
  KEY `User_posteId_fkey` (`posteId`),
  KEY `User_typeContratId_fkey` (`typeContratId`),
  KEY `User_societeId_fkey` (`societeId`),
  KEY `User_equipeId_fkey` (`equipeId`),
  CONSTRAINT `User_posteId_fkey` FOREIGN KEY (`posteId`) REFERENCES `RefPoste` (`id`),
  CONSTRAINT `User_typeContratId_fkey` FOREIGN KEY (`typeContratId`) REFERENCES `RefTypeContrat` (`id`),
  CONSTRAINT `User_societeId_fkey` FOREIGN KEY (`societeId`) REFERENCES `Societe` (`id`),
  CONSTRAINT `User_equipeId_fkey` FOREIGN KEY (`equipeId`) REFERENCES `Equipe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- RH
-- ==========================================

CREATE TABLE IF NOT EXISTS `Habilitation` (
  `id` VARCHAR(36) NOT NULL,
  `dateObtention` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dateFin` DATETIME(3) NOT NULL,
  `document` VARCHAR(500) NULL,
  `statut` VARCHAR(50) NOT NULL DEFAULT 'VALIDE',
  `userId` VARCHAR(36) NOT NULL,
  `typeId` VARCHAR(36) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Habilitation_userId_fkey` (`userId`),
  KEY `Habilitation_typeId_fkey` (`typeId`),
  CONSTRAINT `Habilitation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `Habilitation_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `RefTypeHabilitation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `DocumentRH` (
  `id` VARCHAR(36) NOT NULL,
  `userId` VARCHAR(36) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `taille` INT NULL,
  `expiration` DATETIME(3) NULL,
  `remarque` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `DocumentRH_userId_fkey` (`userId`),
  CONSTRAINT `DocumentRH_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- POINTAGE INTERNE
-- ==========================================

CREATE TABLE IF NOT EXISTS `PresenceSite` (
  `id` VARCHAR(36) NOT NULL,
  `date` DATETIME(3) NOT NULL,
  `heureArrivee` DATETIME(3) NULL,
  `heureDepart` DATETIME(3) NULL,
  `statut` VARCHAR(50) NOT NULL DEFAULT 'PRESENT',
  `motifAbsence` VARCHAR(191) NULL,
  `note` TEXT NULL,
  `valide` TINYINT(1) NOT NULL DEFAULT 0,
  `valideParId` VARCHAR(36) NULL,
  `userId` VARCHAR(36) NOT NULL,
  `zoneId` VARCHAR(36) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `PresenceSite_userId_date_key` (`userId`, `date`),
  KEY `PresenceSite_userId_fkey` (`userId`),
  KEY `PresenceSite_zoneId_fkey` (`zoneId`),
  CONSTRAINT `PresenceSite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `PresenceSite_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `Zone` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- POINTAGE RÉGIE
-- ==========================================

CREATE TABLE IF NOT EXISTS `Facture` (
  `id` VARCHAR(36) NOT NULL,
  `numero` VARCHAR(191) NOT NULL,
  `statut` VARCHAR(50) NOT NULL DEFAULT 'BROUILLON',
  `dateEmission` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dateEcheance` DATETIME(3) NULL,
  `clientId` VARCHAR(36) NOT NULL,
  `totalHT` DOUBLE NOT NULL DEFAULT 0,
  `tauxTVA` DOUBLE NOT NULL DEFAULT 20,
  `montantTVA` DOUBLE NOT NULL DEFAULT 0,
  `tauxRetenue` DOUBLE NOT NULL DEFAULT 0,
  `montantRetenue` DOUBLE NOT NULL DEFAULT 0,
  `totalTTC` DOUBLE NOT NULL DEFAULT 0,
  `netAPayer` DOUBLE NOT NULL DEFAULT 0,
  `notes` TEXT NULL,
  `contratId` VARCHAR(36) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Facture_numero_key` (`numero`),
  KEY `Facture_clientId_fkey` (`clientId`),
  KEY `Facture_contratId_fkey` (`contratId`),
  CONSTRAINT `Facture_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Societe` (`id`),
  CONSTRAINT `Facture_contratId_fkey` FOREIGN KEY (`contratId`) REFERENCES `Contrat` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `FeuilleRegie` (
  `id` VARCHAR(36) NOT NULL,
  `date` DATETIME(3) NOT NULL,
  `semaine` INT NOT NULL,
  `mois` INT NOT NULL,
  `annee` INT NOT NULL,
  `statut` VARCHAR(50) NOT NULL DEFAULT 'BROUILLON',
  `totalHeures` DOUBLE NOT NULL DEFAULT 0,
  `totalCoutMO` DOUBLE NOT NULL DEFAULT 0,
  `totalCoutMat` DOUBLE NOT NULL DEFAULT 0,
  `totalGeneral` DOUBLE NOT NULL DEFAULT 0,
  `valideChefId` VARCHAR(36) NULL,
  `dateValidChef` DATETIME(3) NULL,
  `valideClientId` VARCHAR(36) NULL,
  `dateValidClient` DATETIME(3) NULL,
  `signatureUrl` VARCHAR(500) NULL,
  `scanSignature` VARCHAR(500) NULL,
  `zoneId` VARCHAR(36) NOT NULL,
  `factureId` VARCHAR(36) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `FeuilleRegie_zoneId_fkey` (`zoneId`),
  KEY `FeuilleRegie_factureId_fkey` (`factureId`),
  CONSTRAINT `FeuilleRegie_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `Zone` (`id`),
  CONSTRAINT `FeuilleRegie_factureId_fkey` FOREIGN KEY (`factureId`) REFERENCES `Facture` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `LigneRegie` (
  `id` VARCHAR(36) NOT NULL,
  `heures` DOUBLE NOT NULL,
  `tauxHoraire` DOUBLE NOT NULL,
  `montant` DOUBLE NOT NULL,
  `codePointage` VARCHAR(50) NULL,
  `note` TEXT NULL,
  `userId` VARCHAR(36) NOT NULL,
  `feuilleId` VARCHAR(36) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `LigneRegie_userId_fkey` (`userId`),
  KEY `LigneRegie_feuilleId_fkey` (`feuilleId`),
  CONSTRAINT `LigneRegie_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `LigneRegie_feuilleId_fkey` FOREIGN KEY (`feuilleId`) REFERENCES `FeuilleRegie` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- RAPPORTS
-- ==========================================

CREATE TABLE IF NOT EXISTS `RapportChantier` (
  `id` VARCHAR(36) NOT NULL,
  `date` DATETIME(3) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `titre` VARCHAR(191) NOT NULL,
  `description` TEXT NULL,
  `photos` TEXT NULL,
  `statut` VARCHAR(50) NOT NULL DEFAULT 'BROUILLON',
  `valideChef` TINYINT(1) NOT NULL DEFAULT 0,
  `valideClient` TINYINT(1) NOT NULL DEFAULT 0,
  `pdfUrl` VARCHAR(500) NULL,
  `zoneId` VARCHAR(36) NOT NULL,
  `feuilleId` VARCHAR(36) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `RapportChantier_zoneId_fkey` (`zoneId`),
  KEY `RapportChantier_feuilleId_fkey` (`feuilleId`),
  CONSTRAINT `RapportChantier_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `Zone` (`id`),
  CONSTRAINT `RapportChantier_feuilleId_fkey` FOREIGN KEY (`feuilleId`) REFERENCES `FeuilleRegie` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Commentaire` (
  `id` VARCHAR(36) NOT NULL,
  `contenu` TEXT NOT NULL,
  `entite` VARCHAR(50) NOT NULL,
  `entiteId` VARCHAR(36) NOT NULL,
  `auteurId` VARCHAR(36) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Commentaire_auteurId_fkey` (`auteurId`),
  KEY `Commentaire_entiteId_fkey` (`entiteId`),
  CONSTRAINT `Commentaire_auteurId_fkey` FOREIGN KEY (`auteurId`) REFERENCES `User` (`id`),
  CONSTRAINT `Commentaire_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `RapportChantier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- EPI & HSE
-- ==========================================

CREATE TABLE IF NOT EXISTS `EPI` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `reference` VARCHAR(191) NULL,
  `marque` VARCHAR(191) NULL,
  `taille` VARCHAR(50) NULL,
  `norme` VARCHAR(191) NULL,
  `categorieSec` VARCHAR(10) NOT NULL DEFAULT 'II',
  `stockInitial` INT NOT NULL DEFAULT 0,
  `stockActuel` INT NOT NULL DEFAULT 0,
  `seuilAlerte` INT NOT NULL DEFAULT 5,
  `prixUnitaire` DOUBLE NULL,
  `dureeVieAns` INT NULL,
  `nbLavagesMax` INT NULL,
  `vgpRequise` TINYINT(1) NOT NULL DEFAULT 0,
  `vgpPeriodeMois` INT NULL DEFAULT 12,
  `datePeremption` DATETIME(3) NULL,
  `categorieId` VARCHAR(36) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `EPI_categorieId_fkey` (`categorieId`),
  CONSTRAINT `EPI_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `RefCategorieEPI` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `MouvementEPI` (
  `id` VARCHAR(36) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `quantite` INT NOT NULL,
  `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `motif` VARCHAR(191) NULL,
  `epiId` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `MouvementEPI_epiId_fkey` (`epiId`),
  CONSTRAINT `MouvementEPI_epiId_fkey` FOREIGN KEY (`epiId`) REFERENCES `EPI` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `DistributionEPI` (
  `id` VARCHAR(36) NOT NULL,
  `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `quantite` INT NOT NULL DEFAULT 1,
  `etat` VARCHAR(50) NOT NULL DEFAULT 'NEUF',
  `taille` VARCHAR(50) NULL,
  `dateMiseEnService` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
  `datePeremption` DATETIME(3) NULL,
  `dateProchVGP` DATETIME(3) NULL,
  `dateDerniereVGP` DATETIME(3) NULL,
  `dateRetour` DATETIME(3) NULL,
  `statut` VARCHAR(50) NOT NULL DEFAULT 'ACTIF',
  `motifReforme` VARCHAR(191) NULL,
  `remarque` TEXT NULL,
  `signatureRecipisse` TEXT NULL,
  `epiId` VARCHAR(36) NOT NULL,
  `userId` VARCHAR(36) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `DistributionEPI_epiId_fkey` (`epiId`),
  KEY `DistributionEPI_userId_fkey` (`userId`),
  CONSTRAINT `DistributionEPI_epiId_fkey` FOREIGN KEY (`epiId`) REFERENCES `EPI` (`id`),
  CONSTRAINT `DistributionEPI_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- MATÉRIEL
-- ==========================================

CREATE TABLE IF NOT EXISTS `Materiel` (
  `id` VARCHAR(36) NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `code` VARCHAR(191) NOT NULL,
  `numeroSerie` VARCHAR(191) NULL,
  `proprietaire` VARCHAR(50) NOT NULL DEFAULT 'INTERNE',
  `statut` VARCHAR(50) NOT NULL DEFAULT 'OPERATIONNEL',
  `coutJournalier` DOUBLE NULL,
  `prixLocationJour` DOUBLE NULL,
  `categorieId` VARCHAR(36) NULL,
  `attestationElectrique` VARCHAR(500) NULL,
  `dateAttestElec` DATETIME(3) NULL,
  `certificatLevage` VARCHAR(500) NULL,
  `dateCertLevage` DATETIME(3) NULL,
  `ficheControleOutillage` VARCHAR(500) NULL,
  `dateControleOutillage` DATETIME(3) NULL,
  `carnetBord` VARCHAR(500) NULL,
  `dateCarnetBord` DATETIME(3) NULL,
  `ficheEPI` VARCHAR(500) NULL,
  `prochaineInspElec` DATETIME(3) NULL,
  `prochaineInspLevage` DATETIME(3) NULL,
  `prochaineInspOutillage` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Materiel_code_key` (`code`),
  KEY `Materiel_categorieId_fkey` (`categorieId`),
  CONSTRAINT `Materiel_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `RefCategoriesMateriel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AffectationMateriel` (
  `id` VARCHAR(36) NOT NULL,
  `dateDebut` DATETIME(3) NOT NULL,
  `dateFin` DATETIME(3) NULL,
  `joursFactures` INT NOT NULL DEFAULT 0,
  `montant` DOUBLE NOT NULL DEFAULT 0,
  `valideClient` TINYINT(1) NOT NULL DEFAULT 0,
  `materielId` VARCHAR(36) NOT NULL,
  `zoneId` VARCHAR(36) NOT NULL,
  `feuilleId` VARCHAR(36) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `AffectationMateriel_materielId_fkey` (`materielId`),
  KEY `AffectationMateriel_zoneId_fkey` (`zoneId`),
  KEY `AffectationMateriel_feuilleId_fkey` (`feuilleId`),
  CONSTRAINT `AffectationMateriel_materielId_fkey` FOREIGN KEY (`materielId`) REFERENCES `Materiel` (`id`),
  CONSTRAINT `AffectationMateriel_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `Zone` (`id`),
  CONSTRAINT `AffectationMateriel_feuilleId_fkey` FOREIGN KEY (`feuilleId`) REFERENCES `FeuilleRegie` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- FACTURATION
-- ==========================================

CREATE TABLE IF NOT EXISTS `TarifContrat` (
  `id` VARCHAR(36) NOT NULL,
  `contratId` VARCHAR(36) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `posteId` VARCHAR(36) NULL,
  `materielId` VARCHAR(36) NULL,
  `tauxFacture` DOUBLE NOT NULL,
  `tauxRevient` DOUBLE NULL,
  `unite` VARCHAR(50) NOT NULL DEFAULT 'HEURE',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `TarifContrat_contratId_fkey` (`contratId`),
  KEY `TarifContrat_posteId_fkey` (`posteId`),
  KEY `TarifContrat_materielId_fkey` (`materielId`),
  CONSTRAINT `TarifContrat_contratId_fkey` FOREIGN KEY (`contratId`) REFERENCES `Contrat` (`id`),
  CONSTRAINT `TarifContrat_posteId_fkey` FOREIGN KEY (`posteId`) REFERENCES `RefPoste` (`id`),
  CONSTRAINT `TarifContrat_materielId_fkey` FOREIGN KEY (`materielId`) REFERENCES `Materiel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `CoutProjet` (
  `id` VARCHAR(36) NOT NULL,
  `categorie` VARCHAR(191) NOT NULL,
  `montant` DOUBLE NOT NULL,
  `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `description` TEXT NULL,
  `projetId` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CoutProjet_projetId_fkey` (`projetId`),
  CONSTRAINT `CoutProjet_projetId_fkey` FOREIGN KEY (`projetId`) REFERENCES `Projet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- PRÉSENCE JOURNALIÈRE
-- ==========================================

CREATE TABLE IF NOT EXISTS `PresenceJournaliere` (
  `id` VARCHAR(36) NOT NULL,
  `date` DATETIME(3) NOT NULL,
  `userId` VARCHAR(36) NOT NULL,
  `shift` VARCHAR(20) NOT NULL DEFAULT 'JOUR',
  `heureDebutShift` VARCHAR(10) NOT NULL DEFAULT '07:00',
  `heureFinShift` VARCHAR(10) NOT NULL DEFAULT '19:00',
  `statut` VARCHAR(50) NOT NULL DEFAULT 'PRESENT',
  `heureArrivee` VARCHAR(10) NULL,
  `heureDepart` VARCHAR(10) NULL,
  `remarque` TEXT NULL,
  `zoneId` VARCHAR(36) NULL,
  `equipeId` VARCHAR(36) NULL,
  `statutFiche` VARCHAR(50) NOT NULL DEFAULT 'BROUILLON',
  `valideChefId` VARCHAR(36) NULL,
  `dateValideChef` DATETIME(3) NULL,
  `valideRHId` VARCHAR(36) NULL,
  `dateValideRH` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `PresenceJournaliere_userId_date_shift_key` (`userId`, `date`, `shift`),
  KEY `PresenceJournaliere_userId_fkey` (`userId`),
  KEY `PresenceJournaliere_zoneId_fkey` (`zoneId`),
  KEY `PresenceJournaliere_equipeId_fkey` (`equipeId`),
  CONSTRAINT `PresenceJournaliere_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `PresenceJournaliere_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `Zone` (`id`),
  CONSTRAINT `PresenceJournaliere_equipeId_fkey` FOREIGN KEY (`equipeId`) REFERENCES `Equipe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- TABLE DE SESSIONS NEXTAUTH
-- ==========================================

CREATE TABLE IF NOT EXISTS `Account` (
  `id` VARCHAR(36) NOT NULL,
  `userId` VARCHAR(36) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `provider` VARCHAR(191) NOT NULL,
  `providerAccountId` VARCHAR(191) NOT NULL,
  `refresh_token` TEXT NULL,
  `access_token` TEXT NULL,
  `expires_at` INT NULL,
  `token_type` VARCHAR(191) NULL,
  `scope` VARCHAR(191) NULL,
  `id_token` TEXT NULL,
  `session_state` VARCHAR(191) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`, `providerAccountId`),
  KEY `Account_userId_fkey` (`userId`),
  CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Session` (
  `id` VARCHAR(36) NOT NULL,
  `sessionToken` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(36) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `VerificationToken` (
  `identifier` VARCHAR(191) NOT NULL,
  `token` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  UNIQUE KEY `VerificationToken_token_key` (`token`),
  UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`, `token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- TABLE PRISMA MIGRATIONS
-- ==========================================

CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` VARCHAR(36) NOT NULL,
  `checksum` VARCHAR(64) NOT NULL,
  `finished_at` DATETIME(3) NULL,
  `migration_name` VARCHAR(255) NOT NULL,
  `logs` TEXT NULL,
  `rolled_back_at` DATETIME(3) NULL,
  `started_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
