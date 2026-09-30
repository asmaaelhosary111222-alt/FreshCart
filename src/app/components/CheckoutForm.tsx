"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  FaArrowLeft,
  FaCreditCard,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  FaSpinner,
} from "react-icons/fa";

import Link from "next/link";

import { useCart } from "@/app/components/CartProvider";
import { createCashOrder } from "@/lib/createCashOrder.action";
import { createCheckoutSession } from "@/lib/createCheckoutSession.action";

type PaymentMethod = "cash" | "online";

export default function CheckoutForm() {
  const router = useRouter();
  const { status } = useSession();

  const {
    items,
    loading: cartLoading,
    numOfCartItems,
    totalCartPrice,
  } = useCart();

  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }

    const trimmedCity = city.trim();
    const trimmedDetails = details.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedCity) {
      toast.error("Please enter your city.");
      return;
    }

    if (!trimmedDetails) {
      toast.error("Please enter your street address.");
      return;
    }

    if (!trimmedPhone) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    try {
      const shippingAddress = {
        details: trimmedDetails,
        phone: trimmedPhone,
        city: trimmedCity,
      };

      if (paymentMethod === "cash") {
        const result = await createCashOrder(shippingAddress);

        if (!result.success) {
          toast.error(
            result.message ?? "Couldn't place your order."
          );
          return;
        }

        toast.success("Your order has been successfully placed.");

        router.push("/orders?success=true");
        return;
      }

      const redirectUrl =
        `${window.location.origin}/orders?success=true`;

      const result = await createCheckoutSession(
        shippingAddress,
        redirectUrl
      );

      if (!result.success || !result.data?.url) {
        toast.error(
          result.message ?? "Couldn't start online payment."
        );
        return;
      }

      window.location.href = result.data.url;
    } catch {
      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || cartLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div
          className="animate-pulse"
          role="status"
          aria-label="Loading checkout"
        >
          <div className="mb-8 h-7 w-56 rounded bg-gray-100" />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div className="h-40 rounded-2xl bg-gray-100" />
              <div className="h-40 rounded-2xl bg-gray-100" />
            </div>

            <div className="h-80 rounded-2xl bg-gray-100" />
          </div>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="mb-3 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h1>

        <p className="mb-6 text-gray-500">
          Add some products before proceeding to checkout.
        </p>

        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-green-600 px-6 py-2.5 font-medium text-white transition hover:bg-green-700"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-gray-500"
      >
        <Link
          href="/"
          className="transition-colors hover:text-green-600"
        >
          Home
        </Link>

        <span className="mx-2" aria-hidden="true">
          /
        </span>

        <Link
          href="/cart"
          className="transition-colors hover:text-green-600"
        >
          Shopping Cart
        </Link>

        <span className="mx-2" aria-hidden="true">
          /
        </span>

        <span className="text-gray-700">
          Checkout
        </span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-green-600"
        >
          <FaArrowLeft size={12} aria-hidden="true" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">
          Complete Your Order
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your shipping information and choose your
          payment method.
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        {/* Checkout Form */}
        <section className="space-y-6 lg:col-span-2">
          {/* Shipping Address */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FaMapMarkerAlt
                  size={16}
                  aria-hidden="true"
                />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Shipping Address
                </h2>

                <p className="text-sm text-gray-500">
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(event) =>
                    setCity(event.target.value)
                  }
                  placeholder="Enter your city"
                  disabled={submitting}
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                />
              </div>

              {/* Street Address */}
              <div>
                <label
                  htmlFor="details"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Street Address
                </label>

                <textarea
                  id="details"
                  value={details}
                  onChange={(event) =>
                    setDetails(event.target.value)
                  }
                  placeholder="Enter your street address"
                  rows={4}
                  disabled={submitting}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <FaPhone
                    size={13}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder="Enter your phone number"
                    disabled={submitting}
                    className="h-12 w-full rounded-xl border border-gray-300 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="mb-6">
              <h2 className="font-semibold text-gray-900">
                Payment Method
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose how you would like to pay.
              </p>
            </div>

            <div className="space-y-3">
              {/* Cash */}
              <button
                type="button"
                disabled={submitting}
                onClick={() => setPaymentMethod("cash")}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                  paymentMethod === "cash"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    paymentMethod === "cash"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <FaMoneyBillWave
                    size={18}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">
                    Cash on Delivery
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Pay when your order arrives.
                  </p>
                </div>

                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    paymentMethod === "cash"
                      ? "border-green-600"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "cash" && (
                    <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  )}
                </span>
              </button>

              {/* Online */}
              <button
                type="button"
                disabled={submitting}
                onClick={() => setPaymentMethod("online")}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                  paymentMethod === "online"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    paymentMethod === "online"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <FaCreditCard
                    size={18}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">
                    Pay Online
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Pay securely with your card.
                  </p>
                </div>

                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    paymentMethod === "online"
                      ? "border-green-600"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "online" && (
                    <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <aside className="overflow-hidden rounded-2xl border border-gray-200 bg-white lg:sticky lg:top-24">
          <div className="bg-slate-900 px-5 py-4">
            <h2 className="font-semibold text-white">
              Order Summary
            </h2>
          </div>

          <div className="space-y-4 p-5">
            <div className="flex justify-between gap-4 text-sm text-gray-600">
              <span>
                Subtotal ({numOfCartItems}{" "}
                {numOfCartItems === 1 ? "item" : "items"})
              </span>

              <span className="font-medium text-gray-900">
                {totalCartPrice.toLocaleString()} EGP
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm text-gray-600">
              <span>Shipping</span>

              <span className="font-medium text-green-600">
                Calculated at order
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-xl font-bold text-green-600">
                  {totalCartPrice.toLocaleString()} EGP
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={submitting}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-3 font-medium text-white transition-all hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              {submitting ? (
                <>
                  <FaSpinner
                    className="animate-spin"
                    size={15}
                    aria-hidden="true"
                  />

                  {paymentMethod === "cash"
                    ? "Placing Order..."
                    : "Redirecting to Payment..."}
                </>
              ) : paymentMethod === "cash" ? (
                "Place Order"
              ) : (
                "Proceed to Order"
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              Your payment information is securely processed.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}