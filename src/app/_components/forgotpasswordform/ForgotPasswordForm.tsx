
"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, KeyRound, Lock, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import forgotPasswordSchema, {
  type ForgotPasswordFormData,
} from "@/lib/schemas/forgotPasswordSchema";

export default function ForgotPasswordForm() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (submitting) return;

    setSubmitting(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        }
      );

      const result = await res.json();

      if (res.ok && result.statusMsg === "success") {
        toast.success(
          result.message || "Reset code sent to your email."
        );

        // The next verification/reset route is intentionally not added
        // because it does not currently exist in the supplied project.
      } else {
        toast.error(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* STEP INDICATOR */}
      <div
        aria-label="Password reset progress: email step"
        className="mt-6 flex items-center justify-center gap-2"
      >
        <div
          aria-current="step"
          aria-label="Step 1: Email"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16A34A]"
        >
          <Mail
            aria-hidden="true"
            className="h-4 w-4 text-white"
          />
        </div>

        <div
          aria-hidden="true"
          className="h-px w-8 bg-slate-200 sm:w-10"
        />

        <div
          aria-label="Step 2: Verification code"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100"
        >
          <KeyRound
            aria-hidden="true"
            className="h-4 w-4 text-slate-400"
          />
        </div>

        <div
          aria-hidden="true"
          className="h-px w-8 bg-slate-200 sm:w-10"
        />

        <div
          aria-label="Step 3: New password"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100"
        >
          <Lock
            aria-hidden="true"
            className="h-4 w-4 text-slate-400"
          />
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 space-y-5"
        aria-label="Forgot password form"
      >
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-900"
          >
            Email Address
          </label>

          <div className="relative mt-1.5">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              disabled={submitting}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={
                errors.email ? "forgot-email-error" : undefined
              }
              {...register("email")}
              className={`h-11 bg-white pl-9 transition-colors focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus-visible:ring-red-500"
                  : "border-slate-200 hover:border-green-400 focus:border-green-500"
              }`}
            />
          </div>

          <div className="min-h-5 pt-1">
            {errors.email && (
              <p
                id="forgot-email-error"
                role="alert"
                className="text-sm font-medium text-red-500"
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="min-h-11 w-full bg-[#16A34A] font-semibold text-white transition-all duration-200 hover:bg-[#138a3f] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Sending..." : "Send Reset Code"}
        </Button>
      </form>

      {/* BACK TO LOGIN */}
      <Link
        href="/login"
        className="mt-4 flex min-h-10 items-center justify-center gap-1.5 rounded-md text-sm font-medium text-green-600 underline-offset-4 transition-colors hover:text-green-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
      >
        <ArrowLeft
          aria-hidden="true"
          className="h-4 w-4"
        />
        Back to Sign In
      </Link>

      {/* SIGN IN REMINDER */}
      <div className="mt-6 flex flex-wrap justify-center border-t border-slate-100 pt-4 text-sm font-medium text-slate-600">
        <span>Remember your password?</span>

        <Link
          href="/login"
          className="ml-1 font-semibold text-green-600 underline-offset-4 transition-colors hover:text-green-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

