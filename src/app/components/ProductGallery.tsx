"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

/**
 * Gets the Swiper instance using useSwiper().
 * The instance is then passed to the parent.
 */
function SwiperController({
  onReady,
}: {
  onReady: (swiper: SwiperType) => void;
}) {
  const swiper = useSwiper();

  useEffect(() => {
    onReady(swiper);
  }, [swiper, onReady]);

  return null;
}

export default function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const visibleImages = images.slice(0, 3);

  if (!visibleImages.length) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center rounded-xl bg-gray-100">
        <span className="text-sm text-gray-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl bg-white p-4">
      {/* Main Image Slider */}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        className="aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-100"
        onSlideChange={(instance) => {
          setActiveIndex(instance.activeIndex);
        }}
      >
        {/* Required for the course useSwiper lesson */}
        <SwiperController onReady={setSwiper} />

        {visibleImages.map((src, index) => (
          <SwiperSlide key={`${src}-${index}`}>
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={`${title} - Image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Buttons */}
      {visibleImages.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {visibleImages.map((src, index) => (
            <button
              key={`${src}-thumbnail-${index}`}
              type="button"
              aria-label={`Show image ${index + 1}`}
              onClick={() => {
                swiper?.slideTo(index);
              }}
              className={`relative aspect-[3/4] overflow-hidden rounded-sm border-2 bg-gray-100 transition-colors ${
                index === activeIndex
                  ? "border-blue-600"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 768px) 33vw, 120px"
                loading="lazy"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}