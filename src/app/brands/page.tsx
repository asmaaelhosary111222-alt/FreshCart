import { FaTags } from "react-icons/fa";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default async function Brands() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );

  const data = await response.json();
  const brands: Brand[] = data.data;

  return (
    <div>
      {/* Hero */}
      <div className="w-full bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 text-sm text-purple-100">
            <span className="hover:underline">Home</span>
            <span className="mx-2">/</span>
            <span className="font-semibold text-white">Brands</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <FaTags className="h-7 w-7 text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                Top Brands
              </h1>

              <p className="mt-1 text-sm text-purple-50 sm:text-base">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 items-start gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="
                group relative self-start overflow-hidden rounded-xl
                border border-gray-200 bg-white
                shadow-sm

                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]

                hover:-translate-y-1
                hover:border-purple-300
                hover:shadow-lg
                hover:shadow-purple-100
              "
            >
              {/* Image */}
              <div
                className="
                  flex aspect-square items-center justify-center
                  overflow-hidden bg-gray-50 p-6
                "
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="
                    h-full w-full object-contain
                    transition-transform
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:scale-110
                  "
                />
              </div>

              {/* Bottom Info */}
              <div
                className="
                  h-[58px]
                  border-t border-gray-100
                  text-center
                  transition-colors
                  duration-500
                  ease-out
                  group-hover:border-purple-100
                "
              >
                {/* Brand Name */}
                <p
                  className="
                    pt-2
                    text-sm font-medium text-gray-800
                    transition-colors
                    duration-400
                    ease-out
                    group-hover:text-purple-600
                  "
                >
                  {brand.name}
                </p>

                {/* View Products */}
                <p
                  className="
                    text-xs font-medium text-purple-600
                    opacity-0
                    translate-y-1
                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  View Products
                  <span
                    className="
                      ml-1 inline-block
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}