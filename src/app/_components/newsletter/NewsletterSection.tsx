"use client";

import { useEffect, useRef, useState } from "react";
import NewsletterContent from "./NewsletterContent";
import MobileAppCard from "./MobileAppCard";

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="newsletter-section-title"
      className="w-full bg-gradient-to-br from-green-50 via-white to-green-50 py-8 sm:py-10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-gray-100 bg-white/70 p-5 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-7 lg:p-8">
          <h2 id="newsletter-section-title" className="sr-only">
            Newsletter and mobile app
          </h2>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_auto_1fr] lg:items-center lg:gap-8">
            <div
              className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <NewsletterContent />
            </div>

            <div
              aria-hidden="true"
              className="hidden h-32 w-px bg-gray-200 lg:block"
            />

            <div
              className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? "150ms" : "0ms",
              }}
            >
              <MobileAppCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}