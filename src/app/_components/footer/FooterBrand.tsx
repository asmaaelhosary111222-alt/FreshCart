import { ShoppingCart, Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const socials = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
];

export default function FooterBrand() {
  return (
    <div className="max-w-sm">
      <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-5 w-5 text-green-600"
        />
        <span className="text-lg font-bold text-gray-900">FreshCart</span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-400">
        FreshCart is your one-stop destination for quality products. From
        fashion to electronics, we bring you the best brands at competitive
        prices with a seamless shopping experience.
      </p>

      <address className="mt-5 space-y-3 text-sm not-italic">
        <a
          href="tel:+18001234567"
          className="group flex min-h-10 items-center gap-3 rounded-md text-slate-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <Phone
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-green-500 transition-transform duration-200 group-hover:scale-105"
          />
          <span>+1 (800) 123-4567</span>
        </a>

        <a
          href="mailto:support@freshcart.com"
          className="group flex min-h-10 items-center gap-3 rounded-md text-slate-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <Mail
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-green-500 transition-transform duration-200 group-hover:scale-105"
          />
          <span className="break-all">support@freshcart.com</span>
        </a>

        <div className="flex min-h-10 items-start gap-3 text-slate-300">
          <MapPin
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
          />
          <span>123 Commerce Street, New York, NY 10001</span>
        </div>
      </address>

      <div
        aria-label="Social media"
        className="mt-6 flex items-center gap-3"
      >
        {socials.map(({ icon: SocialIcon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all duration-200 hover:scale-105 hover:bg-green-600 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <SocialIcon
              aria-hidden="true"
              className="h-4 w-4"
            />
          </a>
        ))}
      </div>
    </div>
  );
}