"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Dumbbell, Star, Quote } from "lucide-react";
import siteData from "@/data/siteData";

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HomeTestimonial = () => {
  const testimonial = (siteData.sections?.Testimonials?.variants?.FitnessTestimonials1 || siteData.home.testimonial) as any;
  const testimonials = testimonial.items || [];

  // Ref for GSAP scope
  const sectionRef = useRef<HTMLElement>(null);

  // Initial Scroll Reveal Animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%', 
        toggleActions: 'play none none none',
      },
      defaults: { ease: 'power3.out' }
    });

    // Header stagger
    tl.fromTo('.gsap-header-item',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    )
    // Stagger in testimonial cards
    .fromTo('.gsap-testimonial-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
      "-=0.3"
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-white py-10 md:py-16 font-sans overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <div className="gsap-header-item flex items-center gap-2 mb-2">
            <div className="h-[2px] w-6 sm:w-10 bg-[#ea580c]" />
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c] -rotate-45" />
            <span className="text-[#ea580c] font-bold tracking-[0.12em] text-[11px] sm:text-[13px] uppercase">
              {testimonial.topText || testimonial.badge}
            </span>
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c] rotate-45" />
            <div className="h-[2px] w-6 sm:w-10 bg-[#ea580c]" />
          </div>

          <h2 className="gsap-header-item font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] font-extrabold text-[#1a1a1a] leading-tight sm:leading-[1.1] mb-2 sm:mb-3 text-center">
            {testimonial.heading1} <span className="text-[#ea580c]">{testimonial.heading2}</span>
          </h2>

          <p className="gsap-header-item text-gray-500 text-[14px] md:text-[15px] leading-relaxed max-w-xl">
            {testimonial.description}
          </p>
        </div>

        {/* ── Testimonials Grid (Static, No Carousel) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {testimonials.map((item: any, idx: number) => (
            <div 
              key={item.id || idx}
              className="gsap-testimonial-card bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(234,88,12,0.12)] hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-[#ea580c] fill-current opacity-30 group-hover:opacity-60 transition-opacity" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ea580c] text-[#ea580c]" />
                    ))}
                  </div>
                </div>

                {/* Text */}
                <p className="text-gray-600 text-[14.5px] leading-relaxed italic mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#ea580c] bg-orange-50">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-gray-900 text-[16px] leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[#ea580c] text-[12px] font-semibold mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeTestimonial;