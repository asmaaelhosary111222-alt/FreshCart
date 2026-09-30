
// src/app/register/page.tsx

import Image from "next/image";
import Link from "next/link";

import { Star, Truck, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

import RegisterForm from "../_components/register/RegisterForm";

const features = [
  {
    icon: Star,
    title: "Premium Quality",
    description:
      "Premium quality products sourced from trusted suppliers.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery available in most areas",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Your data and payments are completely secure",
  },
];

export default function Register() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:grid lg:grid-cols-2 lg:gap-12 lg:px-8">
      {/* LEFT SIDE */}
      <section
        aria-labelledby="register-page-title"
        className="flex flex-col justify-center"
      >
        <h1
          id="register-page-title"
          className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
        >
          Welcome to <span className="text-green-600">FreshCart</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          Join thousands of happy customers who enjoy fresh groceries
          delivered right to their doorstep.
        </p>

        {/* FEATURES */}
        <div
          aria-label="FreshCart features"
          className="mt-8 space-y-6"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-4"
            >
              <div
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100"
              >
                <Icon className="h-5 w-5 text-green-600" />
              </div>

              <div className="min-w-0">
                <h2 className="font-semibold text-slate-900">
                  {title}
                </h2>

                <p className="mt-0.5 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* TESTIMONIAL */}
        <aside
          aria-label="Customer testimonial"
          className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/testimonial-avatar.png"
              alt="Sarah Johnson"
              width={40}
              height={40}
              sizes="40px"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold text-slate-900">
                Sarah Johnson
              </p>

              <div
                aria-label="5 out of 5 stars"
                className="flex"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>

          <blockquote className="mt-3 text-sm leading-6 italic text-slate-600">
            &quot;FreshCart has transformed my shopping experience. The
            quality of the products is outstanding, and the delivery is
            always on time. Highly recommend!&quot;
          </blockquote>
        </aside>
      </section>

      {/* RIGHT SIDE */}
      <section
        aria-labelledby="create-account-title"
        className="mt-8 lg:mt-0"
      >
        <Card className="border-slate-200 p-5 shadow-md sm:p-8">
          <h2
            id="create-account-title"
            className="text-2xl font-bold text-slate-900"
          >
            Create Your Account
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Start your fresh journey with us today
          </p>

          <div className="mt-6">
            <RegisterForm />
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="inline-flex min-h-10 items-center font-medium text-green-600 underline-offset-4 transition-colors hover:text-green-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              Sign In
            </Link>
          </p>
        </Card>
      </section>
    </main>
  );
}

