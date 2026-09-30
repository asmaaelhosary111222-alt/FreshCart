import Image from "next/image";
import { ClipboardList, MapPin, Receipt } from "lucide-react";

import type { Order } from "@/lib/types";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const subtotal = order.totalOrderPrice - order.shippingPrice;

  return (
    <div className="border-t border-gray-100 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <ClipboardList className="h-4 w-4 text-green-600" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-gray-900">Order Items</h3>
      </div>

      <div className="space-y-3">
        {order.cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                fill
                className="object-contain p-1"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {item.product.title}
              </p>
              <p className="text-xs text-gray-500">
                {item.count} × {item.price.toLocaleString()} EGP
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-gray-900">
                {(item.count * item.price).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">EGP</p>
            </div>
          </div>
        ))}
      </div>

 <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <h4 className="text-sm font-semibold text-gray-900">
              Delivery Address
            </h4>
          </div>
          <p className="text-sm text-gray-700">{order.shippingAddress.city}</p>
          <p className="text-sm text-gray-500">
            {order.shippingAddress.details}
          </p>
          <p className="text-sm text-gray-500">{order.shippingAddress.phone}</p>
        </div>

        <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Receipt className="h-4 w-4 text-yellow-600" aria-hidden="true" />
            <h4 className="text-sm font-semibold text-gray-900">
              Order Summary
            </h4>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString()} EGP</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{order.shippingPrice.toLocaleString()} EGP</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-yellow-200 pt-2 font-semibold text-gray-900">
              <span>Total</span>
              <span>{order.totalOrderPrice.toLocaleString()} EGP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}