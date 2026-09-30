"use client";

import { useState } from "react";
import { FaChevronDown, FaHeadset, FaPaperPlane } from "react-icons/fa";
import { toast } from "sonner";

const SUBJECTS = [
  "Order Inquiry",
  "Shipping & Delivery",
  "Returns & Refunds",
  "Product Question",
  "Account Help",
  "Other",
];

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 text-base text-gray-900 " +
  "placeholder:text-gray-400 outline-none transition-all duration-300 " +
  "focus:border-green-500 focus:ring-4 focus:ring-green-500/15 sm:px-5";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);

    // TODO: no support/contact endpoint has been provided yet.
    // Replace this block with the real request once the API is known.
    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success("Your message has been sent. We'll get back to you soon.");
    form.reset();
    setSubmitting(false);
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
      <header className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 sm:h-14 sm:w-14">
          <FaHeadset className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Send us a Message
          </h2>
          <p className="text-sm text-gray-500 sm:text-base">
            Fill out the form and we&apos;ll get back to you
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="support-name" className={labelClass}>
              Full Name
            </label>
            <input
              id="support-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="John Doe"
              className={`${fieldClass} h-12 sm:h-14`}
            />
          </div>
          <div>
            <label htmlFor="support-email" className={labelClass}>
              Email Address
            </label>
            <input
              id="support-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="john@example.com"
              className={`${fieldClass} h-12 sm:h-14`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="support-subject" className={labelClass}>
            Subject
          </label>
          <div className="relative">
            <select
              id="support-subject"
              name="subject"
              required
              defaultValue=""
              className={`${fieldClass} h-12 appearance-none pr-12 sm:h-14`}
            >
              <option value="" disabled>
                Select a subject
              </option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <FaChevronDown
              className="pointer-events-none absolute right-5 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-500"
              aria-hidden="true"
            />
          </div>
        </div>

        <div>
          <label htmlFor="support-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="support-message"
            name="message"
            required
            rows={6}
            placeholder="How can we help you?"
            className={`${fieldClass} resize-none py-4`}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-8 text-base font-semibold text-white shadow-md shadow-green-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:h-14 sm:w-auto"
        >
          <FaPaperPlane className="h-4 w-4" aria-hidden="true" />
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}