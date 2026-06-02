# Student Fee Management Backend API

Base URL: `http://localhost:5000/api/v1`

Authentication uses a JWT access token in the `Authorization` header:

```http
Authorization: Bearer <accessToken>
```

## Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

## Auth

| Method | Path | Roles | Description |
| --- | --- | --- | --- |
| POST | `/auth/login` | Public | Login as `STUDENT`, `FACULTY`, or `ACCOUNTANT` |
| GET | `/auth/me` | Any authenticated user | Current user |
| POST | `/auth/register` | ACCOUNTANT | Create a system user |

Login body:

```json
{
  "email": "accountant@example.com",
  "password": "Accountant@123",
  "role": "ACCOUNTANT"
}
```

## Students

| Method | Path | Roles |
| --- | --- | --- |
| GET | `/students?page=1&limit=20&search=&department=&semester=` | FACULTY, ACCOUNTANT |
| POST | `/students` | FACULTY, ACCOUNTANT |
| GET | `/students/:id` | STUDENT, FACULTY, ACCOUNTANT |
| PUT | `/students/:id` | FACULTY, ACCOUNTANT |
| DELETE | `/students/:id` | ACCOUNTANT |

Create body:

```json
{
  "rollNumber": "CS-001",
  "name": "Aisha Khan",
  "department": "Computer Science",
  "semester": 3,
  "email": "aisha@example.com",
  "phone": "9876543210",
  "password": "Student@123"
}
```

## Faculty

| Method | Path | Roles |
| --- | --- | --- |
| GET | `/faculty` | ACCOUNTANT |
| POST | `/faculty` | ACCOUNTANT |
| GET | `/faculty/:id` | ACCOUNTANT |
| PUT | `/faculty/:id` | ACCOUNTANT |
| DELETE | `/faculty/:id` | ACCOUNTANT |

## Fee Structures

| Method | Path | Roles |
| --- | --- | --- |
| GET | `/fee-structures` | STUDENT, FACULTY, ACCOUNTANT |
| POST | `/fee-structures` | ACCOUNTANT |
| GET | `/fee-structures/:id` | STUDENT, FACULTY, ACCOUNTANT |
| PUT | `/fee-structures/:id` | ACCOUNTANT |
| DELETE | `/fee-structures/:id` | ACCOUNTANT |

## Payments

| Method | Path | Roles |
| --- | --- | --- |
| GET | `/payments` | STUDENT, FACULTY, ACCOUNTANT |
| POST | `/payments` | ACCOUNTANT |
| GET | `/payments/:id` | STUDENT, FACULTY, ACCOUNTANT |
| PUT | `/payments/:id` | ACCOUNTANT |
| DELETE | `/payments/:id` | ACCOUNTANT |

Create body:

```json
{
  "studentId": "uuid",
  "amount": 15000,
  "paymentMode": "UPI",
  "status": "PAID",
  "feeCategory": "Tuition Fee"
}
```

## Receipts

| Method | Path | Roles |
| --- | --- | --- |
| GET | `/receipts` | STUDENT, FACULTY, ACCOUNTANT |
| GET | `/receipts/:id` | STUDENT, FACULTY, ACCOUNTANT |
| GET | `/receipts/payment/:id` | STUDENT, FACULTY, ACCOUNTANT |
| POST | `/receipts/payment/:id` | ACCOUNTANT |

Paid payments automatically receive a receipt.

## Analytics

| Method | Path | Roles | Description |
| --- | --- | --- | --- |
| GET | `/analytics/dashboard` | FACULTY, ACCOUNTANT | Dashboard totals |
| GET | `/analytics/collections?from=&to=` | ACCOUNTANT | Collection analytics |
| GET | `/analytics/pending-fees?semester=&department=` | FACULTY, ACCOUNTANT | Pending fee analytics |
| GET | `/analytics/students/:id/payments` | STUDENT, FACULTY, ACCOUNTANT | Student payment analytics |

## Notes For Next.js

Set `NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1` in the frontend and attach the returned `accessToken` to protected requests.
