import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Vortex Fitness",
  description: "Your Fitness Journey, Step by Step",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col font-['Poppins',sans-serif]">
        <Suspense fallback={<div className="h-[56px] md:h-[90px] w-full bg-white shadow-sm" />}>
          <Header />
        </Suspense>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
