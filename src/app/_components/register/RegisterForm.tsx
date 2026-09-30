
"use client";

import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/schemas/registerSchema";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  });

  const password = watch("password");
  const terms = watch("terms");

  async function onSubmit(data: RegisterFormValues) {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            rePassword: data.rePassword,
            phone: data.phone,
          }),
        }
      );

      const result = await response.json();

      if (result.message === "success") {
        toast.success("Account created successfully!");
        router.push("/login");
        return;
      }

      toast.error(
        result.message || "Registration failed. Please try again."
      );
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const passwordStrength =
    password.length >= 12
      ? "Strong"
      : password.length >= 8
        ? "Medium"
        : "Weak";

  const passwordStrengthWidth =
    password.length >= 12
      ? "w-full"
      : password.length >= 8
        ? "w-2/3"
        : "w-1/3";

  const passwordStrengthColor =
    password.length >= 12
      ? "bg-green-500"
      : password.length >= 8
        ? "bg-yellow-400"
        : "bg-red-400";

  return (
    <>
      {/* SOCIAL SIGN UP */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          className="min-h-11 gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <FcGoogle
            aria-hidden="true"
            className="h-5 w-5 shrink-0"
          />
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          className="min-h-11 gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <FaFacebook
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-blue-600"
          />
          Facebook
        </Button>
      </div>

      {/* DIVIDER */}
      <div
        role="separator"
        aria-label="Register with email"
        className="my-6 flex items-center gap-3"
      >
        <div
          aria-hidden="true"
          className="h-px flex-1 bg-slate-200"
        />

        <span className="text-sm font-medium text-slate-500">
          or
        </span>

        <div
          aria-hidden="true"
          className="h-px flex-1 bg-slate-200"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
        aria-label="Create account form"
      >
        {/* NAME */}
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-slate-900"
          >
            Name<span className="text-red-500"> *</span>
          </label>

          <Input
            id="name"
            type="text"
            placeholder="Ali"
            autoComplete="name"
            disabled={isSubmitting}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
            className={`mt-1.5 h-11 bg-white transition-colors focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 hover:border-green-400 focus:border-green-500"
            }`}
          />

          <div className="min-h-5 pt-1">
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="text-sm font-medium text-red-500"
              >
                {errors.name.message}
              </p>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-900"
          >
            Email<span className="text-red-500"> *</span>
          </label>

          <Input
            id="email"
            type="email"
            placeholder="ali@example.com"
            autoComplete="email"
            disabled={isSubmitting}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            className={`mt-1.5 h-11 bg-white transition-colors focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 hover:border-green-400 focus:border-green-500"
            }`}
          />

          <div className="min-h-5 pt-1">
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="text-sm font-medium text-red-500"
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-900"
          >
            Password<span className="text-red-500"> *</span>
          </label>

          <div className="relative mt-1.5">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              autoComplete="new-password"
              disabled={isSubmitting}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={
                errors.password
                  ? "password-error password-strength-help"
                  : "password-strength-help"
              }
              {...register("password")}
              className={`h-11 bg-white pr-12 transition-colors focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus-visible:ring-red-500"
                  : "border-slate-200 hover:border-green-400 focus:border-green-500"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              disabled={isSubmitting}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              aria-pressed={showPassword}
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              ) : (
                <Eye
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              )}
            </button>
          </div>

          <div className="min-h-5 pt-1">
            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="text-sm font-medium text-red-500"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {/* PASSWORD STRENGTH */}
          {password && (
            <div
              className="mt-1 flex items-center gap-2"
              aria-live="polite"
            >
              <div
                role="progressbar"
                aria-label="Password strength"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={
                  password.length >= 12
                    ? 100
                    : password.length >= 8
                      ? 66
                      : 33
                }
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200"
              >
                <div
                  aria-hidden="true"
                  className={`h-full rounded-full transition-all duration-200 ${passwordStrengthWidth} ${passwordStrengthColor}`}
                />
              </div>

              <span className="min-w-12 text-right text-xs font-medium text-slate-500">
                {passwordStrength}
              </span>
            </div>
          )}

          <p
            id="password-strength-help"
            className="mt-1 text-xs text-slate-500"
          >
            Must be at least 8 characters
          </p>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label
            htmlFor="rePassword"
            className="text-sm font-medium text-slate-900"
          >
            Confirm Password
            <span className="text-red-500"> *</span>
          </label>

          <div className="relative mt-1.5">
            <Input
              id="rePassword"
              type={showRePassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="new-password"
              disabled={isSubmitting}
              aria-invalid={errors.rePassword ? "true" : "false"}
              aria-describedby={
                errors.rePassword
                  ? "rePassword-error"
                  : undefined
              }
              {...register("rePassword")}
              className={`h-11 bg-white pr-12 transition-colors focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 ${
                errors.rePassword
                  ? "border-red-500 focus:border-red-500 focus-visible:ring-red-500"
                  : "border-slate-200 hover:border-green-400 focus:border-green-500"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowRePassword((previous) => !previous)
              }
              disabled={isSubmitting}
              aria-label={
                showRePassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              aria-pressed={showRePassword}
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50"
            >
              {showRePassword ? (
                <EyeOff
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              ) : (
                <Eye
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              )}
            </button>
          </div>

          <div className="min-h-5 pt-1">
            {errors.rePassword && (
              <p
                id="rePassword-error"
                role="alert"
                className="text-sm font-medium text-red-500"
              >
                {errors.rePassword.message}
              </p>
            )}
          </div>
        </div>

        {/* PHONE */}
        <div>
          <label
            htmlFor="phone"
            className="text-sm font-medium text-slate-900"
          >
            Phone Number
            <span className="text-red-500"> *</span>
          </label>

                   <Input
            id="phone"
            type="tel"
            placeholder="+1 234 567 8900"
            autoComplete="tel"
            disabled={isSubmitting}
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
            className={`mt-1.5 h-11 bg-white transition-colors focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 ${
              errors.phone
                ? "border-red-500 focus:border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 hover:border-green-400 focus:border-green-500"
            }`}
          />

          <div className="min-h-5 pt-1">
            {errors.phone && (
              <p
                id="phone-error"
                role="alert"
                className="text-sm font-medium text-red-500"
              >
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

