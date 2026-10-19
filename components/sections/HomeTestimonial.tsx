"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Dumbbell, Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

    tl.fromTo('.gsap-header-item',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    )
    .fromTo('.gsap-showcase-wrapper',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.3"
    );
  }, { scope: sectionRef });

  // Navigation handlers (Manual only - NO auto-carousel)
  const prevSlide = () => {
    if (isTransitioning || testimonials.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 280);
  };

  const nextSlide = () => {
    if (isTransitioning || testimonials.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 280);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 280);
  };

  const current = testimonials[currentIndex] || {
    name: "Emily Johnson",
    role: "Entrepreneur",
    text: "VortexFit has completely changed my lifestyle. The trainers are knowledgeable, supportive and truly care about your progress. The workouts are effective, and the environment is always positive and motivating. I feel stronger, healthier and more confident than ever before!",
    image: "/images/testimonial_girl.jpg"
  };

  return (
    <section 
      ref={sectionRef} 
      aria-label="Testimonials"
      className="w-full bg-white py-10 sm:py-12 md:py-14 lg:py-16 font-sans overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10">
          {/* Top Label */}
          <div className="gsap-header-item inline-flex items-center justify-center gap-2.5 sm:gap-3.5 mb-2 sm:mb-2.5">
            <div className="h-[2px] w-8 sm:w-12 md:w-16 bg-[#ea580c]" />
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c] -scale-x-100 shrink-0" />
            <span className="text-[#ea580c] font-bold tracking-[0.2em] text-xs sm:text-[13px] uppercase whitespace-nowrap">
              {testimonial.topText || testimonial.badge || "OUR CLIENTS SAY"}
            </span>
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c] shrink-0" />
            <div className="h-[2px] w-8 sm:w-12 md:w-16 bg-[#ea580c]" />
          </div>

          {/* Main Heading */}
          <h2 className="gsap-header-item font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-black leading-tight mb-2 sm:mb-2.5 text-center">
            {testimonial.titleStart || "TESTI"}<span className="text-[#ea580c]">{testimonial.titleHighlight || "MONIALS"}</span>
          </h2>

          {/* Description */}
          <p className="gsap-header-item text-gray-500 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-2xl mx-auto text-center font-normal">
            {testimonial.description}
          </p>
        </div>

        {/* ── Showcase Carousel Area (Manual Navigation Only) ── */}
        <div className="gsap-showcase-wrapper relative w-full max-w-[1240px] mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-[#fdf2ee] hover:bg-[#ea580c] text-[#ea580c] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md shrink-0 active:scale-95 cursor-pointer z-20"
          >
            <ArrowLeft className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
          </button>

          {/* Center Card */}
          <div className="flex-1 w-full max-w-[1040px] mx-auto py-2">
            <div 
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center transition-all duration-300 ease-out ${
                isTransitioning ? "opacity-0 translate-y-2 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              
              {/* Left Column: Slanted Parallelogram Image & Orange Stripes (lg:col-span-5) */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="relative w-[260px] sm:w-[310px] md:w-[340px] lg:w-[330px] xl:w-[370px] h-[270px] sm:h-[310px] md:h-[340px] lg:h-[330px] xl:h-[360px] isolate my-2">
                  
                  {/* Left Orange Accent Stripe */}
                  <div 
                    className="absolute -left-3.5 sm:-left-4 md:-left-5 top-1/2 -translate-y-1/2 w-2.5 sm:w-3.5 h-[65%] bg-[#ea580c] -skew-x-[14deg] rounded-sm z-0 shadow-sm"
                    aria-hidden="true"
                  />
                  
                  {/* Right Orange Accent Stripe */}
                  <div 
                    className="absolute -right-3.5 sm:-right-4 md:-right-5 top-1/2 -translate-y-1/2 w-2.5 sm:w-3.5 h-[65%] bg-[#ea580c] -skew-x-[14deg] rounded-sm z-0 shadow-sm"
                    aria-hidden="true"
                  />

                  {/* Slanted Image Frame */}
                  <div className="relative w-full h-full -skew-x-[14deg] overflow-hidden rounded-xl shadow-2xl z-10 bg-gray-200">
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 370px"
                      className="object-cover skew-x-[14deg] scale-[1.25]"
                      priority
                    />
                  </div>

                </div>
              </div>

              {/* Right Column: Quotes, Content, Stars, Author, Dots (lg:col-span-7) */}
              <div className="lg:col-span-7 relative flex flex-col justify-center px-2 sm:px-4 lg:px-0">
                
                {/* Background Large Watermark Quote */}
                <div 
                  className="absolute top-0 right-2 sm:right-6 text-orange-200/40 pointer-events-none select-none -z-10 leading-none"
                  aria-hidden="true"
                >
                  <Quote className="w-24 h-24 sm:w-32 sm:h-32 text-[#fed7aa]/50 fill-current" />
                </div>

                {/* Foreground Double Quote Icon */}
                <div className="text-[#fdba74] text-5xl sm:text-6xl font-black leading-none mb-2 select-none">
                  “
                </div>

                {/* Testimonial Quote Text */}
                <p className="text-gray-700 italic text-[15px] sm:text-[16px] md:text-[16.5px] leading-relaxed mb-5 font-normal">
                  &ldquo;{current.text}&rdquo;
                </p>

                {/* 5 Orange Stars */}
                <div className="flex items-center gap-1 mb-3.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-[#ea580c] text-[#ea580c]" />
                  ))}
                </div>

                {/* Client Name */}
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-black mb-0.5">
                  {current.name}
                </h3>

                {/* Client Role */}
                <p className="text-gray-500 text-[13.5px] sm:text-[14.5px] font-normal mb-3">
                  {current.role}
                </p>

                {/* Orange Divider Line */}
                <div className="w-12 h-[2.5px] bg-[#ea580c] rounded-full mb-2"></div>

                {/* Bottom Right Pagination Dots */}
                <div className="flex items-center justify-end gap-2.5 mt-2">
                  {testimonials.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx
                          ? "w-3 h-3 bg-[#ea580c]"
                          : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>

            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-[#fdf2ee] hover:bg-[#ea580c] text-[#ea580c] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md shrink-0 active:scale-95 cursor-pointer z-20"
          >
            <ArrowRight className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
          </button>

        </div>

      </div>
    </section>
  );
};

export default HomeTestimonial;