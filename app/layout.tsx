import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Phantom Logistics | Trucking Company",
  description: "As one of the top trucking companies in the local area, we provide reliable, fast transportation solutions with real-time tracking and exceptional service.",
  keywords: "truck logistics, phantom logistics, freight, shipping, transportation, fleet management, cargo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
