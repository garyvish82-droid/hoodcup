# HoodCup ☕

A free, open digital loyalty card app for independent coffee shops.  
No subscription. No setup fee. No catch.

**Live → [hoodcup.com](https://www.hoodcup.com)**  
**Story → [hoodcup.com/mystory](https://www.hoodcup.com/mystory)**

---

## What is this?

Paper stamp cards get lost. Apps cost money. HoodCup is the middle ground — a lightweight digital loyalty card that any coffee shop can use today, for free, forever.

- Customers check their card by phone number — no app download needed
- Baristas manage stamps from any device via the admin dashboard
- 10 stamps = 1 free coffee

---

## Features

- 📱 **Mobile-first** — designed for one-handed use at the counter
- 🔍 **Phone lookup** — customers find their card by phone number, no login required
- ☕ **Stamp management** — admin adds points and redeems rewards in one tap
- 👤 **Client self-registration** — customers join via invite link `/join`
- 🎉 **Welcome screen** — first-time users get a personalised welcome moment
- ✏️ **Edit clients** — admin can update name and phone number
- 🔐 **Role-based access** — admin and client roles with separate views

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (PostgreSQL) |
| Auth | Supabase Auth (JWT, role-based) |
| Hosting | AWS Amplify (CDN) |
| CI/CD | GitHub → Amplify (auto-deploy on push to `main`) |

---

## Architecture

```
Browser (React SPA)
    │
    ├── AWS Amplify CDN  ← static build served globally
    │
    └── Supabase
            ├── Auth       ← JWT sessions, phone-based email generation
            ├── PostgreSQL ← clients, user_roles, profiles tables
            └── RLS        ← row-level security per role
```

**Database tables:**
- `clients` — loyalty card data (name, phone, points, free_coffees, total_purchases)
- `user_roles` — admin / client role assignment
- `profiles` — user metadata

**Security:**
- All tables have Row Level Security enabled
- Admins can read/write all clients
- Clients can only read their own data
- Phone lookup is read-only, open to anonymous users

---

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase URL and anon key

# Start dev server
npm run dev
```

**Required env vars:**
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Deployment

Connected to AWS Amplify. Every push to `main` triggers an automatic build and deploy.

```bash
git push origin main  # → triggers Amplify build → live in ~2 min
```

Amplify config is in `amplify.yml`. SPA rewrite rule ensures all routes serve `index.html`.

---

## Supabase Setup

Run migrations in order from `supabase/migrations/` in your Supabase SQL Editor, or use the CLI:

```bash
supabase db push
```

---

## Scale & Cost

| Users | AWS Cost | Supabase Cost |
|---|---|---|
| 0 – 5,000 | $0 (free tier) | $0 (free tier) |
| 5,000 – 50,000 | ~$1–5/month | $0 (free tier) |
| 50,000+ | ~$10–20/month | $25/month (Pro) |

---

## About

Built by [Garik Vishnevski](https://www.linkedin.com/in/garikvishnevski) — a product manager who vibe-codes on weekends and believes small businesses deserve great software.

- 🔗 [LinkedIn](https://www.linkedin.com/in/garikvishnevski)
- 📸 [Instagram](https://www.instagram.com/garikvishnevski)

---

*Free to use. Free to fork. Built with love and strong coffee.*
