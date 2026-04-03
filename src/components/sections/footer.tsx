import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const productLinks = [
  { label: "Business Laptops", href: "/products#business" },
  { label: "Student Laptops", href: "/products#student" },
  { label: "High Performance", href: "/products#high-performance" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Main grid: brand + 3 link columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="ElectronixBay home">
              <Image
                src="/logo-white.png"
                alt="ElectronixBay"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">
              Premium refurbished laptops for growing businesses
            </p>
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
                    className={cn(
                      "text-sm text-gray-400 hover:text-exb-green transition-colors duration-200"
                    )}
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
                    className={cn(
                      "text-sm text-gray-400 hover:text-exb-green transition-colors duration-200"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Legal
            </h3>
            <ul className="flex flex-col gap-3 mb-6">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={cn(
                      "text-sm text-gray-400 hover:text-exb-green transition-colors duration-200"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:support@electronixbay.com"
                  className={cn(
                    "flex items-center gap-2 text-sm text-gray-400 hover:text-exb-green transition-colors duration-200"
                  )}
                >
                  <Mail className="size-4 shrink-0" />
                  support@electronixbay.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className={cn(
                    "flex items-center gap-2 text-sm text-gray-400 hover:text-exb-green transition-colors duration-200"
                  )}
                >
                  <Phone className="size-4 shrink-0" />
                  +91-XXXXXXXXXX
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

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={cn(
                  "text-gray-500 hover:text-exb-green transition-colors duration-200"
                )}
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
