import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";
import CinematicOverlay from "@/components/CinematicOverlay";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenith X | Pure Sound",
  description: "Experience the next evolution in audio engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-white selection:bg-white selection:text-black`}>
        <CustomCursor />
        <CinematicOverlay />
        <Navigation />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
