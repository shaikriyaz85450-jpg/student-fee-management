require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { signAccessToken } = require('./src/utils/jwt');

const databaseUrl = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function testEndpointsWithAuth() {
  console.log('=== Testing API Endpoints with Authentication ===\n');

  // Get a faculty user
  const facultyUser = await prisma.user.findFirst({
    where: { role: 'FACULTY' },
    include: { faculty: true }
  });

  if (!facultyUser) {
    console.log('❌ No faculty user found');
    return;
  }

  console.log('✓ Faculty user:', facultyUser.email);
  console.log('✓ Faculty profile:', facultyUser.faculty ? 'EXISTS' : 'MISSING');
  
  const token = signAccessToken(facultyUser);
  console.log('✓ Token generated\n');

  // Simulate the login response
  const sanitizeUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    profile:
      user.role === "STUDENT"
        ? user.student
        : user.role === "FACULTY"
          ? user.faculty
          : user.accountant,
  });

  const storedUser = sanitizeUser(facultyUser);
  console.log('Stored user object:', JSON.stringify(storedUser, null, 2));
  console.log('\n');

  // Test what the frontend data provider would do
  console.log('Frontend data provider logic:');
  console.log('user?.role === "STUDENT" && user.profile?.id:', storedUser?.role === "STUDENT" && storedUser.profile?.id);
  
  if (storedUser?.role === "STUDENT" && storedUser.profile?.id) {
    console.log('➜ Would call: /students/' + storedUser.profile.id);
  } else {
    console.log('➜ Would call: /students?limit=100');
  }

  console.log('\n');

  // Test the actual endpoint
  console.log('Testing /students endpoint...');
  const students = await prisma.student.findMany({
    skip: 0,
    take: 100,
    orderBy: { createdAt: 'desc' },
    include: { payments: { orderBy: { paymentDate: 'desc' }, take: 3 } },
  });

  console.log('Students returned:', students.length);
  if (students.length > 0) {
    console.log('Sample student:', {
      id: students[0].id,
      name: students[0].name,
      email: students[0].email,
      rollNumber: students[0].rollNumber
    });
  } else {
    console.log('❌ NO STUDENTS RETURNED!');
  }
}

testEndpointsWithAuth()
  .then(() => process.exit(0))
  .catch(e => {
    console.error('Error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
