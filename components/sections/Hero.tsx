'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import siteData, { heroVariant } from '@/data/siteData';

const heroData = siteData.sections?.Hero?.variants?.FitnessHomeHero1 || heroVariant || siteData.home.hero;
const bannerSlides = heroData.bannerSlides;


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  }, []);

  // Automatic banner slide rotation every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section 
      aria-label="Main Banner Slider"
      className="relative w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[440px] xl:h-[480px] overflow-hidden bg-[#0a0a0a] group/slider select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Slides */}
      {bannerSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className={`relative w-full h-full transition-transform duration-[7000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}>
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            {/* Subtle cinematic gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
          </div>
        );
      })}

      {/* Navigation Controls: Prev Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous banner slide"
        className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#ea580c] text-white border border-white/20 hover:border-[#ea580c] backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-xl opacity-80 sm:opacity-0 group-hover/slider:opacity-100 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Navigation Controls: Next Button */}
      <button
        onClick={nextSlide}
        aria-label="Next banner slide"
        className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#ea580c] text-white border border-white/20 hover:border-[#ea580c] backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-xl opacity-80 sm:opacity-0 group-hover/slider:opacity-100 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-sm py-1 px-2.5 rounded-full border border-white/10">
        {bannerSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? 'w-7 sm:w-8 h-2.5 bg-[#ea580c]'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Hero;