
"use client";

import Link from "next/link";
import {
  Apple,
  ArrowLeft,
  Banana,
  Carrot,
  Home,
  Leaf,
  ShoppingCart,
  Sprout,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const decorativeIcons = [
  {
    Icon: Apple,
    className:
      "left-[8%] top-[14%] animate-float-slow text-green-300/40 sm:h-9 sm:w-9",
  },
  {
    Icon: Leaf,
    className:
      "left-[30%] top-[10%] -rotate-12 animate-float-fast text-green-300/35 sm:h-8 sm:w-8",
  },
  {
    Icon: Sprout,
    className:
      "left-[63%] top-[12%] animate-float-medium text-green-300/40 sm:h-9 sm:w-9",
  },
  {
    Icon: Banana,
    className:
      "right-[7%] top-[18%] rotate-12 animate-float-slow text-green-300/40 sm:h-9 sm:w-9",
  },
  {
    Icon: Banana,
    className:
      "left-[3%] top-[38%] -rotate-12 animate-float-fast text-green-300/35 sm:h-9 sm:w-9",
  },
  {
    Icon: Leaf,
    className:
      "right-[18%] top-[39%] rotate-12 animate-float-medium text-green-300/35 sm:h-8 sm:w-8",
  },
  {
    Icon: Apple,
    className:
      "right-[4%] top-[47%] animate-float-fast text-green-300/35 sm:h-9 sm:w-9",
  },
  {
    Icon: Sprout,
    className:
      "left-[12%] bottom-[23%] -rotate-6 animate-float-slow text-green-300/40 sm:h-9 sm:w-9",
  },
  {
    Icon: Leaf,
    className:
      "left-[38%] bottom-[14%] -rotate-12 animate-float-medium text-green-300/35 sm:h-8 sm:w-8",
  },
  {
    Icon: Sprout,
    className:
      "right-[34%] bottom-[12%] rotate-6 animate-float-fast text-green-300/35 sm:h-9 sm:w-9",
  },
  {
    Icon: Banana,
    className:
      "right-[5%] bottom-[22%] rotate-12 animate-float-slow text-green-300/40 sm:h-9 sm:w-9",
  },
  {
    Icon: Apple,
    className:
      "left-[4%] bottom-[8%] animate-float-medium text-green-300/35 sm:h-9 sm:w-9",
  },
  {
    Icon: Leaf,
    className:
      "right-[20%] bottom-[7%] rotate-12 animate-float-fast text-green-300/35 sm:h-8 sm:w-8",
  },
];

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main
      aria-labelledby="not-found-title"
      className="relative mx-auto min-h-[80vh] overflow-hidden px-4 py-16 sm:py-24"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-green-100/40 blur-3xl sm:h-[560px] sm:w-[560px]"
      />

      {/* Floating decorative food / plant icons */}
      {decorativeIcons.map(({ Icon, className }, index) => (
        <Icon
          key={`${Icon.displayName ?? Icon.name ?? "icon"}-${index}`}
          aria-hidden="true"
          className={`pointer-events-none absolute h-6 w-6 ${className}`}
        />
      ))}

      {/* Main content */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Illustration */}
        <div className="relative mb-10">
          <div className="flex h-[150px] w-[210px] items-center justify-center rounded-2xl border border-green-100/70 bg-gradient-to-b from-green-50 to-white shadow-[0_20px_40px_-16px_rgba(15,23,42,0.15)] sm:h-[195px] sm:w-[270px]">
            <ShoppingCart
              aria-hidden="true"
              className="h-[60px] w-[60px] text-green-500 sm:h-[85px] sm:w-[85px]"
              strokeWidth={1.6}
            />
          </div>

          <span
            aria-hidden="true"
            className="absolute -right-5 -top-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border-[5px] border-white bg-[#16A34A] text-lg font-extrabold tracking-tight text-white shadow-[0_10px_24px_-6px_rgba(22,163,74,0.45)] sm:-right-6 sm:-top-6 sm:h-[96px] sm:w-[96px] sm:text-2xl"
          >
            404
          </span>
        </div>

        {/* Decorative mark */}
        <div
          aria-hidden="true"
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="h-3 w-6 rounded-b-full border-b-2 border-green-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>

        {/* Heading */}
        <h1
          id="not-found-title"
          className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-[54px]"
        >
          Oops! Nothing Here
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-slate-500 sm:text-lg">
          Looks like this page went out of stock! Don&apos;t worry, there&apos;s
          plenty more fresh content to explore.
        </p>

        {/* Main actions */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Button
            asChild
            className="min-h-12 w-full gap-2 rounded-xl bg-[#16A34A] px-6 text-base font-bold text-white shadow-[0_10px_24px_-8px_rgba(22,163,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#138a3f] hover:shadow-[0_14px_28px_-8px_rgba(22,163,74,0.6)] focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:scale-95 sm:h-[68px] sm:w-[265px]"
          >
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2"
            >
              <Home
                aria-hidden="true"
                className="h-5 w-5"
                strokeWidth={2.5}
              />
              <span>Go to Homepage</span>
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoBack}
            className="min-h-12 w-full gap-2 rounded-xl border border-slate-200 bg-white px-6 text-base font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:scale-95 sm:h-[68px] sm:w-[190px]"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={2.5}
            />
            <span>Go Back</span>
          </Button>
        </div>

        {/* Popular destinations */}
        <Card className="mt-10 w-full max-w-[650px] rounded-[20px] border border-[#E7E9EC] bg-white px-4 py-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)] sm:px-5">
          <p className="mb-5 text-[15px] font-semibold uppercase tracking-[0.02em] text-[#9AA3B2]">
            Popular Destinations
          </p>

          <nav
            aria-label="Popular destinations"
            className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center"
          >
            <Button
              asChild
              variant="ghost"
              className="min-h-11 w-full rounded-[13px] bg-[#EFFBF3] px-4 text-sm font-semibold text-[#15803D] shadow-none transition-all duration-200 hover:bg-[#E5F8EB] hover:text-[#15803D] focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:scale-95 sm:w-auto sm:min-w-[135px]"
            >
              <Link href="/products">All Products</Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="min-h-11 w-full rounded-[13px] bg-[#F2F3F5] px-4 text-sm font-semibold text-[#374151] shadow-none transition-all duration-200 hover:bg-[#E9EAED] hover:text-[#374151] focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:scale-95 sm:w-auto sm:min-w-[123px]"
            >
              <Link href="/categories">Categories</Link>
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="min-h-11 w-full rounded-[13px] bg-[#F2F3F5] px-4 text-sm font-semibold text-[#374151] shadow-none transition-all duration-200 hover:bg-[#E9EAED] hover:text-[#374151] focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:scale-95 sm:w-auto sm:min-w-[145px]"
            >
              Today&apos;s Deals
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="min-h-11 w-full rounded-[13px] bg-[#F2F3F5] px-4 text-sm font-semibold text-[#374151] shadow-none transition-all duration-200 hover:bg-[#E9EAED] hover:text-[#374151] focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:scale-95 sm:w-auto sm:min-w-[123px]"
            >
              Contact Us
            </Button>
          </nav>
        </Card>
      </div>

      <style>{`
        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float-slow {
          animation: gentle-float 5s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: gentle-float 4s ease-in-out infinite;
          animation-delay: 0.6s;
        }

        .animate-float-fast {
          animation: gentle-float 3.2s ease-in-out infinite;
          animation-delay: 1.1s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow,
          .animate-float-medium,
          .animate-float-fast {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}

