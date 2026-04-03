"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, Briefcase, GraduationCap, Zap } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import Link from "next/link";

const productDropdownItems = [
  {
    label: "Business Laptops",
    href: "/products/business-laptops",
    icon: Briefcase,
    desc: "Dell Latitude, HP EliteBook, Lenovo ThinkPad",
  },
  {
    label: "Student Laptops",
    href: "/products/student-laptops",
    icon: GraduationCap,
    desc: "Affordable machines for education & bulk orders",
  },
  {
    label: "High Performance",
    href: "/products/high-performance",
    icon: Zap,
    desc: "Upgraded RAM, SSDs & dedicated GPUs",
  },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setMobileProductsOpen(false);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-4 px-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center justify-between px-4 md:px-6 py-2.5 rounded-2xl w-full max-w-5xl relative z-10 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-white/5 border border-border/50"
            : "bg-background/50 backdrop-blur-sm"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={mounted && resolvedTheme === "dark" ? "/logo-white.png" : "/logo.png"}
            alt="ElectronixBay"
            width={400}
            height={207}
            className="h-8 md:h-10 w-auto"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition-colors font-medium px-3 py-2 rounded-lg hover:bg-muted"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                </motion.div>

                {/* Dropdown */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl shadow-black/10 dark:shadow-black/30 overflow-hidden"
                    >
                      <div className="p-2">
                        {productDropdownItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <div className="w-9 h-9 rounded-lg bg-exb-green/10 flex items-center justify-center shrink-0 group-hover:bg-exb-green/20 transition-colors">
                                <Icon className="w-4.5 h-4.5 text-exb-green" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground group-hover:text-exb-green transition-colors">
                                  {item.label}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="border-t border-border/50 px-4 py-2.5">
                        <Link
                          href="/products"
                          className="text-xs font-medium text-muted-foreground hover:text-exb-green transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          View all products →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors font-medium px-3 py-2 rounded-lg hover:bg-muted"
                >
                  {item.label}
                </Link>
              </motion.div>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-xl hover:shadow-lg hover:shadow-exb-green/25 transition-all duration-300 cursor-pointer"
            >
              Get a Quote
            </Link>
          </motion.div>

          <motion.button
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-5 w-5 text-foreground" />
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background z-50 pt-24 px-6 lg:hidden overflow-y-auto"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-lg hover:bg-muted cursor-pointer"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-foreground" />
            </motion.button>

            <div className="flex flex-col space-y-1">
              {navItems.map((item, i) =>
                item.hasDropdown ? (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <button
                      className="flex items-center justify-between w-full text-lg text-foreground font-medium py-3 px-4 rounded-xl hover:bg-muted transition-colors"
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          mobileProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 space-y-1">
                            {productDropdownItems.map((subItem) => {
                              const Icon = subItem.icon;
                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-muted transition-colors"
                                  onClick={toggleMenu}
                                >
                                  <Icon className="w-4 h-4 text-exb-green" />
                                  <span className="text-base text-foreground/80">{subItem.label}</span>
                                </Link>
                              );
                            })}
                            <Link
                              href="/products"
                              className="block py-2 px-4 text-sm text-muted-foreground hover:text-exb-green transition-colors"
                              onClick={toggleMenu}
                            >
                              View all products →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Link
                      href={item.href}
                      className="text-lg text-foreground font-medium block py-3 px-4 rounded-xl hover:bg-muted transition-colors"
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-xl"
                  onClick={toggleMenu}
                >
                  Get a Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
