"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Home } from "lucide-react";
import siteData, { thankYouVariant } from "@/data/siteData";

export default function ThankYouPage() {
  const [visible, setVisible] = useState(false);
  const thankYou = siteData.sections?.ThankYou?.variants?.FitnessThankYou1 || thankYouVariant || siteData.thankYou;


  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-200px)] bg-white font-sans">
      <section className="w-full flex-1 flex items-center justify-center py-16 sm:py-20 md:py-28 bg-[#f8f9fa] relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(234,88,12,0.10) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(234,88,12,0.07) 0%, transparent 70%)" }}
        />

        <div
          className="max-w-[620px] mx-auto px-4 md:px-8 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#ea580c] to-[#ff8c42] flex items-center justify-center shadow-[0_8px_32px_rgba(234,88,12,0.30)]">
              <CheckCircle className="text-white w-10 h-10 sm:w-12 sm:h-12" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-4">
            <span className="font-bold text-[12px] sm:text-[13px] tracking-[0.15em] text-[#ea580c] uppercase inline-flex items-center justify-center gap-2 mb-2 sm:mb-3">
              {thankYou.badge}
              <span className="inline-block w-6 h-[2px] bg-[#ea580c]" />
            </span>
            <h1 className="font-heading font-extrabold leading-tight sm:leading-[1.1] text-[#1a1a1a] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px]">
              {thankYou.titleStart} <span className="text-[#ea580c]">{thankYou.titleHighlight}</span>
            </h1>
          </div>

          {/* Divider */}
          <div className="w-14 h-[3px] bg-gradient-to-r from-[#ea580c] to-[#ff8c42] rounded-full mx-auto mb-6" />

          {/* Message */}
          <p className="text-[#444444] text-[16px] sm:text-[17px] leading-relaxed mb-3 max-w-[500px] mx-auto font-medium">
            {thankYou.message}
          </p>
          <p className="text-[#777777] text-[14px] leading-relaxed mb-8 sm:mb-10 max-w-[440px] mx-auto">
            {thankYou.subMessage}
          </p>

          {/* CTA Button */}
          <Link
            href={thankYou.buttonLink}
            className="inline-flex items-center gap-2.5 bg-[#ea580c] hover:bg-[#d4501a] text-white font-bold py-3.5 px-8 sm:px-10 rounded-[8px] transition-colors text-[14px] uppercase tracking-wide shadow-[0_4px_20px_rgba(234,88,12,0.30)] hover:shadow-lg active:scale-95"
          >
            <Home className="w-4 h-4" />
            {thankYou.buttonText}
          </Link>
        </div>
      </section>
    </div>
  );
}
