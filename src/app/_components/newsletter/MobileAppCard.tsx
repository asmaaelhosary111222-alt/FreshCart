import { Star } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const appLinks = [
  {
    id: "app-store",
    href: "#",
    label: "Download on the App Store",
    platformLabel: "DOWNLOAD ON",
    platform: "App Store",
    icon: FaApple,
    iconClassName: "h-6 w-6",
  },
  {
    id: "google-play",
    href: "#",
    label: "Get it on Google Play",
    platformLabel: "GET IT ON",
    platform: "Google Play",
    icon: FaGooglePlay,
    iconClassName: "h-5 w-5",
  },
];

export default function MobileAppCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-green-500">
        <span aria-hidden="true">📱</span>
        MOBILE APP
      </span>

      <h3 className="mt-4 text-2xl font-bold text-white">
        Shop Faster on Our App
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Get app-exclusive deals &amp; 15% off your first order.
      </p>

      <div className="mt-6 space-y-3">
        {appLinks.map(
          ({
            id,
            href,
            label,
            platformLabel,
            platform,
            icon: Icon,
            iconClassName,
          }) => (
            <a
              key={id}
              href={href}
              aria-label={label}
              className="flex min-h-14 items-center gap-3 rounded-xl bg-slate-800 px-4 py-3 transition-all duration-200 hover:bg-slate-700 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98]"
            >
              <Icon
                aria-hidden="true"
                className={`${iconClassName} shrink-0 text-white`}
              />

              <div className="leading-tight">
                <p className="text-[10px] tracking-wide text-slate-400">
                  {platformLabel}
                </p>

                <p className="text-sm font-semibold text-white">
                  {platform}
                </p>
              </div>
            </a>
          )
        )}
      </div>

      <div
        className="mt-6 flex flex-wrap items-center gap-2"
        aria-label="App rating: 4.9 stars, over 100 thousand downloads"
      >
        <div
          aria-hidden="true"
          className="flex text-yellow-400"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-yellow-400"
            />
          ))}
        </div>

        <span className="text-sm text-slate-400">
          4.9 · 100K+ downloads
        </span>
      </div>
    </div>
  );
}