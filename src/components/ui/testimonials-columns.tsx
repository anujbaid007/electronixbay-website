"use client";
import React from "react";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <div
        className="flex flex-col gap-6 pb-6 animate-marquee-vertical"
        style={{ animationDuration: `${props.duration || 10}s` }}
      >
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-6 rounded-2xl border border-border/50 bg-card shadow-sm max-w-xs w-full"
                key={i}
              >
                <div className="text-sm leading-relaxed text-foreground/80">
                  &ldquo;{text}&rdquo;
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
                  />
                  <div className="flex flex-col">
                    <div className="font-semibold text-sm tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="leading-5 text-muted-foreground text-xs tracking-tight">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
