"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  FaBoxOpen,
  FaStar,
  FaTruck,
  FaCheck,
  FaUndoAlt,
  FaShieldAlt,
} from "react-icons/fa";
import type { Product } from "@/lib/types";

interface ProductTabsProps {
  product: Product;
}

type TabId = "details" | "reviews" | "shipping";

export default function ProductTabs({
  product,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] =
    useState<TabId>("details");

  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name;

  const subcategoryName =
    product.subcategory?.[0]?.name;

  const brandName = product.brand?.name;

  const reviews = product.reviews ?? [];
  const totalReviews = reviews.length;

  const displayedReviewCount =
    product.ratingsQuantity ?? totalReviews;

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter(
      (review) => review.rating === star
    ).length;

    const percent = totalReviews
      ? Math.round((count / totalReviews) * 100)
      : 0;

    return {
      star,
      count,
      percent,
    };
  });

  const tabs: {
    id: TabId;
    label: string;
    icon: ReactNode;
  }[] = [
    {
      id: "details",
      label: "Product Details",
      icon: <FaBoxOpen size={14} aria-hidden="true" />,
    },
    {
      id: "reviews",
      label: `Reviews (${displayedReviewCount})`,
      icon: <FaStar size={14} aria-hidden="true" />,
    },
    {
      id: "shipping",
      label: "Shipping & Returns",
      icon: <FaTruck size={14} aria-hidden="true" />,
    },
  ];

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
  };

  return (
    <section
      aria-label="Product information"
      className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Tab Headers */}
      <div
        role="tablist"
        aria-label="Product information tabs"
        className="flex overflow-x-auto border-b border-gray-200 scrollbar-none"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabChange(tab.id)}
              className={`flex min-h-14 shrink-0 items-center justify-center gap-2 whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-600 active:scale-[0.98] sm:px-6 ${
                isActive
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-slate-600 hover:border-gray-300 hover:text-slate-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6">
        {/* Product Details */}
        {activeTab === "details" && (
          <div
            id="panel-details"
            role="tabpanel"
            aria-labelledby="tab-details"
            tabIndex={0}
          >
            <h3 className="text-lg font-bold text-slate-900">
              About this Product
            </h3>

            {product.description && (
              <p className="mt-2 leading-7 text-slate-600">
                {product.description}
              </p>
            )}

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Product Information */}
              <div className="rounded-lg bg-gray-50 p-4 sm:p-5">
                <h4 className="mb-3 font-semibold text-slate-900">
                  Product Information
                </h4>

                <dl className="space-y-3 text-sm">
                  {categoryName && (
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-gray-500">
                        Category
                      </dt>

                      <dd className="text-right font-medium text-slate-900">
                        {categoryName}
                      </dd>
                    </div>
                  )}

                  {subcategoryName && (
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-gray-500">
                        Subcategory
                      </dt>

                      <dd className="text-right font-medium text-slate-900">
                        {subcategoryName}
                      </dd>
                    </div>
                  )}

                  {brandName && (
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-gray-500">
                        Brand
                      </dt>

                      <dd className="text-right font-medium text-slate-900">
                        {brandName}
                      </dd>
                    </div>
                  )}

                  {product.sold !== undefined && (
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-gray-500">
                        Items Sold
                      </dt>

                      <dd className="text-right font-medium text-slate-900">
                        {product.sold}+ sold
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Key Features */}
              <div className="rounded-lg bg-gray-50 p-4 sm:p-5">
                <h4 className="mb-3 font-semibold text-slate-900">
                  Key Features
                </h4>

                <ul className="space-y-3 text-sm text-slate-600">
                  {[
                    "Premium Quality Product",
                    "100% Authentic Guarantee",
                    "Fast & Secure Packaging",
                    "Quality Tested",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2"
                    >
                      <FaCheck
                        className="shrink-0 text-green-600"
                        size={12}
                        aria-hidden="true"
                      />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div
            id="panel-reviews"
            role="tabpanel"
            aria-labelledby="tab-reviews"
            tabIndex={0}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-[auto,1fr]">
              {/* Overall Rating */}
              <div className="flex flex-col items-center justify-center text-center sm:min-w-40 sm:border-r sm:border-gray-100 sm:pr-8">
                <span className="text-5xl font-bold text-slate-900">
                  {product.ratingsAverage ?? "-"}
                </span>

                <div
                  className="mt-2 flex text-yellow-400"
                  aria-label={`Average rating: ${
                    product.ratingsAverage ?? 0
                  } out of 5`}
                >
                  {Array.from({ length: 5 }).map(
                    (_, index) => (
                      <FaStar
                        key={index}
                        size={16}
                        aria-hidden="true"
                        className={
                          index <
                          Math.round(
                            product.ratingsAverage ?? 0
                          )
                            ? ""
                            : "text-gray-200"
                        }
                      />
                    )
                  )}
                </div>

                <span className="mt-1 text-sm text-gray-500">
                  Based on {displayedReviewCount} reviews
                </span>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3">
                {breakdown.map(
                  ({ star, count, percent }) => (
                    <div
                      key={star}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="w-14 shrink-0 text-gray-500">
                        {star} star
                      </span>

                      <div
                        className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200"
                        role="progressbar"
                        aria-label={`${star} star ratings`}
                        aria-valuenow={percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-full rounded-full bg-yellow-400 transition-[width] duration-500"
                          style={{
                            width: `${percent}%`,
                          }}
                        />
                      </div>

                      <span className="w-10 shrink-0 text-right text-gray-500">
                        {percent}%
                      </span>

                      <span className="sr-only">
                        {count} reviews
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* Review Area */}
              <div className="col-span-full mt-2 border-t border-gray-100 pt-8 text-center">
                <FaStar
                  size={28}
                  className="mx-auto text-gray-200"
                  aria-hidden="true"
                />

                <p className="mt-3 text-slate-500">
                  Customer reviews will be displayed here.
                </p>

                <button
                  type="button"
                  className="mt-3 rounded-md px-3 py-2 text-sm font-medium text-green-600 transition-all hover:bg-green-50 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95"
                >
                  Write a Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shipping & Returns */}
        {activeTab === "shipping" && (
          <div
            id="panel-shipping"
            role="tabpanel"
            aria-labelledby="tab-shipping"
            tabIndex={0}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Shipping */}
              <div className="rounded-lg bg-green-50 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white"
                    aria-hidden="true"
                  >
                    <FaTruck size={16} />
                  </span>

                  <h4 className="font-semibold text-slate-900">
                    Shipping Information
                  </h4>
                </div>

                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {[
                    "Free shipping on orders over $50",
                    "Standard delivery: 3-5 business days",
                    "Express delivery available (1-2 business days)",
                    "Track your order in real-time",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2"
                    >
                      <FaCheck
                        className="mt-0.5 shrink-0 text-green-600"
                        size={12}
                        aria-hidden="true"
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Returns */}
              <div className="rounded-lg bg-green-50 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white"
                    aria-hidden="true"
                  >
                    <FaUndoAlt size={16} />
                  </span>

                  <h4 className="font-semibold text-slate-900">
                    Returns & Refunds
                  </h4>
                </div>

                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {[
                    "30-day hassle-free returns",
                    "Full refund or exchange available",
                    "Free return shipping on defective items",
                    "Easy online return process",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2"
                    >
                      <FaCheck
                        className="mt-0.5 shrink-0 text-green-600"
                        size={12}
                        aria-hidden="true"
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buyer Protection */}
            <div className="mt-4 flex items-start gap-3 rounded-lg bg-gray-50 p-4 sm:p-6">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-slate-700"
                aria-hidden="true"
              >
                <FaShieldAlt size={16} />
              </span>

              <div>
                <h4 className="font-semibold text-slate-900">
                  Buyer Protection Guarantee
                </h4>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Get a full refund if your order doesn&apos;t
                  arrive or isn&apos;t as described. We ensure
                  your shopping experience is safe and secure.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}