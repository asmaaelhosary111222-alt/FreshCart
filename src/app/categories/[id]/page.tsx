import Image from "next/image";
import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import type { Product } from "@/lib/types";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface SubCategory {
  _id: string;
  name: string;
  category: string;
}

interface CategoryResponse {
  data: Category;
}

interface ProductsResponse {
  data: Product[];
}

interface SubCategoriesResponse {
  data: SubCategory[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryProducts({
  params,
}: PageProps) {
  const { id } = await params;

  const [
    categoryRes,
    productsRes,
    subcategoriesRes,
  ] = await Promise.all([
    fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        cache: "no-store",
      }
    ),

    fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
      {
        cache: "no-store",
      }
    ),

    fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
      {
        cache: "no-store",
      }
    ),
  ]);

  if (!categoryRes.ok) {
    return null;
  }

  const categoryData: CategoryResponse =
    await categoryRes.json();

  if (!categoryData.data) {
    return null;
  }

  const category = categoryData.data;

  let products: Product[] = [];

  if (productsRes.ok) {
    const productsData: ProductsResponse =
      await productsRes.json();

    products = productsData.data ?? [];
  }

  let subcategories: SubCategory[] = [];

if (subcategoriesRes.ok) {
  const subcategoriesData: SubCategoriesResponse =
    await subcategoriesRes.json();

  subcategories = (subcategoriesData.data ?? []).filter(
    (subcategory) => subcategory.category === id
  );
}

  return (
    <main>
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-2 text-sm text-green-50"
          >
            <Link
              href="/"
              className="rounded-sm transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <Link
              href="/categories"
              className="rounded-sm transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600"
            >
              Categories
            </Link>

            <span aria-hidden="true">/</span>

            <span
              aria-current="page"
              className="font-semibold text-white"
            >
              {category.name}
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white/20">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                {category.name}
              </h1>

              <p className="mt-1 text-sm text-green-50 sm:text-base">
                Browse products in {category.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SubCategories */}
      {subcategories.length > 0 && (
        <section
          aria-labelledby="subcategories-heading"
          className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2
              id="subcategories-heading"
              className="text-lg font-bold text-gray-900 sm:text-xl"
            >
              SubCategories
            </h2>

            <Link
              href="/subcategories"
              className="text-sm font-medium text-green-600 transition-colors hover:text-green-700 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory._id}
                href={`/subcategories/${subcategory._id}`}
                className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-green-400 hover:bg-green-100 hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95"
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Active filter + count */}
      <section
        aria-label="Category filters"
        className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
      >
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500">
            Active Filters:
          </span>

          <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-green-700">
            <span>{category.name}</span>

            <Link
              href="/categories"
              aria-label={`Clear ${category.name} filter`}
              className="inline-flex h-5 w-5 items-center justify-center rounded-full text-green-700 transition-colors hover:bg-green-200 hover:text-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              <span aria-hidden="true">×</span>
            </Link>
          </span>

          <Link
            href="/categories"
            className="rounded-sm text-gray-500 underline underline-offset-2 transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Clear all
          </Link>
        </div>

        <p
          aria-live="polite"
          className="mb-4 text-sm text-slate-500"
        >
          Showing {products.length} products
        </p>
      </section>

      {/* Products */}
      <section
        aria-labelledby="category-products-heading"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
      >
        <h2
          id="category-products-heading"
          className="sr-only"
        >
          Products in {category.name}
        </h2>

        {products.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                No products found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                There are currently no products in this category.
              </p>

              <Link
                href="/categories"
                className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:scale-95"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}