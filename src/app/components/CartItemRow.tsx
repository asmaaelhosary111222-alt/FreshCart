"use client";

import Image from "next/image";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";

import type { CartItem } from "@/lib/types";
import { useCart } from "@/app/components/CartProvider";

export default function CartItemRow({
  item,
}: {
  item: CartItem;
}) {
  const {
    updateQuantity,
    removeFromCart,
    updatingProductId,
    removingProductId,
  } = useCart();

  const {
    product,
    count,
    price,
  } = item;

  const lineTotal = price * count;

  const atMin = count <= 1;

  const atMax =
    typeof product.quantity === "number" &&
    count >= product.quantity;

  const isUpdating =
    updatingProductId === product.id;

  const isRemoving =
    removingProductId === product.id;

  const isPending =
    isUpdating || isRemoving;

  return (
    <article
      className="
        relative
        rounded-xl
        border
        border-gray-200
        bg-white
        p-3
        shadow-sm
        transition-shadow
        hover:shadow-md
        sm:p-4
      "
    >
      <div className="flex min-w-0 gap-3 sm:gap-4">
        {/* Product image */}
        <div
          className="
            relative
            h-[78px]
            w-[78px]
            shrink-0
            overflow-hidden
            rounded-lg
            border
            border-gray-100
            bg-white
            sm:h-[96px]
            sm:w-[96px]
          "
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 78px, 96px"
            className="object-contain p-2"
          />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Product title */}
          <h3
            className="
              line-clamp-2
              pr-8
              text-sm
              font-semibold
              leading-5
              text-gray-900
              sm:text-base
              sm:leading-6
            "
          >
            {product.title}
          </h3>

          {/* Category */}
          {typeof product.category === "object" &&
            product.category?.name && (
              <div className="mt-1 flex min-w-0 items-center gap-2">
                <span
                  className="
                    max-w-[160px]
                    truncate
                    rounded-full
                    bg-green-50
                    px-2
                    py-0.5
                    text-[10px]
                    font-medium
                    text-green-700
                    sm:text-xs
                  "
                >
                  {product.category.name}
                </span>
              </div>
            )}

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-green-600 sm:text-base">
              {price.toLocaleString()} EGP
            </span>

            <span className="text-[10px] text-gray-400 sm:text-xs">
              per unit
            </span>
          </div>

          {/* Bottom controls */}
          <div className="mt-auto flex items-end justify-between gap-3 pt-3">
            {/* Quantity */}
            <div
              className="
                flex
                items-center
                overflow-hidden
                rounded-lg
                border
                border-gray-200
                bg-gray-50
              "
              aria-label={`Quantity for ${product.title}`}
            >
              <button
                type="button"
                disabled={atMin || isPending}
                aria-label={`Decrease quantity of ${product.title}`}
                onClick={() =>
                  void updateQuantity(
                    product.id,
                    count - 1
                  )
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  text-gray-500
                  transition-colors
                  hover:bg-gray-100
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:h-9
                  sm:w-9
                "
              >
                <FaMinus
                  size={9}
                  aria-hidden="true"
                />
              </button>

              <span
                className="
                  flex
                  h-8
                  min-w-8
                  items-center
                  justify-center
                  bg-white
                  px-2
                  text-sm
                  font-semibold
                  text-gray-900
                  sm:h-9
                  sm:min-w-9
                "
                aria-live="polite"
              >
                {isUpdating ? (
                  <FaSpinner
                    className="animate-spin text-green-600"
                    size={12}
                    aria-hidden="true"
                  />
                ) : (
                  count
                )}
              </span>

              <button
                type="button"
                disabled={atMax || isPending}
                aria-label={`Increase quantity of ${product.title}`}
                onClick={() =>
                  void updateQuantity(
                    product.id,
                    count + 1
                  )
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  bg-green-600
                  text-white
                  transition-colors
                  hover:bg-green-700
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:h-9
                  sm:w-9
                "
              >
                <FaPlus
                  size={9}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Total */}
            <div className="flex items-end gap-2 sm:gap-4">
              <div className="text-right">
                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Total
                </p>

                <p className="text-sm font-bold text-gray-900 sm:text-base">
                  {lineTotal.toLocaleString()}
                  <span className="ml-0.5 text-[10px] font-normal text-gray-500 sm:text-xs">
                    EGP
                  </span>
                </p>
              </div>

              {/* Delete */}
              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  void removeFromCart(product.id)
                }
                aria-label={
                  isRemoving
                    ? `Removing ${product.title}`
                    : `Remove ${product.title} from cart`
                }
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-red-50
                  text-red-500
                  transition-colors
                  hover:bg-red-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:h-9
                  sm:w-9
                "
              >
                {isRemoving ? (
                  <FaSpinner
                    className="animate-spin"
                    size={12}
                    aria-hidden="true"
                  />
                ) : (
                  <FaTrash
                    size={12}
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}