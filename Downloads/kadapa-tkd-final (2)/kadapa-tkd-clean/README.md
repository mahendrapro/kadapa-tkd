# Kadapa Tae Kwon Do Club Website

A modern, fully static Next.js website for **Kadapa Tae Kwon Do Club**, affiliated to the District Taekwondo Association, YSR Kadapa District.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, Static Export) |
| Styling | Tailwind CSS |
| Slider | Swiper.js |
| Lightbox | yet-another-react-lightbox |
| CMS | Decap CMS (formerly Netlify CMS) |
| Deployment | Vercel / Netlify / GitHub Pages |

---

## 📁 Project Structure

```
kadapa-tkd/
├── content/
│   ├── hero/          ← Hero slide markdown files (CMS managed)
│   ├── events/        ← Event markdown files (CMS managed)
│   └── gallery/       ← Gallery image markdown files (CMS managed)
├── public/
│   ├── admin/
│   │   ├── index.html ← Decap CMS entry point
│   │   └── config.yml ← CMS collections config
│   └── images/        ← Uploaded media (CMS managed)
├── src/
│   ├── app/           ← Next.js App Router pages
│   ├── components/    ← Reusable React components
│   └── lib/
│       └── content.ts ← File-based content reader
└── ...
```

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

### Local CMS Development

To use Decap CMS locally:

```bash
# Terminal 1 — Run Next.js
npm run dev

# Terminal 2 — Run Decap local backend
npx decap-server
```

Then set `local_backend: true` in `public/admin/config.yml`.

Open [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🌐 Deploying to Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/kadapa-tkd.git
git push -u origin main
```

### Step 2 — Import to Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy**

### Step 3 — Enable Decap CMS

Decap CMS requires a Git Gateway backend. For Vercel deployments, use **Netlify Identity + Git Gateway**:

#### Option A: Use Netlify for CMS Auth only
1. Also deploy to [Netlify](https://netlify.com) (free tier)
2. Enable **Netlify Identity** in Site Settings
3. Enable **Git Gateway** under Identity → Services
4. Your Vercel site can use the Netlify Identity widget

#### Option B: Use a third-party OAuth provider
Follow the [Decap CMS external OAuth docs](https://decapcms.org/docs/external-oauth-clients/)

---

## 📝 Content Management (CMS)

Once deployed and auth is set up, visit `/admin` to manage:

### Hero Slides
- Add/edit/remove hero slider slides
- Fields: Title, Subtitle, Image, Button Text, Button Link

### Events
- Manage upcoming championships, grading ceremonies, tournaments
- Fields: Title, Date, Image, Description

### Gallery
- Upload training and event photos
- Fields: Image, Caption

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Brand Red | `#C8102E` |
| Brand Gold | `#D4A017` |
| Dark BG | `#0A0A0A` |
| Card BG | `#1A1A1A` |
| Display Font | Playfair Display |
| Body Font | Barlow |
| Korean Font | Noto Sans KR |

---

## 📞 Contact Info (in code)

- Phone: +91 85228 33600
- WhatsApp: https://wa.me/918522833600
- Venue: DSA Municipal Stadium, Kadapa

---

## 📄 License

All rights reserved — Kadapa Tae Kwon Do Club © 2024
