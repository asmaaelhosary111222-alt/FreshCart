"use client";

import { useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) {
    return null;
  }

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-labelledby="related-products-heading"
      className="mt-8"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2
          id="related-products-heading"
          className="flex min-w-0 items-center gap-2 text-xl font-bold text-slate-900"
        >
          <span
            className="h-6 w-1 shrink-0 rounded-full bg-green-600"
            aria-hidden="true"
          />

          <span>
            You May Also{" "}
            <span className="text-green-600">Like</span>
          </span>
        </h2>

        {/* Carousel Controls */}
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Scroll related products left"
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-slate-600 transition-all hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95"
          >
            <FaChevronLeft
              size={14}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            aria-label="Scroll related products right"
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-slate-600 transition-all hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95"
          >
            <FaChevronRight
              size={14}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Products */}
      <div
        ref={scrollRef}
        role="region"
        aria-label="Related products"
        tabIndex={0}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[min(16rem,82vw)] shrink-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}