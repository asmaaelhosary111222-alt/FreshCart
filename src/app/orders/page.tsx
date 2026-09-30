import Link from "next/link";
import { PackageCheck } from "lucide-react";

import { getUserOrders } from "@/lib/getUserOrders.action";
import OrderSuccessToast from "./OrderSuccessToast";
import OrderList from "./OrderList";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;
  const result = await getUserOrders();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {success === "true" && <OrderSuccessToast />}

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-600 hover:underline">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <span aria-current="page" className="font-medium text-gray-900">
          My Orders
        </span>
      </nav>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-600">
            <PackageCheck className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              My Orders
            </h1>
            {result.success && (
              <p className="mt-1 text-sm text-gray-500">
                Track and manage your {result.data.length}{" "}
                {result.data.length === 1 ? "order" : "orders"}
              </p>
            )}
          </div>
        </div>

        <Link
          href="/products"
          className="text-sm font-medium text-green-600 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>

      {!result.success ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Couldn't load your orders
          </h3>
          <p className="mt-2 text-sm text-gray-500">{result.message}</p>
        </div>
      ) : result.data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
          <PackageCheck
            aria-hidden="true"
            className="mx-auto h-10 w-10 text-gray-400"
          />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No orders yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Start shopping and your orders will appear here.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
 <OrderList orders={result.data} />
      )}
    </div>
  );
}