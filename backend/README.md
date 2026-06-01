# Student Fee Management Backend

Production-oriented Express + PostgreSQL + Prisma backend for the Student Fee Management System.

## Stack

- Node.js and Express.js
- PostgreSQL
- Prisma ORM
- JWT authentication
- Role-based authorization
- Zod validation
- Helmet, CORS, rate limiting, centralized error handling

## Folder Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validations/
│   ├── app.js
│   └── server.js
├── prisma/
│   └── schema.prisma
├── API_DOCUMENTATION.md
├── prisma.config.ts
├── .env.example
└── package.json
```

## Run Locally

```bash
npm install
copy .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

API health check:

```http
GET http://localhost:5000/api/v1/health
```

Full endpoint documentation is in `API_DOCUMENTATION.md`.
