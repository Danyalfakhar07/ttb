import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const appSans = Inter({
  subsets: ["latin"],
  variable: "--font-app-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "TTB — Teayam Tasbihgou Botanicals",
  description:
    "Teayam Tasbihgou Botanicals — beautiful living ecosystems designed for stable indoor plant environments.",
  robots: "noindex, nofollow",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={appSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
