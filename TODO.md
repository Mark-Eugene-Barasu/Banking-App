# 🚀 Deployment TODO

## Backend — Railway (Express + PostgreSQL)

- [ ] Go to [railway.app](https://railway.app) and sign up with GitHub
- [ ] Click **New Project** → **Deploy from GitHub repo** → select your repo
- [ ] Click **Add Service** → **Database** → **PostgreSQL** — Railway auto-provisions it
- [ ] Go to your Express service → **Variables** tab → add these environment variables:
  ```
  DATABASE_URL        (copy from the PostgreSQL service's "Connect" tab)
  JWT_SECRET          your-super-secret-jwt-key
  JWT_EXPIRES_IN      7d
  NODE_ENV            production
  FRONTEND_URL        https://your-app.vercel.app   ← fill in after Vercel deploy
  PORT                5000
  ```
- [ ] Go to **Settings** → set **Root Directory** to `backend`
- [ ] Set **Start Command** to `npm run db:migrate && npm start`
- [ ] Deploy and copy your Railway public URL (e.g. `https://your-app.up.railway.app`)

---

## Frontend — Vercel (Next.js)

- [ ] Go to [vercel.com](https://vercel.com) and sign up with GitHub
- [ ] Click **Add New Project** → import your GitHub repo
- [ ] Set **Root Directory** to `frontend`
- [ ] Under **Environment Variables** add:
  ```
  NEXT_PUBLIC_API_URL     https://your-app.up.railway.app   ← your Railway URL
  ```
- [ ] Click **Deploy**
- [ ] Copy your Vercel URL (e.g. `https://your-app.vercel.app`)

---

## Final Step

- [ ] Go back to Railway → update `FRONTEND_URL` to your Vercel URL
- [ ] Redeploy the backend service so CORS picks up the new value
