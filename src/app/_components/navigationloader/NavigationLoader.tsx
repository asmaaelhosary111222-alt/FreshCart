
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Don't intercept modified clicks such as:
      // Ctrl/Cmd + click, Shift + click, Alt + click, middle-click.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest("a");

      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute("href");

      if (!href) return;

      // Ignore anchors, downloads, and new-tab links.
      if (
        href.startsWith("#") ||
        link.hasAttribute("download") ||
        link.target === "_blank"
      ) {
        return;
      }

      // Ignore external URLs.
      try {
        const url = new URL(href, window.location.href);

        if (url.origin !== window.location.origin) return;

        // Ignore navigation to the exact same URL.
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search &&
          url.hash === window.location.hash
        ) {
          return;
        }
      } catch {
        return;
      }

      setLoading(true);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm"
    >
      <FaSpinner
        aria-hidden="true"
        className="animate-spin text-4xl text-green-600"
      />
      <span className="sr-only">Loading page...</span>
    </div>
  );
}

