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

import type { CartItem, CartResponse } from "@/lib/types";

import { getUserCart } from "@/lib/getUserCart.action";
import { addToCart as addToCartAction } from "@/lib/addToCart.action";
import { updateProductQtn } from "@/lib/updateProductQtn.action";
import { removeCartItem } from "@/lib/removeCartItem.action";
import { clearCart as clearCartAction } from "@/lib/clearCart.action";

interface CartContextValue {
  items: CartItem[];
  loading: boolean;
  numOfCartItems: number;
  totalCartPrice: number;

  addingProductId: string | null;
  updatingProductId: string | null;
  removingProductId: string | null;
  clearingCart: boolean;

  addToCart: (
    productId: string,
    quantity?: number
  ) => Promise<boolean>;

  updateQuantity: (
    productId: string,
    count: number
  ) => Promise<boolean>;

  removeFromCart: (productId: string) => Promise<void>;

  clearCart: () => Promise<void>;
  refreshCart: () => Promise<boolean>;
  resetCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { status } = useSession();

  const [items, setItems] = useState<CartItem[]>([]);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const [loading, setLoading] = useState(false);

  const [addingProductId, setAddingProductId] =
    useState<string | null>(null);

  const [updatingProductId, setUpdatingProductId] =
    useState<string | null>(null);

  const [removingProductId, setRemovingProductId] =
    useState<string | null>(null);

  const [clearingCart, setClearingCart] = useState(false);

  const resetCart = useCallback(() => {
    setItems([]);
    setNumOfCartItems(0);
    setTotalCartPrice(0);
  }, []);

  /**
   * Apply cart data and calculate the navbar badge
   * from the TOTAL quantity of all products.
   *
   * Example:
   * Product A × 3 = 3
   * Product B × 2 = 2
   * Navbar badge = 5
   */
  const applyCartData = useCallback(
    (cart: CartResponse) => {
      const products = cart.data.products ?? [];

      const totalQuantity = products.reduce(
        (total, item) => total + item.count,
        0
      );

      setItems(products);
      setNumOfCartItems(totalQuantity);
      setTotalCartPrice(
        cart.data.totalCartPrice ?? 0
      );
    },
    []
  );

  /**
   * Refresh cart data without showing
   * the full cart loading state.
   */
  const refreshCart = useCallback(
    async (): Promise<boolean> => {
      const result = await getUserCart();

      if (!result.success || !result.data) {
        return false;
      }

      applyCartData(result.data as CartResponse);

      return true;
    },
    [applyCartData]
  );

  /**
   * Initial/full cart loading.
   */
  const fetchCart = useCallback(
    async (): Promise<boolean> => {
      setLoading(true);

      try {
        const result = await getUserCart();

        if (!result.success || !result.data) {
          toast.error(
            result.message ??
            "Couldn't load your cart. Please try again."
          );

          return false;
        }

        applyCartData(result.data as CartResponse);

        return true;
      } catch {
        toast.error(
          "Couldn't load your cart. Please check your connection."
        );

        return false;
      } finally {
        setLoading(false);
      }
    },
    [applyCartData]
  );

  useEffect(() => {
    if (status === "authenticated") {
      void fetchCart();
      return;
    }

    if (status === "unauthenticated") {
      resetCart();
      setLoading(false);
    }
  }, [status, fetchCart, resetCart]);

  
  /**
   * Update the quantity of an existing cart item.
   */
  const updateQuantity = useCallback(
  async (
    productId: string,
    count: number
  ): Promise<boolean> => {
    if (status !== "authenticated") {
      return false;
    }

    if (updatingProductId === productId) {
      return false;
    }

    if (!Number.isInteger(count) || count < 1) {
      return false;
    }

    setUpdatingProductId(productId);

    try {
      const result = await updateProductQtn(
        productId,
        count
      );

      if (!result.success) {
        toast.error(
          result.message ??
            "Couldn't update quantity."
        );

        return false;
      }

      const refreshed = await refreshCart();

      if (!refreshed) {
        toast.error(
          "Quantity updated, but the cart could not be refreshed."
        );

        return false;
      }

      return true;
    } catch {
      toast.error(
        "Couldn't update quantity. Please check your connection."
      );

      return false;
    } finally {
      setUpdatingProductId(null);
    }
  },
  [
    status,
    updatingProductId,
    refreshCart,
  ]
);

const addToCart = useCallback(
  async (
    productId: string,
    quantity: number = 1
  ): Promise<boolean> => {
    if (status !== "authenticated") {
      toast.error(
        "Please log in to add items to your cart."
      );
      return false;
    }

    if (addingProductId === productId) {
      return false;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      toast.error("Invalid quantity.");
      return false;
    }

    setAddingProductId(productId);

    try {
      const existingItem = items.find(
        (item) => item.product.id === productId
      );

      // Product already exists:
      // add the selected quantity to its current quantity.
      if (existingItem) {
        return await updateQuantity(
          productId,
          existingItem.count + quantity
        );
      }

      // Product does not exist:
      // POST creates the product with quantity 1.
      const result = await addToCartAction(
        productId
      );

      if (!result.success || !result.data) {
        toast.error(
          result.message ??
            "Couldn't add this item to your cart."
        );

        return false;
      }

      applyCartData(
        result.data as CartResponse
      );

      // If the user selected more than 1,
      // immediately set the cart quantity.
      if (quantity > 1) {
        return await updateQuantity(
          productId,
          quantity
        );
      }

      return true;
    } catch {
      toast.error(
        "Couldn't add this item. Please check your connection."
      );

      return false;
    } finally {
      setAddingProductId(null);
    }
  },
  [
    status,
    addingProductId,
    items,
    applyCartData,
    updateQuantity,
  ]
);
  


  /**
   * Add product to cart with the requested quantity.
   *
   * Example:
   * addToCart(productId, 3)
   * → adds 3 units of that product.
   */
  
  /**
   * Remove a product completely from the cart.
   */
  const removeFromCart = useCallback(
    async (productId: string) => {
      if (status !== "authenticated") {
        return;
      }

      if (removingProductId === productId) {
        return;
      }

      setRemovingProductId(productId);

      try { 
        const result = await removeCartItem(
          productId
        );

        if (!result.success) {
          toast.error(
            result.message ??
            "Couldn't remove this item."
          );

          return;
        }

        const refreshed = await refreshCart();

        if (!refreshed) {
          toast.error(
            "Item removed, but the cart could not be refreshed."
          );
        }
      } catch {
        toast.error(
          "Couldn't remove this item. Please check your connection."
        );
      } finally {
        setRemovingProductId(null);
      }
    },
    [
      status,
      removingProductId,
      refreshCart,
    ]
  );

  /**
   * Clear the entire cart.
   */
  const clearCart = useCallback(async () => {
    if (status !== "authenticated") {
      return;
    }

    if (clearingCart) {
      return;
    }

    setClearingCart(true);

    try {
      const result = await clearCartAction();

      if (!result.success) {
        toast.error(
          result.message ??
          "Couldn't clear your cart."
        );

        return;
      }

      const refreshed = await refreshCart();

      if (!refreshed) {
        toast.error(
          "Cart cleared, but the cart could not be refreshed."
        );
      }
    } catch {
      toast.error(
        "Couldn't clear your cart. Please check your connection."
      );
    } finally {
      setClearingCart(false);
    }
  }, [
    status,
    clearingCart,
    refreshCart,
  ]);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        numOfCartItems,
        totalCartPrice,

        addingProductId,
        updatingProductId,
        removingProductId,
        clearingCart,

        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
}