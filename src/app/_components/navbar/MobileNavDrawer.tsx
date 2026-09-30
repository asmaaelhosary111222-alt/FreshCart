"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaHeadset,
} from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

import { useWishlist } from "@/app/components/WishlistProvider";
import { useCart } from "@/app/components/CartProvider";
import SearchBar from "./SearchBar";

export default function MobileNavDrawer() {
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();
  const { numOfCartItems } = useCart();
  const { items } = useWishlist();

  const firstName = session?.user?.name?.split(" ")[0];
  const wishlistCount = items.length;

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Menu trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white transition-all duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.96] lg:hidden"
      >
        <span className="flex flex-col gap-1" aria-hidden="true">
          <span className="h-0.5 w-4 rounded-full bg-white" />
          <span className="h-0.5 w-4 rounded-full bg-white" />
          <span className="h-0.5 w-4 rounded-full bg-white" />
        </span>
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-[100]">
          {/* Invisible backdrop */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="absolute inset-0 cursor-default"
          />

          {/* Drawer */}
          <aside
            aria-label="Mobile navigation"
            className="absolute right-0 top-0 flex h-full w-[min(24rem,82vw)] flex-col overflow-y-auto bg-white shadow-2xl"
          >
            {/* Drawer header */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3">
              <Link
                href="/"
                onClick={closeMenu}
                aria-label="FreshCart home"
                className="flex items-center gap-2"
              >
                <span className="text-xl font-bold text-gray-800">
                  <span className="text-green-600">🛒</span> FreshCart
                </span>
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              >
                <FaTimes aria-hidden="true" size={14} />
              </button>
            </div>

            {/* Search */}
            <div className="border-b border-gray-100 px-3 py-3">
              <SearchBar />
            </div>

            {/* Main navigation */}
            <nav
              aria-label="Mobile navigation"
              className="px-3 py-2"
            >
              <Link
                href="/"
                onClick={closeMenu}
                className="flex min-h-11 items-center rounded-md px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-600"
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={closeMenu}
                className="flex min-h-11 items-center rounded-md px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-600"
              >
                Shop
              </Link>

              <Link
                href="/categories"
                onClick={closeMenu}
                className="flex min-h-11 items-center rounded-md px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-600"
              >
                Categories
              </Link>

              <Link
                href="/brands"
                onClick={closeMenu}
                className="flex min-h-11 items-center rounded-md px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-600"
              >
                Brands
              </Link>
            </nav>

            <div className="mx-3 border-t border-gray-100" />

            {/* Wishlist + Cart */}
            <div className="px-3 py-2">
              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex min-h-12 items-center gap-3 rounded-md px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <FaHeart aria-hidden="true" size={14} />
                </span>

                <span className="flex-1">Wishlist</span>

                {wishlistCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex min-h-12 items-center gap-3 rounded-md px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <FaShoppingCart aria-hidden="true" size={14} />
                </span>

                <span className="flex-1">Cart</span>

                {numOfCartItems > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-semibold text-white">
                    {numOfCartItems}
                  </span>
                )}
              </Link>
            </div>

            <div className="mx-3 border-t border-gray-100" />

            {/* Authentication */}
            <div className="px-3 py-2">
              {status === "authenticated" ? (
                <>
                  <div className="flex min-h-12 items-center gap-3 px-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      <FaUser aria-hidden="true" size={14} />
                    </span>

                    <span className="text-sm text-gray-700">
                      {firstName ?? "Account"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex min-h-12 w-full items-center gap-3 rounded-md px-3 text-sm text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50">
                      <FaSignOutAlt aria-hidden="true" size={14} />
                    </span>

                    Sign Out
                  </button>
                </>
              ) : status === "unauthenticated" ? (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex min-h-12 items-center gap-3 rounded-md px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-600"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <FaUser aria-hidden="true" size={14} />
                  </span>

                  Sign In
                </Link>
              ) : null}
            </div>

            {/* Support */}
            <div className="mt-auto px-3 pb-4 pt-3">
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FaHeadset aria-hidden="true" size={15} />
                </span>

                <div className="text-xs leading-tight">
                  <p className="text-gray-600">Need Help?</p>
                  <a
                    href="mailto:support@freshcart.com"
                    className="font-medium text-green-600 hover:text-green-700"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}