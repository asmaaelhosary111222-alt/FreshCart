"use server";

import { getMyToken } from "@/lib/getMyToken";
import { getUserCart } from "@/lib/getUserCart.action";

const API_URL = "https://ecommerce.routemisr.com/api/v1/orders/checkout-session";

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export async function createCheckoutSession(
  shippingAddress: ShippingAddress,
  redirectUrl: string
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
    // Get the current cart from the server.
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

    const url = new URL(`${API_URL}/${cartId}`);

    url.searchParams.set("url", redirectUrl);

    const response = await fetch(url.toString(), {
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
        message: data.message ?? "Couldn't create checkout session.",
        data: null,
      };
    }

    return {
      success: true,
      message: data.message ?? "Checkout session created.",
      data: data.session,
    };
  } catch {
    return {
      success: false,
      message:
        "Couldn't create checkout session. Please check your connection.",
      data: null,
    };
  }
}