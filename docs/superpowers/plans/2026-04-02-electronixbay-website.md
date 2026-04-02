# ElectronixBay Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page corporate showcase website for ElectronixBay (refurbished laptops) targeting B2B/bulk buyers, with scroll-driven video hero, 21st.dev components, and dual CTAs (WhatsApp + quote form).

**Architecture:** Next.js 16 App Router with `src/` directory. Port proven components from Due Dost (navbar, world map, testimonials, scroll-video). Pull 21st.dev components via MCP. Content follows Research → Fill → Normalize workflow. Dark cinematic hero transitions into light professional content sections.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, motion (framer-motion), GSAP, next-themes, shadcn/ui, lucide-react, dotted-map

**Spec:** `docs/superpowers/specs/2026-04-02-electronixbay-website-design.md`

**Due Dost source:** `/Users/anuj/Desktop/Projects/DUEDOST/website/src/`

---

## File Map

### New files to create

| File | Responsibility |
|---|---|
| `package.json` | Dependencies |
| `next.config.ts` | Next.js config with optimizePackageImports |
| `tsconfig.json` | TypeScript config with `@/*` path alias |
| `postcss.config.mjs` | Tailwind PostCSS plugin |
| `components.json` | shadcn/ui config |
| `.gitignore` | Standard Next.js gitignore |
| `eslint.config.mjs` | ESLint config |
| `src/app/layout.tsx` | Root layout: fonts, ThemeProvider, Navbar, JSON-LD, meta |
| `src/app/globals.css` | Tailwind imports, EXB theme tokens, animations |
| `src/app/page.tsx` | Home page: assembles all home sections |
| `src/app/about/page.tsx` | About page |
| `src/app/products/page.tsx` | Products page |
| `src/app/contact/page.tsx` | Contact page with quote form |
| `src/app/sitemap.ts` | Auto-generated sitemap |
| `src/lib/utils.ts` | `cn()` utility |
| `src/components/theme-provider.tsx` | next-themes wrapper |
| `src/components/ui/navbar.tsx` | Floating glassmorphism navbar (ported from Due Dost) |
| `src/components/ui/theme-toggle.tsx` | Dark/light mode toggle (ported from Due Dost) |
| `src/components/ui/scroll-video.tsx` | Scroll-driven 192-frame canvas player (ported from Due Dost) |
| `src/components/ui/world-map.tsx` | Dotted world map with animated arcs (ported from Due Dost) |
| `src/components/ui/testimonials-columns.tsx` | Vertical marquee testimonial cards (ported from Due Dost) |
| `src/components/ui/spotlight-card.tsx` | 21st.dev spotlight hover card |
| `src/components/ui/shine-border.tsx` | 21st.dev animated shine border |
| `src/components/ui/bauhaus-card.tsx` | 21st.dev bauhaus-style card |
| `src/components/ui/pulse-beams.tsx` | 21st.dev animated beam connections |
| `src/components/ui/zoom-parallax.tsx` | 21st.dev zoom parallax scroll effect |
| `src/components/sections/hero.tsx` | Scroll video hero wrapper with EXB text sections |
| `src/components/sections/trusted-brands.tsx` | Brand logo strip |
| `src/components/sections/why-choose.tsx` | 4 Bauhaus cards for value props |
| `src/components/sections/how-we-work.tsx` | Pulse beams 4-step process |
| `src/components/sections/stats.tsx` | 4 metrics with shine border + counter animation |
| `src/components/sections/testimonials.tsx` | 9 B2B testimonials in 3 columns |
| `src/components/sections/global-sourcing.tsx` | World map section |
| `src/components/sections/cta.tsx` | Dual CTA section (dark) |
| `src/components/sections/footer.tsx` | 21st.dev footer |
| `public/frames/frame_0001.jpg` ... `frame_0192.jpg` | Extracted video frames |
| `public/logo.webp` | EXB dark logo |
| `public/logo-white.webp` | EXB white logo |

---

## Task 1: Project Scaffolding & Config

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `components.json`, `.gitignore`, `eslint.config.mjs`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/anuj/Desktop/Projects/Electronixbay
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --yes
```

This scaffolds the project. We'll override configs in the next steps.

- [ ] **Step 2: Install dependencies**

```bash
npm install motion gsap next-themes lucide-react dotted-map class-variance-authority clsx tailwind-merge tw-animate-css shadcn
```

- [ ] **Step 3: Configure shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted: style = "base-nova", base color = "neutral", CSS variables = yes. This creates `components.json`. Then update it to match:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- [ ] **Step 4: Update `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Update `tsconfig.json`**

