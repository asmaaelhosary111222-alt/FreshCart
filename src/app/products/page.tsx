import type { Product } from "@/lib/types";
import ProductCard from "../components/ProductCard";

interface ProductsResponse {
  data: Product[];
}

export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products"
  );

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  const data: ProductsResponse = await response.json();
  const products = data.data ?? [];

  return (
    <section
      aria-labelledby="products-heading"
      className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2
            id="products-heading"
            className="border-l-4 border-green-600 pl-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Featured <span className="text-green-600">Products</span>
          </h2>

          <p className="mt-1 pl-4 text-sm text-gray-500">
            Discover our latest products
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
          <p className="text-sm text-gray-500">
            No products are available right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}