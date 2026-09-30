"use server";

import { getMyToken } from "@/lib/getMyToken";

const API_URL = "https://ecommerce.routemisr.com/api/v2/cart";

export async function removeCartItem(productId: string) {
  const token = await getMyToken();

  if (!token) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: {
        token,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Couldn't remove product from cart. Request failed with status ${response.status}.`,
        data: null,
      };
    }

    return {
      success: true,
      message: "Product removed from cart.",
      data: null,
    };
  } catch {
    return {
      success: false,
      message:
        "Couldn't remove product from cart. Please check your connection.",
      data: null,
    };
  }
}