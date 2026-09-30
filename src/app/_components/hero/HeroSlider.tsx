"use client";


import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
    primaryButton: "Shop Now",
     primaryHref: "/products",
         secondaryHref: "/404",
    secondaryButton: "View Deals",
    primaryColor: "text-green-600",
  },
  {
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    image:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=1600",
    primaryButton: "Shop Now",
        primaryHref: "/products",
    secondaryHref: "/404",

    secondaryButton: "Learn More",
    primaryColor: "text-blue-600",
  },
  {
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    image:
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=1600",
    primaryButton: "Order Now",
    secondaryButton: "Delivery Info",
        primaryHref: "/products",
    secondaryHref: "/404",

    primaryColor: "text-purple-600",
  },
];

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      aria-label="Featured offers"
      className="relative w-full overflow-hidden"
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{
          clickable: true,
        }}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="
          w-full

          [&_.swiper-pagination]:!bottom-4
          md:[&_.swiper-pagination]:!bottom-4

          [&_.swiper-pagination-bullet]:!h-3
          [&_.swiper-pagination-bullet]:!w-3
          [&_.swiper-pagination-bullet]:!rounded-full
          [&_.swiper-pagination-bullet]:!bg-white
          [&_.swiper-pagination-bullet]:!opacity-50

          [&_.swiper-pagination-bullet]:!transition-all
          [&_.swiper-pagination-bullet]:!duration-500
          [&_.swiper-pagination-bullet]:!ease-in-out

          [&_.swiper-pagination-bullet-active]:!w-10
          [&_.swiper-pagination-bullet-active]:!opacity-100
        "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.image}>
            <div
              className="
                relative
                min-h-[30rem]
                overflow-hidden
                sm:min-h-[27rem]
                md:min-h-[20rem]
                lg:min-h-[24rem]
              "
            >
              {/* Background image */}
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Overlay */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-green-700/85
                  via-green-600/60
                  to-transparent
                "
              />

              {/* Content */}
              <div
                className="
                  relative
                  z-10
                  flex
                  min-h-[30rem]
                  items-center
                  px-8
                  py-12

                  sm:min-h-[27rem]
                  sm:px-12

                  md:min-h-[20rem]
                  md:px-16

                  lg:min-h-[24rem]
                  lg:px-[11%]
                "
              >
                <div
                  className={`max-w-xl ${
                    index === 0 ? "animate-hero" : ""
                  }`}
                >
                  <h1
                    className="
                      max-w-[24rem]
                      text-4xl
                      font-bold
                      leading-[1.12]
                      text-white

                      sm:max-w-[30rem]
                      sm:text-4xl

                      md:max-w-[24rem]
                      md:text-3xl

                      lg:max-w-[25rem]
                      lg:text-[30px]
                    "
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="
                      mt-5
                      max-w-md
                      text-base
                      text-white/90

                      md:mt-3
                      md:text-sm

                      lg:mt-4
                      lg:text-sm
                    "
                  >
                    {slide.subtitle}
                  </p>

                  <div
                    className="
                      mt-7
                      flex
                      flex-wrap
                      gap-3

                      md:mt-4

                      lg:mt-5
                    "
                  >
                    {/* Primary button */}
                    <Link
                      href={slide.primaryHref}
                      
                      className={`
                      inline-flex
    min-h-12
    items-center
    justify-center
    rounded-lg
    bg-white
    px-7
    py-2.5
    text-base
    font-semibold
    ${slide.primaryColor}
    shadow-sm
    transition-all
    duration-200
    hover:bg-gray-50
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-white
    focus-visible:ring-offset-2
    focus-visible:ring-offset-green-700
    active:scale-[0.98]
    md:min-h-10
    md:px-5
    md:text-sm
    lg:min-h-10
    lg:px-5
    lg:py-2
    lg:text-sm
                      `}
                    >
                      {slide.primaryButton}
                    </Link>

                    {/* Secondary button */}
                  <Link
  href={slide.secondaryHref}
  className="
    inline-flex
    min-h-12
    items-center
    justify-center
    rounded-lg
    border
    border-white
    px-7
    py-2.5
    text-base
    font-semibold
    text-white
    transition-all
    duration-200
    hover:bg-white/10
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-white
    focus-visible:ring-offset-2
    focus-visible:ring-offset-green-700
    active:scale-[0.98]
    md:min-h-10
    md:px-5
    md:text-sm
    lg:min-h-10
    lg:px-5
    lg:py-2
    lg:text-sm
  "
>
  {slide.secondaryButton}
</Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous slide */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="
          absolute
          left-4
          top-1/2
          z-20
          hidden
          h-11
          w-11
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-white/95
          text-green-600
          shadow-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-white
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-offset-2
          focus-visible:ring-offset-green-700
          active:scale-95

          sm:flex
          sm:left-5

          lg:left-6
        "
      >
        <ChevronLeft
          size={22}
          aria-hidden="true"
        />
      </button>

      {/* Next slide */}
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="
          absolute
          right-4
          top-1/2
          z-20
          hidden
          h-11
          w-11
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-white/95
          text-green-600
          shadow-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-white
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-offset-2
          focus-visible:ring-offset-green-700
          active:scale-95

          sm:flex
          sm:right-5

          lg:right-6
        "
      >
        <ChevronRight
          size={22}
          aria-hidden="true"
        />
      </button>
    </section>
  );
}