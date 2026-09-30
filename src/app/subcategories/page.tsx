import Link from "next/link";
import { FaLayerGroup } from "react-icons/fa";

interface SubCategory {
 _id: string;
 name: string;
 slug: string;
 category: string;
 createdAt: string;
 updatedAt: string;
}

interface SubCategoriesResponse {
 results: number;
 metadata: {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
 };
 data: SubCategory[];
}

interface PageProps {
 searchParams: Promise<{
  page?: string;
 }>;
}

export default async function SubCategoriesPage({
 searchParams,
}: PageProps) {
 const params = await searchParams;

 const requestedPage = Number.parseInt(
  params.page ?? "1",
  10
 );

 const page =
  Number.isInteger(requestedPage) && requestedPage > 0
   ? requestedPage
   : 1;

 const response = await fetch(
  `https://ecommerce.routemisr.com/api/v1/subcategories?limit=10&page=${page}`,
  {
   cache: "no-store",
  }
 );

 if (!response.ok) {
  throw new Error("Failed to load subcategories.");
 }

 const data: SubCategoriesResponse =
  await response.json();

 const subcategories = data.data ?? [];
 const currentPage = data.metadata.currentPage;
 const numberOfPages = data.metadata.numberOfPages;

 return (
  <main>
   {/* Hero */}
   <section className="w-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 py-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
     <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-2 text-sm text-green-50"
     >
      <Link
       href="/"
       className="rounded-sm transition-colors hover:text-white hover:underline"
      >
       Home
      </Link>

      <span aria-hidden="true">/</span>

      <span
       aria-current="page"
       className="font-semibold text-white"
      >
       SubCategories
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
        All SubCategories
       </h1>

       <p className="mt-1 text-sm text-green-50 sm:text-base">
        Browse all product subcategories
       </p>
      </div>
     </div>
    </div>
   </section>

   {/* SubCategories */}
   <section
    aria-labelledby="subcategories-heading"
    className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
   >
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
     <div>
      <h2
       id="subcategories-heading"
       className="text-xl font-bold text-gray-900 sm:text-2xl"
      >
       SubCategories
      </h2>

      <p className="mt-1 text-sm text-gray-500">
       Showing page {currentPage} of {numberOfPages}
      </p>
     </div>

     <p className="text-sm text-gray-500">
      {data.results} total subcategories
     </p>
    </div>

    {subcategories.length === 0 ? (
     <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
      <div>
       <h3 className="text-base font-semibold text-gray-900">
        No subcategories available
       </h3>

       <p className="mt-1 text-sm text-gray-500">
        There are currently no subcategories to display.
       </p>
      </div>
     </div>
    ) : (
     <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
       {subcategories.map((subcategory) => (
        <Link
         key={subcategory._id}
         href={`/subcategories/${subcategory._id}`}
         className="group rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
         <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-transform duration-200 group-hover:scale-105">
          <FaLayerGroup
           size={22}
           aria-hidden="true"
          />
         </div>

         <p className="mt-4 line-clamp-2 text-sm font-medium text-gray-800 transition-colors group-hover:text-green-600 sm:text-base">
          {subcategory.name}
         </p>
        </Link>
       ))}
      </div>

      {/* Pagination */}
      {numberOfPages > 1 && (
       <nav
        aria-label="SubCategories pagination"
        className="mt-8 flex flex-wrap items-center justify-center gap-2"
       >
        {currentPage > 1 ? (
         <Link
          href={`/subcategories?page=${currentPage - 1}`}
          className="inline-flex min-h-10 items-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-green-300 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
         >
          Previous
         </Link>
        ) : (
         <span className="inline-flex min-h-10 items-center rounded-lg border border-gray-100 bg-gray-50 px-4 text-sm font-medium text-gray-300">
          Previous
         </span>
        )}

        {Array.from(
         { length: numberOfPages },
         (_, index) => index + 1
        ).map((pageNumber) => (
         <Link
          key={pageNumber}
          href={`/subcategories?page=${pageNumber}`}
          aria-current={
           pageNumber === currentPage
            ? "page"
            : undefined
          }
          className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 ${pageNumber === currentPage
            ? "bg-green-600 text-white"
            : "border border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:text-green-600"
           }`}
         >
          {pageNumber}
         </Link>
        ))}

{currentPage < numberOfPages ? (         <Link
          href={`/subcategories?page=${currentPage + 1}`}
          className="inline-flex min-h-10 items-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-green-300 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
         >
          Next
         </Link>
        ) : (
         <span className="inline-flex min-h-10 items-center rounded-lg border border-gray-100 bg-gray-50 px-4 text-sm font-medium text-gray-300">
          Next
         </span>
        )}
       </nav>
      )}
     </>
    )}
   </section>
  </main>
 );
}