Ensure the `@/*` path alias points to `./src/*`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".next/dev/types/**/*.ts", "**/*.mts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Extract video frames**

```bash
mkdir -p public/frames
ffmpeg -i video-frames.mp4 -vf "fps=24" -q:v 2 public/frames/frame_%04d.jpg
```

Expected: 192 JPEG files in `public/frames/`.

- [ ] **Step 7: Prepare logo assets**

Convert the existing PNG logos to optimized webp and copy to public:

```bash
# Convert dark logo (has white background — needs to be cropped/used as-is)
cp "EXB-01.png" public/logo.png
cp "EXB white-01.png" public/logo-white.png
```

Note: These will be referenced as `/logo.png` and `/logo-white.png` in the navbar. Convert to webp if `cwebp` is available, otherwise PNG is fine.

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000` with default Next.js page.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 16 project with dependencies and config"
```

---

## Task 2: Global Styles, Theme, Layout & Utilities

**Files:**
- Create: `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/utils.ts`, `src/components/theme-provider.tsx`

- [ ] **Step 1: Write `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Write `src/components/theme-provider.tsx`**

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- [ ] **Step 3: Write `src/app/globals.css`**

This is the full Tailwind v4 setup with EXB color tokens. Adapted from Due Dost's globals.css, replacing `duedost-blue`/`duedost-green` with `exb-green`/`exb-dark`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-display: var(--font-display);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --color-exb-green: #2ECC71;
  --color-exb-green-dark: #27AE60;
  --color-exb-dark: #1B2A3B;
}

:root {
  --background: oklch(0.985 0.002 247);
  --foreground: oklch(0.145 0.015 255);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0.015 255);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0.015 255);
  --primary: oklch(0.52 0.17 155);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.965 0.005 247);
  --secondary-foreground: oklch(0.205 0.015 255);
  --muted: oklch(0.955 0.005 247);
  --muted-foreground: oklch(0.5 0.02 255);
  --accent: oklch(0.52 0.17 155);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.91 0.01 247);
  --input: oklch(0.91 0.01 247);
  --ring: oklch(0.52 0.17 155);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.13 0.015 255);
  --foreground: oklch(0.94 0.005 247);
  --card: oklch(0.17 0.015 255);
  --card-foreground: oklch(0.94 0.005 247);
  --popover: oklch(0.17 0.015 255);
  --popover-foreground: oklch(0.94 0.005 247);
  --primary: oklch(0.62 0.19 155);
  --primary-foreground: oklch(0.13 0.015 255);
  --secondary: oklch(0.22 0.015 255);
  --secondary-foreground: oklch(0.94 0.005 247);
  --muted: oklch(0.22 0.015 255);
  --muted-foreground: oklch(0.65 0.015 255);
  --accent: oklch(0.52 0.17 155);
  --accent-foreground: oklch(0.94 0.005 247);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.62 0.19 155);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans scroll-smooth;
    font-size: 112.5%;
  }
}

/* Animations */
@keyframes marquee-vertical {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

.animate-marquee-vertical {
  animation: marquee-vertical 10s linear infinite;
  will-change: transform;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(46, 204, 113, 0.3); }
  50% { box-shadow: 0 0 40px rgba(46, 204, 113, 0.5); }
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-shimmer {
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

/* Smooth scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: oklch(0.7 0.02 255); border-radius: 4px; }
.dark ::-webkit-scrollbar-thumb { background: oklch(0.35 0.02 255); }

/* Grain overlay */
.grain-overlay::after {
  content: '';
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  opacity: 0.03;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

- [ ] **Step 4: Write `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const SITE_URL = "https://electronixbay.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ElectronixBay | Premium Refurbished Laptops for Business",
    template: "%s | ElectronixBay",
  },
  description:
    "Premium refurbished laptops for businesses, startups, and institutions. Save up to 70% on Dell, HP, Lenovo enterprise-grade hardware. Certified quality. Warranty included.",
  keywords: [
    "refurbished laptops India",
    "bulk refurbished laptops",
    "refurbished business laptops",
    "Dell Latitude refurbished",
    "HP EliteBook refurbished",
    "Lenovo ThinkPad refurbished",
    "corporate laptop supplier India",
    "refurbished laptops Gurugram",
    "bulk laptop order India",
    "ElectronixBay",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "ElectronixBay",
    title: "ElectronixBay | Premium Refurbished Laptops for Business",
    description:
      "Save up to 70% on enterprise-grade refurbished laptops. Dell, HP, Lenovo. Certified quality with warranty.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ElectronixBay | Premium Refurbished Laptops",
    description:
      "Enterprise-grade refurbished laptops at up to 70% savings. Dell, HP, Lenovo.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ElectronixBay",
  description: "Premium refurbished laptops for businesses, startups, and institutions.",
  url: SITE_URL,
  email: "support@electronixbay.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} antialiased grain-overlay`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Create placeholder `src/app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main>
      <h1>ElectronixBay</h1>
    </main>
  );
}
```

- [ ] **Step 6: Verify dev server renders correctly**

```bash
npm run dev
```

Visit `http://localhost:3000`. Expected: "ElectronixBay" text with DM Sans font, correct background color, grain overlay visible.

