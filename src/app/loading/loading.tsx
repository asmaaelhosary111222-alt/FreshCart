import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main
      aria-label="Loading page"
      aria-busy="true"
      className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="space-y-6">
        {/* Page heading */}
        <Skeleton className="h-8 w-48 animate-pulse sm:w-64" />

        {/* Content preview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-gray-200 bg-white p-4"
            >
              <Skeleton className="h-40 w-full animate-pulse rounded-lg" />

              <Skeleton className="h-4 w-3/4 animate-pulse" />

              <Skeleton className="h-4 w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}