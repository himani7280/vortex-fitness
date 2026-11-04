import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import siteData from "@/data/siteData";

export const metadata: Metadata = {
  title: "Vortex Fitness",
  description: "Your Fitness Journey, Step by Step",
};

// Font styles
const bodyClass = [
  "flex min-h-full flex-col bg-white text-[#171717] font-(family-name:--font-body) dark:bg-[#0a0a0a] dark:text-[#ededed]",
  "[&_:where(h1,h2,h3,h4,h5,h6)]:font-(family-name:--font-heading)!",
  "[:where(&)_:where(input,textarea,select)]:text-[#1a1a1a] [:where(&)_:where(input,textarea,select)]:font-(family-name:--font-body)",
].join(" ");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" style={siteData.fontVars as React.CSSProperties} className="h-full antialiased">
      <head>
        <link rel="stylesheet" href={siteData.googleFontsHref} />
      </head>
      <body className={bodyClass}>
        <Topbar />
        <Suspense fallback={<div className="h-[56px] md:h-[60px] w-full bg-white shadow-sm" />}>
          <Navbar />
        </Suspense>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
