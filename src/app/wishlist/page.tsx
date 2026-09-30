"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "@/app/components/WishlistProvider";
import WishlistItem from "@/app/components/WishlistItem";
import { Skeleton } from "@/components/ui/skeleton";

function WishlistSkeleton() {
  return (
    <div
      className="space-y-3"
      aria-label="Loading wishlist"
      aria-busy="true"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-24 w-full rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}

function EmptyWishlist() {
  return (
    <section
      aria-labelledby="empty-wishlist-title"
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white px-4 py-16 text-center"
    >
      <div
        aria-hidden="true"
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400"
      >
        <FaHeart size={28} />
      </div>

      <h2
        id="empty-wishlist-title"
        className="text-lg font-semibold text-slate-900"
      >
        Your Wishlist is Empty
      </h2>

      <p className="mt-1 max-w-md text-sm text-gray-500">
        You haven&apos;t added any products to your wishlist yet.
      </p>

      <Link
        href="/"
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        Continue Shopping
      </Link>
    </section>
  );
}

export default function WishlistPage() {
  const { items, loading } = useWishlist();

  return (
    <main className="mx-auto max-w-7xl overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 text-sm text-gray-500"
      >
        <Link
          href="/"
          className="rounded-sm transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          Home
        </Link>

        <span aria-hidden="true">/</span>

        <span
          aria-current="page"
          className="font-medium text-slate-900"
        >
          Wishlist
        </span>
      </nav>

      {/* Header */}
      <header className="mb-6 flex items-center gap-4">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500"
        >
          <FaHeart size={20} />
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-slate-900">
            My Wishlist
          </h1>

          {!loading && (
            <p
              className="text-sm text-gray-500"
              aria-live="polite"
            >
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          )}
        </div>
      </header>

      {/* Content */}
      {loading ? (
        <WishlistSkeleton />
      ) : items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <section
          aria-labelledby="wishlist-items-title"
          className="overflow-hidden rounded-xl border border-gray-200 bg-white"
        >
          <h2 id="wishlist-items-title" className="sr-only">
            Wishlist items
          </h2>

          {/* Desktop column headings */}
          <div
            aria-hidden="true"
            className="hidden grid-cols-[3.4fr_1fr_0.75fr_1fr] gap-3 border-b border-gray-100 bg-gray-50 px-3.5 py-3 text-[8px] font-medium uppercase tracking-wide text-gray-400 md:grid"
          >
            <span>Product</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-gray-100">
            {items.map((product) => (
              <WishlistItem
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      )}

      {/* Continue Shopping */}
      {!loading && items.length > 0 && (
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-green-600 transition-colors hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            ← Continue Shopping
          </Link>
        </div>
      )}
    </main>
  );
}