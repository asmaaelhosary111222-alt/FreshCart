"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useWishlist } from "@/app/components/WishlistProvider";
import { useCart } from "@/app/components/CartProvider";

export default function NavActions() {
  const { data: session, status } = useSession();
  const { numOfCartItems } = useCart();
  const { items } = useWishlist();

  const firstName = session?.user?.name?.split(" ")[0];
  const wishlistCount = items.length;

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Wishlist */}
      <Tooltip>
        <TooltipTrigger
          render={
            <Link
              href="/wishlist"
              aria-label={
                wishlistCount > 0
                  ? `Wishlist, ${wishlistCount} ${
                      wishlistCount === 1 ? "item" : "items"
                    }`
                  : "Wishlist"
              }
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-all duration-200 hover:bg-green-50 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.96]"
            />
          }
        >
          <FaHeart aria-hidden="true" size={18} />

          {wishlistCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-green-600 px-0.5 text-[10px] font-semibold leading-none text-white"
            >
              {wishlistCount}
            </span>
          )}
        </TooltipTrigger>

        <TooltipContent>Wishlist</TooltipContent>
      </Tooltip>

      {/* Cart */}
      <Tooltip>
        <TooltipTrigger
          render={
            <Link
              href="/cart"
              aria-label={
                numOfCartItems > 0
                  ? `Cart, ${numOfCartItems} ${
                      numOfCartItems === 1 ? "item" : "items"
                    }`
                  : "Cart"
              }
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-all duration-200 hover:bg-green-50 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.96]"
            />
          }
        >
          <FaShoppingCart aria-hidden="true" size={18} />

          {numOfCartItems > 0 && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-green-600 px-0.5 text-[10px] font-semibold leading-none text-white"
            >
              {numOfCartItems}
            </span>
          )}
        </TooltipTrigger>

        <TooltipContent>Cart</TooltipContent>
      </Tooltip>

      {/* Authentication */}
      {status === "loading" ? null : status === "authenticated" ? (
        <>
          <Link
            href="/"
            aria-label={`Account for ${firstName ?? "user"}`}
            className="hidden min-h-10 items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.98] lg:flex"
          >
            <FaUser aria-hidden="true" size={14} />
            <span>Hi, {firstName ?? "there"}</span>
          </Link>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="hidden min-h-10 items-center rounded-md px-2 text-sm text-gray-600 transition-colors duration-200 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 lg:flex"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="hidden min-h-10 items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.98] lg:flex"
        >
          <FaUser aria-hidden="true" size={14} />
<span>Sign In</span>
        </Link>
      )}

      {/* Mobile menu */}
      {/* <button
        type="button"
        aria-label="Open navigation menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white transition-all duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.96] md:hidden"
      >
        <FaBars aria-hidden="true" size={16} />
      </button> */}
    </div>
  );
}