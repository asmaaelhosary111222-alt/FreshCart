"use server";

import { getMyToken } from "@/lib/getMyToken";
import { getUserCart } from "@/lib/getUserCart.action";

const API_URL = "https://ecommerce.routemisr.com/api/v2/orders";

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export async function createCashOrder(
  shippingAddress: ShippingAddress
) {
  const token = await getMyToken();

  if (!token) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  try {
    const cartResult = await getUserCart();

    if (!cartResult.success || !cartResult.data) {
      return {
        success: false,
        message: cartResult.message ?? "Couldn't load your cart.",
        data: null,
      };
    }

    const cartId = cartResult.data.cartId;

    if (!cartId) {
      return {
        success: false,
        message: "Your cart is empty or unavailable.",
        data: null,
      };
    }

    const response = await fetch(`${API_URL}/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        shippingAddress,
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      return {
        success: false,
        message: data.message ?? "Couldn't place your order.",
        data: null,
      };
    }

    return {
      success: true,
      message: data.message ?? "Order created",
      data,
    };
  } catch {
    return {
      success: false,
      message:
        "Couldn't place your order. Please check your connection.",
      data: null,
    };
  }
}