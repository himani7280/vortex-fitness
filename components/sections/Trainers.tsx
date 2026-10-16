'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Dumbbell } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import siteData from '@/data/siteData';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Trainers = () => {
  const trainers = siteData.sections?.Trainers?.variants?.FitnessTrainers1 || siteData.home.trainers;

  
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
    // 2. Trainer Cards - Tilted & Scaled reveal (Different Style)
    .fromTo('.gsap-trainer-card',
      { y: 60, opacity: 0, rotation: 4, scale: 0.9 }, // Halka sa tilt aur chhota size
      { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' },
      "-=0.4"
    )
    // 3. Orange Decorative Box - Pops out from behind diagonally
    .fromTo('.gsap-decor-box',
      { scale: 0, opacity: 0, x: 20, y: 20 },
      { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(2)' },
      "-=0.7" // Card ke sath sath chalega
    )
    // 4. Text Info (Name, Role, Line)
    .fromTo('.gsap-trainer-info',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      "-=0.6"
    )
    // 5. Social Icons - Individual bouncy stagger
    .fromTo('.gsap-social-icon',
      { scale: 0, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(1.5)' },
      "-=0.5"
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full pt-2 pb-8 lg:pt-4 lg:pb-10 bg-white overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
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
          <h2 className="gsap-header-item font-heading text-3xl md:text-4xl lg:text-[42px] font-extrabold text-black leading-[1.05] mb-2 md:whitespace-nowrap">
            {trainers.heading1} <span className="text-[#ea580c]">{trainers.heading2}</span>
          </h2>

          {/* Description */}
          <p className="gsap-header-item text-gray-500 text-[15px] md:text-base leading-relaxed">
            {trainers.description}
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          {trainers.team.map((trainer) => (
            <div 
              key={trainer.id} 
              className="gsap-trainer-card bg-white rounded-[2rem] p-5 flex flex-col items-center hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square mb-5 isolate">
                {/* Decorative Orange Box */}
                <div className="gsap-decor-box absolute -top-3 -left-3 w-16 h-16 bg-[#ea580c] rounded-tl-2xl rounded-br-lg -z-10 origin-bottom-right"></div>
                
                {/* Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <h3 className="gsap-trainer-info font-heading text-xl font-bold text-gray-900 mb-1">
                {trainer.name}
              </h3>
              
              <p className="gsap-trainer-info text-[#ea580c] text-[11px] font-bold tracking-wider uppercase mb-3">
                {trainer.role}
              </p>
              
              {/* Divider */}
              <div className="gsap-trainer-info w-8 h-[2px] bg-orange-200 mb-4 rounded-full"></div>

              {/* Socials */}
              <div className="flex items-center gap-2">
                <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.facebook || 'https://www.facebook.com'} aria-label="Facebook" className="gsap-social-icon w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white transition-colors">
                  <FaFacebookF className="w-4 h-4 fill-current" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.instagram || 'https://www.instagram.com'} aria-label="Instagram" className="gsap-social-icon w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.linkedin || 'https://www.linkedin.com'} aria-label="LinkedIn" className="gsap-social-icon w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white transition-colors">
                  <FaLinkedinIn className="w-4 h-4 fill-current" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.youtube || 'https://www.youtube.com'} aria-label="YouTube" className="gsap-social-icon w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white transition-colors">
                  <FaYoutube className="w-4 h-4 fill-current" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Trainers;