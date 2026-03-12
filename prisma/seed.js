const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  // ===== ADMIN =====
  await prisma.user.upsert({
    where: { email: 'admin@gcp-sii.com' },
    update: {},
    create: {
      email: 'admin@gcp-sii.com',
      password: hashedPassword,
      nom: 'Admin',
      prenom: 'Chef',
      role: 'ADMIN',
      statut: 'ACTIF',
    },
  });
  console.log('✅ Admin créé');

  // ===== POSTES =====
  const nomPostes = [
    "Maçon",
    "Coffreur",
    "Ferrailleur",
    "Électricien",
    "Plombier",
    "Chef d'équipe",
    "Manœuvre",
    "Conducteur d'engins",
  ];

  const postesCreated = {};
  for (const nom of nomPostes) {
    const p = await prisma.refPoste.upsert({
      where: { nom },
      update: {},
      create: { nom },
    });
    postesCreated[nom] = p.id;
  }
  console.log('✅ Postes créés');

  // ===== OUVRIERS =====
  // Champs User obligatoires : email, password, nom, prenom
  // Champs optionnels utilisés : matricule, role, statut, tauxHoraire, posteId
  const ouvriers = [
    { nom: 'Benali',    prenom: 'Mohamed',   matricule: 'OUV-001', poste: "Maçon",               tauxHoraire: 45 },
    { nom: 'Elhassani', prenom: 'Youssef',   matricule: 'OUV-002', poste: "Coffreur",             tauxHoraire: 48 },
    { nom: 'Mansouri',  prenom: 'Rachid',    matricule: 'OUV-003', poste: "Ferrailleur",          tauxHoraire: 46 },
    { nom: 'Ouali',     prenom: 'Karim',     matricule: 'OUV-004', poste: "Électricien",          tauxHoraire: 55 },
    { nom: 'Ziani',     prenom: 'Hassan',    matricule: 'OUV-005', poste: "Plombier",             tauxHoraire: 52 },
    { nom: 'Tazi',      prenom: 'Abdelaziz', matricule: 'OUV-006', poste: "Chef d'équipe",        tauxHoraire: 65 },
    { nom: 'Idrissi',   prenom: 'Omar',      matricule: 'OUV-007', poste: "Manœuvre",             tauxHoraire: 35 },
    { nom: 'Berrada',   prenom: 'Samir',     matricule: 'OUV-008', poste: "Maçon",               tauxHoraire: 45 },
    { nom: 'Chaoui',    prenom: 'Nabil',     matricule: 'OUV-009', poste: "Coffreur",             tauxHoraire: 48 },
    { nom: 'Lahlou',    prenom: 'Aziz',      matricule: 'OUV-010', poste: "Ferrailleur",          tauxHoraire: 46 },
    { nom: 'Mouhib',    prenom: 'Khalid',    matricule: 'OUV-011', poste: "Manœuvre",             tauxHoraire: 35 },
    { nom: 'Squalli',   prenom: 'Hamid',     matricule: 'OUV-012', poste: "Conducteur d'engins",  tauxHoraire: 70 },
    { nom: 'Rhazi',     prenom: 'Fouad',     matricule: 'OUV-013', poste: "Maçon",               tauxHoraire: 45 },
    { nom: 'Benkirane', prenom: 'Tariq',     matricule: 'OUV-014', poste: "Électricien",          tauxHoraire: 55 },
    { nom: 'Amrani',    prenom: 'Driss',     matricule: 'OUV-015', poste: "Manœuvre",             tauxHoraire: 35 },
  ];

  for (const o of ouvriers) {
    const email = `${o.matricule.toLowerCase()}@gcp-sii.com`;
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: hashedPassword,
        nom: o.nom,
        prenom: o.prenom,
        matricule: o.matricule,
        role: 'OUVRIER',
        statut: 'ACTIF',
        tauxHoraire: o.tauxHoraire,
        posteId: postesCreated[o.poste],
      },
    });
  }
  console.log(`✅ ${ouvriers.length} ouvriers créés`);

  // ===== CLIENT (Societe) =====
  // Champs Societe obligatoires : nom, type
  // Champs optionnels : ice, email, tel, adresse
  const client = await prisma.societe.create({
    data: {
      nom: 'OCP SA',
      type: 'CLIENT',
      adresse: 'Route de Safi, Marrakech',
      tel: '0524000000',
      email: 'contact@ocp.ma',
    },
  });
  console.log('✅ Client OCP créé');

// ===== CONTRAT =====
  let contrat = await prisma.contrat.findUnique({ where: { numero: 'CTR-2026-001' } });
  if (!contrat) {
    contrat = await prisma.contrat.create({
      data: {
        numero: 'CTR-2026-001',
        objet: 'Construction Atelier OCP',
        budget: 5000000,
        dateDebut: new Date('2026-01-01'),
        dateFin: new Date('2026-12-31'),
        clientId: client.id,
      },
    });
  }
  console.log('✅ Contrat créé');

  // ===== PROJET =====
  let projet = await prisma.projet.findUnique({ where: { code: 'PRJ-OCP-001' } });
  if (!projet) {
    projet = await prisma.projet.create({
      data: {
        nom: 'Construction Atelier OCP',
        code: 'PRJ-OCP-001',
        contratId: contrat.id,
      },
    });
  }
  console.log('✅ Projet créé');

  // ===== ZONE =====
  const zonesExistantes = await prisma.zone.findMany({ where: { projetId: projet.id } });
  if (zonesExistantes.length === 0) {
    await prisma.zone.create({
      data: {
        nom: 'Zone A - Fondations',
        projetId: projet.id,
      },
    });
  }
  console.log('✅ Zone créée');

  console.log('\n🎉 Seed terminé avec succès !');
  console.log('📧 Admin    : admin@gcp-sii.com  /  Admin123!');
  console.log('👷 Ouvriers : ouv-001@gcp-sii.com  /  Admin123!  (jusqu\'à ouv-015)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
