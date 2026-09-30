"use client";

import Link from "next/link";
import {
  FaShoppingCart,
  FaTrash,
  FaUser,
  FaTruck,
  FaShieldAlt,
  FaTag,
  FaLock,
  FaBolt,
  FaArrowLeft ,
} from "react-icons/fa";
import { useSession } from "next-auth/react";

import { useCart } from "@/app/components/CartProvider";
import CartItemRow from "@/app/components/CartItemRow";

function CartSkeleton() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="animate-pulse"
        aria-label="Loading shopping cart"
        role="status"
      >
        <div className="mb-6 h-4 w-40 rounded bg-gray-200" />

        <div className="mb-8">
          <div className="h-10 w-56 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-40 rounded bg-gray-200" />
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-36 rounded-xl bg-gray-200"
              />
            ))}
          </div>

          <div className="h-[520px] rounded-xl bg-gray-200" />
        </div>

        <span className="sr-only">
          Loading your cart...
        </span>
      </div>
    </main>
  );
}

function EmptyCart({
  authenticated,
}: {
  authenticated: boolean;
}) {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <div
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
        aria-hidden="true"
      >
        <FaShoppingCart
          size={28}
          className="text-gray-300"
        />
      </div>

      <h1 className="mb-2 text-xl font-semibold text-gray-900">
        {authenticated
          ? "Your cart is empty"
          : "Sign in to view your cart"}
      </h1>

      <p className="mb-6 text-gray-500">
        {authenticated
          ? "Looks like you haven't added anything to your cart yet."
          : "Your cart is tied to your account. Log in to see your items."}
      </p>

      {authenticated ? (
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-green-600 px-5 py-2.5 font-medium text-white transition-all hover:bg-green-700"
        >
          Continue Shopping
        </Link>
      ) : (
        <Link
          href="/login"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-2.5 font-medium text-white transition-all hover:bg-green-700"
        >
          <FaUser size={14} aria-hidden="true" />
          Sign In
        </Link>
      )}
    </main>
  );
}

