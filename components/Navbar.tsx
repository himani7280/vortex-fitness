"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ChevronRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import siteData from "@/data/siteData";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerData = siteData.header;
  const { topBar, navLinks, button } = headerData;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full flex flex-col font-(family-name:--font-body) bg-white shadow-[0_4px_25px_rgba(0,0,0,0.14)] border-b-[3px] border-[#ea580c] z-50 sticky top-0">
      {/* Nav bar */}
      <div className="w-full bg-white relative z-10 shadow-sm">
        <div className="max-w-[1400px] mx-auto py-2 sm:py-2.5 md:py-2.5 px-4 md:px-6 lg:px-6 flex justify-between items-center gap-3">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-10 flex items-center mr-4 lg:mr-8 xl:mr-10" aria-label="VortexFit Home">
            <div className="relative w-[155px] h-[42px] sm:w-[195px] sm:h-[46px] md:w-[215px] md:h-[50px] scale-[1.4] sm:scale-[1.7] md:scale-[1.85] origin-left translate-y-0 -translate-x-0.5 sm:-translate-x-1 pointer-events-none">
              <Image 
                src="/logo.webp" 
                alt="VortexFit Logo" 
                fill 
                className="object-contain object-left" 
                priority 
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[14px] xl:text-[14.5px] font-semibold text-gray-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  prefetch={false}
                  className={`whitespace-nowrap transition-all pb-0.5 border-b-2 hover:text-[#f05a22] hover:border-[#f05a22] ${
                    isActive ? "text-[#f05a22] border-[#f05a22]" : "border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3 flex-shrink-0 relative z-20">
            <Link href={button.link} className="hidden sm:block">
              <button className="whitespace-nowrap bg-[#e85d21] hover:bg-[#d4501a] text-white font-semibold py-2 px-5 lg:px-4 xl:px-5.5 rounded shadow-sm transition-colors text-[13px] xl:text-[13.5px]">
                {button.text}
              </button>
            </Link>

            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md text-gray-700 hover:bg-orange-50 hover:text-[#f05a22] active:scale-95 transition-all cursor-pointer relative z-30"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Mobile Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Side drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="relative flex items-center">
            <div className="relative w-[135px] h-[34px]">
              <Image 
                src="/logo.webp" 
                alt="VortexFit Logo" 
                fill 
                className="object-contain object-left" 
                priority 
              />
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-50 hover:text-[#ea580c] flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col py-2 overflow-y-auto flex-grow">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-3 border-b border-gray-50 text-[15px] font-semibold transition-colors ${
                  isActive
                    ? "text-[#ea580c] bg-orange-50/50"
                    : "text-gray-700 hover:text-[#ea580c] hover:bg-gray-50"
                }`}
              >
                {link.name}
                <ChevronRight className={`w-4 h-4 ${isActive ? "text-[#ea580c]" : "text-gray-300"}`} />
              </Link>
            );
          })}
        </nav>

        {/* Bottom Contact + CTA + Socials */}
        <div className="flex flex-col border-t border-gray-100 bg-gray-50/80 p-4 gap-3 shrink-0">
          {topBar?.phone && (
            <a 
              href={`tel:${topBar.phone}`} 
              className="flex items-center gap-2.5 text-[13px] font-semibold text-gray-800 hover:text-[#f05a22] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>{topBar.phone}</span>
            </a>
          )}

          <Link
            href={button.link}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <button className="w-full bg-[#e85d21] hover:bg-[#d4501a] text-white font-bold py-2.5 px-4 rounded transition-colors text-[13px] uppercase tracking-wide shadow-sm cursor-pointer">
              {button.text}
            </button>
          </Link>

          <div className="flex items-center justify-center gap-3 pt-1">
            <Link href={topBar.socialLinks.facebook} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#ea580c] hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all">
              <FaFacebookF className="w-3.5 h-3.5 fill-current" />
            </Link>
            <Link href={topBar.socialLinks.instagram} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#ea580c] hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all">
              <FaInstagram className="w-4 h-4 fill-current" />
            </Link>
            <Link href={topBar.socialLinks.youtube} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#ea580c] hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all">
              <FaYoutube className="w-4 h-4 fill-current" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
