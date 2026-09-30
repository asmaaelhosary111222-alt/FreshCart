"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaHeart,
  FaRegHeart,
  FaSyncAlt,
  FaRegEye,
  FaPlus,
  FaCheck,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Product } from "@/lib/types";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const router = useRouter();

  const { isWishlisted, toggle } = useWishlist();

const {
  items,
  addToCart,
  updateQuantity,
  addingProductId,
  updatingProductId,
} = useCart();

  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name;

  const hasRating = product.ratingsAverage !== undefined;
  const rating = product.ratingsAverage ?? 0;

  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount !== null &&
    product.priceAfterDiscount < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;

  const wishlisted = isWishlisted(product.id);

  // Find this product inside the cart.
  const cartItem = items.find(
    (item) => item.product.id === product.id
  );

  const inCart = !!cartItem;

  const isAdding = addingProductId === product.id;
  const isUpdating = updatingProductId === product.id;
  const isProcessing = isAdding || isUpdating;

  // Prevent adding more than the available stock.
  const reachedStockLimit =
    !!cartItem &&
    typeof product.quantity === "number" &&
    cartItem.count >= product.quantity;

  const handleWishlist = () => {
    toggle(product.id);

    toast.success(
      wishlisted
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };
const handleAddToCart = async () => {
  if (isProcessing || reachedStockLimit) {
    return;
  }

  let success = false;

  if (cartItem) {
    const nextCount = cartItem.count + 1;

    if (
      typeof product.quantity === "number" &&
      nextCount > product.quantity
    ) {
      return;
    }

    success = await updateQuantity(product.id, nextCount);
  } else {
    success = await addToCart(product.id);
  }

  if (!success) {
    return;
  }

  if (!cartItem) {
    onAddToCart?.(product);
  }

  setShowCartSuccess(true);

  window.setTimeout(() => {
    setShowCartSuccess(false);
  }, 700);
};

  const handleViewProduct = () => {
    router.push(`/products/${product.id}`);
  };
const [showCartSuccess, setShowCartSuccess] = useState(false);
  return (
    <Card className="group w-full overflow-hidden rounded-md border border-gray-200 bg-white p-0 shadow-none ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)]">
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-white">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Discount */}
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-sm bg-red-500 px-1.5 py-0.5 text-xs font-semibold text-white">
            -{discountPercent}%
          </span>
        )}

        {/* Product Actions */}
        <TooltipProvider>
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            {/* Wishlist */}
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label={
                      wishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    aria-pressed={wishlisted}
                    onClick={handleWishlist}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95 ${
                      wishlisted
                        ? "text-red-500"
                        : "text-gray-500 hover:text-red-600"
                    }`}
                  >
                    {wishlisted ? (
                      <FaHeart
                        size={15}
                        aria-hidden="true"
                      />
                    ) : (
                      <FaRegHeart
                        size={15}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                }
              />

              <TooltipContent
                side="right"
                className="bg-gray-200"
              >
                {wishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"}
              </TooltipContent>
            </Tooltip>

            {/* Compare */}
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label="Compare product"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 shadow-sm transition-all duration-200 hover:scale-105 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95"
                  >
                    <FaSyncAlt
                      size={15}
                      aria-hidden="true"
                    />
                  </button>
                }
              />

              <TooltipContent
                side="right"
                className="bg-gray-200"
              >
                Compare
              </TooltipContent>
            </Tooltip>

            {/* Quick View / Product Details */}
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label="View product details"
                    onClick={handleViewProduct}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 shadow-sm transition-all duration-200 hover:scale-105 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95"
                  >
                    <FaRegEye
                      size={18}
                      aria-hidden="true"
                    />
                  </button>
                }
              />

              <TooltipContent
                side="right"
                className="bg-gray-200"
              >
                View details
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Product Information */}
      <div className="space-y-1 px-3 pb-3 pt-2.5">
        {/* Category */}
        {categoryName && (
          <p className="truncate text-xs text-gray-400">
            {categoryName}
          </p>
        )}

        {/* Title */}
        <h3
          className="truncate text-sm font-semibold text-gray-900"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Rating */}
        {hasRating && (
          <div
            className="flex items-center gap-1.5"
            aria-label={`Rated ${rating.toFixed(1)} out of 5`}
          >
            <div
              className="flex text-yellow-400"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, index) =>
                index < Math.round(rating) ? (
                  <FaStar
                    key={index}
                    size={12}
                  />
                ) : (
                  <FaRegStar
                    key={index}
                    size={12}
                  />
                )
              )}
            </div>

            <span className="text-xs text-gray-500">
              {rating.toFixed(1)}
              {product.ratingsQuantity !== undefined &&
                ` (${product.ratingsQuantity})`}
            </span>
          </div>
        )}

        {/* Price + Add To Cart */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex min-w-0 items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">
              {hasDiscount
                ? product.priceAfterDiscount
                : product.price}{" "}
              <span className="text-xs font-medium">
                EGP
              </span>
            </span>

            {hasDiscount && (
              <span className="truncate text-sm text-gray-400 line-through">
                {product.price} EGP
              </span>
            )}
          </div>

          {/* Add / Increase Cart Quantity */}
          <button
            type="button"
            aria-label={
              reachedStockLimit
                ? "Maximum available quantity reached"
                : inCart
                  ? `Increase ${product.title} quantity`
                  : `Add ${product.title} to cart`
            }
            aria-disabled={
              isProcessing || reachedStockLimit
            }
            disabled={isProcessing || reachedStockLimit}
            onClick={handleAddToCart}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 ${
              isProcessing || reachedStockLimit
                ? "cursor-not-allowed bg-green-600/60"
                : "bg-green-600 hover:scale-105 hover:bg-green-700 active:scale-95"
            }`}
          >
<span className="relative flex h-4 w-4 items-center justify-center">
  <FaPlus
    size={12}
    aria-hidden="true"
    className={`absolute transition-all duration-200 ${
      showCartSuccess
        ? "scale-50 opacity-0"
        : "scale-100 opacity-100"
    }`}
  />

  <FaCheck
    size={13}
    aria-hidden="true"
    className={`absolute transition-all duration-200 ${
      showCartSuccess
        ? "scale-100 opacity-100"
        : "scale-50 opacity-0"
    }`}
  />
</span>
          </button>
        </div>
      </div>
    </Card>
  );
}