- [ ] **Step 7: Commit**

```bash
git add src/lib/utils.ts src/components/theme-provider.tsx src/app/globals.css src/app/layout.tsx src/app/page.tsx
git commit -m "feat: add global styles, EXB theme tokens, layout with SEO meta"
```

---

## Task 3: Navbar & Theme Toggle

**Files:**
- Create: `src/components/ui/navbar.tsx`, `src/components/ui/theme-toggle.tsx`
- Modify: `src/app/layout.tsx` (add Navbar to layout)

Port the Due Dost navbar, replacing: services dropdown → simple page links, branding → EXB, CTA → "Get a Quote" linking to `/contact`.

- [ ] **Step 1: Write `src/components/ui/theme-toggle.tsx`**

Port directly from Due Dost — the component is generic. Copy the file at `/Users/anuj/Desktop/Projects/DUEDOST/website/src/components/ui/theme-toggle.tsx` exactly as-is.

- [ ] **Step 2: Write `src/components/ui/navbar.tsx`**

Port from Due Dost navbar. Key changes:
- Remove `ServicesDropdown` component and `servicesMenu` array entirely
- Replace `navItems` with: `Home /`, `About /about`, `Products /products`, `Contact /contact`
- Replace logo `src="/logo.webp"` with `/logo.png` and alt text "ElectronixBay"
- Replace the WhatsApp CTA button with a "Get a Quote" button linking to `/contact`
- Replace all `duedost-blue` references with `exb-green`
- Replace all `duedost-green` references with `exb-green-dark`
- Remove the `ThemeToggle` import since we'll keep it in the navbar — just update the import path
- In mobile menu: remove services expandable section, replace with simple links to all 4 pages
- Mobile CTA: "Get a Quote" linking to `/contact`

The navbar structure remains: floating glassmorphism bar, scroll-triggered backdrop blur, mobile hamburger with slide-in panel.

- [ ] **Step 3: Add Navbar to `src/app/layout.tsx`**

Add the Navbar import and render it above `{children}` inside the ThemeProvider:

```tsx
import { Navbar } from "@/components/ui/navbar";

// Inside the body, within ThemeProvider:
<Navbar />
{children}
```

- [ ] **Step 4: Verify navbar renders and scrolls**

```bash
npm run dev
```

Check: navbar visible at top, glassmorphism on scroll, theme toggle works, mobile menu opens, all links navigate.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/navbar.tsx src/components/ui/theme-toggle.tsx src/app/layout.tsx
git commit -m "feat: add floating glassmorphism navbar with theme toggle"
```

---

## Task 4: Scroll-Driven Video Hero

**Files:**
- Create: `src/components/ui/scroll-video.tsx`, `src/components/sections/hero.tsx`

Port the Due Dost scroll-video component and adapt text sections for ElectronixBay.

- [ ] **Step 1: Write `src/components/ui/scroll-video.tsx`**

Port from `/Users/anuj/Desktop/Projects/DUEDOST/website/src/components/ui/scroll-video.tsx`. Key changes:
- Replace the `sections` array text content with ElectronixBay messaging:
  - Section 1 (enter: 0.0, leave: 0.2): label "001 / The Challenge", heading "IT Hardware Costs Are Crushing Growing Businesses", body about high costs of new enterprise laptops
  - Section 2 (enter: 0.2, leave: 0.4): label "002 / The Solution", heading "Save Up to 70% on Enterprise-Grade Hardware", body about certified refurbished laptops
  - Section 3 (enter: 0.4, leave: 0.6): label "003 / Trusted Brands", heading "Dell. HP. Lenovo. Certified & Warranty-Backed.", body about trusted business-series models
  - Section 4 (enter: 0.6, leave: 0.8): label "004 / Your Fleet", heading "Upgrade Your Entire Team Without Breaking the Budget", body about bulk ordering
  - Section 5 (enter: 0.8, leave: 1.01): isCTA true, heading "Smart Technology. Better Value."
- Replace all `duedost-blue` with `exb-green` and `duedost-green` with `exb-green-dark`
- Replace CTA link from WhatsApp to `/contact` with text "Request a Quote"
- Add a secondary WhatsApp CTA button below the primary one
- Frame path stays `/frames/frame_XXXX.jpg`, TOTAL_FRAMES stays 192

- [ ] **Step 2: Write `src/components/sections/hero.tsx`**

```tsx
"use client";