function OrderSummary({
  itemCount,
  total,
}: {
  itemCount: number;
  total: number;
}) {
  return (
    <aside
      className="
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        lg:sticky
        lg:top-24
      "
      aria-labelledby="order-summary-heading"
    >
      {/* Green header */}
      <div className="bg-green-600 px-5 py-5 text-white sm:px-6">
        <div className="flex items-center gap-3">
          <FaShoppingCart
            size={18}
            aria-hidden="true"
          />

          <h2
            id="order-summary-heading"
            className="text-lg font-bold"
          >
            Order Summary
          </h2>
        </div>

        <p className="mt-1 text-sm text-white/90">
          {itemCount}{" "}
          {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* Free shipping */}
        <div className="flex items-center gap-4 rounded-xl bg-emerald-50 p-4">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-emerald-100
              text-green-600
            "
          >
            <FaTruck
              size={17}
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="font-semibold text-green-700">
              Free Shipping!
            </p>

            <p className="text-sm text-green-700">
              You qualify for free delivery
            </p>
          </div>
        </div>

        {/* Prices */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
            <span>Subtotal</span>

            <span className="font-medium text-gray-900">
              {total.toLocaleString()} EGP
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
            <span>Shipping</span>

            <span className="font-medium text-green-600">
              FREE
            </span>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-bold text-gray-900">
                Total
              </span>

              <span className="text-2xl font-bold text-gray-900">
                {total.toLocaleString()}
                <span className="ml-1 text-sm font-medium text-gray-500">
                  EGP
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Promo */}
        <button
          type="button"
          className="
            flex
            min-h-11
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-dashed
            border-gray-300
            bg-white
            px-4
            text-sm
            font-medium
            text-gray-500
            transition-colors
            hover:border-green-500
            hover:text-green-600
          "
        >
          <FaTag
            size={13}
            aria-hidden="true"
          />

          Apply Promo Code
        </button>

        {/* Checkout */}
        <Link
          href="/checkout"
          className="
            flex
            min-h-12
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-green-600
            px-5
            py-3
            font-semibold
            text-white
            shadow-lg
            shadow-green-600/20
            transition-all
            hover:bg-green-700
            hover:shadow-green-600/30
            active:scale-[0.99]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-green-600
            focus-visible:ring-offset-2
          "
        >
          <FaLock
            size={14}
            aria-hidden="true"
          />

          Secure Checkout
        </Link>

        {/* Trust row */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 sm:gap-5">
          <span className="flex items-center gap-1.5">
            <FaShieldAlt
              className="text-green-600"
              aria-hidden="true"
            />

            Secure Payment
          </span>

          <span
            className="h-4 w-px bg-gray-200"
            aria-hidden="true"
          />

          <span className="flex items-center gap-1.5">
            <FaBolt
              className="text-blue-500"
              aria-hidden="true"
            />

            Fast Delivery
          </span>
        </div>

        {/* Continue shopping */}
        <Link
          href="/"
          className="
            flex
            items-center
            justify-center
            pt-1
            text-sm
            font-medium
            text-green-600
            transition-colors
            hover:text-green-700
          "
        >
    <span className="flex items-center gap-1.5">
  <FaArrowLeft
    size={12}
    aria-hidden="true"
  />
  Continue Shopping
</span>
        </Link>
      </div>
    </aside>
  );
}

export default function CartPage() {
  const { status } = useSession();

  const {
    items,
    loading,
    numOfCartItems,
    totalCartPrice,
    clearCart,
    clearingCart,
  } = useCart();

  if (status === "loading") {
    return <CartSkeleton />;
  }

  if (status === "unauthenticated") {
    return <EmptyCart authenticated={false} />;
  }

  if (loading) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyCart authenticated />;
  }

  return (
    <main className="min-h-screen bg-gray-50/60">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 text-xs text-gray-500 sm:text-sm"
        >
          <Link
            href="/"
            className="hover:text-green-600"
          >
            Home
          </Link>

          <span
            className="mx-2"
            aria-hidden="true"
          >
            /
          </span>

          <span
            className="text-gray-700"
            aria-current="page"
          >
            Shopping Cart
          </span>
        </nav>

        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-green-600
                text-white
                sm:h-11
                sm:w-11
              "
              aria-hidden="true"
            >
              <FaShoppingCart size={18} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Shopping Cart
              </h1>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                You have{" "}
                <span className="font-semibold text-green-600">
                  {numOfCartItems}
                </span>{" "}
                {numOfCartItems === 1
                  ? "item"
                  : "items"}{" "}
                in your cart
              </p>
            </div>
          </div>
        </header>

        {/* Main cart layout */}
        <div
          className="
            grid
            items-start
            gap-5
            lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]
            xl:gap-6
          "
        >
          {/* Products */}
          <section
            className="min-w-0 space-y-3 sm:space-y-4"
            aria-labelledby="cart-items-heading"
          >
            <h2
              id="cart-items-heading"
              className="sr-only"
            >
              Cart items
            </h2>

            {items.map((item) => (
              <CartItemRow
                key={item._id}
                item={item}
              />
            ))}

            {/* Bottom actions */}
            <div className="flex items-center justify-between gap-4 pt-3 sm:pt-5">
              <Link
                href="/"
                className="
                  text-xs
                  font-medium
                  text-green-600
                  transition-colors
                  hover:text-green-700
                  sm:text-sm
                "
              >
             <span className="flex items-center gap-1.5">
  <FaArrowLeft
    size={12}
    aria-hidden="true"
  />
  Continue Shopping
</span>
              </Link>

              <button
                type="button"
                disabled={clearingCart}
                onClick={() => void clearCart()}
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  text-gray-400
                  transition-colors
                  hover:text-red-500
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:text-sm
                "
              >
                {clearingCart ? (
                  <span
                    className="
                      h-3
                      w-3
                      animate-spin
                      rounded-full
                      border-2
                      border-gray-300
                      border-t-gray-600
                    "
                    aria-hidden="true"
                  />
                ) : (
                  <FaTrash
                    size={11}
                    aria-hidden="true"
                  />
                )}

                {clearingCart
                  ? "Clearing..."
                  : "Clear all items"}
              </button>
            </div>
          </section>

          {/* Summary */}
          <OrderSummary
            itemCount={numOfCartItems}
            total={totalCartPrice}
          />
        </div>
      </div>
    </main>
  );
}