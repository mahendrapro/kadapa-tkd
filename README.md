# Kadapa Tae Kwon Do Club — Website

**Live URL:** https://kadapataekwondoclub.com  
**Vercel URL:** https://kadapa-tkd.vercel.app  
**GitHub Repo:** https://github.com/mahendrapro/kadapa-tkd  
**CMS Admin:** https://kadapa-tkd.vercel.app/admin/index.html  

---

## Overview

A fully static, CMS-driven website for **Kadapa Tae Kwon Do Club**, Andhra Pradesh. Built with Next.js 14 static export, content managed via Sveltia CMS backed by GitHub, hosted on Vercel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2.5 — App Router, `output: 'export'` (fully static) |
| Styling | Tailwind CSS with custom brand tokens |
| Fonts | Playfair Display (display), Inter (body) — Google Fonts |
| CMS | Sveltia CMS — Git-based, no backend needed |
| CMS Auth | GitHub OAuth via custom proxy (`kadapa-tkd-oauth.vercel.app`) |
| Hosting | Vercel (auto-deploys on every GitHub push to `main`) |
| Media | Images: `public/images/`, PDFs: `public/pdfs/` |
| Content | Markdown files with YAML frontmatter in `content/` |

---

## Repository Structure

```
kadapa-tkd/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — announcement bars, navbar, footer
│   │   ├── globals.css             # Global styles, Tailwind base, ticker animation
│   │   ├── page.tsx                # Home page
│   │   ├── about/page.tsx          # About & Master profile page
│   │   ├── events/page.tsx         # Events & Championships page
│   │   └── gallery/page.tsx        # Photo gallery page
│   ├── components/
│   │   ├── AnnouncementBar.tsx     # Fixed top bar — pinned items + news ticker
│   │   ├── Navbar.tsx              # Fixed navbar — positions below announcement bar
│   │   ├── PageTopSpacer.tsx       # Dynamic spacer — pushes pages below fixed bars
│   │   ├── HeroOffsetWrapper.tsx   # Home page hero offset — measures fixed bar height
│   │   ├── HeroSlider.tsx          # Auto-playing hero image slideshow
│   │   ├── BeltSection.tsx         # Belt grades visual — Junior/Intermediate/Advanced/Black
│   │   ├── TaekwondoMeaning.tsx    # 태권도 meaning section — TAE/KWON/DO breakdown
│   │   ├── YouTubeSection.tsx      # YouTube video embeds grid
│   │   ├── EventCard.tsx           # Event card with click-to-open modal + photo grid
│   │   ├── GalleryGrid.tsx         # Masonry/grid photo display with lightbox
│   │   ├── SectionHeading.tsx      # Reusable section heading component
│   │   ├── Footer.tsx              # Footer — brand, quick links, contact, YouTube
│   │   └── WhatsAppButton.tsx      # Floating WhatsApp button
│   └── lib/
│       └── content.ts              # All content readers — parses markdown frontmatter
├── content/
│   ├── announcements/              # Announcement markdown files
│   ├── events/                     # Event markdown files (with photo arrays)
│   ├── gallery/                    # Gallery item markdown files
│   ├── hero/                       # Hero slide markdown files
│   ├── videos/                     # YouTube video markdown files
│   └── settings/
│       └── site.md                 # Site settings (Google Maps embed URL)
├── public/
│   ├── images/                     # All uploaded images (photos, logo)
│   ├── pdfs/                       # Uploaded PDF files (application forms etc.)
│   └── admin/
│       ├── index.html              # Sveltia CMS entry point
│       └── config.yml              # CMS configuration — collections, fields, auth
├── next.config.js                  # Next.js config — static export, image domains
├── tailwind.config.ts              # Tailwind config — brand colors, fonts
└── package.json
```

---

## Content Collections (CMS)

All content is stored as Markdown files with YAML frontmatter. Managed via CMS or directly on GitHub.

