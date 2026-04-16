# 🔮 AstroMatch AI — Vedic Kundali Compatibility Engine

> AI-powered Kundali matching using ancient Vedic wisdom and the Gemini API.
> Built with Next.js 14, Tailwind CSS, and Google Generative AI.

---

## 🗂 Project Structure

```
astromatch-ai/
├── src/
│   └── app/
│       ├── globals.css          # Global styles, fonts, custom classes
│       ├── layout.tsx           # Root layout + metadata
│       ├── page.tsx             # All 3 screens: Input, Loading, Results
│       └── api/
│           └── match/
│               └── route.ts    # Ashtakoot engine + Gemini integration
├── tailwind.config.ts           # Extended theme: colors, fonts, animations
├── next.config.mjs
├── tsconfig.json
├── package.json
├── .env.example                 # Environment variable template
└── .gitignore
```

---

## 🚀 Local Development (3 Commands)

### Step 1 — Install Dependencies
```bash
npm install
```

### Step 2 — Set up your Gemini API key
```bash
# Copy the example env file
cp .env.example .env.local

# Open .env.local and add your key:
# GEMINI_API_KEY=your_actual_key_here
```

Get your free Gemini API key at: https://aistudio.google.com/app/apikey

> ⚡ The app works WITHOUT a Gemini key — it falls back to intelligent pre-written reports automatically.

### Step 3 — Run the dev server
```bash
npm run dev
```

Open **http://localhost:3000** — you're live! 🎉

---

## 🌐 Deploy to Vercel (3 Steps — Under 5 Minutes)

### Step 1 — Push to GitHub
```bash
# Initialize git repo (if not already)
git init
git add .
git commit -m "feat: initial AstroMatch AI build"

# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/astromatch-ai.git
git push -u origin main
```

### Step 2 — Import to Vercel
1. Go to **https://vercel.com** and sign in (free account is fine)
2. Click **"Add New Project"**
3. Select your `astromatch-ai` GitHub repository
4. Vercel auto-detects Next.js — click **"Deploy"**

### Step 3 — Add your Gemini API Key
1. In your Vercel project dashboard, go to **Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** your key from https://aistudio.google.com/app/apikey
3. Click **Save**, then go to **Deployments → Redeploy**

✅ Your app is now live at `https://astromatch-ai.vercel.app` (or similar)!

---

## 🧩 Architecture Overview

```
User Input (page.tsx)
     │
     ▼ POST /api/match
API Route (route.ts)
     │
     ├─► calculateAshtakoot()     ← Mock/Deterministic Vedic engine
     │       Returns 8 Koota scores
     │
     └─► generateAIReport()       ← Gemini API
             Uses system prompt with koota data
             Returns: verdict, deepDive, remedies
                 │
                 ▼
           JSON Response
                 │
                 ▼
        ResultsScreen (page.tsx)
        ├─ Score Ring (SVG animated)
        ├─ 8 Koota Cards (grid)
        ├─ AI Deep Dive
        └─ Remedies & Advice
```

---

## 🔧 Upgrading to a Real Astrology Engine

To replace the mock `calculateAshtakoot()` with real calculations:

**Option A — NPM Package:**
```bash
npm install astrology-js  # (example - verify on npm)
```

**Option B — AstroSage API:**
Sign up at https://api.astrosagevedicastrology.com/

**Option C — Python Backend (FastAPI):**
Use the `kerykeion` library:
```python
pip install kerykeion
from kerykeion import KrInstance
subject = KrInstance("Rahul", 1995, 1, 15, 10, 30, "Mumbai")
```
Then call your FastAPI endpoint from Next.js.

---

## 🎨 Customization

| File | What to change |
|------|---------------|
| `globals.css` | Colors, fonts, animations |
| `tailwind.config.ts` | Theme tokens |
| `page.tsx` | UI layout, screens |
| `route.ts` | Scoring logic, AI prompt |
| `.env.local` | API keys |

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Fonts | Cinzel (display) · Outfit (body) · JetBrains Mono |
| AI | Google Gemini Pro |
| Deployment | Vercel |
| Language | TypeScript |

---

## 📄 License

MIT — build freely, ship boldly. 🚀
