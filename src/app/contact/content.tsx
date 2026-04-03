"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Footer } from "@/components/sections/footer";

const WA_NUMBER = "917508807490";

// ─── Options ─────────────────────────────────────────────────────────────────

const categoryOptions = [
  { value: "", label: "Select a category" },
  { value: "Business Laptops", label: "Business Laptops" },
  { value: "Student Laptops", label: "Student Laptops" },
  { value: "High Performance Laptops", label: "High Performance Laptops" },
  { value: "Not Sure", label: "Not Sure" },
];

const quantityOptions = [
  { value: "", label: "Select quantity" },
  { value: "1–10 units", label: "1–10 units" },
  { value: "10–50 units", label: "10–50 units" },
  { value: "50–100 units", label: "50–100 units" },
  { value: "100+ units", label: "100+ units" },
];

const budgetOptions = [
  { value: "", label: "Select budget (optional)" },
  { value: "Under ₹15K/unit", label: "Under ₹15K per unit" },
  { value: "₹15K–₹25K/unit", label: "₹15K – ₹25K per unit" },
  { value: "₹25K–₹40K/unit", label: "₹25K – ₹40K per unit" },
  { value: "₹40K+/unit", label: "₹40K+ per unit" },
];

// ─── Form ─────────────────────────────────────────────────────────────────────

function QuoteForm() {
  const searchParams = useSearchParams();
  const initialCategory = (() => {
    const p = searchParams.get("category") || "";
    if (p === "business") return "Business Laptops";
    if (p === "student") return "Student Laptops";
    if (p === "performance") return "High Performance Laptops";
    return "";
  })();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: initialCategory,
    quantity: "",
    budget: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `Hi ElectronixBay! I'd like to request a quote.`,
      ``,
      `*Name:* ${formData.name}`,
      formData.company ? `*Company:* ${formData.company}` : null,
      `*Email:* ${formData.email}`,
      `*Phone:* ${formData.phone}`,
      formData.category ? `*Category:* ${formData.category}` : null,
      formData.quantity ? `*Quantity:* ${formData.quantity}` : null,
      formData.budget ? `*Budget:* ${formData.budget}` : null,
      formData.message ? `*Message:* ${formData.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
    setSent(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-exb-green/50 focus:border-exb-green/50 transition-all duration-200 text-sm";
  const selectClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-exb-green/50 focus:border-exb-green/50 transition-all duration-200 text-sm appearance-none";
  const labelClass = "block text-sm font-medium mb-2";

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-exb-green mb-4" />
        <h3
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Opening WhatsApp…
        </h3>
        <p className="text-muted-foreground max-w-md">
          Your details have been pre-filled in WhatsApp. Just hit send and our
          team will respond shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm text-exb-green font-semibold hover:underline"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>Company Name</label>
          <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} placeholder="Your company" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red-500">*</span>
          </label>
          <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@company.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="category" className={labelClass}>Laptop Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} className={selectClass}>
            {categoryOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className={labelClass}>Quantity</label>
          <select id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className={selectClass}>
            {quantityOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>Budget</label>
          <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className={selectClass}>
            {budgetOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message / Specific Requirements</label>
        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us about your requirements — specific models, configurations, timeline, etc." className={inputClass + " resize-none"} />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-xl hover:shadow-lg hover:shadow-exb-green/20 transition-all duration-300"
      >
        <MessageCircle className="w-4 h-4" />
        Send via WhatsApp
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Clicking the button will open WhatsApp with your details pre-filled.
      </p>
    </form>
  );
}

// ─── Contact Info ─────────────────────────────────────────────────────────────

function ContactInfo() {
  return (
    <div className="space-y-8">
      <motion.a
        href={`https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%20need%20a%20quote%20for%20refurbished%20laptops.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-5 rounded-2xl border border-exb-green/30 bg-exb-green/5 hover:bg-exb-green/10 transition-colors duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-12 h-12 rounded-full bg-exb-green/20 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-6 h-6 text-exb-green" />
        </div>
        <div>
          <p className="font-bold text-sm">WhatsApp Us</p>
          <p className="text-xs text-muted-foreground">Quick inquiry? Chat with us directly.</p>
        </div>
      </motion.a>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm">Phone</p>
            <a href="tel:+917508807490" className="text-sm text-muted-foreground hover:text-exb-green transition-colors">
              +91 75088 07490
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <Mail className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm">Email</p>
            <a href="mailto:hello@electronixbay.com" className="text-sm text-muted-foreground hover:text-exb-green transition-colors">
              hello@electronixbay.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm">Office</p>
            <p className="text-sm text-muted-foreground">Gurugram, Haryana, India</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden aspect-[4/3] flex items-center justify-center">
        <div className="text-center p-6">
          <MapPin className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Gurugram, Haryana, India</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ContactContent() {
  return (
    <main>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
              Contact
            </span>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Get in{" "}
              <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Fill out the form and your details will be sent directly to us on
              WhatsApp. Our team replies within a few hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-6 md:p-8 rounded-2xl border border-border bg-card">
                <Suspense fallback={<div className="h-[600px]" />}>
                  <QuoteForm />
                </Suspense>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactInfo />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
