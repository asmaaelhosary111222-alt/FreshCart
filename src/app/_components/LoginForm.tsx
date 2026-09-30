"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import loginSchema, {
  type LoginFormData,
} from "@/lib/schemas/loginSchema";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Login successful!");
        router.push("/");
        return;
      }

      toast.error("Invalid email or password.");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Login form"
    >
      {/* EMAIL */}
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
            placeholder="Enter your email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={isSubmitting}
            {...register("email")}
            className={`h-11 bg-white pl-9 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 hover:border-green-400 focus:border-green-500"
            }`}
          />
        </div>

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
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-900"
          >
            Password
          </label>

          <Link
            href="/forgot-password"
            className="inline-flex min-h-10 items-center text-sm font-medium text-green-600 underline-offset-4 transition-colors hover:text-green-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative mt-1.5">
          <Lock
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />

          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={
              errors.password ? "password-error" : undefined
            }
            disabled={isSubmitting}
            {...register("password")}
            className={`h-11 bg-white pl-9 pr-12 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 ${
              errors.password
                ? "border-red-500 focus:border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 hover:border-green-400 focus:border-green-500"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            disabled={isSubmitting}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50"
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
      </div>

      {/* KEEP SIGNED IN */}
      <div className="flex min-h-10 items-center gap-2">
        <Checkbox
          id="keepSignedIn"
          disabled={isSubmitting}
        />

        <label
          htmlFor="keepSignedIn"
          className="cursor-pointer text-sm text-slate-600"
        >
          Keep me signed in
        </label>
      </div>

      {/* SUBMIT */}
      <Button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="min-h-11 w-full bg-[#16A34A] font-semibold text-white transition-all duration-200 hover:bg-[#138a3f] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}

