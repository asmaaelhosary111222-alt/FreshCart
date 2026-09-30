"use server";

import { getMyToken } from "@/lib/getMyToken";

const API_URL = "https://ecommerce.routemisr.com/api/v2/cart";

export async function clearCart() {
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
      method: "DELETE",
      headers: {
        token,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Couldn't clear your cart. Request failed with status ${response.status}.`,
        data: null,
      };
    }

    return {
      success: true,
      message: "Cart cleared successfully.",
      data: null,
    };
  } catch {
    return {
      success: false,
      message:
        "Couldn't clear your cart. Please check your connection.",
      data: null,
    };
  }
}