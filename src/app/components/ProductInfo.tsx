"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import {
  FaStar,
  FaRegStar,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaCheck,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "sonner";

import ProductServices from "./ProductServices";
import { useWishlist } from "./WishlistProvider";
import { useCart } from "./CartProvider";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { isWishlisted, toggle } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlisted =
    mounted && isWishlisted(product.id);

  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name;

  const brandName = product.brand?.name;

  const hasRating =
    product.ratingsAverage !== undefined;

  const rating = product.ratingsAverage ?? 0;

  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount !== null &&
    product.priceAfterDiscount < product.price;

  const unitPrice =
    hasDiscount &&
    product.priceAfterDiscount != null
      ? product.priceAfterDiscount
      : product.price;

  const hasStockInfo =
    product.quantity !== undefined;

  const inStock =
    (product.quantity ?? 0) > 0;

  const maxQty =
    product.quantity ?? Infinity;

  const total =
    unitPrice * quantity;

  const formattedTotal =
    total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleDecrease = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  const handleIncrease = () => {
    setQuantity((current) =>
      Math.min(maxQty, current + 1)
    );
  };

  const handleWishlist = () => {
    toggle(product.id);

    toast.success(
      wishlisted
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      setCopied(true);

      toast.success("Product link copied");

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Sharing can be cancelled by the user.
    }
  };

  const handleAddToCart = async () => {
    if (!inStock || isAddingToCart) {
      return;
    }

    if (
      typeof product.quantity === "number" &&
      quantity > product.quantity
    ) {
      toast.error(
        `Only ${product.quantity} item${
          product.quantity === 1 ? "" : "s"
        } available.`
      );

      return;
    }

    setIsAddingToCart(true);

    try {
   
      const success = await addToCart(
        product.id,
        quantity
      );

      if (!success) {
        return;
      }

      toast.success("Product added to cart", {
        description: `${quantity} × ${product.title}`,
      });
    } catch {
      toast.error(
        "Failed to add product to cart"
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Badges */}
      {(categoryName || brandName) && (
        <div className="flex flex-wrap gap-2">
          {categoryName && (
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              {categoryName}
            </span>
          )}

          {brandName && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {brandName}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
        {product.title}
      </h1>

      {/* Rating */}
      {hasRating && (
        <div
          className="mt-3 flex items-center gap-2"
          aria-label={`Rated ${rating.toFixed(1)} out of 5`}
        >
          <div
            className="flex text-yellow-400"
            aria-hidden="true"
          >
            {Array.from({ length: 5 }).map(
              (_, index) =>
                index < Math.round(rating) ? (
                  <FaStar
                    key={index}
                    size={16}
                  />
                ) : (
                  <FaRegStar
                    key={index}
                    size={16}
                  />
                )
            )}
          </div>

          <span className="text-sm text-gray-500">
            {rating.toFixed(1)}

            {product.ratingsQuantity !==
              undefined &&
              ` (${product.ratingsQuantity} reviews)`}
          </span>
        </div>
      )}

      {/* Price */}
      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-bold text-slate-900">
          {unitPrice} EGP
        </span>

        {hasDiscount && (
          <span className="text-lg text-gray-400 line-through">
            {product.price} EGP
          </span>
        )}
      </div>

      {/* Stock */}
      {hasStockInfo && (
        <span
          className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
            inStock
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              inStock
                ? "bg-green-600"
                : "bg-red-500"
            }`}
            aria-hidden="true"
          />

          {inStock
            ? "In Stock"
            : "Out of Stock"}
        </span>
      )}

      {/* Description */}
      {product.description && (
        <p className="mt-5 border-t border-gray-100 pt-5 leading-7 text-slate-600">
          {product.description}
        </p>
      )}

      {/* Quantity */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-slate-700">
          Quantity
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <div
            className="flex items-center overflow-hidden rounded-lg border border-gray-200"
            aria-label="Product quantity"
          >
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={handleDecrease}
              disabled={
                quantity <= 1 ||
                isAddingToCart
              }
              className="flex h-12 w-12 items-center justify-center text-gray-500 transition-all hover:bg-gray-50 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaMinus
                size={12}
                aria-hidden="true"
              />
            </button>

            <span
              className="flex h-12 w-12 items-center justify-center border-x border-gray-200 font-semibold text-slate-900"
              aria-live="polite"
            >
              {quantity}
            </span>

            <button
              type="button"
              aria-label="Increase quantity"
              onClick={handleIncrease}
              disabled={
                quantity >= maxQty ||
                !inStock ||
                isAddingToCart
              }
              className="flex h-12 w-12 items-center justify-center text-gray-500 transition-all hover:bg-gray-50 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaPlus
                size={12}
                aria-hidden="true"
              />
            </button>
          </div>

          {product.quantity !== undefined && (
            <span className="text-sm text-gray-500">
              {product.quantity} available
            </span>
          )}
        </div>
      </div>

      {/* Total Price */}
      <div className="mt-6 flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-4 sm:px-5">
        <span className="text-sm text-slate-600 sm:text-base">
          Total Price:
        </span>

        <span className="text-xl font-bold text-green-600 sm:text-2xl">
          {formattedTotal} EGP
        </span>
      </div>

      {/* Add to Cart / Buy Now */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            isAddingToCart
          }
          aria-label={
            isAddingToCart
              ? `Adding ${product.title} to cart`
              : inStock
                ? `Add ${quantity} ${product.title} to cart`
                : `${product.title} is out of stock`
          }
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-green-600 font-medium text-white shadow-md shadow-green-600/30 transition-all hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {isAddingToCart ? (
            <>
              <FaSpinner
                className="animate-spin"
                size={16}
                aria-hidden="true"
              />

              Adding...
            </>
          ) : (
            <>
              <FaShoppingCart
                size={16}
                aria-hidden="true"
              />

              {inStock
                ? "Add to Cart"
                : "Out of Stock"}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() =>
            toast.info(
              "Buy Now is coming soon"
            )
          }
          disabled={!inStock}
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-900 font-medium text-white transition-all hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaBolt
            size={16}
            aria-hidden="true"
          />

          Buy Now
        </button>
      </div>

      {/* Wishlist + Share */}
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          aria-pressed={wishlisted}
          onClick={handleWishlist}
          className={`flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] ${
            wishlisted
              ? "border-red-200 bg-red-50 text-red-600 focus-visible:ring-red-500"
              : "border-gray-200 bg-white text-slate-700 hover:bg-gray-50 focus-visible:ring-slate-500"
          }`}
        >
          {wishlisted ? (
            <FaHeart
              size={16}
              aria-hidden="true"
            />
          ) : (
            <FaRegHeart
              size={16}
              aria-hidden="true"
            />
          )}

          <span className="truncate">
            {wishlisted
              ? "In Wishlist"
              : "Add to Wishlist"}
          </span>
        </button>

        <button
          type="button"
          aria-label={
            copied
              ? "Product link copied"
              : "Share product"
          }
          onClick={handleShare}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-700 transition-all hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 active:scale-95"
        >
          {copied ? (
            <FaCheck
              size={16}
              className="text-green-600"
              aria-hidden="true"
            />
          ) : (
            <FaShareAlt
              size={16}
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      <ProductServices />
    </div>
  );
}