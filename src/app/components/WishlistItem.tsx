"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaTrash,
  FaShoppingCart,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "sonner";

import type { Product } from "@/lib/types";
import { useWishlist } from "./WishlistProvider";
import { useCart } from "./CartProvider";

interface WishlistItemProps {
  product: Product;
}

export default function WishlistItem({
  product,
}: WishlistItemProps) {
  const { toggle } = useWishlist();

  const {
    addToCart,
    addingProductId,
  } = useCart();

  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name;

  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount !== null &&
    product.priceAfterDiscount < product.price;

  const displayPrice = hasDiscount
    ? product.priceAfterDiscount
    : product.price;

  const inStock =
    (product.quantity ?? 0) > 0;

  const isAdding =
    addingProductId === product.id;

  const handleAddToCart = async () => {
    if (!inStock || isAdding) {
      return;
    }

    const success = await addToCart(product.id);

    if (!success) {
      return;
    }

    toast.success("Product added to cart", {
      description: product.title,
    });
  };

  const handleRemove = () => {
    toggle(product.id);
  };

  return (
    <>
      {/* Desktop / Tablet */}
      <div className="hidden grid-cols-[3.4fr_1fr_0.75fr_1fr] items-center gap-3 px-3.5 py-3 md:grid">
        {/* Product */}
        <Link
          href={`/products/${product.id}`}
          className="group flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              sizes="48px"
              className="object-contain p-1"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium leading-4 text-slate-900 transition-colors group-hover:text-green-600">
              {product.title}
            </p>

            {categoryName && (
              <p className="mt-0.5 truncate text-[9px] leading-3 text-gray-400">
                {categoryName}
              </p>
            )}
          </div>
        </Link>

        {/* Price */}
        <div className="min-w-0">
          <span className="whitespace-nowrap text-[11px] font-semibold text-slate-900">
            {displayPrice} EGP
          </span>

          {hasDiscount && (
            <span className="ml-1 block whitespace-nowrap text-[9px] text-gray-400 line-through">
              {product.price} EGP
            </span>
          )}
        </div>

        {/* Status */}
        <div>
          <span
            className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[8px] font-medium ${
              inStock
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            <span
              className={`h-1 w-1 rounded-full ${
                inStock
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
              aria-hidden="true"
            />

            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock || isAdding}
            aria-label={
              isAdding
                ? `Adding ${product.title} to cart`
                : inStock
                  ? `Add ${product.title} to cart`
                  : `${product.title} is out of stock`
            }
            className="flex min-h-9 items-center gap-1.5 rounded-md bg-green-600 px-2.5 text-[9px] font-medium text-white transition-all hover:bg-green-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAdding ? (
              <FaSpinner
                size={9}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : (
              <FaShoppingCart
                size={9}
                aria-hidden="true"
              />
            )}

            {isAdding
              ? "Adding..."
              : "Add to Cart"}
          </button>

          <button
            type="button"
            aria-label={`Remove ${product.title} from wishlist`}
            onClick={handleRemove}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <FaTrash
              size={9}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex w-full min-w-0 gap-3 p-3 sm:p-4 md:hidden">
        {/* Image */}
        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.title}`}
          className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="64px"
            className="object-contain p-1"
          />
        </Link>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <Link
            href={`/products/${product.id}`}
            className="block min-w-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            <p className="line-clamp-2 break-words text-xs font-medium leading-4 text-slate-900 transition-colors hover:text-green-600">
              {product.title}
            </p>
          </Link>

          {categoryName && (
            <p className="mt-0.5 truncate text-[10px] text-gray-400">
              {categoryName}
            </p>
          )}

          {/* Price */}
          <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-gray-400">
              Price:
            </span>

            <span className="text-xs font-semibold text-slate-900">
              {displayPrice} EGP
            </span>

            {hasDiscount && (
              <span className="text-[9px] text-gray-400 line-through">
                {product.price} EGP
              </span>
            )}
          </div>

          {/* Status */}
          <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
            <span className="shrink-0 text-[10px] text-gray-400">
              Status:
            </span>

            <span
              className={`inline-flex min-w-0 items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-medium ${
                inStock
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              <span
                className={`h-1 w-1 shrink-0 rounded-full ${
                  inStock
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
                aria-hidden="true"
              />

              {inStock
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-2 flex w-full min-w-0 items-center gap-1.5">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
              aria-label={
                isAdding
                  ? `Adding ${product.title} to cart`
                  : inStock
                    ? `Add ${product.title} to cart`
                    : `${product.title} is out of stock`
              }
              className="flex min-h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md bg-green-600 px-2 text-[10px] font-medium text-white transition-all hover:bg-green-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAdding ? (
                <FaSpinner
                  size={10}
                  className="animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <FaShoppingCart
                  size={10}
                  aria-hidden="true"
                />
              )}

              <span className="truncate">
                {isAdding
                  ? "Adding..."
                  : "Add to Cart"}
              </span>
            </button>

            <button
              type="button"
              aria-label={`Remove ${product.title} from wishlist`}
              onClick={handleRemove}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              <FaTrash
                size={10}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}