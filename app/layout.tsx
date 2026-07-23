import type { Metadata } from "next";
import { Bevan, Mulish, Dancing_Script, Cinzel } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { CartProvider } from "@/components/cart/CartProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

// Bevan — vintage high-contrast slab for the big all-caps display headlines
const bevan = Bevan({
  variable: "--font-bevan",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Mulish — warm, humanist body sans
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

// Dancing Script — the Spanish script accents ("Gracias por ser parte…")
const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
});

// Cinzel — the elegant gold "ASÍ" logotype, matching the brand mockups
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asimexicanfusion.com"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bevan.variable} ${mulish.variable} ${dancing.variable} ${cinzel.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <CartProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
