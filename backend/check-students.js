require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Checking Students...');
  const students = await prisma.student.findMany({ include: { user: true } });
  console.log('Students:', JSON.stringify(students, null, 2));

  console.log('\nChecking Users with role STUDENT...');
  const studentUsers = await prisma.user.findMany({ 
    where: { role: 'STUDENT' },
    include: { student: true }
  });
  console.log('Student Users:', JSON.stringify(studentUsers, null, 2));

  console.log('\nChecking all Users...');
  const allUsers = await prisma.user.findMany({});
  console.log('All Users:', JSON.stringify(allUsers, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
