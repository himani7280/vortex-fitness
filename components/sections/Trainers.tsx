'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dumbbell, ArrowRight } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import siteData, { teamData } from '@/data/siteData';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface TrainersProps {
  className?: string;
}

const Trainers: React.FC<TrainersProps> = ({ className = '' }) => {
  const trainers = siteData.sections?.Trainers?.variants?.FitnessTrainers1 || siteData.home.trainers;
  
  // Ensure names, titles, and IDs match the team page
  const trainersList = (trainers.team && trainers.team.length > 0)
    ? trainers.team
    : teamData.slice(0, 4);

  // Ref for GSAP scope
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP Animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%', 
        toggleActions: 'play none none none',
      }
    });

    // 1. Header items - normal smooth slide up
    tl.fromTo('.gsap-header-item',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    )
    // 2. Trainer Cards - Tilted & Scaled reveal
    .fromTo('.gsap-trainer-card',
      { y: 60, opacity: 0, rotation: 4, scale: 0.9 },
      { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' },
      "-=0.4"
    )
    // 3. Orange Decorative Box
    .fromTo('.gsap-decor-box',
      { scale: 0, opacity: 0, x: 20, y: 20 },
      { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(2)' },
      "-=0.7"
    )
    // 4. Text Info (Name, Role, Line)
    .fromTo('.gsap-trainer-info',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      "-=0.6"
    )
    // 5. Social Icons
    .fromTo('.gsap-social-icon',
      { scale: 0, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(1.5)' },
      "-=0.5"
    )
    // 6. View Profile Buttons
    .fromTo('.gsap-trainer-btn',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      "-=0.3"
    );
  }, { scope: sectionRef });

  const hasCustomPt = className.includes('pt-');

  return (
    <section ref={sectionRef} className={`w-full ${hasCustomPt ? '' : 'pt-10 sm:pt-12 md:pt-14 lg:pt-16'} pb-10 sm:pb-12 md:pb-14 lg:pb-16 bg-white overflow-hidden ${className}`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-5 sm:mb-6 md:mb-7 max-w-3xl mx-auto">
          {/* Top Label */}
          <div className="gsap-header-item flex items-center justify-center gap-2 mb-2">
            <div className="h-[2px] w-6 sm:w-10 bg-[#ea580c]"></div>
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c] -scale-x-100 shrink-0" />
            <span className="text-[#ea580c] tracking-[0.15em] text-xs sm:text-sm font-bold uppercase whitespace-nowrap">
              {trainers.topText}
            </span>
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c] shrink-0" />
            <div className="h-[2px] w-6 sm:w-10 bg-[#ea580c]"></div>
          </div>

          {/* Heading */}
          <h2 className="gsap-header-item font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-black leading-tight mb-2 text-center">
            {trainers.heading1} <span className="text-[#ea580c]">{trainers.heading2}</span>
          </h2>

          {/* Description */}
          <p className="gsap-header-item text-gray-500 text-[15px] md:text-[15.5px] leading-relaxed max-w-2xl mx-auto text-center font-normal">
            {trainers.description}
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          {trainersList.map((trainer: any) => (
            <div 
              key={trainer.id} 
              className="gsap-trainer-card group relative bg-white rounded-[2rem] p-5 flex flex-col items-center transition-all duration-500 ease-out border border-gray-100 hover:border-orange-300 hover:shadow-[0_20px_45px_-12px_rgba(234,88,12,0.22)] hover:-translate-y-2.5"
            >
              {/* Image Container with Link */}
              <div className="relative w-full aspect-square mb-5 isolate">
                {/* Decorative Orange Box */}
                <div className="gsap-decor-box absolute -top-3 -left-3 w-16 h-16 bg-[#ea580c] rounded-tl-2xl rounded-br-lg -z-10 origin-bottom-right transition-all duration-500 group-hover:scale-115 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[0_6px_20px_rgba(234,88,12,0.45)]"></div>
                
                {/* Image Link to Team Detail Page */}
                <Link 
                  href={`/team/${trainer.id}`} 
                  className="block relative w-full h-full rounded-2xl overflow-hidden shadow-sm cursor-pointer"
                  aria-label={`View ${trainer.name} profile`}
                >
                  <Image 
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Subtle vignette gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Link>
              </div>

              {/* Info with Link to Team Detail Page */}
              <Link href={`/team/${trainer.id}`} className="block">
                <h3 className="gsap-trainer-info font-heading text-xl font-bold text-gray-900 mb-1 group-hover:text-[#ea580c] transition-colors duration-300 text-center cursor-pointer">
                  {trainer.name}
                </h3>
              </Link>
              
              <p className="gsap-trainer-info text-[#ea580c] text-[11px] font-bold tracking-wider uppercase mb-3 text-center">
                {trainer.role}
              </p>
              
              {/* Expanding Divider Line on Hover */}
              <div className="gsap-trainer-info w-8 h-[2px] bg-orange-200 group-hover:w-16 group-hover:bg-[#ea580c] mb-4 rounded-full transition-all duration-500"></div>

              {/* Socials */}
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.facebook || 'https://www.facebook.com'} aria-label="Facebook" className="gsap-social-icon w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-xs">
                  <FaFacebookF className="w-4 h-4 fill-current" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.instagram || 'https://www.instagram.com'} aria-label="Instagram" className="gsap-social-icon w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-xs">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.linkedin || 'https://www.linkedin.com'} aria-label="LinkedIn" className="gsap-social-icon w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-xs">
                  <FaLinkedinIn className="w-4 h-4 fill-current" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.youtube || 'https://www.youtube.com'} aria-label="YouTube" className="gsap-social-icon w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-xs">
                  <FaYoutube className="w-4 h-4 fill-current" />
                </a>
              </div>

              {/* View Profile Button (Opens Team Detail Page) */}
              <Link 
                href={`/team/${trainer.id}`}
                className="gsap-trainer-btn w-full mt-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-50 group-hover:bg-[#ea580c] text-[#ea580c] group-hover:text-white font-bold text-[12.5px] uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-xs group-hover:shadow-md cursor-pointer"
              >
                <span>View Profile</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Trainers;