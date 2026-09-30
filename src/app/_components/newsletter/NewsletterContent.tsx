"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, Leaf, Truck, Tag, ArrowRight } from "lucide-react";
import {
  newsletterSchema,
  type NewsletterFormValues,
} from "@/lib/schemas/newsletterSchema";

const pills = [
  { icon: Leaf, label: "Fresh Picks Weekly" },
  { icon: Truck, label: "Free Delivery Codes" },
  { icon: Tag, label: "Members-Only Deals" },
];

export default function NewsletterContent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    // No newsletter API endpoint exists in the supplied component,
    // so do not pretend the subscription was sent to a backend.
    console.log(values);

    toast.success("Email validated successfully.");
    reset();
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600"
        >
          <Mail className="h-5 w-5 text-white" />
        </div>

        <div>
          <p className="text-xs font-bold tracking-wide text-green-600">
            NEWSLETTER
          </p>

          <p className="text-xs text-gray-500">
            50,000+ subscribers
          </p>
        </div>
      </div>

      <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
        Get the Freshest Updates{" "}
        <span className="text-green-600">Delivered Free</span>
      </h2>

      <p className="mt-3 text-sm text-gray-600 sm:text-base">
        Weekly recipes, seasonal offers &amp; exclusive member perks.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {pills.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100"
            >
              <Icon className="h-3.5 w-3.5 text-green-600" />
            </div>

            <span className="text-sm font-medium text-slate-700">
              {label}
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={
                errors.email
                  ? "newsletter-email-error"
                  : undefined
              }
              disabled={isSubmitting}
              {...register("email")}
              className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-800 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-gray-200 focus:border-green-500 focus:ring-green-500/30"
              }`}
            />

            {errors.email && (
              <p
                id="newsletter-email-error"
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}

            {!isSubmitting && (
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4"
              />
            )}
          </button>
        </div>
      </form>

      <p className="mt-3 text-xs text-gray-500">
        ✨ Unsubscribe anytime. No spam, ever.
      </p>
    </div>
  );
}