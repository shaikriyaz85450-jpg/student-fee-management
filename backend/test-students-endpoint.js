require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { signAccessToken } = require('./src/utils/jwt');

const databaseUrl = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function testStudentsEndpoint() {
  console.log('=== Testing Students Endpoint ===\n');

  // Get a faculty user
  console.log('1. Fetching a Faculty user...');
  const facultyUser = await prisma.user.findFirst({
    where: { role: 'FACULTY' },
    include: { faculty: true }
  });

  if (!facultyUser) {
    console.log('No faculty user found in database');
    return;
  }

  console.log('Faculty user found:', facultyUser.email);
  const token = signAccessToken(facultyUser);
  console.log('Generated token:', token.substring(0, 50) + '...\n');

  // Simulate the /students endpoint logic
  console.log('2. Testing /students endpoint logic...');
  const students = await prisma.student.findMany({
    skip: 0,
    take: 100,
    orderBy: { createdAt: 'desc' },
    include: { payments: { orderBy: { paymentDate: 'desc' }, take: 3 } },
  });

  console.log('Students fetched:', students.length);
  console.log('Student data:', JSON.stringify(students, null, 2));

  if (students.length === 0) {
    console.log('\n⚠️  WARNING: No students found! This explains why the list is empty.');
  }
}

testStudentsEndpoint()
  .then(() => process.exit(0))
  .catch(e => {
    console.error('Error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
