# NeoBank — Banking App

```
BANKING APP/
  ├── frontend/   (Next.js 14 + TypeScript + Tailwind CSS + Zustand)
  └── backend/    (Express + TypeScript + Prisma 7 + PostgreSQL)
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) running locally

---

## HOW TO RUN

### 1. Set up the database

Create a PostgreSQL database named `bankingapp`, then update `backend/.env`:

```
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/bankingapp"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

---

### 2. Run the backend

```bash
cd backend
npm install
npm run db:migrate   # creates all database tables
npm run dev          # starts API server on http://localhost:5000
```

---

### 3. Run the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev          # starts app on http://localhost:3000
```

---

## Visit the app

Open your browser and go to: **http://localhost:3000**

- Register a new account — a checking account is created automatically
- Deposit, withdraw, and transfer funds
- Open additional savings or investment accounts
- View full transaction history
- Update your profile

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/accounts` | List all accounts |
| POST | `/api/accounts` | Create new account |
| GET | `/api/transactions` | List all transactions |
| POST | `/api/transactions/deposit` | Deposit funds |
| POST | `/api/transactions/withdraw` | Withdraw funds |
| POST | `/api/transactions/transfer` | Transfer between accounts |
| GET | `/api/users/profile` | Get profile |
| PATCH | `/api/users/profile` | Update profile |