### Announcements — `content/announcements/`
```yaml
---
title: "Learn Nunchaku Evening Batch"
date: 2026-05-01
badge: NEW                    # NEW | URGENT | UPDATE | INFO
pinned: true                  # Shows in pinned bars above ticker
active: true
link_type: none               # none | url | pdf
link: ""                      # URL if link_type is url
pdf: ""                       # File path if link_type is pdf
order: 1                      # Optional — controls display order
---
```
**Sorting:** Pinned first → by order number → by date descending.

### Events — `content/events/`
```yaml
---
title: "Tae Kwon Do Invitational Trophy"
date: 2026-05-03
description: "Full event description text here..."
image: /images/cover.jpg      # Cover photo
photos:                       # All event photos
  - /images/photo1.jpg
  - /images/photo2.jpg
---
```

### Gallery — `content/gallery/`
```yaml
---
image: /images/photo.jpg
caption: "Training session"   # Optional
show_in_hero: false           # Set true to include in hero slider
order: 1                      # Optional — controls display order
---
```

### Hero Slides — `content/hero/`
```yaml
---
title: "Forge Champions. Build Character."
subtitle: "30+ Years of Elite Taekwondo Training in Kadapa"
image: /images/slide.jpg
button_text: "Join Training"
button_link: "https://wa.me/918522833600"
order: 1                      # Optional
---
```
**Note:** Gallery items with `show_in_hero: true` are also included as slides.

### YouTube Videos — `content/videos/`
```yaml
---
title: "District Championship 2025"
url: "https://www.youtube.com/watch?v=VIDEO_ID"
active: true
order: 1                      # Optional
---
```
**Important:** Use full `watch?v=` URLs, not channel URLs. Channel URLs won't embed.

### Site Settings — `content/settings/site.md`
```yaml
---
map_embed_url: "https://www.google.com/maps/embed?..."
---
```

---

## CMS Access

**URL:** https://kadapa-tkd.vercel.app/admin/index.html

**Login:** Click "Login with GitHub" → authorizes via OAuth proxy.

**Auth setup:**
- OAuth proxy: `https://kadapa-tkd-oauth.vercel.app`
- Config: `backend.base_url` in `public/admin/config.yml`
- ⚠️ NEVER change to `auth_type: pkce` — GitHub PKCE is not supported yet

**Uploading files from mobile:**
- Gallery images → CMS → Gallery → New item → Image field → Upload
- Event photos → CMS → Events → open event → Event Photos → add item → Upload
- PDFs → CMS → Announcements → open item → PDF File → Upload
- All images go to `public/images/`, PDFs go to `public/pdfs/`

**Deleting files:**
- Content entries (announcements, gallery items etc.) → delete from CMS ✅
- Actual image/PDF files → must delete directly on GitHub (`public/images/` or `public/pdfs/`)

---

## Key Components Explained

### AnnouncementBar
- Renders **pinned announcement bars** stacked at top + **news ticker** below
- All items scroll in the ticker; pinned items also appear as individual bars
- Has `data-announcement-bar="true"` attribute — used by Navbar and other components to measure its height
- Has dismiss (✕) button — hides all bars for the session
- PDF links are URL-encoded automatically to handle spaces in filenames

### Navbar
- Fixed below the announcement bar
- Measures `[data-announcement-bar="true"]` height dynamically
- Sets own `top` position accordingly
- Has hamburger menu for mobile

### PageTopSpacer
- Client component — measures announcement bar + navbar height
- Creates a `div` of exactly that height
- Placed before `<main>` in `layout.tsx`
- Returns `null` on home page (`/`) — home page uses `HeroOffsetWrapper` instead
- Ensures About, Events, Gallery page headings are never hidden behind fixed bars

### HeroOffsetWrapper
- Used only on home page, wrapping `<HeroSlider />`
- Measures fixed bars height and adds `margin-top` to the hero
- This way the hero slideshow starts exactly below the fixed bars

### EventCard
- Shows a compact card with cover photo, date badge, status badge
- Click opens a **full modal** showing:
  - Complete description (no truncation)
  - All photos in a responsive grid (`auto-fill minmax(130px, 1fr)`)
  - Click any photo → lightbox fullscreen view