import { ScrollVideo } from "@/components/ui/scroll-video";

export function HeroSection() {
  return (
    <section id="hero" className="relative bg-[#0a0a0a]">
      <ScrollVideo />
    </section>
  );
}
```

- [ ] **Step 3: Add hero to home page**

Update `src/app/page.tsx`:

```tsx
import { HeroSection } from "@/components/sections/hero";

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
```

- [ ] **Step 4: Verify scroll video plays**

```bash
npm run dev
```

Scroll down on the home page. Expected: laptop opens as you scroll, text sections rotate on the right panel (desktop) or overlay (mobile).

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/scroll-video.tsx src/components/sections/hero.tsx src/app/page.tsx
git commit -m "feat: add scroll-driven video hero with EXB messaging"
```

---

## Task 5: Content Research (Research → Fill → Normalize Step 1)

**Files:** None (research step — gather data for all content sections)

- [ ] **Step 1: Research refurbished laptop market**

Use web search to gather real stats for content. Key data points needed:
- India refurbished electronics market size & CAGR
- E-waste statistics (tons generated, % recycled)
- Average savings percentage for refurbished vs new
- Business laptop reliability stats (ThinkPad/EliteBook/Latitude failure rates)
- Number of businesses using refurbished IT hardware globally
- India's IT hardware spending growth

- [ ] **Step 2: Document researched stats**

Save research notes to a temporary file for content filling:

```bash
# Create a research notes file (not committed — working reference)
touch /tmp/exb-content-research.md
```

Write all gathered stats, sources, and data points into this file for reference during content filling in Tasks 6-10.

- [ ] **Step 3: Research complete — no commit needed**

This is a research-only step. Data will be consumed in subsequent tasks.

---

## Task 6: 21st.dev Components (Fetch via MCP)

**Files:**
- Create: `src/components/ui/spotlight-card.tsx`, `src/components/ui/shine-border.tsx`, `src/components/ui/bauhaus-card.tsx`, `src/components/ui/pulse-beams.tsx`, `src/components/ui/zoom-parallax.tsx`, `src/components/sections/footer.tsx`

- [ ] **Step 1: Fetch Spotlight Card**

Use the 21st.dev MCP tool `mcp__magic__21st_magic_component_builder` to fetch the spotlight card component from `easemize/spotlight-card`. Save the output to `src/components/ui/spotlight-card.tsx`. Adapt colors to use EXB green (`#2ECC71`).

- [ ] **Step 2: Fetch Shine Border**

Use MCP to fetch `aliimam/shine-border`. Save to `src/components/ui/shine-border.tsx`. Adapt border color to EXB green gradient.

- [ ] **Step 3: Fetch Bauhaus Card**

Use MCP to fetch `Northstrix/bauhaus-card`. Save to `src/components/ui/bauhaus-card.tsx`. Adapt accent colors.

- [ ] **Step 4: Fetch Pulse Beams**

Use MCP to fetch `aceternity/pulse-beams`. Save to `src/components/ui/pulse-beams.tsx`. Adapt beam colors to EXB green.

- [ ] **Step 5: Fetch Zoom Parallax**

Use MCP to fetch `efferd/zoom-parallax`. Save to `src/components/ui/zoom-parallax.tsx`.

- [ ] **Step 6: Fetch Footer Section**

Use MCP to fetch `efferd/footer-section`. Save to `src/components/sections/footer.tsx`. Adapt content:
- Brand: ElectronixBay with logo
- Columns: Company (About, Products, Contact), Legal (Privacy Policy, Terms)
- Contact: support@electronixbay.com, Gurugram, India
- Copyright: "2024-2026 ElectronixBay. All rights reserved."

- [ ] **Step 7: Verify each component renders in isolation**

