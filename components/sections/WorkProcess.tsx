'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Dumbbell, Users, ClipboardCheck, Trophy } from 'lucide-react';
import siteData from '@/data/siteData';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface WorkProcessProps {
  className?: string;
}

const renderIcon = (iconName: string) => {
  const iconProps = { className: "w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white stroke-[2.2]" };
  switch (iconName) {
    case 'users':
      return <Users {...iconProps} />;
    case 'clipboard':
      return <ClipboardCheck {...iconProps} />;
    case 'dumbbell':
      return <Dumbbell {...iconProps} />;
    case 'trophy':
      return <Trophy {...iconProps} />;
    default:
      return <Dumbbell {...iconProps} />;
  }
};

const WorkProcess: React.FC<WorkProcessProps> = ({ className = '' }) => {
  const process = (siteData.sections?.WorkProcess?.variants?.FitnessWorkProcess1 || siteData.home.process) as any;

  
  // Ref for GSAP scope and ScrollTrigger
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP Animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%', 
        toggleActions: 'play none none none',
      },
      defaults: { ease: 'power3.out' }
    });

    // 1. Header elements smoothly slide up
    tl.fromTo('.gsap-header-item',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    )
    // 2. Steps scale and pop up one by one
    .fromTo('.gsap-step',
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15 },
      "-=0.4" // Overlap for speed
    )
    // 3. Connectors (Arrows/Lines) fade in
    .fromTo('.gsap-connector',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 },
      "-=0.5"
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      aria-label="Our Work Process"
      
      className={`relative w-full pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-6 sm:pb-8 md:pb-10 lg:pb-10 bg-white overflow-hidden ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-7 md:mb-8 max-w-3xl mx-auto px-2 w-full">
          {/* Top Label */}
          <div className="gsap-header-item inline-flex items-center justify-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
            <div className="h-[1px] w-5 sm:w-8 md:w-12 bg-[#ea580c] opacity-60"></div>
            <Dumbbell className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#ea580c] -scale-x-100 shrink-0" />
            <span className="text-[#ea580c] tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm font-bold uppercase whitespace-nowrap">
              {process.topText}
            </span>
            <Dumbbell className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#ea580c] shrink-0" />
            <div className="h-[1px] w-5 sm:w-8 md:w-12 bg-[#ea580c] opacity-60"></div>
          </div>

          {/* Main Heading */}
          <h2 className="gsap-header-item font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-black leading-tight sm:leading-[1.1] mb-1.5 sm:mb-2 text-center">
            {process.heading1} <span className="text-[#ea580c]">{process.heading2}</span>
          </h2>

          {/* Description */}
          <p className="gsap-header-item text-gray-500 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto">
            {process.description}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-7 sm:gap-y-8 lg:gap-y-0 gap-x-4 sm:gap-x-6 lg:gap-x-3 xl:gap-x-6 2xl:gap-x-8 w-full max-w-[1360px]">
          {process.steps.map((step: any, index: number) => (
            <React.Fragment key={step.id}>
              <div 
                className="gsap-step relative flex flex-col items-center text-center group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c] rounded-2xl p-0 transition-transform duration-300"
                tabIndex={0}
              >
                {/* Image Circle Wrapper */}
                <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] lg:w-[175px] lg:h-[175px] xl:w-[210px] xl:h-[210px] 2xl:w-[240px] 2xl:h-[240px] mb-4 sm:mb-5 mx-auto">
                  
                  {/* Subtle Background Track Ring */}
                  <div 
                    className="absolute -inset-2.5 sm:-inset-3 lg:-inset-3 xl:-inset-3.5 2xl:-inset-4 rounded-full border border-orange-500/15 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Decorative border arc */}
                  <div 
                    className="absolute -inset-2.5 sm:-inset-3 lg:-inset-3 xl:-inset-3.5 2xl:-inset-4 rounded-full border-[3px] border-transparent border-t-[#ea580c] border-r-[#ea580c] group-hover:rotate-180 transition-transform duration-700 ease-in-out pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Main Image Container */}
                  <div className="w-full h-full rounded-full overflow-hidden relative shadow-lg group-hover:shadow-xl group-hover:shadow-[#ea580c]/15 transition-all duration-500">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, (max-width: 1280px) 175px, 240px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    {/* Subtle inner dark gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 lg:top-1.5 lg:left-1.5 xl:top-3 xl:left-3 w-10 h-10 sm:w-11 sm:h-11 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-[#ea580c] rounded-full flex items-center justify-center text-white text-sm sm:text-base lg:text-sm xl:text-lg font-black shadow-lg border-[3px] sm:border-[4px] border-white z-10 group-hover:scale-110 group-hover:bg-[#0a0a0a] transition-all duration-300">
                    {step.id}
                  </div>

                  {/* Bottom Icon Badge */}
                  <div className="absolute -bottom-3.5 sm:-bottom-4 lg:-bottom-3.5 xl:-bottom-4 left-1/2 -translate-x-1/2 w-11 h-11 sm:w-12 sm:h-12 lg:w-11 lg:h-11 xl:w-14 xl:h-14 bg-[#ea580c] rounded-full flex items-center justify-center text-white shadow-lg border-[3px] sm:border-[4px] border-white z-10 group-hover:scale-110 group-hover:-translate-y-1.5 transition-all duration-300">
                    {renderIcon(step.icon)}
                  </div>

                  {/* Desktop Step Flow Connector (Arrows 1->2, 2->3, 3->4) */}
                  {index < process.steps.length - 1 && (
                    <div 
                      className="gsap-connector hidden lg:block absolute top-1/2 -translate-y-1/2 left-[calc(100%+12px)] w-[36px] xl:w-[60px] 2xl:w-[76px] z-0 pointer-events-none"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 70 20" className="w-full text-[#ea580c]/40 drop-shadow-sm" fill="none">
                        <path
                          d={index % 2 === 0 ? "M 2 14 Q 35 2 64 10" : "M 2 6 Q 35 18 64 10"}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        <polygon points="68,10 60,6 62,10 60,14" fill="currentColor" />
                      </svg>
                    </div>
                  )}

                  {/* Tablet Step Flow Connector (Pairs 1->2 and 3->4) */}
                  {(index === 0 || index === 2) && (
                    <div 
                      className="gsap-connector hidden sm:block lg:hidden absolute top-1/2 -translate-y-1/2 left-[calc(100%+10px)] w-[40px] md:w-[55px] z-0 pointer-events-none"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 60 20" className="w-full text-[#ea580c]/40 drop-shadow-sm" fill="none">
                        <path
                          d="M 2 10 Q 30 4 54 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        <polygon points="58,10 50,6 52,10 50,14" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <h3 className="font-heading text-lg sm:text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-black mb-1.5 sm:mb-2 group-hover:text-[#ea580c] transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-gray-500 text-xs sm:text-[13px] md:text-sm lg:text-[13px] xl:text-sm leading-relaxed px-1 sm:px-2 max-w-[280px] sm:max-w-[300px] mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Mobile Step Flow Connector (Vertical line between steps) */}
              {index < process.steps.length - 1 && (
                <div className="gsap-connector flex sm:hidden flex-col items-center justify-center my-1 text-[#ea580c]/50" aria-hidden="true">
                  <div className="w-0.5 h-6 border-l-2 border-dashed border-[#ea580c]/40"></div>
                  <div className="w-2 h-2 rounded-full bg-[#ea580c]/60 -mt-0.5 animate-pulse"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WorkProcess;