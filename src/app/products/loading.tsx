
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 10;

export default function ProductsLoading() {
  return (
    <main aria-label="Loading products" aria-busy="true">
      {/* Page header skeleton */}
      <section
        aria-hidden="true"
        className="w-full bg-gradient-to-r from-green-600 to-green-400 py-10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mb-5 h-4 w-32 bg-white/30" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 shrink-0 rounded-2xl bg-white/30 sm:h-16 sm:w-16" />

            <div className="space-y-2">
              <Skeleton className="h-9 w-48 bg-white/30 sm:w-64" />
              <Skeleton className="h-4 w-64 bg-white/30 sm:w-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Product grid skeleton */}
      <section
        aria-label="Loading product list"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <Skeleton className="aspect-square w-full" />

              <div className="space-y-3 p-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-24" />

                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

