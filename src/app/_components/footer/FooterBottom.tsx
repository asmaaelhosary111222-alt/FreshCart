import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

const paymentMethods = [
  { icon: FaCcVisa, label: "Visa" },
  { icon: FaCcMastercard, label: "Mastercard" },
  { icon: FaCcPaypal, label: "PayPal" },
];

export default function FooterBottom() {
  return (
    <div className="w-full border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-center text-xs text-slate-500 sm:text-left">
          © 2026 FreshCart. All rights reserved.
        </p>

        <div
          aria-label="Accepted payment methods"
          className="flex items-center gap-4 text-slate-500"
        >
          {paymentMethods.map(({ icon: Icon, label }) => (
            <span
              key={label}
              title={label}
              aria-label={label}
              className="transition-colors duration-200 hover:text-slate-300"
            >
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}