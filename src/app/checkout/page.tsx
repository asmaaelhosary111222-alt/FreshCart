"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FaArrowLeft,
  FaBuilding,
  FaCcMastercard,
  FaCcVisa,
  FaCheck,
  FaCreditCard,
  FaHome,
  FaInfoCircle,
  FaLock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  FaPlus,
  FaShieldAlt,
  FaShoppingBag,
  FaSpinner,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import { toast } from "sonner";

import { useCart } from "@/app/components/CartProvider";
import {
  getUserAddresses,
  type UserAddress,
} from "@/lib/getUserAddresses.action";
import { createCashOrder } from "@/lib/createCashOrder.action";
import { createCheckoutSession } from "@/lib/createCheckoutSession.action";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/lib/checkoutSchema";

/* ---------- shared style helpers (visual only) ---------- */

const card =
  "overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm";

const fieldClass = (hasError: boolean) =>
  `h-12 w-full rounded-xl border bg-white text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${hasError
    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
    : "border-gray-200 focus:border-green-500 focus:ring-green-100"
  }`;

export default function CheckoutPage() {
  const router = useRouter();

 const {
  items,
  loading: cartLoading,
  numOfCartItems,
  totalCartPrice,
} = useCart();

  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] =
    useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: "",
      details: "",
      phone: "",
      paymentMethod: "cash",
      usingSavedAddress: false,
    },
  });

  const paymentMethod = watch("paymentMethod");
  const usingSavedAddress = watch("usingSavedAddress");

  /* ---------- LOGIC: unchanged from the current page ---------- */

  useEffect(() => {
    let mounted = true;

    async function loadAddresses() {
      setAddressesLoading(true);

      try {
        const result = await getUserAddresses();

        if (!mounted) {
          return;
        }

        if (!result.success) {
          toast.error(
            result.message ??
            "Couldn't load your saved addresses."
          );

          setAddresses([]);
          return;
        }

        const loadedAddresses = result.data ?? [];

        setAddresses(loadedAddresses);

        if (loadedAddresses.length > 0) {
          const firstAddress = loadedAddresses[0];

          setSelectedAddressId(firstAddress._id);

          reset({
            city: firstAddress.city,
            details: firstAddress.details,
            phone: firstAddress.phone,
            paymentMethod: "cash",
            usingSavedAddress: true,
          });
        }
      } catch {
        if (!mounted) {
          return;
        }

        toast.error("Couldn't load your saved addresses.");
      } finally {
        if (mounted) {
          setAddressesLoading(false);
        }
      }
    }

    void loadAddresses();

    return () => {
      mounted = false;
    };
  }, [reset]);

  const selectSavedAddress = (address: UserAddress) => {
    setSelectedAddressId(address._id);

    reset({
      city: address.city,
      details: address.details,
      phone: address.phone,
      paymentMethod,
      usingSavedAddress: true,
    });
  };

  const useDifferentAddress = () => {
    setSelectedAddressId(null);

    reset({
      city: "",
      details: "",
      phone: "",
      paymentMethod,
      usingSavedAddress: false,
    });
  };

  const onSubmit = async (values: CheckoutFormValues) => {
    if (submitting) {
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      router.push("/cart");
      return;
    }

    setSubmitting(true);

    try {
      const shippingAddress = {
        details: values.details.trim(),
        phone: values.phone.trim(),
        city: values.city.trim(),
      };
      if (values.paymentMethod === "cash") {
        const result = await createCashOrder(shippingAddress);

        if (!result.success) {
          toast.error(
            result.message ?? "Couldn't place your order."
          );

          return;
        }

        router.push("/orders?success=true");

        return;
      }

      const redirectUrl = `${window.location.origin}/orders?success=true`;

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
        values.paymentMethod === "cash"
          ? "Couldn't place your order. Please try again."
          : "Couldn't start payment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- states ---------- */

  if (cartLoading || addressesLoading) {
    return <CheckoutSkeleton />;
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <FaShoppingBag size={26} className="text-gray-400" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Your cart is empty
        </h1>

        <p className="mt-2 text-gray-500">
          Add some products before continuing to checkout.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-green-600 px-6 py-2.5 font-medium text-white transition hover:bg-green-700"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  const differentSelected =
    addresses.length > 0 && selectedAddressId === null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 text-xs text-gray-500 sm:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-green-600">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link
            href="/cart"
            className="transition-colors hover:text-green-600"
          >
            Cart
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="font-medium text-gray-900">Checkout</span>
        </nav>

        {/* Page header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white shadow-md shadow-green-600/20 sm:h-14 sm:w-14"
              aria-hidden="true"
            >
              <FaShoppingBag size={20} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Complete Your Order
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                Review your items and complete your purchase
              </p>
            </div>
          </div>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-600 transition-colors hover:text-green-700"
          >
            <FaArrowLeft size={12} aria-hidden="true" />
            Back to Cart
          </Link>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px]">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* SHIPPING ADDRESS */}
              <section className={card}>
                <SectionHeader
                  icon={<FaMapMarkerAlt size={18} />}
                  title="Shipping Address"
                  subtitle="Where should we deliver your order?"
                />

                <div className="space-y-5 p-5 sm:p-6">
                  {addresses.length > 0 && (
                    <div>
                      <div className="mb-3 flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                          <FaHome size={14} aria-hidden="true" />
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Saved Addresses
                          </p>
                          <p className="text-xs text-gray-500">
                            Select a saved address or enter a new one below
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {addresses.map((address) => {
                          const selected = selectedAddressId === address._id;

                          return (
                            <button
                              key={address._id}
                              type="button"
                              onClick={() => selectSavedAddress(address)}
                              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${selected
                                  ? "border-green-600 bg-green-50/60 ring-1 ring-green-600"
                                  : "border-gray-200 bg-white hover:border-green-300"
                                }`}
                            >
                              <span
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${selected
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-500"
                                  }`}
                              >
                                <FaMapMarkerAlt size={15} aria-hidden="true" />
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block font-semibold text-gray-900">
                                  {address.name}
                                </span>
                                <span className="mt-0.5 block truncate text-sm text-gray-500">
                                  {address.details}
                                </span>
                                <span className="mt-0.5 block text-sm text-gray-500">
                                  {address.phone}
                                </span>
                                <span className="block text-sm text-gray-500">
                                  {address.city}
                                </span>
                              </span>

                              <RadioMark selected={selected} />
                            </button>
                          );
                        })}

                        {/* Use a different address */}
                        <button
                          type="button"
                          onClick={useDifferentAddress}
                          className={`flex w-full items-center gap-3 rounded-xl border-2 border-dashed p-4 text-left transition-all ${differentSelected
                              ? "border-green-600 bg-green-50"
                              : "border-green-300 bg-green-50/40 hover:bg-green-50"
                            }`}
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <FaPlus size={14} aria-hidden="true" />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-gray-900">
                              Use a different address
                            </span>
                            <span className="block text-sm text-gray-500">
                              Enter a new shipping address manually
                            </span>
                          </span>

                          <RadioMark selected={differentSelected} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Delivery information */}
                  <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <FaInfoCircle size={14} aria-hidden="true" />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        Delivery Information
                      </p>
                      <p className="text-sm text-blue-700">
                        Please ensure your address is accurate for smooth
                        delivery
                      </p>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      City <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FaBuilding
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={14}
                        aria-hidden="true"
                      />
                      <input
                        id="city"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        {...register("city")}
                        className={`${fieldClass(!!errors.city)} pl-11 pr-4`}
                      />
                    </div>

                    {errors.city && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  {/* Street address */}
                  <div>
                    <label
                      htmlFor="details"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Street Address <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FaMapMarkerAlt
                        className="pointer-events-none absolute left-4 top-4 text-gray-400"
                        size={14}
                        aria-hidden="true"
                      />
                      <textarea
                        id="details"
                        rows={4}
                        placeholder="Street name, building number, floor, apartment..."
                        {...register("details")}
                        className={`${fieldClass(!!errors.details)} h-auto resize-none py-3 pl-11 pr-4`}
                      />
                    </div>

                    {!usingSavedAddress && (
                      <p className="mt-1.5 text-xs text-gray-400">
                        Please provide at least 50 words for a complete
                        delivery address.
                      </p>
                    )}

                    {errors.details && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.details.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FaPhone
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={13}
                        aria-hidden="true"
                      />
                      <input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="01xxxxxxxxx"
                        {...register("phone")}
                        className={`${fieldClass(!!errors.phone)} pl-11 pr-4 sm:pr-44`}
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-xs text-gray-400 sm:block">
                        Egyptian numbers only
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-gray-400 sm:hidden">
                      Egyptian numbers only
                    </p>

                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <input type="hidden" {...register("usingSavedAddress")} />
                </div>
              </section>

              {/* PAYMENT METHOD */}
              <section className={card}>
                <SectionHeader
                  icon={<FaCreditCard size={18} />}
                  title="Payment Method"
                  subtitle="Choose how you'd like to pay"
                />

                <div className="space-y-3 p-5 sm:p-6">
                  <PaymentOption
                    selected={paymentMethod === "cash"}
                    icon={<FaMoneyBillWave size={18} aria-hidden="true" />}
                    title="Cash on Delivery"
                    description="Pay when your order arrives at your doorstep"
                    onClick={() =>
                      setValue("paymentMethod", "cash", {
                        shouldValidate: true,
                      })
                    }
                  />

                  <PaymentOption
                    selected={paymentMethod === "online"}
                    icon={<FaCreditCard size={18} aria-hidden="true" />}
                    title="Pay Online"
                    description="Secure payment with Credit/Debit Card via Stripe"
                    onClick={() =>
                      setValue("paymentMethod", "online", {
                        shouldValidate: true,
                      })
                    }
                    extra={
                      <span className="mt-2 flex items-center gap-2 text-gray-400">
                        <FaCcVisa size={26} aria-hidden="true" />
                        <FaCcMastercard size={26} aria-hidden="true" />
                      </span>
                    }
                  />

                  <div className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <FaLock size={14} aria-hidden="true" />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-green-900">
                        Secure &amp; Encrypted
                      </p>
                      <p className="text-sm text-green-700">
                        Your payment info is protected with 256-bit SSL
                        encryption
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* ORDER SUMMARY */}
            <aside className={`${card} lg:sticky lg:top-24`}>
              <SectionHeader
                icon={<FaShoppingBag size={18} />}
                title="Order Summary"
                subtitle={`${numOfCartItems} ${numOfCartItems === 1 ? "item" : "items"
                  }`}
              />

              <div className="space-y-5 p-5 sm:p-6">
                <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white">
                        <img
                          src={item.product.imageCover}
                          alt=""
                          className="h-full w-full object-contain p-1"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {item.product.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.count} × {item.price.toLocaleString()} EGP
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-bold text-gray-900">
                        {(item.price * item.count).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex justify-between gap-4 text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {totalCartPrice.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4 border-t border-gray-100 pt-3">
                    <span className="font-bold text-gray-900">
                      Estimated Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {totalCartPrice.toLocaleString()}{" "}
                      <span className="text-sm font-medium text-gray-500">
                        EGP
                      </span>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 font-semibold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
                    <>
                      <FaCheck size={14} aria-hidden="true" />
                      Place Order
                    </>
                  ) : (
                    <>
                      <FaLock size={14} aria-hidden="true" />
                      Proceed to Payment
                    </>
                  )}
                </button>

                <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
                  <TrustItem
                    icon={<FaShieldAlt size={16} className="text-green-600" />}
                    label="Secure"
                  />
                  <TrustItem
                    icon={<FaTruck size={16} className="text-blue-500" />}
                    label="Fast Delivery"
                  />
                  <TrustItem
                    icon={<FaUndo size={15} className="text-orange-500" />}
                    label="Easy Returns"
                  />
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}

/* ---------- presentational components ---------- */

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-green-600 px-5 py-4 text-white sm:px-6">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20"
        aria-hidden="true"
      >
        {icon}
      </span>

      <div className="min-w-0">
        <h2 className="text-lg font-bold leading-tight">{title}</h2>
        <p className="text-sm text-green-50">{subtitle}</p>
      </div>
    </div>
  );
}

function RadioMark({ selected }: { selected: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-green-600 bg-green-600" : "border-gray-300 bg-white"
        }`}
      aria-hidden="true"
    >
      {selected && <FaCheck size={10} className="text-white" />}
    </span>
  );
}

function PaymentOption({
  selected,
  icon,
  title,
  description,
  onClick,
  extra,
}: {
  selected: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  extra?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${selected
          ? "border-green-600 bg-green-50/60 ring-1 ring-green-600"
          : "border-gray-200 bg-white hover:border-green-300"
        }`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
          }`}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-gray-900">{title}</span>
        <span className="mt-0.5 block text-sm text-gray-500">
          {description}
        </span>
        {extra}
      </span>

      <RadioMark selected={selected} />
    </button>
  );
}

function TrustItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-1">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function CheckoutSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="mb-5 h-4 w-40 rounded bg-gray-200" />
          <div className="mb-8 h-14 w-80 rounded bg-gray-200" />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="space-y-6">
              <div className="h-[560px] rounded-2xl bg-gray-200" />
              <div className="h-64 rounded-2xl bg-gray-200" />
            </div>

            <div className="h-[520px] rounded-2xl bg-gray-200" />
          </div>
        </div>

        <span className="sr-only">Loading checkout...</span>
      </div>
    </main>
  );
}