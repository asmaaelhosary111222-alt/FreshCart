
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import type { Product } from "@/lib/types";

interface WishlistContextValue {
  items: Product[];
  loading: boolean;
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

const API_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

interface WishlistResponse {
  status: string;
  message?: string;
  data?: Product[];
}

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken;

  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const resetWishlist = useCallback(() => {
    setItems([]);
  }, []);

  const fetchWishlist = useCallback(async (): Promise<boolean> => {
    if (!token) {
      resetWishlist();
      return false;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        headers: {
          token,
        },
      });

      if (!res.ok) {
        toast.error("Couldn't load your wishlist. Please try again.");
        return false;
      }

      const json: WishlistResponse = await res.json();

      if (json.status !== "success") {
        toast.error("Couldn't load your wishlist. Please try again.");
        return false;
      }

      setItems(json.data ?? []);

      return true;
    } catch {
      toast.error(
        "Couldn't load your wishlist. Please check your connection."
      );

      return false;
    } finally {
      setLoading(false);
    }
  }, [token, resetWishlist]);

  useEffect(() => {
    if (status === "authenticated") {
      void fetchWishlist();
      return;
    }

    if (status === "unauthenticated") {
      resetWishlist();
      setLoading(false);
    }
  }, [status, fetchWishlist, resetWishlist]);

  const isWishlisted = useCallback(
    (productId: string) => {
      return items.some((product) => product.id === productId);
    },
    [items]
  );

  const toggle = useCallback(
    async (productId: string) => {
      if (!token) {
        toast.error("Please log in to use your wishlist.");
        return;
      }

      const currentlyWishlisted = isWishlisted(productId);

      try {
        const res = currentlyWishlisted
          ? await fetch(`${API_URL}/${productId}`, {
              method: "DELETE",
              headers: {
                token,
              },
            })
          : await fetch(API_URL, {
              method: "POST",
              headers: {
                token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ productId }),
            });

        if (!res.ok) {
          toast.error(
            currentlyWishlisted
              ? "Couldn't remove this item from your wishlist."
              : "Couldn't add this item to your wishlist."
          );
          return;
        }

        const json: WishlistResponse = await res.json();

        if (json.status !== "success") {
          toast.error(
            currentlyWishlisted
              ? "Couldn't remove this item from your wishlist."
              : "Couldn't add this item to your wishlist."
          );
          return;
        }

        // The mutation response is not treated as authoritative.
        // Refresh the wishlist so local state matches the server.
        const refreshed = await fetchWishlist();

        if (!refreshed) {
          toast.error(
            "Your wishlist was updated, but we couldn't refresh it."
          );
          return;
        }

        toast.success(
          currentlyWishlisted
            ? "Removed from wishlist."
            : "Added to wishlist."
        );
      } catch {
        toast.error(
          currentlyWishlisted
            ? "Couldn't remove this item. Please check your connection."
            : "Couldn't add this item. Please check your connection."
        );
      }
    },
    [token, isWishlisted, fetchWishlist]
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        loading,
        isWishlisted,
        toggle,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside a WishlistProvider"
    );
  }

  return context;
}