Create a temporary test page or render each component individually to verify they work with the EXB theme.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/spotlight-card.tsx src/components/ui/shine-border.tsx src/components/ui/bauhaus-card.tsx src/components/ui/pulse-beams.tsx src/components/ui/zoom-parallax.tsx src/components/sections/footer.tsx
git commit -m "feat: add 21st.dev components — spotlight, shine, bauhaus, pulse, zoom, footer"
```

---

## Task 7: Home Page Sections (Part 1 — Brands, Why Choose, Process)

**Files:**
- Create: `src/components/sections/trusted-brands.tsx`, `src/components/sections/why-choose.tsx`, `src/components/sections/how-we-work.tsx`
- Modify: `src/app/page.tsx`

Content for these sections uses Research → Fill → Normalize data from Task 5.

- [ ] **Step 1: Write `src/components/sections/trusted-brands.tsx`**

Horizontal brand logo strip with Dell, HP, Lenovo SVG logos (use lucide-react placeholder icons or inline SVGs). Wrapped in a shine-border container. Includes tagline from researched data (e.g., "Trusted by 500+ businesses across India" — replace with real stat if found).

Use `motion` for fade-in-on-scroll animation via `whileInView`.

- [ ] **Step 2: Write `src/components/sections/why-choose.tsx`**

4 Bauhaus Cards in a responsive grid (2x2 on desktop, stacked on mobile):
1. **Cost-Effective** — icon: `IndianRupee`, heading, body with researched savings stat
2. **Certified Quality** — icon: `ShieldCheck`, heading, body about multi-point inspection
3. **Eco-Friendly** — icon: `Leaf`, heading, body with e-waste stat
4. **Reliable Performance** — icon: `Cpu`, heading, body about business-series durability

Section heading: "Why Choose Refurbished?" with green gradient accent on key words. Use `whileInView` staggered animations.

- [ ] **Step 3: Write `src/components/sections/how-we-work.tsx`**

Pulse Beams visualization with 4 connected nodes:
1. **Source** — icon: `Globe`, "Sourced from global enterprise channels"
2. **Inspect** — icon: `Search`, "Multi-point hardware & software inspection"
3. **Refurbish** — icon: `Wrench`, "Professional restoration & OS installation"
4. **Deliver** — icon: `Truck`, "Quality-verified, warranty-backed delivery"

Animated beams connect the nodes. Section heading: "How We Work" with subtext.

- [ ] **Step 4: Add sections to `src/app/page.tsx`**

```tsx
import { HeroSection } from "@/components/sections/hero";
import { TrustedBrandsSection } from "@/components/sections/trusted-brands";
import { WhyChooseSection } from "@/components/sections/why-choose";
import { HowWeWorkSection } from "@/components/sections/how-we-work";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedBrandsSection />
      <WhyChooseSection />
      <HowWeWorkSection />
    </main>
  );
}
```

- [ ] **Step 5: Verify all 3 sections render with correct layout**

```bash
npm run dev
```

Scroll past the hero. Expected: brand logos → why choose cards → process beams, with animations triggering on scroll.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/trusted-brands.tsx src/components/sections/why-choose.tsx src/components/sections/how-we-work.tsx src/app/page.tsx
git commit -m "feat: add trusted brands, why choose, and how we work sections"
```

---

## Task 8: Home Page Sections (Part 2 — Stats, Testimonials, World Map, CTA)

