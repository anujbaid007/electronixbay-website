import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const productLinks = [
  { label: "Business Laptops", href: "/products/business-laptops" },
  { label: "Student Laptops", href: "/products/student-laptops" },
  { label: "High Performance", href: "/products/high-performance" },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Main grid: brand + 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="ElectronixBay home">
              <Image
                src="/logo-white.png"
                alt="ElectronixBay"
                width={400}
                height={207}
                className="h-10 md:h-11 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[240px]">
              Premium refurbished laptops for growing businesses across India.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={cn(
                    "w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-exb-green hover:bg-white/10 transition-all duration-200"
                  )}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-exb-green transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Products
            </h3>
            <ul className="flex flex-col gap-3">
              {productLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-exb-green transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:support@electronixbay.com"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-exb-green transition-colors duration-200"
                >
                  <Mail className="size-4 shrink-0" />
                  support@electronixbay.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+917508807490"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-exb-green transition-colors duration-200"
                >
                  <Phone className="size-4 shrink-0" />
                  +91 75088 07490
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="size-4 shrink-0" />
                Gurugram, Haryana, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2024&ndash;2026 ElectronixBay. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Gurugram, Haryana, India
          </p>
        </div>

      </div>
    </footer>
  );
}
