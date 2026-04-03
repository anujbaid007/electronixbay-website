import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/ui/navbar";
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
    description: "Save up to 70% on enterprise-grade refurbished laptops. Dell, HP, Lenovo. Certified quality with warranty.",
    images: [{ url: "/og-image.jpeg", width: 1200, height: 630, alt: "ElectronixBay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ElectronixBay | Premium Refurbished Laptops",
    description: "Enterprise-grade refurbished laptops at up to 70% savings. Dell, HP, Lenovo.",
    images: ["/og-image.jpeg"],
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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
