require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { comparePassword } = require('./src/utils/password');

const databaseUrl = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function testLogin() {
  // Test logging in as student with roll number
  console.log('Testing login with roll number 987654321...');
  const user = await prisma.user.findFirst({
    where: {
      role: 'STUDENT',
      OR: [
        { email: { equals: '987654321', mode: 'insensitive' } },
        { student: { is: { rollNumber: { equals: '987654321', mode: 'insensitive' } } } },
      ],
    },
    include: { student: true },
  });

  console.log('User found:', user);

  if (user) {
    const isValidPassword = await comparePassword('Student@123', user.password);
    console.log('Password valid:', isValidPassword);
  }

  // Test with email
  console.log('\nTesting login with email riyaz@example.com...');
  const user2 = await prisma.user.findFirst({
    where: {
      role: 'STUDENT',
      OR: [
        { email: { equals: 'riyaz@example.com', mode: 'insensitive' } },
        { student: { is: { rollNumber: { equals: 'riyaz@example.com', mode: 'insensitive' } } } },
      ],
    },
    include: { student: true },
  });

  console.log('User found:', user2);

  if (user2) {
    const isValidPassword = await comparePassword('Student@123', user2.password);
    console.log('Password valid:', isValidPassword);
  }
}

testLogin()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
