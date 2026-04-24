<div align="center">

# 🪙 CryptoBanking

### A modern, secure, full-stack banking application

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express.js-4-green?style=for-the-badge&logo=express)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

*Bank Smarter. Grow Faster. Live Better.*

</div>

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT stored in `httpOnly` cookies, never exposed to JavaScript
- 🏧 **Multiple Account Types** — Checking, Savings, and Investment accounts
- 💸 **Full Transaction Support** — Deposit, withdraw, and transfer funds atomically
- 📊 **Dashboard Overview** — Real-time balance summary and recent transaction history
- 🌐 **Marketing Landing Page** — Full public-facing site with hero, features, testimonials & more
- 🌙 **Dark / Light Mode** — Persistent theme toggle across the entire app
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🎬 **Rich Animations** — Framer Motion powered transitions, parallax, and micro-interactions
- 👤 **User Profile Management** — Update personal information
- 🛡️ **Enterprise-grade Security** — Helmet, strict CORS, bcrypt password hashing, Zod validation

---

## 🗂️ Project Structure

```
BANKING APP/
  ├── frontend/                          Next.js 16 + TypeScript + Tailwind CSS + Zustand + Framer Motion
  │   ├── app/
  │   │   ├── page.tsx                   Public marketing landing page
  │   │   ├── (auth)/login/              Login page
  │   │   ├── (auth)/register/           Register page
  │   │   ├── (dashboard)/dashboard/     Overview & balances
  │   │   ├── (dashboard)/accounts/      Manage accounts
  │   │   ├── (dashboard)/transactions/  Deposit, withdraw, transfer
  │   │   └── (dashboard)/profile/       User profile
  │   ├── components/
  │   │   ├── marketing/                 Navbar, Hero, Features, HowItWorks, Testimonials, Security, CTA, Footer
  │   │   ├── ui/                        Button, Input, Card
  │   │   ├── Sidebar.tsx                Responsive sidebar with mobile drawer
  │   │   ├── ThemeToggle.tsx            Dark/light mode toggle
  │   │   └── ThemeProvider.tsx          Theme context provider
  │   ├── store/                         Zustand auth + theme stores
  │   └── lib/                           Axios client, utilities
  │
  └── backend/                           Express + TypeScript + Prisma 7 + PostgreSQL
      ├── prisma/schema.prisma           Database schema
      ├── prisma.config.ts               Prisma 7 datasource config
      └── src/
          ├── controllers/               auth, accounts, transactions, users
          ├── middleware/                JWT authentication
          └── routes/                    API route definitions
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), TypeScript, Tailwind CSS v4 |
| **Animations** | Framer Motion — parallax, stagger, spring physics |
| **State Management** | Zustand (persisted) |
| **Forms & Validation** | React Hook Form + Zod |
| **Backend** | Express.js, TypeScript |
| **Database** | PostgreSQL 18 via Prisma 7 ORM |
| **Authentication** | JWT in `httpOnly` + `SameSite=Strict` cookies |
| **Security** | Helmet, strict CORS, bcrypt (12 rounds) |
| **HTTP Client** | Axios with request/response interceptors |

---

## ⚙️ Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) **v18 or higher**
- [PostgreSQL](https://www.postgresql.org/) **running locally**
- [Git](https://git-scm.com/) installed

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cryptobanking.git
cd cryptobanking
```

### 2. Configure the backend environment

Create a `.env` file inside the `backend/` folder:

```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/bankingapp"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

> ⚠️ If your password contains special characters (e.g. `#`), URL-encode them (e.g. `#` → `%23`)

### 3. Run the backend

```bash
cd backend
npm install
npm run db:migrate     # Creates all database tables
npm run dev            # Starts API server on http://localhost:5000
```

### 4. Run the frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev            # Starts app on http://localhost:3000
```

### 5. Open the app

Visit **http://localhost:3000** in your browser.

---

## 📱 Pages & Functionality

| Page | Route | Description |
|---|---|---|
| Landing | `/` | Public marketing page — hero, features, testimonials, security |
| Login | `/login` | Sign in to your account |
| Register | `/register` | Create a new account (auto-creates a Checking account) |
| Dashboard | `/dashboard` | Balance overview + recent transactions |
| Accounts | `/accounts` | View all accounts, open new ones |
| Transactions | `/transactions` | Deposit, withdraw, transfer + full history |
| Profile | `/profile` | View and update personal information |

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login and receive session cookie |
| `POST` | `/api/auth/logout` | ❌ | Logout and clear session cookie |
| `GET` | `/api/auth/me` | ✅ | Get current authenticated user |
| `GET` | `/api/accounts` | ✅ | List all user accounts |
| `POST` | `/api/accounts` | ✅ | Open a new account |
| `GET` | `/api/transactions` | ✅ | List all transactions |
| `POST` | `/api/transactions/deposit` | ✅ | Deposit funds |
| `POST` | `/api/transactions/withdraw` | ✅ | Withdraw funds |
| `POST` | `/api/transactions/transfer` | ✅ | Transfer between accounts |
| `GET` | `/api/users/profile` | ✅ | Get user profile |
| `PATCH` | `/api/users/profile` | ✅ | Update user profile |

> ✅ Requires authentication via `httpOnly` session cookie

---

## 🔒 Security

| Feature | Implementation |
|---|---|
| Authentication | JWT in `httpOnly`, `SameSite=Strict` cookie |
| Password Hashing | bcrypt with 12 salt rounds |
| HTTP Headers | Helmet middleware on all responses |
| CORS | Locked to `FRONTEND_URL` — no wildcard origins |
| Input Validation | Zod schemas on both frontend and backend |
| Payload Protection | Request body capped at 10kb |
| XSS Protection | Token never stored in `localStorage` or JS-accessible storage |

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  Built with ❤️ using Next.js, Express, and PostgreSQL
</div>
