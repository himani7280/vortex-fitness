"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dumbbell, Users, Activity, Crosshair, Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import siteData from '@/data/siteData';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  dumbbell: <Dumbbell className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />,
  users: <Users className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />,
  running: <Activity className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />,
  boxing: <Crosshair className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />,
  yoga: <Heart className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />,
};

interface ProgramsProps {
  className?: string;
}

const GAP = 20;

const Programs: React.FC<ProgramsProps> = ({ className = '' }) => {
  const programs = siteData.sections?.Programs?.variants?.FitnessPrograms1 || siteData.home.programs;
  const originalCards = programs.cards;
  const cardsCount = originalCards.length;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [cardsPerView, setCardsPerView] = useState<number>(4);
  const [cardWidthPx, setCardWidthPx] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  // Append clone cards to allow smooth seamless infinite forward loop
  const canLoop = cardsCount > cardsPerView;
  const slides = canLoop
    ? [...originalCards, ...originalCards.slice(0, cardsPerView)]
    : originalCards;

  // --- Compute cardsPerView & card pixel width on mount & resize ---
  const compute = useCallback(() => {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    // Show 4 cards by default on desktop/laptop (>= 960px or 1024px screens)
    const cpv = w < 640 ? 1 : w < 960 ? 2 : 4;
    setCardsPerView(cpv);
    if (containerRef.current) {
      const W = containerRef.current.clientWidth;
      setCardWidthPx((W - GAP * (cpv - 1)) / cpv);
    }
  }, []);

  useEffect(() => {
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [compute]);

  // Reset when cardsPerView changes
  useEffect(() => {
    setAnimate(false);
    setActiveIndex(0);
  }, [cardsPerView]);

  // Re-enable animation on next frame after silent jump
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (!canLoop) return;
    setActiveIndex((cur) => Math.min(cur + 1, cardsCount));
  }, [canLoop, cardsCount]);

  const handlePrev = useCallback(() => {
    if (!canLoop) return;
    if (activeIndex === 0) {
      setAnimate(false);
      setActiveIndex(cardsCount);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          setActiveIndex(cardsCount - 1);
        });
      });
    } else {
      setActiveIndex((cur) => cur - 1);
    }
  }, [canLoop, activeIndex, cardsCount]);

  const goTo = (idx: number) => {
    setActiveIndex(idx);
  };

  // Seamless snap back when reaching cloned slides at end
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (activeIndex >= cardsCount) {
      setAnimate(false);
      setActiveIndex(0);
    }
  };

  // Auto-play (every 3.5s, pauses on hover/touch)
  useEffect(() => {
    if (isPaused || !canLoop) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, canLoop, handleNext]);

  // Touch Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null) return;
    if (touchDeltaX.current < -45) {
      handleNext();
    } else if (touchDeltaX.current > 45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setIsPaused(false);
  };

  // --- GSAP Scroll Reveal Animation ---
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
    .fromTo('.gsap-carousel-wrapper',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    )
    .fromTo('.gsap-bottom-nav',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.6"
    );
  }, { scope: sectionRef });

  const translateX = activeIndex * (cardWidthPx + GAP);
  const activeDot = canLoop ? activeIndex % cardsCount : 0;

  return (
    <section
      ref={sectionRef}
      aria-label="Our Programs"
      className={`relative w-full py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden ${className}`}
    >
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${programs.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/92 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 flex flex-col items-center">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-2">
          {/* Top Label */}
          <div className="gsap-header-item inline-flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-2.5">
            <div className="h-[1px] w-5 sm:w-8 md:w-12 bg-[#ea580c] opacity-60"></div>
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c] -scale-x-100 shrink-0" />
            <span className="text-[#ea580c] tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm font-bold uppercase whitespace-nowrap">
              {programs.topText}
            </span>
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c] shrink-0" />
            <div className="h-[1px] w-5 sm:w-8 md:w-12 bg-[#ea580c] opacity-60"></div>
          </div>

          {/* Heading */}
          <h2 className="gsap-header-item font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white leading-tight sm:leading-[1.1] mb-2 sm:mb-3 text-center">
            {programs.heading1} <span className="text-[#ea580c]">{programs.heading2}</span>
          </h2>

          {/* Description */}
          <p className="gsap-header-item text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {programs.description}
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="gsap-carousel-wrapper relative w-full flex items-center group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Left Arrow (Desktop Floating) */}
          <button
            onClick={handlePrev}
            className="hidden lg:flex absolute -left-3 xl:-left-6 2xl:-left-8 w-11 h-11 xl:w-12 xl:h-12 rounded-full border border-white/20 items-center justify-center text-gray-300 hover:text-white hover:border-[#ea580c] hover:bg-[#ea580c] transition-all duration-300 z-20 bg-[#0a0a0a]/90 shadow-xl opacity-0 group-hover/carousel:opacity-100 active:scale-95 cursor-pointer"
            aria-label="Previous program"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Track Container */}
          <div 
            ref={containerRef}
            className="w-full overflow-hidden pt-4 pb-6 px-1"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex items-stretch"
              onTransitionEnd={handleTransitionEnd}
              style={{
                gap: `${GAP}px`,
                transform: `translateX(-${translateX}px)`,
                transition: animate ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
                willChange: "transform",
              }}
            >
              {slides.map((card: any, idx: number) => {
                return (
                  <Link
                    href={`/programs/${card.id}`}
                    key={`${card.id}-${idx}`}
                    style={{
                      width: cardWidthPx > 0 ? `${cardWidthPx}px` : undefined,
                      minWidth: cardWidthPx > 0 ? `${cardWidthPx}px` : undefined,
                      flexShrink: 0,
                    }}
                    className="group flex flex-col relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border border-white/10 hover:border-[#ea580c] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ea580c]/20 bg-[#16181d]"
                  >
                    {/* Top Image */}
                    <div className="relative w-full h-[190px] sm:h-[210px] md:h-[220px] overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16181d] via-black/20 to-transparent opacity-80"></div>
                    </div>

                    {/* Bottom Content */}
                    <div className="relative flex flex-col items-center text-center px-4 sm:px-5 pt-8 sm:pt-9 pb-6 flex-grow transition-colors duration-300 group-hover:bg-[#1a1c24]">
                      {/* Floating Icon Circle */}
                      <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl border-[3px] border-[#16181d] bg-[#ea580c] text-white group-hover:scale-110 group-hover:bg-white group-hover:text-[#ea580c] transition-all duration-300">
                        {iconMap[card.icon]}
                      </div>

                      <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#ea580c] transition-colors line-clamp-1">
                        {card.title}
                      </h3>

                      <p className="text-xs sm:text-[13.5px] leading-relaxed mb-5 max-w-xs text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-2">
                        {card.description}
                      </p>

                      <div className="mt-auto pt-2 flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white group-hover:text-[#ea580c] transition-colors">
                        <span>{siteData.programsPage.viewDetailsText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-[#ea580c]" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Arrow (Desktop Floating) */}
          <button
            onClick={handleNext}
            className="hidden lg:flex absolute -right-3 xl:-right-6 2xl:-right-8 w-11 h-11 xl:w-12 xl:h-12 rounded-full border border-white/20 items-center justify-center text-gray-300 hover:text-white hover:border-[#ea580c] hover:bg-[#ea580c] transition-all duration-300 z-20 bg-[#0a0a0a]/90 shadow-xl opacity-0 group-hover/carousel:opacity-100 active:scale-95 cursor-pointer"
            aria-label="Next program"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="gsap-bottom-nav flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-5 w-full">
          <button
            onClick={handlePrev}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-700 bg-[#16181d] text-gray-300 hover:text-white hover:border-[#ea580c] hover:bg-[#ea580c] flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
            aria-label="Previous program"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-[240px] sm:max-w-none">
            {originalCards.map((card: any, idx: number) => (
              <button
                key={card.id}
                onClick={() => goTo(idx)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeDot 
                    ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-[#ea580c]' 
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${card.id}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-700 bg-[#16181d] text-gray-300 hover:text-white hover:border-[#ea580c] hover:bg-[#ea580c] flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
            aria-label="Next program"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Programs;