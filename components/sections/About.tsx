'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Rocket } from 'lucide-react';
import Button from '../ui/Button';
import siteData from '@/data/siteData';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className = '' }) => {
  const about = (siteData.sections?.About?.variants?.FitnessAbout1 || siteData.home.about) as any;

  
  // Section reference for GSAP scope
  const containerRef = useRef(null);

  // Scroll smooth animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%', 
        toggleActions: 'play none none none', 
      },
      defaults: { ease: 'power3.out' }
    });

    // 1. Left Side Images & Backgrounds (Layered effect)
    tl.fromTo('.gsap-bg-orange', 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.8 }
    )
    .fromTo('.gsap-bg-cream', 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.8 }, 
      '-=0.6'
    )
    .fromTo('.gsap-dots', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }, 
      '-=0.5'
    )
    .fromTo('.gsap-img-main', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      '-=0.7'
    )
    .fromTo('.gsap-img-small', 
      { x: 30, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' }, 
      '-=0.6'
    )
    // 2. Right Side Content (Staggered moving up)
    .fromTo('.gsap-text-content',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
      '-=0.8' 
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      aria-label="About Us"
      className={`w-full py-10 sm:py-14 md:py-16 lg:py-20 bg-[#fafafa] overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-16 items-center">
        
        {/* Left Side: Images */}
        <div className="w-full flex justify-center lg:justify-start">
          <div className="relative w-[280px] sm:w-[330px] md:w-[370px] lg:w-[390px] xl:w-[420px] -translate-x-3 sm:-translate-x-4 lg:translate-x-0 lg:ml-5 mb-8 sm:mb-10 lg:mb-0 isolate">
            
            {/* Background orange block (Right) */}
            <div className="gsap-bg-orange absolute top-[3%] -right-3 sm:-right-5 w-[40%] h-[95%] bg-[#f05a22] rounded-[1.5rem] sm:rounded-[2rem] -z-10"></div>
            
            {/* Background cream block (Left) */}
            <div className="gsap-bg-cream absolute top-[10%] -left-3 sm:-left-5 w-[40%] h-[60%] bg-[#fdf2ee] rounded-[1.5rem] sm:rounded-[2rem] -z-10"></div>
            
            {/* L-Shape Dots Pattern */}
            <div className="gsap-dots absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 -z-10 hidden sm:block pointer-events-none">
               {/* Vertical line (Left) */}
               <div className="absolute bottom-0 left-0 flex gap-[6px]">
                 <div className="flex flex-col gap-[6px]">
                   {[...Array(14)].map((_, i) => (
                     <div key={`v1-${i}`} className="w-[4px] h-[4px] rounded-full bg-[#ea580c]"></div>
                   ))}
                 </div>
                 <div className="flex flex-col gap-[6px]">
                   {[...Array(14)].map((_, i) => (
                     <div key={`v2-${i}`} className="w-[4px] h-[4px] rounded-full bg-[#ea580c]"></div>
                   ))}
                 </div>
               </div>
               {/* Horizontal line (Bottom) */}
               <div className="absolute bottom-0 left-0 flex flex-col gap-[6px]">
                 <div className="flex gap-[6px]">
                   {[...Array(16)].map((_, i) => (
                     <div key={`h1-${i}`} className="w-[4px] h-[4px] rounded-full bg-[#ea580c]"></div>
                   ))}
                 </div>
                 <div className="flex gap-[6px]">
                   {[...Array(16)].map((_, i) => (
                     <div key={`h2-${i}`} className="w-[4px] h-[4px] rounded-full bg-[#ea580c]"></div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Main Image */}
            <div className="gsap-img-main relative w-full aspect-[3/4] rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden shadow-xl z-10 bg-gray-200">
              <Image
                src={about.images.main}
                alt="About Main"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 420px"
                className="object-cover object-[75%_center]"
                priority
              />
            </div>

            {/* Small Overlapping Image */}
            <div className="gsap-img-small absolute top-1/2 -translate-y-1/2 -right-6 sm:-right-8 md:-right-10 lg:-right-12 xl:-right-14 w-[54%] sm:w-[56%] md:w-[58%] lg:w-[56%] xl:w-[58%] aspect-[4/5] rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden border-[5px] sm:border-[7px] border-white shadow-2xl z-20 bg-gray-200">
              <Image
                src={about.images.small}
                alt="About Small"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 250px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center w-full">
          {/* Top Title */}
          <div className="gsap-text-content flex items-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
            <div className="w-8 sm:w-10 h-[2px] bg-[#f05a22]"></div>
            <span className="text-[#f05a22] tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm font-bold uppercase whitespace-nowrap">
              {about.topText}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="gsap-text-content font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[40px] font-extrabold text-black leading-tight sm:leading-[1.15] mb-3 sm:mb-4">
            {about.heading1}{' '}
            <span className="text-[#f05a22]">{about.heading2}</span>
          </h2>

          {/* Description */}
          <p className="gsap-text-content text-gray-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 font-medium">
            {about.paragraph1}
          </p>

          {/* Feature Box */}
          <div className="gsap-text-content flex items-center gap-4 sm:gap-5 mb-6 sm:mb-7 bg-white sm:bg-transparent p-3.5 sm:p-0 rounded-2xl border border-gray-100 sm:border-0 shadow-sm sm:shadow-none">
            <div className="flex-shrink-0 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#fdf2ee] flex items-center justify-center">
              <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-[#f05a22]" />
            </div>
            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-[14.5px]">
              {about.feature?.text || about.featureText}
            </p>
          </div>

          {/* CTA Button */}
          <div className="gsap-text-content flex items-center pt-1">
            <Button variant="primary" href={about.button?.link || about.buttonLink || "/about"}>
              {about.button?.text || about.buttonText || "Read More"}
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;