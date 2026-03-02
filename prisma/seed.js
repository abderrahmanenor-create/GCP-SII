const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@gcp-sii.com';
  const password = 'Admin123!'; // Tu pourras le changer après la première connexion
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      nom: 'Admin',
      prenom: 'Chef',
      role: 'ADMIN',
      statut: 'ACTIF',
    },
  });

  console.log('Utilisateur Admin créé avec succès !');
  console.log('Email : ' + email);
  console.log('Mot de passe : ' + password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });