# ElectronixBay Corporate Website — Design Spec

## Overview

Corporate showcase website for **ElectronixBay**, a premium refurbished laptop company based in Gurugram, India. The site is a lead-generation tool targeting B2B/bulk buyers (IT managers, startups, growing businesses) with dual CTAs: WhatsApp for quick inquiry + detailed quote form for bulk/business orders. Not an e-commerce site — no individual product listings or carts.

## Tech Stack

- **Framework:** Next.js 16 (App Router, `src/` directory)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom `@theme` tokens
- **UI Library:** shadcn/ui
- **Animation:** motion (framer-motion), GSAP where needed
- **Icons:** lucide-react
- **Theme:** next-themes (dark/light mode support)
- **Fonts:** DM Sans (body, `--font-sans`) + Playfair Display (headings, `--font-display`)
- **Maps:** dotted-map (for world map component)
- **Deployment:** Vercel

## Color Palette

Derived from the EXB logo (dark charcoal + green lightning bolt):

| Token | Value | Usage |
|---|---|---|
| `--exb-dark` | `#1B2A3B` | Primary dark, text |
| `--exb-green` | `#2ECC71` | Primary accent |
| `--exb-green-dark` | `#27AE60` | Accent gradient end |
| `--exb-black` | `#0A0A0A` | Hero/dark sections bg |
| `--exb-white` | `#F8F9FA` | Light sections bg |
| `--exb-gray` | `#6B7280` | Muted text |

Dark mode: inverts light sections to dark, hero stays dark. Green accent persists in both modes.

## Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Hero + key selling sections + CTAs |
| `/about` | About | Company story, process, trust signals |
| `/products` | Products | 3 category showcases with brand logos |
| `/contact` | Contact | Quote request form + WhatsApp + map |

## Reused Components (from Due Dost)

### 1. Navbar
- Floating glassmorphism header with scroll-triggered backdrop blur
- Adapted: remove "Services" dropdown, replace with page links (Home, About, Products, Contact)
- CTA button: "Get a Quote" (green gradient) instead of WhatsApp
- Mobile hamburger menu preserved
- Logo: EXB dark logo on light bg, white logo on dark bg / scrolled state
- Source: `DUEDOST/website/src/components/ui/navbar.tsx`

### 2. World Map
- Dotted world map with animated connection lines showing global sourcing
- Dots: Gurugram (HQ) → USA, Europe, East Asia (sourcing origins for refurbished laptops)
- Communicates: "We source globally, deliver locally"
- Source: `DUEDOST/website/src/components/ui/world-map.tsx`

### 3. Testimonials Columns
- Vertical marquee scrolling testimonial cards (3 columns)
- Content: B2B customer testimonials (IT managers, startup founders, educational institutions)
- Source: `DUEDOST/website/src/components/ui/testimonials-columns.tsx` + `sections/testimonials.tsx`

### 4. Scroll-Driven Video (Hero)
- 192-frame canvas playback tied to scroll position
- Video: laptop closed → opening → revealing EXB logo on screen
- Two-phase loading: keyframes first, then fill frames
- Adapted from `DUEDOST/website/src/components/ui/scroll-video.tsx`
- Text sections adapted for ElectronixBay messaging (see Home Page Layout below)

## 21st.dev Components

| Component | Source | Usage |
|---|---|---|
| Spotlight Card | `easemize/spotlight-card` | Product category cards on `/products` |
| Shine Border | `aliimam/shine-border` | Stats/trust badges on home page |
| Bauhaus Card | `Northstrix/bauhaus-card` | "What You Get" feature cards |
| Pulse Beams | `aceternity/pulse-beams` | "How We Work" process visualization |
| Footer Section | `efferd/footer-section` | Global footer across all pages |
| Zoom Parallax | `efferd/zoom-parallax` | About page hero or product showcase |

## Content Strategy: Research → Fill → Normalize

All text content follows the 3-step process:

1. **Research** — Web-search the Indian refurbished laptop market for real stats (market size, growth rates, e-waste data, savings percentages, brand reliability data)
2. **Fill** — Write section copy using researched data points. No generic placeholder text. Testimonials should sound like real IT managers and procurement heads.
3. **Normalize** — Unify tone (professional, confident, B2B-oriented), formatting, and style across all pages. Ensure consistent voice.

---

## Home Page (`/`) — Section-by-Section Layout

