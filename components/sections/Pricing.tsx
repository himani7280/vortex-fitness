'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Dumbbell, CheckCircle2, ArrowRight } from 'lucide-react';
import siteData from '@/data/siteData';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface PricingProps {
  className?: string;
}

const Pricing: React.FC<PricingProps> = ({ className = '' }) => {
  const pricing = (siteData.sections?.Pricing?.variants?.FitnessPricing1 || siteData.home.pricing) as any;
  const { plans } = pricing;


  // Ref for GSAP scope
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

    // 1. Header animation
    tl.fromTo('.gsap-header-item',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    )
    // 2. Cards animation with clearProps for Tailwind hover fix
    .fromTo('.gsap-pricing-card',
      { y: 50, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.7, 
        stagger: 0.15,
        clearProps: 'all' 
      },
      "-=0.4"
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`w-full bg-[#0a0a0a] py-10 sm:py-12 md:py-14 lg:py-16 font-sans relative ${className}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="gsap-header-item flex items-center gap-3 mb-1">
            <div className="h-[2px] w-12 bg-[#f05a22]"></div>
            <Dumbbell className="w-5 h-5 text-[#f05a22] -mr-1" />
            <span className="text-[#f05a22] font-bold tracking-[0.15em] text-[13px] uppercase">
              {pricing.topText}
            </span>
            <div className="h-[2px] w-12 bg-[#f05a22]"></div>
          </div>
          <h2 className="gsap-header-item font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight mb-2 text-center">
            {pricing.heading1}<span className="text-[#f05a22]">{pricing.heading2}</span>
          </h2>
          <p className="gsap-header-item text-gray-300 text-[15px] md:text-[15.5px] leading-relaxed max-w-2xl mx-auto text-center font-normal">
            {pricing.description}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan: any, index: number) => (

            <div 
              key={index} 
              className="gsap-pricing-card group relative flex flex-col px-6 md:px-8 py-6 md:py-7 rounded-[20px] bg-[#0d0d0d] border border-[#2a2a2a] transition-all duration-500 hover:border-[#f05a22] hover:shadow-[0_15px_45px_rgba(240,90,34,0.22)] lg:hover:-translate-y-3 cursor-pointer"
            >
              {/* Most Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f05a22] text-white text-[12px] font-bold uppercase tracking-wider py-1 px-5 rounded-full whitespace-nowrap shadow-md shadow-[#f05a22]/30 transition-all duration-300 z-10">
                  {pricing.popularBadge}
                </div>
              )}

              {/* Title & Desc */}
              <div className="mb-3">
                <h3 className="text-[22px] font-black tracking-tight text-white uppercase mb-1 group-hover:text-[#f05a22] transition-colors duration-300">
                  {plan.name} <span className="text-[#f05a22]">{pricing.planSuffix}</span>
                </h3>
                <p className="text-[#9ca3af] text-[13.5px] leading-snug min-h-[40px]">
                  {plan.desc}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[#f05a22] text-[46px] font-black leading-none">{pricing.currency}{plan.price}</span>
                <span className="text-[#9ca3af] text-[13px] font-medium">{pricing.period}</span>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-[#2a2a2a] mb-4 group-hover:bg-[#f05a22]/40 transition-colors duration-300"></div>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 mb-5 flex-grow">
                {plan.features.map((feature: any, idx: number) => (

                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-[18px] h-[18px] text-[#f05a22] flex-shrink-0 fill-[#f05a22]/10" strokeWidth={2.5} />
                    <span className="text-[#d1d5db] text-[14px] leading-tight pt-0.5">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Link href={`/enquire?plan=${encodeURIComponent(plan.name)}`} className="mt-auto">
                <button 
                  className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-transparent text-white border border-[#f05a22] group-hover:bg-[#f05a22] group-hover:shadow-[0_4px_20px_rgba(240,90,34,0.4)] active:scale-95 cursor-pointer"
                >
                  <span>{pricing.button.text}</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;