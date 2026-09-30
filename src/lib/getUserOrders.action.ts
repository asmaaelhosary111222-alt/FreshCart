"use server";
import { getMyToken } from "@/lib/getMyToken";
import { getUserId } from "@/lib/getUserId";
import type { Order } from "@/lib/types";

const API_URL = "https://ecommerce.routemisr.com/api/v1/orders/user";

export async function getUserOrders() {
  const token = await getMyToken();
  const userId = await getUserId();


  if (!token || !userId) {
    return {
      success: false,
      message: "Unauthorized",
      data: [] as Order[],
    };
  }

  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "GET",
      headers: {
        token,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Couldn't load your orders.",
        data: [] as Order[],
      };
    }

    const data = await response.json();

    // This endpoint returns a bare array, not { status, data }, unlike the other actions — confirmed against a real response.
    return {
      success: true,
      message: "Orders loaded successfully.",
      data: (data ?? []) as Order[],
    };
  } catch {
    return {
      success: false,
      message: "Couldn't load your orders. Please check your connection.",
      data: [] as Order[],
    };
  }
}