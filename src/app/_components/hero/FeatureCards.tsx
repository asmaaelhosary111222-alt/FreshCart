import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
} from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Free Shipping",
    subtitle: "On orders over 500 EGP",
  },
  {
    icon: FiShield,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Secure Payment",
    subtitle: "100% secure transactions",
  },
  {
    icon: FiRefreshCw,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "Easy Returns",
    subtitle: "14-day return policy",
  },
  {
    icon: FiHeadphones,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "24/7 Support",
    subtitle: "Dedicated support team",
  },
];

export default function FeatureCards() {
  return (
    <section
      aria-labelledby="features-title"
      className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8"
    >
      <h2 id="features-title" className="sr-only">
        Shopping benefits
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {features.map(
          ({ icon: Icon, iconBg, iconColor, title, subtitle }) => (
            <article
              key={title}
              className="
                flex
                min-h-[82px]
                items-center
                gap-3
                rounded-xl
                border
                border-gray-200
                bg-white
                p-3.5
                transition-all
                duration-300
                ease-out
                hover:-translate-y-0.5
                hover:shadow-md

                sm:min-h-[86px]
                sm:p-4
              "
            >
              <div
                aria-hidden="true"
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconBg}`}
              >
                <Icon
                  aria-hidden="true"
                  className={`h-5 w-5 ${iconColor}`}
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                  {title}
                </h3>

                <p className="text-xs text-gray-500 sm:text-sm">
                  {subtitle}
                </p>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}