import { notFound } from "next/navigation";
import type { Product } from "@/lib/types";
import Link from "next/link";
import ProductInfo from "@/app/components/ProductInfo";
import ProductGallery from "@/app/components/ProductGallery";
import ProductTabs from "../../components/ProductTabs";
import RelatedProducts from "@/app/components/RelatedProducts";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  if (!res.ok) notFound();

  const { data: product }: { data: Product } = await res.json();
  const category =
    typeof product.category === "object" ? product.category : undefined;
  const subcategoryName = product.subcategory?.[0]?.name;
  const categoryId =
  typeof product.category === "object" ? product.category?._id : undefined;

let relatedProducts: Product[] = [];

if (categoryId) {
  const relatedRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
  );
  const relatedData = await relatedRes.json();
  relatedProducts = (relatedData.data as Product[])
    .filter((p) => p.id !== product.id)
    .slice(0, 10);
}
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-600">Home</Link>

        {category && (
          <>
            <span>/</span>
            {category._id ? (
              <Link href={`/categories/${category._id}`} className="hover:text-green-600">
                {category.name}
              </Link>
            ) : (
              <span>{category.name}</span>
            )}
          </>
        )}

        {subcategoryName && (
          <>
            <span>/</span>
            <span>{subcategoryName}</span>
          </>
        )}

        <span>/</span>
        <span className="font-medium text-slate-900">{product.title}</span>
      </nav>
<div className="grid grid-cols-1 items-start gap-6 md:grid-cols-4">
  <div className="md:col-span-1">
<ProductGallery
  key={product.id}
  images={product.images ?? []}
  title={product.title}
/>
  </div>
  <div className="md:col-span-3">
    <ProductInfo key={product.id} product={product} />
  </div>
</div> 
<ProductTabs key={product.id} product={product} />
<RelatedProducts products={relatedProducts} />
</main>
  );

}