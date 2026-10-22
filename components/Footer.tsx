"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import siteData from '@/data/siteData';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footer = siteData.footer;

  
  // Ref for GSAP Scope
  const footerRef = useRef<HTMLElement>(null);

  // GSAP Animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%', 
        toggleActions: 'play none none none',
      },
      defaults: { ease: 'power3.out' }
    });

    // 1. Footer columns staggered slide up
    tl.fromTo('.gsap-footer-col',
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.7, 
        stagger: 0.15,
        clearProps: 'all' 
      }
    )
    // 2. Bottom bar fade and slide in
    .fromTo('.gsap-bottom-bar',
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5,
        clearProps: 'all'
      },
      "-=0.4" 
    );
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="w-full bg-[#0a0a0a] text-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="gsap-footer-col flex flex-col">
            {/* Logo */}
            <Link href="/" className="inline-block mb-6 md:mb-8" aria-label="VortexFit Home">
              <div className="relative w-[155px] h-[42px] sm:w-[195px] sm:h-[46px] md:w-[215px] md:h-[50px] scale-[1.4] sm:scale-[1.7] md:scale-[1.85] origin-left translate-y-0 -translate-x-0.5 sm:-translate-x-1 pointer-events-none">
                <Image
                  src={footer.logo || "/logo.webp"}
                  alt="VortexFit Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-[15px] leading-relaxed mb-8 pr-4">
              {footer.description}
            </p>
            <div className="flex items-center gap-3">
              <a href={footer.socialLinks.facebook} aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#ea580c] transition-colors group">
                <FaFacebookF className="text-[#ea580c] group-hover:text-white transition-colors w-4 h-4" />
              </a>
              <a href={footer.socialLinks.instagram} aria-label="Instagram" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#ea580c] transition-colors group">
                <FaInstagram className="text-[#ea580c] group-hover:text-white transition-colors w-4 h-4" />
              </a>
              <a href={footer.socialLinks.youtube} aria-label="YouTube" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#ea580c] transition-colors group">
                <FaYoutube className="text-[#ea580c] group-hover:text-white transition-colors w-4 h-4" />
              </a>
              <a href={footer.socialLinks.linkedin} aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#ea580c] transition-colors group">
                <FaLinkedinIn className="text-[#ea580c] group-hover:text-white transition-colors w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="gsap-footer-col flex flex-col lg:pl-10">
            <h4 className="text-[18px] font-bold text-white mb-2">{footer.quickLinksTitle}</h4>
            <div className="w-8 h-[2px] bg-[#ea580c] mb-6"></div>
            <ul className="flex flex-col gap-3">
              {footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.path} className="flex items-center gap-2 text-gray-400 hover:text-[#ea580c] transition-colors group text-[15px]">
                    <ChevronRight className="w-4 h-4 text-[#ea580c] group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="gsap-footer-col flex flex-col">
            <h4 className="text-[18px] font-bold text-white mb-2">{footer.programsTitle}</h4>
            <div className="w-8 h-[2px] bg-[#ea580c] mb-6"></div>
            <ul className="flex flex-col gap-3">
              {siteData.home.programs.cards.map((program) => (
                <li key={program.id}>
                  <Link href={`/programs/${program.id}`} className="flex items-center gap-2 text-gray-400 hover:text-[#ea580c] transition-colors group text-[15px]">
                    <ChevronRight className="w-4 h-4 text-[#ea580c] group-hover:translate-x-1 transition-transform" />
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="gsap-footer-col flex flex-col">
            <h4 className="text-[18px] font-bold text-white mb-2">{footer.contactTitle}</h4>
            <div className="w-8 h-[2px] bg-[#ea580c] mb-6"></div>
            <ul className="flex flex-col gap-5">
              <li className="flex gap-3.5 items-start group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-gray-400 group-hover:text-white text-[15px] leading-relaxed transition-colors">
                  {footer.contact.addressLine1}<br />
                  {footer.contact.addressLine2}
                </span>
              </li>
              <li className="flex gap-3.5 items-center group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <a href={`tel:${footer.contact.phone}`} className="text-gray-400 group-hover:text-white text-[15px] transition-colors">
                  {footer.contact.phone}
                </a>
              </li>
              <li className="flex gap-3.5 items-center group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <a href={`mailto:${footer.contact.email}`} className="text-gray-400 group-hover:text-white text-[15px] transition-colors">
                  {footer.contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="gsap-bottom-bar w-full border-t border-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 py-6 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-gray-400 text-[14px]">
            {footer.copyright}
          </p>
          
          {/* Scroll to Top Button */}
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border-2 border-[#ea580c] bg-[#0a0a0a] flex items-center justify-center text-[#ea580c] hover:bg-[#ea580c] hover:text-white transition-colors cursor-pointer group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;