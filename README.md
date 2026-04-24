# Banking App
BANKING APP/
  ├── frontend/   (Next.js 14)
  └── backend/    (Express + Prisma)


HOW TO RUN IT
1. set up PostgreSQL and update backend/.env:
DATABASE_URL="postgresql://user:password@localhost:5432/bankingapp"

2. Run backend (in bash):
cd backend
npm run db:migrate   # creates tables
npm run dev          # starts on :5000

3. Run frontend (in bash):
cd frontend
npm run dev          # starts on :3000
