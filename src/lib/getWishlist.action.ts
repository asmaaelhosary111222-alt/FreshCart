"use server";

import { getMyToken } from "@/lib/getMyToken";
import type { Product } from "@/lib/types";

const API_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function getWishlist() {
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
      method: "GET",
      headers: {
        token,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      return {
        success: false,
        message: data.message ?? "Couldn't load your wishlist.",
        data: null,
      };
    }

    return {
      success: true,
      message: data.message,
      data: (data.data ?? []) as Product[],
    };
  } catch {
    return {
      success: false,
      message:
        "Couldn't load your wishlist. Please check your connection.",
      data: null,
    };
  }
}