import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VidMetrics | YouTube Intelligence",
  description:
    "Identify viral content and competitor strategies in seconds. Find the outliers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("dark", inter.variable, "font-sans", geist.variable)}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