### H1. Scroll-Driven Video Hero (Dark)
- **Height:** 400vh (sticky scroll section)
- **Background:** `#0A0A0A`
- **Left side:** Canvas playing the 192-frame laptop opening video
- **Right side (desktop):** Glass panel with rotating text sections:
  - Section 1: "Premium Refurbished Laptops for Growing Businesses" — problem statement about IT costs
  - Section 2: "Save Up to 70% on Enterprise-Grade Hardware" — value prop with stats
  - Section 3: "Dell. HP. Lenovo. Certified & Warranty-Backed." — brand trust
  - Section 4: "Smart Technology. Better Value." — tagline + dual CTA (Get Quote + WhatsApp)
- **Mobile:** Text overlays on bottom gradient over the video canvas

### H2. Trusted Brands Bar (Light transition)
- Horizontal logo strip: Dell, HP, Lenovo (+ any others)
- Subtle shine-border animation on the container
- "Trusted by 500+ businesses across India" tagline

### H3. Why Choose Refurbished (Light)
- 4 Bauhaus Cards in a grid:
  - Cost-Effective (up to 70% savings with real market stat)
  - Certified Quality (multi-point inspection process)
  - Eco-Friendly (e-waste reduction stat)
  - Reliable Performance (business-series durability)
- Each card: icon + heading + 2-line description

### H4. Our Process — How We Work (Light/subtle dark)
- Pulse Beams visualization connecting 4 steps:
  1. Source → 2. Inspect → 3. Refurbish → 4. Deliver
- Each node: icon + title + short description
- Animated beams flow left to right on scroll

### H5. Stats Section (Dark band)
- 4 key metrics in Shine Border containers:
  - "500+" Businesses Served
  - "10,000+" Laptops Delivered
  - "70%" Average Savings
  - "6 Month" Warranty Included
- Numbers animate up on scroll (counter animation)

### H6. Testimonials (Light)
- Reused testimonials columns component
- 9 testimonials from B2B buyers (IT managers, startup CTOs, school administrators)
- 3-column vertical marquee with gradient mask

### H7. Global Sourcing — World Map (Light)
- World map with animated arcs from sourcing regions to Gurugram
- Dots: US West Coast, UK, Singapore/East Asia, Germany → Gurugram
- Heading: "Sourced Globally, Delivered Locally"
- Subtext about sourcing from top-tier global refurbishment channels

### H8. CTA Section (Dark)
- Full-width dark section with green gradient accents
- Heading: "Ready to Upgrade Your Fleet?"
- Dual CTA buttons: "Request a Quote" (primary) + "WhatsApp Us" (secondary)
- Subtle pulse/glow animation on primary button

### H9. Footer
- Reused from 21st.dev `efferd/footer-section`
- Columns: Company (About, Products, Contact), Quick Links, Legal (Privacy, Terms)
- Contact info: email, phone, Gurugram address
- Social links (if available)
- Copyright

---

## About Page (`/about`)

### A1. Zoom Parallax Hero
- Use the zoom-parallax component with layered images:
  - Background: workspace/warehouse image
  - Midground: laptop lineup
  - Foreground: text "About ElectronixBay"
- Creates depth-of-field scroll effect

### A2. Company Story (Light)
- Who we are, what we do, why we exist
- Content from brochure's "About ElectronixBay" section, enriched with researched data
- Clean 2-column layout: text left, supporting image/graphic right

### A3. Our Refurbishment Process (Light)
- Detailed 6-step process (visual timeline or vertical stepper):
  1. Sourcing from trusted global channels
  2. Full hardware inspection
  3. Professional cleaning & restoration
  4. Fresh OS installation
  5. Performance testing & QA
  6. Packaging with warranty card
- Each step: icon + title + description

### A4. Why Customers Trust Us (Light)
- Trust signals grid:
  - Transparent refurbishment process
  - Dedicated customer support
  - Reliable warranty
  - Trusted global brands
- Could use spotlight cards or simple icon grid

### A5. CTA + Footer
- Same CTA section and footer as home page

---

## Products Page (`/products`)

### P1. Page Header
- Clean heading: "Our Refurbished Laptop Range"
- Subtext: "Professional-grade laptops for every business need"

### P2. Category Showcase
- 3 Spotlight Cards, one per category:

**Business Laptops**
- For: professionals, offices, enterprise
- Brands: Dell Latitude, HP EliteBook, Lenovo ThinkPad
- Key features: powerful performance, strong build, long-term reliability
- CTA: "Request Quote for Business Laptops"

**Student Laptops**
- For: educational institutions, students, bulk school orders
- Features: lightweight, strong battery, smooth daily performance
- CTA: "Request Quote for Student Laptops"

**High Performance Laptops**
- For: design teams, developers, power users
- Features: higher RAM/storage, strong processors, multitasking
- CTA: "Request Quote for High Performance"

- Each card uses spotlight hover effect
- Brand logos displayed within each card
- No individual product listings — just categories with inquiry CTAs

