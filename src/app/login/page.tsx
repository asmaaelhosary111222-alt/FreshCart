

import Link from "next/link";
import Image from "next/image";

import { Truck, ShieldCheck, Clock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaStar, FaLock } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginForm from "../_components/LoginForm";

const benefits = [
  { icon: Truck, label: "Free Delivery" },
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Clock, label: "24/7 Support" },
];

export default function Login() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:grid lg:grid-cols-2 lg:gap-12 lg:px-8">
      {/* LEFT SIDE */}
      <section
        aria-labelledby="login-page-title"
        className="flex flex-col justify-center"
      >
        <div className="overflow-hidden rounded-2xl bg-slate-50 shadow-sm">
          <Image
            src="/Loginimage.png"
            alt="FreshCart grocery shopping"
            width={600}
            height={500}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>

        <h1
          id="login-page-title"
          className="mt-8 text-3xl font-bold leading-tight text-slate-900 lg:text-4xl"
        >
          FreshCart - Your One-Stop Shop for Fresh Products
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          Join thousands of happy customers who trust FreshCart for their
          daily grocery needs
        </p>

        <div
          aria-label="FreshCart benefits"
          className="mt-6 flex flex-wrap gap-x-6 gap-y-4"
        >
          {benefits.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-h-10 items-center gap-2"
            >
              <Icon
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-[#16A34A]"
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
        aria-labelledby="login-heading"
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
              id="login-heading"
              className="mt-1 text-2xl font-bold text-slate-900"
            >
              Welcome Back!
            </h2>

            <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="mt-6 space-y-3">
            <Button
              type="button"
              variant="outline"
              className="min-h-11 w-full gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <FcGoogle
                aria-hidden="true"
                className="h-5 w-5 shrink-0"
              />
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="min-h-11 w-full gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <FaFacebook
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-blue-600"
              />
              Continue with Facebook
            </Button>
          </div>

          {/* DIVIDER */}
          <div
            role="separator"
            aria-label="Continue with email"
            className="my-6 flex items-center gap-3"
          >
            <div
              aria-hidden="true"
              className="h-px flex-1 bg-slate-200"
            />

            <span className="shrink-0 text-center text-[11px] font-medium tracking-wide text-slate-500 sm:text-xs">
              OR CONTINUE WITH EMAIL
            </span>

            <div
              aria-hidden="true"
              className="h-px flex-1 bg-slate-200"
            />
          </div>

          {/* EMAIL LOGIN FORM */}
          <LoginForm />

          {/* REGISTER LINK */}
          <p className="mt-6 text-center text-sm font-medium text-slate-600">
            New to FreshCart?{" "}
            <Link
              href="/register"
              className="inline-flex min-h-10 items-center font-semibold text-green-600 underline-offset-4 transition-colors hover:text-green-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              Create an account
            </Link>
          </p>

          {/* TRUST INFORMATION */}
          <div className="mt-6 grid grid-cols-3 border-t border-slate-100 pt-4 text-center text-xs font-medium text-slate-500">
            <span className="flex min-h-10 items-center justify-center gap-1">
              <FaLock
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0"
              />
              <span>SSL Secured</span>
            </span>

            <span className="flex min-h-10 items-center justify-center gap-1">
              <IoIosPeople
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
              />
              <span>50K+ Users</span>
            </span>

            <span className="flex min-h-10 items-center justify-center gap-1">
              <FaStar
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0"
              />
              <span>4.9 Rating</span>
            </span>
          </div>
        </Card>
      </section>
    </main>
  );
}
