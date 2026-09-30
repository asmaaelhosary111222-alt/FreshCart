import Link from "next/link";
import { FaOpencart } from "react-icons/fa6";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="FreshCart home"
      className="group inline-flex w-max shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
    >
      <FaOpencart
        aria-hidden="true"
        className="mx-1 text-green-600 transition-transform duration-200 group-hover:scale-105 sm:mx-2"
        size={45}
      />

      <span className="text-2xl font-bold text-gray-800 transition-colors duration-200 group-hover:text-green-600 sm:text-3xl">
        FreshCart
      </span>
    </Link>
  );
}