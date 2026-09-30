import Image from "next/image";
import { Calendar, Package, MapPin, ChevronDown, ChevronUp } from "lucide-react";

import type { Order } from "@/lib/types";

interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}

function getOrderStatus(order: Order) {
  if (order.isDelivered) {
    return { label: "Delivered", className: "bg-green-100 text-green-700" };
  }
  if (order.isPaid) {
    return { label: "Paid", className: "bg-blue-100 text-blue-700" };
  }
  return { label: "Processing", className: "bg-orange-100 text-orange-700" };
}

function formatOrderDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function OrderCard({ order, isExpanded, onToggle }: OrderCardProps) {
  const status = getOrderStatus(order);
  const itemCount = order.cartItems.reduce((sum, item) => sum + item.count, 0);
  const extraProductCount = order.cartItems.length - 1;
  const firstProduct = order.cartItems[0]?.product;

  return (
 <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">        
<div className="flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50">
            {firstProduct && (
              <Image
                src={firstProduct.imageCover}
                alt={firstProduct.title}
                fill
                className="object-contain p-1"
              />
            )}
            {extraProductCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-xs font-medium text-white">
                +{extraProductCount}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
            >
              {status.label}
            </span>

            <p className="text-sm font-semibold text-gray-900">
              # {order.id}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {formatOrderDate(order.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Package className="h-3.5 w-3.5" aria-hidden="true" />
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {order.shippingAddress.city}
              </span>
            </div>
          </div>
        </div>

  <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:gap-2">         <p className="text-lg font-bold text-gray-900">
  {order.totalOrderPrice.toLocaleString()}{" "}
  <span className="text-sm font-normal text-gray-500">EGP</span>
</p>

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={`order-details-${order._id}`}
            className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            {isExpanded ? "Hide" : "Details"}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

  );
}