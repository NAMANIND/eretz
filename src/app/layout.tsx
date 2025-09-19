import type { Metadata } from "next";
import { Krona_One, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import { ScreenProvider } from "./providers/Screen";

const kronaOne = Krona_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-krona-one",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ERETZ - Crafting Legacies That Last Generations",
  description:
    "ERETZ is a real estate development company rooted in authenticity, quality, and integrity. We craft homes that are both emotional and financial investments.",
  keywords:
    "construction, real estate, residential development, commercial development, ERETZ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${kronaOne.variable} font-sans antialiased`}
      >
        <LenisProvider>
          <ScreenProvider>{children}</ScreenProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
