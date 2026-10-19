'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
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
const TRANSITION_DURATION = 750; // 750ms silky smooth glide

const Hero = () => {
  const totalSlides = bannerSlides.length;

  // Clone last slide at beginning and first slide at end for seamless infinite looping
  const extendedSlides = useMemo(() => {
    if (totalSlides <= 1) return bannerSlides;
    return [
      { ...bannerSlides[totalSlides - 1], _cloneKey: 'clone-last' },
      ...bannerSlides.map((s: any, idx: number) => ({ ...s, _cloneKey: `real-${idx}` })),
      { ...bannerSlides[0], _cloneKey: 'clone-first' }
    ];
  }, [totalSlides]);

  // Start on index 1 (the first real slide)
  const [currentIndex, setCurrentIndex] = useState(totalSlides > 1 ? 1 : 0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Calculate actual active slide index (0 to totalSlides - 1)
  const realActiveIndex = totalSlides <= 1
    ? 0
    : currentIndex === 0
      ? totalSlides - 1
      : currentIndex === extendedSlides.length - 1
        ? 0
        : currentIndex - 1;

  // Reset auto-play timer on manual interaction
  const resetAutoPlay = useCallback(() => {
    setTimerKey((prev) => prev + 1);
  }, []);

  const triggerSlide = useCallback((newIndex: number) => {
    if (totalSlides <= 1) return;
    isAnimatingRef.current = true;
    setIsTransitionEnabled(true);
    setCurrentIndex(newIndex);

    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, TRANSITION_DURATION + 100);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    if (isAnimatingRef.current || totalSlides <= 1) return;
    resetAutoPlay();
    triggerSlide(currentIndex + 1);
  }, [currentIndex, totalSlides, triggerSlide, resetAutoPlay]);

  const prevSlide = useCallback(() => {
    if (isAnimatingRef.current || totalSlides <= 1) return;
    resetAutoPlay();
    triggerSlide(currentIndex - 1);
  }, [currentIndex, totalSlides, triggerSlide, resetAutoPlay]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimatingRef.current || totalSlides <= 1) return;
    const targetIndex = index + 1;
    if (currentIndex === targetIndex) return;
    resetAutoPlay();
    triggerSlide(targetIndex);
  }, [currentIndex, totalSlides, triggerSlide, resetAutoPlay]);

  // Handle transition end for seamless infinite loop reset
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current || totalSlides <= 1) return;

    if (currentIndex === extendedSlides.length - 1) {
      // Reached the end clone (clone of slide 0) -> silently jump to real slide 0 (index 1)
      setIsTransitionEnabled(false);
      setCurrentIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
          isAnimatingRef.current = false;
        });
      });
    } else if (currentIndex === 0) {
      // Reached the start clone (clone of last slide) -> silently jump to real last slide
      setIsTransitionEnabled(false);
      setCurrentIndex(totalSlides);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
          isAnimatingRef.current = false;
        });
      });
    } else {
      isAnimatingRef.current = false;
    }
  };

  // Continuous auto-play timer
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides, nextSlide, timerKey]);

  // Pause when browser tab is inactive to avoid background animation desync
  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Cleanup safety timeout on unmount
  useEffect(() => {
    return () => {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, []);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  return (
    <section 
      aria-label="Main Banner Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] xl:h-[540px] overflow-hidden bg-[#0d0d0d] select-none group/hero focus:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Carousel Track (Smooth infinite horizontal sliding) ── */}
      <div 
        ref={trackRef}
        onTransitionEnd={handleTransitionEnd}
        className="flex w-full h-full will-change-transform"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitionEnabled 
            ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.25, 1, 0.5, 1)` 
            : 'none'
        }}
      >
        {extendedSlides.map((slide: any, index: number) => {
          const isCurrentExtended = index === currentIndex;
          return (
            <div
              key={slide._cloneKey || `${slide.id}-${index}`}
              className="relative w-full min-w-full h-full overflow-hidden shrink-0 select-none"
              aria-hidden={!isCurrentExtended}
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.alt || `Vortex Fitness Banner ${index + 1}`}
                  fill
                  priority={index === 1 || index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Subtle cinematic gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* ── Navigation Controls: Prev Button ── */}
      <button
        onClick={prevSlide}
        aria-label="Previous banner"
        className="absolute left-3 sm:left-5 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-[#ea580c] text-white border border-white/20 hover:border-[#ea580c] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl opacity-80 sm:opacity-0 group-hover/hero:opacity-100 active:scale-95 cursor-pointer hover:shadow-[0_0_15px_rgba(234,88,12,0.5)]"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ── Navigation Controls: Next Button ── */}
      <button
        onClick={nextSlide}
        aria-label="Next banner"
        className="absolute right-3 sm:right-5 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-[#ea580c] text-white border border-white/20 hover:border-[#ea580c] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl opacity-80 sm:opacity-0 group-hover/hero:opacity-100 active:scale-95 cursor-pointer hover:shadow-[0_0_15px_rgba(234,88,12,0.5)]"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ── Slide Indicators / Dots ── */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-black/50 backdrop-blur-md py-1.5 px-3.5 rounded-full border border-white/15 shadow-lg">
        {bannerSlides.map((slide: any, index: number) => {
          const isActive = index === realActiveIndex;
          return (
            <button
              key={slide.id || index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? 'w-7 sm:w-9 h-2 bg-[#ea580c] shadow-[0_0_10px_#ea580c]'
                  : 'w-2 h-2 bg-white/40 hover:bg-white hover:scale-125'
              }`}
            />
          );
        })}
      </div>

      {/* ── Bottom Auto-Play Progress Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15 z-30 pointer-events-none overflow-hidden">
        <div 
          key={`${realActiveIndex}-${timerKey}`}
          className="h-full bg-gradient-to-r from-[#ea580c] to-[#f97316] shadow-[0_0_10px_#ea580c] origin-left"
          style={{
            transformOrigin: 'left',
            animation: isPaused ? 'none' : `heroProgressBar ${SLIDE_DURATION}ms linear forwards`,
            animationPlayState: isPaused ? 'paused' : 'running',
            width: '100%',
          }}
        />
      </div>
    </section>
  );
};

export default Hero;