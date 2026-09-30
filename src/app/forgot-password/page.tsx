
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import ForgotPasswordForm from "@/app/_components/forgotpasswordform/ForgotPasswordForm";

const features = [
  { icon: Mail, label: "Email Verification" },
  { icon: ShieldCheck, label: "Secure Reset" },
  { icon: Lock, label: "Encrypted" },
];

export default function ForgotPassword() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:grid lg:grid-cols-2 lg:gap-12 lg:px-8">
      {/* LEFT SIDE */}
      <section
        aria-labelledby="forgot-password-title"
        className="flex flex-col justify-center"
      >
        <div
          aria-hidden="true"
          className="relative mx-auto flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl bg-green-50 shadow-sm sm:h-80"
        >
          {/* Decorative background circles */}
          <div className="absolute left-10 top-8 h-20 w-20 rounded-full bg-green-100/70" />
          <div className="absolute right-16 top-10 h-14 w-14 rounded-full bg-green-100/70" />
          <div className="absolute bottom-6 right-10 h-24 w-24 rounded-full bg-green-100/70" />

          <div className="relative flex flex-col items-center gap-5">
            <div className="flex items-end gap-3">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-md">
                <Mail className="h-6 w-6 text-green-600" />
              </div>

              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-lg">
                <Lock className="h-10 w-10 text-green-600" />
              </div>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-md">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              <span className="h-2 w-2 rounded-full bg-green-300" />
              <span className="h-2 w-2 rounded-full bg-green-300" />
            </div>
          </div>
        </div>

        <h1
          id="forgot-password-title"
          className="mt-8 text-center text-3xl font-bold leading-tight text-slate-900 lg:text-4xl"
        >
          Reset Your Password
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-slate-600 sm:text-base">
          Don&apos;t worry, it happens to the best of us. We&apos;ll help you
          get back into your account in no time.
        </p>

        <div
          aria-label="Password reset features"
          className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-4"
        >
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-h-10 items-center gap-2"
            >
              <Icon
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-green-600"
              />

              <span className="text-sm font-medium text-slate-700">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section
        aria-labelledby="forgot-password-heading"
        className="mt-8 lg:mt-0"
      >
        <Card className="border-0 p-5 shadow-[0_6px_18px_rgba(0,0,0,0.16)] ring-0 sm:p-8">
          <div className="text-center">
            <p
              aria-label="FreshCart"
              className="text-3xl font-bold"
            >
              <span className="text-[#16A34A]">Fresh</span>Cart
            </p>

            <h2
              id="forgot-password-heading"
              className="mt-4 text-2xl font-bold text-slate-900"
            >
              Forgot Password?
            </h2>

            <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
              No worries, we&apos;ll send you a reset code
            </p>
          </div>

          <div className="mt-6">
            <ForgotPasswordForm />
          </div>
        </Card>
      </section>
    </main>
  );
}