### P3. What You Get With Every Laptop
- Bauhaus card grid (or icon grid):
  - Full hardware inspection
  - Professional cleaning
  - Fresh OS installation
  - Performance testing
  - Secure data removal
  - Warranty & support

### P4. CTA + Footer

---

## Contact Page (`/contact`)

### C1. Page Header
- "Get in Touch" / "Request a Quote"
- Subtext: business-oriented messaging

### C2. Two-Column Layout
**Left: Quote Request Form**
- Fields:
  - Name (required)
  - Company Name
  - Email (required)
  - Phone (required)
  - Laptop Category (dropdown: Business / Student / High Performance / Not Sure)
  - Quantity Range (dropdown: 1-10 / 10-50 / 50-100 / 100+)
  - Budget Range (optional dropdown)
  - Message / Specific Requirements (textarea)
- Submit button: "Request Quote"
- Form submits to email or a simple backend endpoint (TBD)

**Right: Contact Info + Map**
- WhatsApp quick inquiry button (prominent)
- Phone number
- Email: support@electronixbay.com
- Address: Gurugram, India
- Embedded Google Maps or a static map image

### C3. Footer

---

## Shared Layout

### Global Layout (`layout.tsx`)
- ThemeProvider (next-themes)
- Navbar (fixed, all pages)
- Font loading (DM Sans + Playfair Display)
- JSON-LD structured data (LocalBusiness schema)
- Meta tags / SEO

### SEO
- Page-level meta titles and descriptions
- Open Graph + Twitter cards
- JSON-LD: LocalBusiness schema for ElectronixBay
- Sitemap generation via `next-sitemap` or Next.js built-in

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx                    # Home
│   ├── about/
│   │   └── page.tsx
│   ├── products/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── sitemap.ts
│   ├── icon.svg
│   └── apple-icon.png
├── components/
│   ├── ui/
│   │   ├── navbar.tsx              # Ported from Due Dost
│   │   ├── scroll-video.tsx        # Ported from Due Dost
│   │   ├── world-map.tsx           # Ported from Due Dost
│   │   ├── testimonials-columns.tsx # Ported from Due Dost
│   │   ├── spotlight-card.tsx      # 21st.dev
│   │   ├── shine-border.tsx        # 21st.dev
│   │   ├── bauhaus-card.tsx        # 21st.dev
│   │   ├── pulse-beams.tsx         # 21st.dev
│   │   ├── zoom-parallax.tsx       # 21st.dev
│   │   ├── button.tsx              # shadcn
│   │   ├── card.tsx                # shadcn
│   │   ├── theme-toggle.tsx        # Ported from Due Dost
│   │   └── ...
│   ├── sections/
│   │   ├── hero.tsx                # Scroll video hero
│   │   ├── trusted-brands.tsx
│   │   ├── why-choose.tsx          # Bauhaus cards
│   │   ├── how-we-work.tsx         # Pulse beams process
│   │   ├── stats.tsx               # Shine border stats
│   │   ├── testimonials.tsx
│   │   ├── global-sourcing.tsx     # World map
│   │   ├── cta.tsx
│   │   └── footer.tsx              # 21st.dev footer
│   └── theme-provider.tsx
├── lib/
│   └── utils.ts
public/
├── frames/                         # 192 extracted video frames
│   ├── frame_0001.jpg
│   ├── ...
│   └── frame_0192.jpg
├── logo.webp                       # EXB dark logo
├── logo-white.webp                 # EXB white logo
├── brands/                         # Dell, HP, Lenovo logos
│   ├── dell.svg
│   ├── hp.svg
│   └── lenovo.svg
└── og-image.webp
```

## Dependencies

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "dotted-map": "^3.1.0",
    "gsap": "^3.14.2",
    "lucide-react": "^0.577.0",
    "motion": "^12.38.0",
    "next": "16.1.7",
    "next-themes": "^0.4.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "shadcn": "^4.0.8",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

## Video Frame Extraction

Pre-build step: extract 192 frames from `video-frames.mp4`:
```bash
ffmpeg -i video-frames.mp4 -vf "fps=24" -q:v 2 public/frames/frame_%04d.jpg
```

## Form Handling

The quote request form on `/contact` needs a backend endpoint. Options:
- **Vercel Serverless Function** (`/api/quote`) that sends email via Resend/Nodemailer
- **Formspree / Web3Forms** — third-party form service (zero backend)
- Decision: use Web3Forms for simplicity (no backend code needed, free tier sufficient)

## Out of Scope

- E-commerce / shopping cart / payment
- Individual product listings with prices
- User accounts / authentication
- Blog / content management
- Admin dashboard
- Analytics dashboard (use Vercel Analytics)
