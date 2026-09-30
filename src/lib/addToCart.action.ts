"use server";

import { getMyToken } from "@/lib/getMyToken";

const API_URL = "https://ecommerce.routemisr.com/api/v2/cart";

export async function addToCart(productId: string) {
  const token = await getMyToken();

  if (!token) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      return {
        success: false,
        message:
          data.message ?? "Couldn't add product to cart.",
        data: null,
      };
    }

    return {
      success: true,
      message: data.message,
      data,
    };
  } catch {
    return {
      success: false,
      message:
        "Couldn't add product to cart. Please check your connection.",
      data: null,
    };
  }
}