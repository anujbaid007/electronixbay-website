"use client";

import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";

const testimonials = [
  {
    text: "We ordered 45 ThinkPads for our logistics team and saved nearly 40% compared to buying new. The quality was indistinguishable from factory-fresh machines. ElectronixBay has become our go-to for IT procurement.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=RK",
    name: "Rajesh Kapoor",
    role: "IT Manager, LogiMove Pvt. Ltd., Delhi",
  },
  {
    text: "Equipped our entire 30-person engineering team with HP EliteBooks at half the cost of new. Performance benchmarks matched our expectations perfectly. The 6-month warranty gave us the confidence to commit.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=PN",
    name: "Priya Nair",
    role: "CTO, CloudStack SaaS, Bangalore",
  },
  {
    text: "We needed 200 laptops for our school computer labs on a tight budget. ElectronixBay delivered Grade-A refurbished machines that have been running flawlessly for over a year now. Saved the school nearly ₹50 lakh.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=AS",
    name: "Amit Sharma",
    role: "Principal, DPS Franchise, Delhi NCR",
  },
  {
    text: "As procurement head, I run quarterly bulk orders through ElectronixBay for our 300-person firm. The consistency in quality across Dell Latitudes and ThinkPads is what keeps us coming back.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=NA",
    name: "Neha Agarwal",
    role: "Procurement Head, Saxena & Associates, Mumbai",
  },
  {
    text: "Replaced our entire BPO fleet of 150 Dell Latitudes in one go. The bulk pricing was excellent and every machine arrived with a fresh Windows installation. Zero downtime during the transition.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=VR",
    name: "Vikram Reddy",
    role: "Operations Director, DataServe BPO, Hyderabad",
  },
  {
    text: "The cost savings from choosing refurbished laptops let us reallocate ₹18 lakh to hiring two more developers. That ROI is impossible to beat. Every machine from ElectronixBay has been reliable.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=SP",
    name: "Sunita Patel",
    role: "Founder, LearnWave EdTech, Pune",
  },
  {
    text: "What impressed me most was the after-sales support. When one laptop had a keyboard issue, they replaced it within 48 hours under warranty. That level of service is rare in the refurbished space.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=KS",
    name: "Karan Singh",
    role: "IT Head, Precision Manufacturing, Gurugram",
  },
  {
    text: "Switching to refurbished cut our hardware budget by 45%, which we redirected into paid campaigns. Our 20 HP EliteBooks handle Figma, Chrome, and Slack without breaking a sweat.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=DI",
    name: "Deepa Iyer",
    role: "CFO, BrandWave Digital, Chennai",
  },
  {
    text: "Managing a coworking space means different users need different specs. ElectronixBay helped us configure mixed batches — some for designers, some for basic browsing. Flexible, fast, and fairly priced.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=AM",
    name: "Arjun Mehta",
    role: "Co-founder, DeskHub Coworking, Jaipur",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-20 relative bg-muted/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto text-center">
          <motion.span
            className="text-xs font-semibold uppercase tracking-widest text-exb-green"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-4"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            What Our{" "}
            <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
              Clients
            </span>{" "}
            Say
          </motion.h2>
          <motion.p
            className="text-center mt-4 text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            Trusted by 500+ businesses across India
          </motion.p>
        </div>

        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
