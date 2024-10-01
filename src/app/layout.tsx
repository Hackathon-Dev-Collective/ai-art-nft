import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
  title: "NeuroArt",
  description: "Generate Art NFT",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-white dark:bg-gray-950 text-black dark:text-white`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased  min-h-[100dvh] bg-gray-50`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
