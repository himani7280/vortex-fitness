'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import siteData, { heroVariant } from '@/data/siteData';

const heroData = siteData.sections?.Hero?.variants?.FitnessHomeHero1 || heroVariant || siteData.home.hero;

const bannerSlides = heroData.bannerSlides && heroData.bannerSlides.length > 0
  ? heroData.bannerSlides
  : [
      { id: 1, image: '/images/banner_1.jpg', alt: 'Vortex Fitness Banner 1' },
      { id: 2, image: '/images/banner_2.jpg', alt: 'Vortex Fitness Banner 2' },
      { id: 3, image: '/images/banner_3.jpg', alt: 'Vortex Fitness Banner 3' }
    ];

const SLIDE_DURATION = 4500; // 4.5 seconds per slide

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = bannerSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Continuous timer & smooth progress update
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const stepIncrement = (intervalStep / SLIDE_DURATION) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(progressTimer);
  }, [isPaused, nextSlide]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section 
      aria-label="Main Banner Carousel"
      className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] xl:h-[540px] overflow-hidden bg-[#0d0d0d] select-none group/hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Carousel Track (Horizontal sliding) ── */}
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerSlides.map((slide: any, index: number) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id || index}
              className="relative w-full min-w-full h-full overflow-hidden"
              aria-hidden={!isActive}
            >
              <div className={`relative w-full h-full transition-transform duration-[6000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}>
                <Image
                  src={slide.image}
                  alt={slide.alt || `Vortex Fitness Banner ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Subtle cinematic gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* ── Navigation Controls: Prev Button ── */}
      <button
        onClick={prevSlide}
        aria-label="Previous banner"
        className="absolute left-3 sm:left-5 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#ea580c] text-white border border-white/20 hover:border-[#ea580c] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl opacity-70 sm:opacity-0 group-hover/hero:opacity-100 active:scale-90 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ── Navigation Controls: Next Button ── */}
      <button
        onClick={nextSlide}
        aria-label="Next banner"
        className="absolute right-3 sm:right-5 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#ea580c] text-white border border-white/20 hover:border-[#ea580c] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl opacity-70 sm:opacity-0 group-hover/hero:opacity-100 active:scale-90 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ── Slide Indicators / Dots ── */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/15">
        {bannerSlides.map((slide: any, index: number) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id || index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? 'w-7 sm:w-8 h-2 bg-[#ea580c]'
                  : 'w-2 h-2 bg-white/40 hover:bg-white'
              }`}
            />
          );
        })}
      </div>

      {/* ── Bottom Auto-Play Progress Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30 pointer-events-none">
        <div 
          className="h-full bg-[#ea580c] transition-[width] duration-75 ease-linear shadow-[0_0_8px_#ea580c]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
};

export default Hero;