// app/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cooling Solutions",
    template: "Cooling Solutions | Advanced Climate Control Services",
  },
  description:
    "Cooling Solutions provides expert air conditioning, refrigeration, and climate control services for homes and businesses.",
  keywords: [
    "Cooling Solutions",
    "Air Conditioning Services",
    "HVAC Solutions",
    "Refrigeration Services",
    "Climate Control",
    "Cooling System Installation",
  ],
  openGraph: {
    title: "Cooling Solutions",
    description:
      "Discover professional cooling and climate control services with Cooling Solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}