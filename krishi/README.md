# 🌾 Kisan AI — React + Vite Frontend

> Complete React frontend with Home, About, Contact & AI Advisor pages.
> Built with Vite, React Router DOM, and no extra UI library dependency.

---

## 📁 Project Structure

```
kisan-ai-frontend/
├── index.html               ← Vite entry HTML
├── vite.config.js           ← Vite config (proxy to backend)
├── package.json
│
└── src/
    ├── main.jsx             ← ReactDOM.createRoot
    ├── App.jsx              ← Router + Navbar + Footer
    ├── index.css            ← Global styles & CSS variables
    │
    └── pages/
        ├── Home.jsx         ← Landing page (hero, features, stats, testimonials)
        ├── About.jsx        ← About page (mission, team, tech, timeline)
        ├── Contact.jsx      ← Contact page (form, FAQ, info cards)
        └── Advisor.jsx      ← AI Crop Advisor (form + full results)
```

---

## 🚀 Setup in VS Code

### Step 1 — Install Node.js
Download from https://nodejs.org (v18 or higher)

### Step 2 — Open this folder in VS Code
```bash
cd kisan-ai-frontend
code .
```

### Step 3 — Install dependencies
Open terminal in VS Code (`Ctrl+\`` / `Cmd+\``):
```bash
npm install
```

### Step 4 — Start Vite dev server
```bash
npm run dev
```

Open: **http://localhost:5173**

---

## 🔌 Connecting to the Backend

The `vite.config.js` already proxies `/api/*` calls to `http://localhost:3000`.

So to run the full project:

**Terminal 1 — Backend:**
```bash
cd kisan-ai          # your Express backend folder
npm run dev          # starts on http://localhost:3000
```

**Terminal 2 — Frontend:**
```bash
cd kisan-ai-frontend
npm run dev          # starts on http://localhost:5173
```

The React app will call `/api/recommend` → Vite proxies it → Express backend.

---

## 🏗️ Build for Production

```bash
npm run build        # output in ./dist/
npm run preview      # preview the build locally
```

---

## 📄 Pages Overview

| Route      | Page     | Description                                  |
|------------|----------|----------------------------------------------|
| `/`        | Home     | Hero, features, mandi ticker, testimonials   |
| `/about`   | About    | Mission, team, tech stack, timeline          |
| `/contact` | Contact  | Form with validation, FAQ accordion, links   |
| `/advisor` | Advisor  | Full AI crop recommendation form + results   |

---

## 🎨 Design System (CSS Variables in index.css)

| Variable          | Value     | Usage                     |
|-------------------|-----------|---------------------------|
| `--green-deep`    | `#0a3d1f` | Headers, navbar, deep bg  |
| `--green-mid`     | `#1a6b35` | Gradients                 |
| `--green-bright`  | `#2ea84f` | Buttons, accents          |
| `--gold`          | `#e8a615` | CTA buttons, highlights   |
| `--gold-light`    | `#f5c842` | Shimmer text, active nav  |
| `--cream`         | `#fdf8ee` | Page background           |

Fonts: **Syne** (headings) + **DM Sans** (body) + **Noto Sans Devanagari** (Hindi)

---

## 🛠️ VS Code Extensions Recommended

- **ES7+ React/Redux/React-Native snippets** — `dsznajder.es7-react-js-snippets`
- **Prettier** — `esbenp.prettier-vscode`
- **ESLint** — `dbaeumer.vscode-eslint`
- **Auto Rename Tag** — `formulahendry.auto-rename-tag`
