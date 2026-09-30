export default function OrdersLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 h-4 w-32 animate-pulse rounded bg-gray-200" />

      <div className="mb-8 flex items-center gap-4">
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-gray-200" />
        <div className="space-y-2">
          <div className="h-7 w-40 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-56 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border border-gray-200 bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}