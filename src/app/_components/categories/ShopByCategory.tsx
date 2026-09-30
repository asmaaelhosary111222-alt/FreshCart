import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface CategoriesResponse {
  data: Category[];
}

export default async function ShopByCategory() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load categories");
  }

  const data: CategoriesResponse = await response.json();
  const categories = data.data ?? [];

  return (
    <section
      aria-labelledby="shop-by-category-title"
      className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="shop-by-category-title"
          className="border-l-4 border-green-600 pl-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Shop By <span className="text-green-600">Category</span>
        </h2>

        <Link
          href="/categories"
          className="group inline-flex min-h-10 w-fit items-center gap-1 px-1 font-medium text-green-600 transition-colors duration-200 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <span>View All Categories</span>

          <FiArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white px-4 text-center">
          <p className="text-sm text-gray-500">
            No categories are available right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="
                group
                flex
                min-h-[142px]
                flex-col
                items-center
                justify-center
                gap-2.5
                rounded-xl
                border
                border-gray-200
                bg-white
                p-3
                transition-all
                duration-300
                ease-out
                hover:-translate-y-0.5
                hover:shadow-md
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-green-600
                focus-visible:ring-offset-2
                active:scale-[0.98]

                sm:min-h-[150px]
                sm:p-4
              "
            >
              <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full bg-gray-100 sm:h-20 sm:w-20">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <p className="text-center text-sm font-medium text-slate-800 sm:text-base">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}