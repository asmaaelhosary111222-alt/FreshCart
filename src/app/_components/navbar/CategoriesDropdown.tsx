import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

interface Category {
  _id: string;
  name: string;
}

interface CategoriesResponse {
  data: Category[];
}

export default async function CategoriesDropdown() {
  let categories: Category[] = [];

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Categories API failed: ${response.status}`);
    }

    const data: CategoriesResponse = await response.json();

    categories = data.data ?? [];
  } catch (error) {
    console.error("Categories dropdown fetch failed:", error);
  }

  return (
    <details className="group relative">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-md px-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
        <span>Categories</span>

        <FaChevronDown
          aria-hidden="true"
          size={10}
          className="transition-transform duration-200 group-open:rotate-180"
        />
      </summary>

      <div className="absolute left-0 top-full z-50 w-52 pt-2">
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
          <Link
            href="/categories"
            className="flex min-h-11 items-center px-4 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 hover:text-green-600 focus-visible:bg-gray-50 focus-visible:text-green-600 focus-visible:outline-none"
          >
            All Categories
          </Link>

          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="flex min-h-11 items-center px-4 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-green-600 focus-visible:bg-gray-50 focus-visible:text-green-600 focus-visible:outline-none"
            >
              {category.name}
            </Link>
          ))}

          {categories.length === 0 && (
            <p className="px-4 py-3 text-sm text-gray-500">
              No categories available.
            </p>
          )}
        </div>
      </div>
    </details>
  );
}