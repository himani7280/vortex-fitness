"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";
import siteData from "@/data/siteData";

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const cta = (siteData.sections?.CTA?.variants?.FitnessCTA1 || siteData.home.cta) as any;

  
  // Ref for GSAP Scope
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP Animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%', 
        toggleActions: 'play none none none',
      },
      defaults: { ease: 'power3.out' }
    });

    // 1. Subtle zoom-out effect for the background image
    tl.fromTo('.gsap-bg-image',
      { scale: 1.1 },
      { scale: 1, duration: 1.5, ease: 'power2.out' }
    )
    // 2. Text and Button content stagger slide up
    .fromTo('.gsap-cta-item',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
      "-=1.2" 
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full py-12 sm:py-14 md:py-16 flex items-center bg-[#111111] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <Image
          src={cta.backgroundImage}
          alt={cta.imageAlt}
          fill
          sizes="100vw"
          className="gsap-bg-image object-cover object-[75%_center] md:object-[85%_center] opacity-100 origin-center"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            filter: 'contrast(1.08) saturate(1.05) brightness(1.02)'
          }}
        />
      </div>
      
      {/* Gradient Overlay to seamlessly blend image from left to right */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#111111] from-10% via-[#111111]/80 via-40% to-transparent to-70% z-0 pointer-events-none"></div>
      {/* Mobile overlay for text readability */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-r from-[#111111]/95 via-[#111111]/80 to-[#111111]/50 z-0 pointer-events-none"></div>

      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-6 lg:px-6 relative z-20">
        <div className="max-w-2xl">
          {/* Subtitle with Dumbbells */}
          <div className="gsap-cta-item flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="h-[2px] w-6 sm:w-12 bg-[#f95d22] flex-shrink-0"></div>
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#f95d22] flex-shrink-0" />
            <span className="text-[#f95d22] font-semibold tracking-[0.1em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase whitespace-nowrap">
              {cta.topText}
            </span>
            <Dumbbell className="hidden sm:block w-5 h-5 text-[#f95d22] flex-shrink-0" />
            <div className="hidden sm:block h-[2px] w-12 bg-[#f95d22] flex-shrink-0"></div>
          </div>

          {/* Headline */}
          <h2 className="gsap-cta-item font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold leading-tight mb-3 sm:mb-4 text-white">
            {cta.heading1} <br className="hidden sm:block" />
            <span className="text-[#f95d22]">{cta.heading2}</span>
          </h2>

          {/* Paragraph */}
          <p className="gsap-cta-item text-gray-200 text-[15px] md:text-[15.5px] mb-6 sm:mb-8 max-w-[500px] font-normal leading-relaxed">
            {cta.description}
          </p>

          {/* Call to Action Button */}
          <div className="gsap-cta-item">
            <Link href={cta.button.link} className="w-full sm:w-auto justify-center bg-[#f95d22] hover:bg-[#d84b16] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-md font-semibold text-sm sm:text-base inline-flex items-center gap-2 transition-colors duration-300">
              {cta.button.text}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;