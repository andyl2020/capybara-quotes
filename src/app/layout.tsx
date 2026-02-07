import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Quicksand } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Capybara Quotes",
  description: "Tap a capybara to receive calm or motivational quotes.",
  applicationName: "Capybara Quotes",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-180.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#2D6A4F",
  colorScheme: "light"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body className="font-[var(--font-quicksand)] antialiased">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
