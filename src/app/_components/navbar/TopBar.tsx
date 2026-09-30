
"use client";

import Link from "next/link";
import {
  FaTruck,
  FaGift,
  FaPhoneAlt,
  FaEnvelope,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

export default function TopBar() {
  const { data: session } = useSession();

  const isLoggedIn = !!session?.user;
  const userName = session?.user?.name || "Account";

  return (
    <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-2 text-xs text-gray-600 lg:px-36 lg:text-sm">
      {/* Left side */}
      <div className="flex items-center gap-2 lg:gap-4">
        <span className="flex items-center gap-1 whitespace-nowrap">
          <FaTruck
            aria-hidden="true"
            className="shrink-0 text-green-600"
            size={12}
          />
          <span>Free Shipping on Orders 500 EGP</span>
        </span>

        <span className="flex items-center gap-1 whitespace-nowrap">
          <FaGift
            aria-hidden="true"
            className="shrink-0 text-green-600"
            size={12}
          />
          <span>New Arrivals Daily</span>
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 lg:gap-4">
        <a
          href="tel:+18001234567"
          className="flex items-center gap-1 whitespace-nowrap rounded-sm transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <FaPhoneAlt
            aria-hidden="true"
            className="shrink-0 text-green-600"
            size={11}
          />
          <span>+1 (800) 123-4567</span>
        </a>

        <Link
          href="/support"
          className="flex items-center gap-1 whitespace-nowrap rounded-sm transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <FaEnvelope
            aria-hidden="true"
            className="shrink-0 text-green-600"
            size={11}
          />
          <span>support@freshcart.com</span>
        </Link>

        {!isLoggedIn ? (
          <>
            {/* Sign In */}
            <Link
              href="/login"
              className="flex items-center gap-1 whitespace-nowrap rounded-sm transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <FaUser aria-hidden="true" size={11} />
              <span>Sign In</span>
            </Link>

            {/* Sign Up */}
            <Link
              href="/signup"
              className="flex items-center gap-1 whitespace-nowrap rounded-sm transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <FaUser aria-hidden="true" size={11} />
              <span>Sign Up</span>
            </Link>
          </>
        ) : (
          <>
            {/* Logged-in user */}
            <Link
              href="/profile"
              className="flex items-center gap-1 whitespace-nowrap rounded-sm font-medium transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <FaUser
                aria-hidden="true"
                className="text-green-600"
                size={11}
              />
              <span>{userName}</span>
            </Link>

            {/* Sign Out */}
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1 whitespace-nowrap rounded-sm transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <FaSignOutAlt aria-hidden="true" size={11} />
              <span>Sign Out</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

