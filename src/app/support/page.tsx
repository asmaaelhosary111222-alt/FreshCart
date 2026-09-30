import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaHeadset,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaQuestion,
  FaTwitter,
} from "react-icons/fa";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | FreshCart",
  description: "We'd love to hear from you. Get in touch with our team.",
};

// Change if your Help Center lives at a different route.
const HELP_CENTER_HREF = "/help";

interface ContactInfo {
  title: string;
  icon: IconType;
  subtitle?: string;
  lines?: string[];
  link?: { label: string; href: string };
}

const CONTACT_INFO: ContactInfo[] = [
  {
    title: "Phone",
    icon: FaPhoneAlt,
    subtitle: "Mon-Fri from 8am to 6pm",
    link: { label: "+1 (800) 123-4567", href: "tel:+18001234567" },
  },
  {
    title: "Email",
    icon: FaEnvelope,
    subtitle: "We'll respond within 24 hours",
    link: { label: "support@freshcart.com", href: "mailto:support@freshcart.com" },
  },
  {
    title: "Office",
    icon: FaMapMarkerAlt,
    lines: ["123 Commerce Street", "New York, NY 10001", "United States"],
  },
  {
    title: "Business Hours",
    icon: FaClock,
    lines: ["Monday - Friday: 8am - 6pm", "Saturday: 9am - 4pm", "Sunday: Closed"],
  },
];

// Replace "#" with the real profile URLs.
const SOCIALS: { label: string; href: string; icon: IconType }[] = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "Twitter", href: "#", icon: FaTwitter },
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
];

const cardClass =
  "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6";

function InfoCard({ item }: { item: ContactInfo }) {
  const Icon = item.icon;
  return (
    <div className={`${cardClass} flex items-start gap-4`}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 sm:h-14 sm:w-14">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        {item.subtitle && (
          <p className="mt-1 text-gray-500">{item.subtitle}</p>
        )}
        {item.lines?.map((line) => (
          <p key={line} className="text-gray-500">
            {line}
          </p>
        ))}
        {item.link && (
          <a
            href={item.link.href}
            className="mt-1 inline-block break-all text-lg font-medium text-green-600 transition-colors duration-300 hover:text-green-700"
          >
            {item.link.label}
          </a>
        )}
      </div>
    </div>
  );
}

export default function SupportPage() {
  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-5 sm:py-14 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm sm:mb-8 sm:text-base">
            <ol className="flex items-center gap-2 text-white/80">
              <li>
                <Link href="/" className="transition-colors duration-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-white">
                Contact Us
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm sm:h-20 sm:w-20">
              <FaHeadset className="h-7 w-7 sm:h-9 sm:w-9" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Contact Us
              </h1>
              <p className="mt-1 text-base text-white/90 sm:text-xl">
                We&apos;d love to hear from you. Get in touch with our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-5 sm:py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:grid-cols-3">
          {/* Left: contact cards */}
          <div className="space-y-6 md:col-span-2 lg:col-span-1">
            {CONTACT_INFO.map((item) => (
              <InfoCard key={item.title} item={item} />
            ))}

            <div className={cardClass}>
              <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600 hover:text-white hover:shadow-md"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form + help center */}
          <div className="space-y-6 md:col-span-3 lg:col-span-2">
            <ContactForm />

            <div className="flex items-start gap-4 rounded-2xl border border-green-100 bg-green-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
                  <FaQuestion className="h-3 w-3" aria-hidden="true" />
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Looking for quick answers?
                </h3>
                <p className="mt-1 text-gray-600">
                  Check out our Help Center for frequently asked questions about
                  orders, shipping, returns, and more.
                </p>
                <Link
                  href={HELP_CENTER_HREF}
                  className="mt-3 inline-flex items-center gap-1 font-medium text-green-600 transition-all duration-300 hover:gap-2 hover:text-green-700"
                >
                  Visit Help Center <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}