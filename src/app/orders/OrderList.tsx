"use client";

import { useState } from "react";

import type { Order } from "@/lib/types";
import OrderCard from "./OrderCard";
import OrderDetails from "./OrderDetails";

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const isExpanded = expandedOrderId === order._id;

        return (
          <div key={order._id} className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <OrderCard
              order={order}
              isExpanded={isExpanded}
              onToggle={() =>
                setExpandedOrderId(isExpanded ? null : order._id)
              }
            />
            {isExpanded && (
              <div id={`order-details-${order._id}`}>
                <OrderDetails order={order} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}