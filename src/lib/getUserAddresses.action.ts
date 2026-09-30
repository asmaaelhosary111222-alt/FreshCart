"use server";

import { getMyToken } from "@/lib/getMyToken";

const API_URL = "https://ecommerce.routemisr.com/api/v1/addresses";

export interface UserAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface AddressesResponse {
  results: number;
  status: string;
  data: UserAddress[];
}

export async function getUserAddresses() {
  const token = await getMyToken();

  if (!token) {
    return {
      success: false,
      message: "Unauthorized",
      data: [] as UserAddress[],
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

    const data: AddressesResponse = await response.json();

    if (!response.ok || data.status !== "success") {
      return {
        success: false,
        message: "Couldn't load your saved addresses.",
        data: [] as UserAddress[],
      };
    }

    return {
      success: true,
      message: "Addresses loaded successfully.",
      data: data.data ?? [],
    };
  } catch {
    return {
      success: false,
      message:
        "Couldn't load your saved addresses. Please try again.",
      data: [] as UserAddress[],
    };
  }
}