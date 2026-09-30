import Link from "next/link";
import { FaHeadset } from "react-icons/fa";

export default function SupportInfo() {
  return (
 <Link href="/support"
      aria-label="Go to Support"
      className="
      group
        mx-2 flex items-center gap-2
        rounded-lg
        border-gray-200
        transition-all duration-300
        hover:bg-green-50
        md:mx-3 md:border-r md:pr-4
      "
    >
      <div
        aria-hidden="true"
        className="
          flex h-9 w-9 shrink-0 items-center justify-center
          rounded-full bg-green-50
          transition-transform duration-300
          group-hover:scale-105
        "
      >
        <FaHeadset className="text-green-600" size={16} />
      </div>

      <div className="hidden text-xs leading-tight lg:block">
        <p className="text-gray-500">Support</p>
        <p className="font-medium text-gray-800">24/7 Help</p>
      </div>
    </Link>
  );
}