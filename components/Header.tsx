"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Menu, X, ChevronRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import siteData from "@/data/siteData";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerData = siteData.sections?.SiteChrome?.variants?.FitnessHeader1 || siteData.header;
  const { topBar, navLinks, button } = headerData;

  return (
    <header className="w-full flex flex-col font-sans bg-white shadow-[0_4px_25px_rgba(0,0,0,0.14)] border-b-[3px] border-[#ea580c] z-50 sticky top-0">

      {/* ── Top Bar (desktop only) ── */}
      <div className="hidden md:block w-full bg-[#111111] text-gray-300 border-b border-neutral-800">
        <div className="max-w-[1400px] mx-auto py-2.5 px-4 md:px-6 lg:px-6 flex justify-between items-center gap-4 text-[13px] font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-[14px] h-[14px] text-[#f05a22] shrink-0" />
            <span className="text-gray-300 hover:text-white transition-colors">{topBar.location}</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3.5">
              <Link href={topBar.socialLinks.facebook} className="text-[#ea580c] hover:text-[#f05a22] transition-colors" aria-label="Facebook">
                <FaFacebookF className="w-3.5 h-3.5 fill-current" />
              </Link>
              <Link href={topBar.socialLinks.instagram} className="text-[#ea580c] hover:text-[#f05a22] transition-colors" aria-label="Instagram">
                <FaInstagram className="w-4 h-4 fill-current" />
              </Link>
              <Link href={topBar.socialLinks.youtube} className="text-[#ea580c] hover:text-[#f05a22] transition-colors" aria-label="YouTube">
                <FaYoutube className="w-4 h-4 fill-current" />
              </Link>
            </div>
            <div className="h-3.5 w-px bg-neutral-700" />
            <div className="flex items-center gap-2">
              <Phone className="w-[13px] h-[13px] text-[#f05a22] fill-current" />
              <span className="text-white font-semibold tracking-wide">{topBar.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Nav Row ── */}
      <div className="w-full bg-white relative z-10 shadow-sm">
        <div className="max-w-[1400px] mx-auto py-3.5 sm:py-4 md:py-4.5 px-4 md:px-6 lg:px-6 flex justify-between items-center gap-2">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-10 flex items-center" aria-label="VortexFit Home">
            <div className="relative w-[155px] h-[42px] sm:w-[195px] sm:h-[46px] md:w-[215px] md:h-[50px] scale-[1.4] sm:scale-[1.7] md:scale-[1.85] origin-left translate-y-0 -translate-x-0.5 sm:-translate-x-1 pointer-events-none">
              <Image src="/logo.png" alt="VortexFit Logo" fill className="object-contain object-left" priority />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[14px] xl:text-[15px] font-semibold text-gray-700">
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
              <button className="whitespace-nowrap bg-[#e85d21] hover:bg-[#d4501a] text-white font-semibold py-2 px-5 lg:px-4 xl:px-6 rounded shadow-sm transition-colors text-[13px] xl:text-[14px]">
                {button.text}
              </button>
            </Link>

            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:bg-orange-50 hover:text-[#f05a22] active:scale-95 transition-all cursor-pointer relative z-30"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Mobile Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Dropdown (inline, not fixed/sticky) ── */}
      <div
        className={`lg:hidden w-full bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out relative z-20 ${
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Nav links */}
        <nav className="flex flex-col">
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

        {/* Footer row: CTA + socials */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 gap-3">
          <Link
            href={button.link}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex-1"
          >
            <button className="w-full bg-[#e85d21] hover:bg-[#d4501a] text-white font-bold py-2.5 px-4 rounded transition-colors text-[13px] uppercase tracking-wide">
              {button.text}
            </button>
          </Link>

          <div className="flex items-center gap-3">
            <Link href={topBar.socialLinks.facebook} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#ea580c] hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all">
              <FaFacebookF className="w-4 h-4 fill-current" />
            </Link>
            <Link href={topBar.socialLinks.instagram} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#ea580c] hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all">
              <FaInstagram className="w-4.5 h-4.5 fill-current" />
            </Link>
            <Link href={topBar.socialLinks.youtube} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#ea580c] hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all">
              <FaYoutube className="w-4.5 h-4.5 fill-current" />
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;