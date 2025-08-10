# 2econd Chance Housing Services — Marketing Site

A fast, accessible, mobile-first website for a housing-support organization. Built as a lightweight, static site (HTML/CSS/vanilla JS) with strong attention to accessibility, performance, and content structure.

> Freelance engagement: designed, developed, and shipped by me.

---

## ✨ Highlights (what to look at)

- **Accessible mobile nav with proper focus & Escape handling** (toggles `aria-expanded`, moves focus into the menu, restores on close, closes on outside click / `Esc`).
- **Sticky header that “shrinks” on scroll** (CSS states + JS scroll listener), and **automatic body offset** so content never hides under the fixed header.
- **Progress bar on top** that shows **scroll position** (micro-UX, zero dependency).
- **Two-card per slide carousel** with dots, buttons, and touch swipe support—no libraries.
- **Performance & LCP work:** preconnect to Google Fonts, preload hero images, lazy-load noncritical media, and only use `background-attachment: fixed` on large screens to prevent mobile jank.
- **SEO basics correct:** per-page `<title>`, meta descriptions, canonical URLs, semantic headings, descriptive alt text.
- **Privacy policy included** with clear language and updated date.

---

## 🧭 Live Sections Overview

- **index.html** — Home (services overview, why us, how it works teaser, CTA)
- **services.html** — Deep dive into Transitioning & Sustaining services (cards, comparison grid)
- **how-it-works.html** — Timeline, step-by-step carousel, intake CTA
- **why-us.html** — Differentiators & benefits (trust cards, imagery)
- **privacy.html** — Policy page

---

## 🏗️ Tech Stack

- **Frontend:** HTML5 + CSS3 (no framework), vanilla JavaScript
- **Design system:** CSS variables for color/spacing; responsive breakpoints; reduced-motion fallbacks
- **No build step:** deploy as static assets anywhere (GitHub Pages, Netlify, Vercel)

---

## 📂 Folder Structure

/ (repo root)
├─ index.html
├─ services.html
├─ how-it-works.html
├─ why-us.html
├─ privacy.html
├─ css/
│  └─ styles.css
├─ js/
│  └─ main.js
└─ images/
   ├─ hero.webp / services-hero.webp / why-us-hero.webp …
   ├─ steps/ (intake.webp, transitioning.webp, sustaining.webp)
   └─ icons/ (svg icon set)

---

## 🧩 Architecture & Key Decisions

### Layout & Components
- **Fixed header + shrink state:** keeps brand present while maximizing content space.
- **Body offset sync:** recalculates `padding-top` from the actual header height for robust layout.
- **Service/Why/Steps cards:** consistent card API (icon/title/text/CTA) with shared hover and focus-within styles.
- **Carousel:** horizontal slider; stateful dots with `aria-selected`; touch drag for mobile. Markup is semantic (headings/paragraphs), images are `loading="lazy"`.

### Accessibility (a11y)
- Landmark roles & `aria-label` on nav; `aria-expanded` and focus management for the hamburger menu; Escape closes.
- **Prefers-reduced-motion** respected: disables heavy animations for users who opt out.
- Alt text throughout; large tap targets; keyboard-visible focus rings.

### Performance
- **Preconnect** to Google Fonts; **preload** hero imagery for LCP; **lazy-load** non-critical images; avoid fixed backgrounds on small screens.
- Lightweight, dependency-free JS; no CSS frameworks to minimize bytes.

### SEO/Content
- Unique `<title>` + meta description per page; **canonical** links to avoid dupes; headings structured logically.

---

## 🧪 How to Run Locally

1. Clone the repo:
   ```bash
   git clone git@github.com:Zak-Sheikh/2econd-chance-website.git
   cd 2econd-chance-website
   ```
2. Open the folder in VS Code.

3. Use the **Live Server** extension or any static server:
   ```bash
   # Python 3
   python -m http.server 5173

   # Node.js
   npx serve .
   ```
 4. Visit `http://localhost:5173`.

_No build step required._

---

## 🚀 Deploy

- **Netlify/Vercel/GitHub Pages:** drag-and-drop or point to the repo.
- Ensure the site root serves `index.html`. All assets are relative paths.

---

## ✅ Accessibility & QA Checklist

- [x] Keyboard can open/close nav; focus is trapped sensibly and restored.
- [x] Escape closes mobile menu; outside click closes panel.
- [x] Visible focus states on interactive elements.
- [x] Reduced motion honored (`prefers-reduced-motion`).
- [x] Images have meaningful `alt` attributes; longform sections use headings.

---

## 📈 Future Roadmap

- Add analytics (privacy-respecting) to measure conversion from hero → intake
- Generate a sitemap and `robots.txt`; add Open Graph/Twitter meta for richer link previews
- Extract a mini design token file for spacing/typography scales; consider CSS container queries
- Unit test critical JS (menu & carousel) with Playwright component tests
- Optional: replace Google Fonts with local font files to reduce third-party calls

---

## 🔒 Privacy

A clear policy is included (`privacy.html`). The copy is client-approved and dated.

---

## 🙌 Credits

- Icons/illustrations: client-provided (see `/images/icons`); stock imagery optimized to `.webp`
- Type: Google Fonts “Poppins” (preconnected)

---

## 📬 Contact

Questions or opportunities?  
**Zak Sheikh** — Software Engineer  
- LinkedIn: [linkedin.com/in/zak-sheikh](https://www.linkedin.com/in/zak-sheikh)  
- Email: zaksheikh45@gmail.com
  
