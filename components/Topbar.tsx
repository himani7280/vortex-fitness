import React from "react";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import siteData from "@/data/siteData";

const Topbar = () => {
  const { topBar } = siteData.header;

  return (
    <div className="hidden md:block w-full bg-[#111111] text-gray-300 border-b border-neutral-800 font-(family-name:--font-body)">
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
          <a href={`tel:${topBar.phone}`} className="flex items-center gap-2 group cursor-pointer" aria-label={`Call us at ${topBar.phone}`}>
            <Phone className="w-[13px] h-[13px] text-[#f05a22] group-hover:scale-110 transition-transform fill-current" />
            <span className="text-white group-hover:text-[#f05a22] font-semibold tracking-wide transition-colors">{topBar.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

