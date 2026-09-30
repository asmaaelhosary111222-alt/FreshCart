
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/Footer";
import Providers from "./sessionprovider/SessionProvider";
import NavigationLoader from "./_components/navigationloader/NavigationLoader";

import { Toaster } from "@/components/ui/sonner";
import { WishlistProvider } from "./components/WishlistProvider";
import { CartProvider } from "./components/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreshCart",
    template: "%s | FreshCart",
  },
  description:
    "Shop fresh products, groceries, and everyday essentials with FreshCart.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <WishlistProvider>
            <CartProvider>
              <Navbar />

              <NavigationLoader />

              <main className="flex-1">
                {children}
              </main>

              <Toaster />

              <Footer />
            </CartProvider>
          </WishlistProvider>
        </Providers>
      </body>
    </html>
  );
}

