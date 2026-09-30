import Link from "next/link";
import CategoriesDropdown from "./CategoriesDropdown";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/products",
    label: "Shop",
  },
  {
    href: "/brands",
    label: "Brands",
  },
];

export default function NavLinks() {
  return (
    <div className="flex items-center gap-4 text-sm font-medium text-gray-700 lg:gap-6">
      {links.slice(0, 2).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="inline-flex min-h-11 items-center rounded-md px-1 transition-colors duration-200 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          {link.label}
        </Link>
      ))}

      <CategoriesDropdown />

      <Link
        href="/brands"
        className="inline-flex min-h-11 items-center rounded-md px-1 transition-colors duration-200 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
      >
        Brands
      </Link>
    </div>
  );
}