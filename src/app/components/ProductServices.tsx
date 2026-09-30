import {
  FaTruck,
  FaUndoAlt,
  FaShieldAlt,
} from "react-icons/fa";

const services = [
  {
    icon: FaTruck,
    title: "Free Delivery",
    text: "Orders over $50",
  },
  {
    icon: FaUndoAlt,
    title: "30 Days Return",
    text: "Money back",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Payment",
    text: "100% Protected",
  },
];

export default function ProductServices() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
      {services.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-gray-50"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600"
            aria-hidden="true"
          >
            <Icon size={16} />
          </span>

          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900">
              {title}
            </p>

            <p className="text-xs text-gray-500">
              {text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}