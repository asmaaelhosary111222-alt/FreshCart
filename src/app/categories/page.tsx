import Image from "next/image";
import Link from "next/link";
import { FaLayerGroup } from "react-icons/fa";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface CategoriesResponse {
  data: Category[];
}

export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );

  if (!response.ok) {
    throw new Error("Failed to load categories.");
  }

  const data: CategoriesResponse = await response.json();
  const categories = data.data ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 text-sm text-green-50"
          >
            <Link
              href="/"
              className="rounded-sm transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600"
            >
              Home
            </Link>

            <span
              aria-hidden="true"
              className="mx-2"
            >
              /
            </span>

            <span
              aria-current="page"
              className="font-semibold text-white"
            >
              Categories
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20"
            >
              <FaLayerGroup className="h-7 w-7 text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                All Categories
              </h1>

              <p className="mt-1 text-sm text-green-50 sm:text-base">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        aria-labelledby="categories-heading"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <h2
          id="categories-heading"
          className="sr-only"
        >
          Product categories
        </h2>

        {categories.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                No categories available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                There are currently no categories to display.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category._id}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:scale-[0.98]"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <p className="px-2 py-3 text-center text-sm font-medium text-gray-800 transition-colors duration-200 group-hover:text-green-600 sm:text-base">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}