**Files:**
- Create: `src/components/sections/stats.tsx`, `src/components/ui/testimonials-columns.tsx`, `src/components/sections/testimonials.tsx`, `src/components/ui/world-map.tsx`, `src/components/sections/global-sourcing.tsx`, `src/components/sections/cta.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write `src/components/sections/stats.tsx`**

4 stats in Shine Border containers in a responsive grid. Each stat:
- Large animated number (counter animation using `useInView` from motion + `useState`)
- Label below
- Stats: "500+" Businesses Served, "10,000+" Laptops Delivered, "70%" Average Savings, "6 Month" Warranty

Dark background band (`bg-[#0a0a0a]`). Numbers count up from 0 when scrolled into view.

- [ ] **Step 2: Write `src/components/ui/testimonials-columns.tsx`**

Port directly from `/Users/anuj/Desktop/Projects/DUEDOST/website/src/components/ui/testimonials-columns.tsx`. This component is generic — no brand-specific changes needed.

- [ ] **Step 3: Write `src/components/sections/testimonials.tsx`**

Port structure from Due Dost's testimonials section. Replace content:
- 9 B2B testimonials from IT managers, startup CTOs, school administrators, procurement heads
- Use researched data to make testimonials realistic (mention specific savings, fleet sizes, brand preferences)
- Replace `duedost-blue`/`duedost-green` with `exb-green`/`exb-green-dark`
- Section heading: "What Our Clients Say" with green gradient accent
- Subtext: use researched stat (e.g., "Trusted by 500+ businesses across India")
- Use placeholder avatar images (initials or generic avatars)

- [ ] **Step 4: Write `src/components/ui/world-map.tsx`**

Port directly from `/Users/anuj/Desktop/Projects/DUEDOST/website/src/components/ui/world-map.tsx`. No changes needed — the component accepts `dots` and `lineColor` props.

- [ ] **Step 5: Write `src/components/sections/global-sourcing.tsx`**

World map section with animated arcs showing global laptop sourcing:

```tsx
"use client";

import { motion } from "motion/react";
import { WorldMap } from "@/components/ui/world-map";

const sourcingRoutes = [
  {
    start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    end: { lat: 28.4595, lng: 77.0266, label: "Gurugram" },
  },
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 28.4595, lng: 77.0266, label: "Gurugram" },
  },
  {
    start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    end: { lat: 28.4595, lng: 77.0266, label: "Gurugram" },
  },
  {
    start: { lat: 50.1109, lng: 8.6821, label: "Frankfurt" },
    end: { lat: 28.4595, lng: 77.0266, label: "Gurugram" },
  },
];

export function GlobalSourcingSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-exb-green">
            Global Network
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sourced Globally,{" "}
            <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
              Delivered Locally
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We source enterprise-grade laptops from certified refurbishment channels across
            North America, Europe, and Asia — delivering them to your doorstep in India.
          </p>
        </motion.div>
        <WorldMap dots={sourcingRoutes} lineColor="#2ECC71" />
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Write `src/components/sections/cta.tsx`**

Dark section with dual CTAs:

```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-exb-green/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-exb-green-dark/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to Upgrade{" "}
            <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
              Your Fleet?
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Get a custom quote for your business. Whether you need 10 laptops or 1,000,
            we have the inventory and expertise to deliver.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-2xl hover:shadow-2xl hover:shadow-exb-green/20 transition-all duration-300 animate-pulse-glow"
              >
                Request a Quote
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <a
                href="https://wa.me/919XXXXXXXXX?text=Hi%2C%20I%20need%20a%20quote%20for%20refurbished%20laptops."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-2xl hover:bg-white/5 transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

Note: Replace `919XXXXXXXXX` with the actual WhatsApp number when available.

- [ ] **Step 7: Wire all sections into `src/app/page.tsx`**

```tsx
import { HeroSection } from "@/components/sections/hero";
import { TrustedBrandsSection } from "@/components/sections/trusted-brands";
import { WhyChooseSection } from "@/components/sections/why-choose";
import { HowWeWorkSection } from "@/components/sections/how-we-work";
import { StatsSection } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { GlobalSourcingSection } from "@/components/sections/global-sourcing";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedBrandsSection />
      <WhyChooseSection />
      <HowWeWorkSection />
      <StatsSection />
      <TestimonialsSection />
      <GlobalSourcingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 8: Verify full home page scroll experience**

```bash
npm run dev
```

Scroll through entire home page: hero video → brands → why choose → process → stats → testimonials → world map → CTA → footer. All animations should fire on scroll.

- [ ] **Step 9: Commit**

```bash
git add src/components/sections/stats.tsx src/components/ui/testimonials-columns.tsx src/components/sections/testimonials.tsx src/components/ui/world-map.tsx src/components/sections/global-sourcing.tsx src/components/sections/cta.tsx src/app/page.tsx
git commit -m "feat: complete home page — stats, testimonials, world map, CTA, footer"
```

---

## Task 9: About Page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Write `src/app/about/page.tsx`**

Full about page with all sections. Uses zoom-parallax for hero, then light content sections.

Structure:
1. **Zoom Parallax Hero** — layered parallax effect with "About ElectronixBay" heading, using the `ZoomParallax` component with Unsplash stock images of refurbishment workspaces / laptop setups
2. **Company Story** — 2-column layout (text left, image right). Content from brochure "About ElectronixBay" section, enriched with researched market data. Use `motion` whileInView for fade-in.
3. **Our Refurbishment Process** — 6-step vertical timeline/stepper:
   - Step 1: Global Sourcing (icon: Globe)
   - Step 2: Hardware Inspection (icon: Search)
   - Step 3: Professional Cleaning (icon: Sparkles)
   - Step 4: OS Installation (icon: Monitor)
   - Step 5: Performance Testing (icon: Activity)
   - Step 6: Warranty & Delivery (icon: Package)
   Each step: icon in a green-accented circle, title, 1-2 line description. Animate each step in on scroll with stagger.
4. **Why Customers Trust Us** — 4 spotlight cards: Transparent Process, Dedicated Support, Reliable Warranty, Global Brands. Each with icon + title + short description.
5. **CTA Section** — reuse `<CTASection />`
6. **Footer** — reuse `<Footer />`

Export metadata for SEO:
```tsx
export const metadata = {
  title: "About",
  description: "Learn about ElectronixBay — India's trusted source for premium refurbished business laptops.",
};
```

- [ ] **Step 2: Verify about page renders**

```bash
npm run dev
```

Navigate to `/about`. Expected: zoom parallax hero, company story, 6-step process, trust cards, CTA, footer.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add about page with zoom parallax hero and refurbishment process"
```

---

## Task 10: Products Page

**Files:**
- Create: `src/app/products/page.tsx`

- [ ] **Step 1: Write `src/app/products/page.tsx`**

Structure:
1. **Page Header** — "Our Refurbished Laptop Range" heading with subtext "Professional-grade laptops for every business need". Simple centered heading with `whileInView` animation.

2. **Category Showcase** — 3 Spotlight Cards, each containing:

   **Business Laptops:**
   - Icon: Briefcase
   - Brands shown: Dell Latitude, HP EliteBook, Lenovo ThinkPad (inline brand logos or text)
   - Short description about professional/office use
   - CTA button: "Request Quote" linking to `/contact?category=business`

   **Student Laptops:**
   - Icon: GraduationCap
   - Features: lightweight, long battery, daily performance
   - CTA: "Request Quote" linking to `/contact?category=student`

   **High Performance Laptops:**
   - Icon: Zap
   - Features: higher RAM/storage, strong processors
   - CTA: "Request Quote" linking to `/contact?category=performance`

   Grid: 3 columns on desktop, stacked on mobile. Each card uses the spotlight hover effect.

3. **What You Get With Every Laptop** — 6 Bauhaus Cards (or styled icon cards) in a 3x2 grid:
   - Full Hardware Inspection (icon: Search)
   - Professional Cleaning (icon: Sparkles)
   - Fresh OS Installation (icon: Monitor)
   - Performance Testing (icon: Activity)
   - Secure Data Removal (icon: ShieldCheck)
   - Warranty & Support (icon: HeadphonesIcon)

4. **CTA Section** — reuse `<CTASection />`
5. **Footer** — reuse `<Footer />`

Export metadata:
```tsx
export const metadata = {
  title: "Products",
  description: "Explore our range of certified refurbished business, student, and high-performance laptops from Dell, HP, and Lenovo.",
};
```

- [ ] **Step 2: Verify products page renders**

```bash
npm run dev
```

Navigate to `/products`. Expected: header, 3 spotlight cards, 6 "what you get" cards, CTA, footer.

- [ ] **Step 3: Commit**

```bash
git add src/app/products/page.tsx
git commit -m "feat: add products page with spotlight category cards"
```

---

## Task 11: Contact Page with Quote Form

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Write `src/app/contact/page.tsx`**

Two-column layout:

**Left column: Quote Request Form**
- Client-side form with `useState` for each field
- Fields:
  - Name (text input, required)
  - Company Name (text input, optional)
  - Email (email input, required)
  - Phone (tel input, required)
  - Laptop Category (select: "Business Laptops", "Student Laptops", "High Performance", "Not Sure")
  - Quantity Range (select: "1-10", "10-50", "50-100", "100+")
  - Budget Range (select: optional — "Under 15K/unit", "15-25K/unit", "25-40K/unit", "40K+/unit")
  - Message (textarea)
- Pre-populate category from URL query param `?category=business` (using `useSearchParams`)
- Submit handler: POST to Web3Forms API (`https://api.web3forms.com/submit`)
- Success/error state with feedback message
- Submit button: "Request Quote" with green gradient, loading spinner during submission

**Right column: Contact Info**
- WhatsApp button (prominent, green, links to `wa.me/...`)
- Phone number
- Email: support@electronixbay.com
- Address: Gurugram, India
- Optional: embedded Google Maps iframe or static image

**Page wrapper:**
- Header: "Get in Touch" heading with subtext
- `motion` animations for form and info columns
- CTA section not needed (this IS the contact page)
- Footer at bottom

Export metadata:
```tsx
export const metadata = {
  title: "Contact",
  description: "Request a quote for bulk refurbished laptops. Contact ElectronixBay for business inquiries.",
};
```

Note: The form uses Web3Forms. The access key needs to be set as an environment variable `NEXT_PUBLIC_WEB3FORMS_KEY`. For now, use a placeholder and document it.

- [ ] **Step 2: Verify contact form renders and validation works**

```bash
npm run dev
```

Navigate to `/contact`. Check: all fields render, required validation works, select dropdowns work, form submits (will fail without API key — that's expected). Check `/contact?category=business` pre-populates the dropdown.

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add contact page with quote request form and Web3Forms integration"
```

---

## Task 12: Sitemap & Final Wiring

**Files:**
- Create: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx` (ensure Navbar + Footer are globally available)

- [ ] **Step 1: Write `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://electronixbay.com";

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
```

- [ ] **Step 2: Ensure Footer is on all pages**

Verify that the About, Products, and Contact pages all include `<Footer />` at the bottom. The Home page already has it from Task 8.

- [ ] **Step 3: Verify full navigation flow**

```bash
npm run dev
```

Click through: Home → About → Products → Contact. All navbar links work. Footer renders on every page. Theme toggle works globally. Sitemap at `/sitemap.xml` renders correctly.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add sitemap and verify full navigation"
```

---

## Task 13: Content Normalization (Research → Fill → Normalize Step 3)

**Files:**
- Modify: all section files and page files

- [ ] **Step 1: Audit all text content across pages**

Read through every section on every page. Check:
- Consistent tone (professional, confident, B2B-oriented)
- No placeholder text remaining
- Stats/numbers are consistent across sections (if "500+ businesses" appears in hero AND testimonials, make sure it matches)
- CTAs are consistent ("Request a Quote" everywhere, not "Get Quote" in some places and "Request Quote" in others)
- Heading hierarchy is correct (one H1 per page, H2 for sections, H3 for sub-sections)

- [ ] **Step 2: Fix any inconsistencies found**

Update section files with normalized content. Ensure:
- All headings use `font-display` (Playfair Display)
- All body text uses the default sans (DM Sans)
- Green gradient accents are consistent: `from-exb-green to-exb-green-dark`
- Section spacing is uniform: `py-16 md:py-24` for standard sections, `py-20 md:py-28` for CTA
- Animation patterns are consistent: `whileInView` with `once: true`, same easing `[0.16, 1, 0.3, 1]`

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: normalize content tone, spacing, and animation patterns across all pages"
```

---

## Task 14: Build Verification & Polish

**Files:** Various (bug fixes only)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build succeeds with no errors. Note any warnings.

- [ ] **Step 2: Fix any build errors**

Address TypeScript errors, missing imports, unused variables, or Next.js build warnings.

- [ ] **Step 3: Test production build locally**

```bash
npm run start
```

Visit `http://localhost:3000`. Click through all 4 pages. Verify:
- Scroll video plays smoothly
- All animations fire
- Theme toggle works
- Mobile responsive (test at 375px, 768px, 1024px)
- No console errors
- Images load
- World map renders with animated arcs

- [ ] **Step 4: Fix any runtime issues found**

Address layout shifts, broken animations, missing assets, or responsive issues.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "fix: resolve build issues and polish responsive behavior"
```

---

## Summary

| Task | Description | Key Files |
|---|---|---|
| 1 | Project scaffolding & config | `package.json`, configs |
| 2 | Global styles, theme, layout | `globals.css`, `layout.tsx` |
| 3 | Navbar & theme toggle | `navbar.tsx`, `theme-toggle.tsx` |
| 4 | Scroll-driven video hero | `scroll-video.tsx`, `hero.tsx` |
| 5 | Content research | Research notes (not committed) |
| 6 | 21st.dev components | spotlight, shine, bauhaus, pulse, zoom, footer |
| 7 | Home sections part 1 | brands, why-choose, how-we-work |
| 8 | Home sections part 2 | stats, testimonials, world-map, CTA |
| 9 | About page | `about/page.tsx` |
| 10 | Products page | `products/page.tsx` |
| 11 | Contact page | `contact/page.tsx` |
| 12 | Sitemap & wiring | `sitemap.ts`, navigation verification |
| 13 | Content normalization | All section files |
| 14 | Build verification | Bug fixes |
