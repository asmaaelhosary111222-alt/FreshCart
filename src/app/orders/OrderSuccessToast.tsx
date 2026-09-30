"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { useCart } from "@/app/components/CartProvider";

export default function OrderSuccessToast() {
  const { resetCart } = useCart();

  useEffect(() => {
    resetCart();

    toast.success("Order placed successfully!");
  }, [resetCart]);

  return null;
}