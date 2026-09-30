import Link from "next/link";
import { FaLayerGroup } from "react-icons/fa";

interface SubCategory {
 _id: string;
 name: string;
 slug: string;
 category: string;
 createdAt: string;
 updatedAt: string;
 __v?: number;
}

interface SubCategoryResponse {
 data: SubCategory;
}

interface PageProps {
 params: Promise<{ id: string }>;
}

export default async function SubCategoryPage({
 params,
}: PageProps) {
 const { id } = await params;

 const response = await fetch(
  `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`,
  {
   cache: "no-store",
  }
 );

 if (!response.ok) {
  return (
   <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
    <h1 className="text-2xl font-bold text-gray-900">
     SubCategory not found
    </h1>

    <p className="mt-2 text-sm text-gray-500">
     We couldn't load this subcategory.
    </p>

    <Link
     href="/subcategories"
     className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
    >
     Back to SubCategories
    </Link>
   </main>
  );
 }

 const result: SubCategoryResponse =
  await response.json();

 const subcategory = result.data;

 if (!subcategory) {
  return null;
 }

 return (
  <main>
   <section className="w-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 py-12">
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
     <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-sm text-green-50"
     >
      <Link
       href="/"
       className="transition-colors hover:text-white hover:underline"
      >
       Home
      </Link>

      <span aria-hidden="true">/</span>

      <Link
       href="/subcategories"
       className="transition-colors hover:text-white hover:underline"
      >
       SubCategories
      </Link>

      <span aria-hidden="true">/</span>

      <span
       aria-current="page"
       className="font-semibold text-white"
      >
       {subcategory.name}
      </span>
     </nav>

     <div className="flex items-center gap-4">
      <div
       aria-hidden="true"
       className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20"
      >
       <FaLayerGroup className="h-7 w-7 text-white" />
      </div>

      <div className="min-w-0">
       <h1 className="text-3xl font-bold text-white sm:text-4xl">
        {subcategory.name}
       </h1>

       <p className="mt-1 text-sm text-green-50 sm:text-base">
        SubCategory details
       </p>
      </div>
     </div>
    </div>
   </section>

   <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
     <h2 className="text-xl font-bold text-gray-900">
      {subcategory.name}
     </h2>

     <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl bg-gray-50 p-4">
       <p className="text-xs font-medium text-gray-400">
        Name
       </p>

       <p className="mt-1 text-sm font-semibold text-gray-900">
        {subcategory.name}
       </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-4">
       <p className="text-xs font-medium text-gray-400">
        Slug
       </p>

       <p className="mt-1 break-words text-sm font-semibold text-gray-900">
        {subcategory.slug}
       </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-4">
       <p className="text-xs font-medium text-gray-400">
        Category ID
       </p>

       <p className="mt-1 break-all text-sm font-semibold text-gray-900">
        {subcategory.category}
       </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-4">
       <p className="text-xs font-medium text-gray-400">
        SubCategory ID
       </p>

       <p className="mt-1 break-all text-sm font-semibold text-gray-900">
        {subcategory._id}
       </p>
      </div>
     </div>

     <div className="mt-8 flex flex-wrap gap-3">
      <Link
       href="/subcategories"
       className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-5 text-sm font-medium text-gray-700 transition-colors hover:border-green-300 hover:text-green-600"
      >
       Back to SubCategories
      </Link>

      <Link
       href={`/categories/${subcategory.category}`}
       className="inline-flex min-h-11 items-center justify-center rounded-lg bg-green-600 px-5 text-sm font-medium text-white transition-colors hover:bg-green-700"
      >
       View Parent Category
      </Link>
     </div>
    </div>
   </section>
  </main>
 );
}