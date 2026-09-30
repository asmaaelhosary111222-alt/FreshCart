// lib/getCartId.ts

import { getMyToken } from "@/lib/getMyToken";

export async function getCartId() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v2/cart",
    {
      method: "GET",
      headers: {
        token,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  console.log("CART RESPONSE:", data);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to get cart");
  }

  const cartId = data?.data?._id;

  if (!cartId) {
    throw new Error("Cart ID was not returned by the API");
  }

  return cartId;
}