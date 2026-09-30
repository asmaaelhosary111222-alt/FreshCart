"use server";

import { getMyToken } from "@/lib/getMyToken";

const API_URL = "https://ecommerce.routemisr.com/api/v2/cart";

export async function getUserCart() {
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
    console.log("CART API RESPONSE:", JSON.stringify(data, null, 2));

    if (!response.ok || data.status !== "success") {
      return {
        success: false,
        message: data.message ?? "Couldn't load your cart.",
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
      message: "Couldn't load your cart. Please check your connection.",
      data: null,
    };
  }
}