- Modal positions itself below announcement bars + navbar dynamically
- Uses `yet-another-react-lightbox` for fullscreen photo view

### content.ts
- All content reading happens server-side at build time
- `sortByOrderThenDate()` — items with explicit order number first, rest by date
- `getAnnouncements()` — pinned first, then by order, then by date
- Returns `any[]` to avoid TypeScript conflicts with `_filename` added by `parseFile()`

---

## Deployment Workflow

### Auto deployment
Every commit pushed to `main` branch on GitHub triggers a Vercel build automatically.

### Manual via CMS
When content is saved in CMS → CMS commits to GitHub → Vercel auto-deploys.

### Important: static export
The site uses `output: 'export'` in `next.config.js`. This means:
- No server-side rendering at request time
- All pages are pre-built as static HTML
- Files in `public/` are served directly (images, PDFs)
- API routes are NOT supported
- Changes to content require a new build/deploy

### Deployment checklist when uploading multiple files
Upload all files in a single GitHub commit to trigger only one deployment.

---

## Brand Colors (Tailwind)

| Token | Value | Usage |
|---|---|---|
| `brand-red` | `#dc2626` | Primary — CTAs, badges, accents |
| `brand-dark` | `#0f172a` | Dark sections, navbar bg |
| `brand-light` | `#f8f7f4` | Light sections background |
| `brand-gray` | `#f1f0ec` | Alternate sections |
| `brand-muted` | `#6b7280` | Body text, secondary info |
| `brand-gold` | `#f59e0b` | Gold accents, Dan belt stripes |
| `brand-blue` | `#1e40af` | News ticker background |

---

## Contact & Business Info

| Field | Value |
|---|---|
| Club | Kadapa Tae Kwon Do Club |
| Head Master | Master Vijay Bhaskar Reddy |
| Rank | Black Belt 4th Dan (WT) |
| Phone | +91 85228 33600 |
| WhatsApp | https://wa.me/918522833600 |
| YouTube | https://www.youtube.com/@mattluruvijayabhaskarreddy9539 |
| Venue | DSA Municipal Stadium, Kadapa, YSR Kadapa District, AP |
| Timings | 5:00 AM – 7:00 AM, Every Day |
| Affiliation | District Taekwondo Association, YSR Kadapa District |

---

## Known Gotchas

1. **Never use `auth_type: pkce` in config.yml** — GitHub PKCE is not supported. Always use `base_url: https://kadapa-tkd-oauth.vercel.app`.

2. **GitHub web editor corrupts quotes** — always upload files directly, never copy-paste code into GitHub's web editor for TSX/JS files.

3. **PDF filenames with spaces** — works fine, `AnnouncementBar.tsx` URL-encodes them automatically.

4. **`window` not available during SSR** — any browser API must be inside `useEffect`. The site is statically exported but components still go through SSR during build.

5. **Tailwind custom classes in new components** — if a new component uses custom brand colors (`bg-brand-dark` etc.) and they don't render, use inline styles with hex values instead.

6. **Deleting CMS media** — CMS cannot delete files from GitHub. Go directly to GitHub → `public/images/` or `public/pdfs/` → click file → trash icon.

7. **`yet-another-react-lightbox`** — must be listed in `package.json` dependencies for EventCard lightbox to work.

8. **Static export + PDFs** — PDFs must be in `public/pdfs/` folder on GitHub. Files uploaded via CMS go there automatically when `media_folder: public/pdfs` is set on the PDF field.

---

## Vercel Project Info

| Field | Value |
|---|---|
| Project ID | `prj_VKyE4JoEqGbucb7oaze6mjciSBx9` |
| Team | `mahendrapros-projects` |
| Team ID | `team_8eG5Qd8QBApYsfMfmCrf8xQK` |
| OAuth Proxy | `kadapa-tkd-oauth` (separate Vercel project) |
