import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import siteData, { teamData, teamVariant } from '@/data/siteData';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export default function TeamPage() {
  const teamSection = siteData.sections?.Team?.variants?.FitnessTeam1 || teamVariant || {
    badge: 'EXPERT TRAINERS',
    titleStart: 'Meet Our ',
    titleHighlight: 'Amazing Team',
    description: 'Our certified trainers are passionate, experienced and dedicated to helping you achieve your fitness goals with the right guidance and support.',
    profileButton: 'View Profile',
    items: teamData
  };
  const trainersList = teamSection.items || teamData;

  const heroVariant = siteData.sections?.Hero?.variants?.FitnessTeamHero1;
  const pageTitle = heroVariant?.title || "Our Team";

  return (
    <div className="w-full flex flex-col min-h-screen bg-white font-sans">
      <PageHeader title={pageTitle} breadcrumb="Our Team" />
      
      <section className="w-full py-10 sm:py-12 md:py-14 lg:py-16 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
          
          <div className="text-center mb-8">
            <span className="text-[#ea580c] font-bold text-[14px] tracking-[0.1em] uppercase flex items-center justify-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-[#ea580c]"></span> {teamSection.badge} <span className="w-8 h-[2px] bg-[#ea580c]"></span>
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#1a1a1a] leading-tight mb-2">
              {teamSection.titleStart}<span className="text-[#ea580c]">{teamSection.titleHighlight}</span>
            </h2>
            <p className="text-gray-500 text-[15px] md:text-[15.5px] leading-relaxed max-w-2xl mx-auto font-normal">
              {teamSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainersList.map((trainer: any) => (

              <div 
                key={trainer.id} 
                className="group relative bg-white rounded-[2rem] p-5 flex flex-col items-center transition-all duration-500 ease-out border border-gray-100 hover:border-orange-300 hover:shadow-[0_20px_45px_-12px_rgba(234,88,12,0.22)] hover:-translate-y-2.5"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square mb-5 isolate">
                  {/* Decorative Orange Box */}
                  <div className="absolute -top-3 -left-3 w-16 h-16 bg-[#ea580c] rounded-tl-2xl rounded-br-lg -z-10 origin-bottom-right transition-all duration-500 group-hover:scale-115 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[0_6px_20px_rgba(234,88,12,0.45)]"></div>
                  
                  {/* Image */}
                  <Link href={`/team/${trainer.id}`} className="block relative w-full h-full rounded-2xl overflow-hidden shadow-sm cursor-pointer">
                    <Image 
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </Link>
                </div>

                {/* Info */}
                <Link href={`/team/${trainer.id}`} className="block">
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-1 group-hover:text-[#ea580c] transition-colors duration-300 text-center">
                    {trainer.name}
                  </h3>
                </Link>
                
                <p className="text-[#ea580c] text-[11px] font-bold tracking-wider uppercase mb-3 text-center">
                  {trainer.role}
                </p>
                
                {/* Divider */}
                <div className="w-8 h-[2px] bg-orange-200 group-hover:w-16 group-hover:bg-[#ea580c] mb-4 rounded-full transition-all duration-500"></div>

                {/* Socials */}
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.facebook || 'https://www.facebook.com'} aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-xs">
                    <FaFacebookF className="w-4 h-4 fill-current" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.instagram || 'https://www.instagram.com'} aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-xs">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.linkedin || 'https://www.linkedin.com'} aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-xs">
                    <FaLinkedinIn className="w-4 h-4 fill-current" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.youtube || 'https://www.youtube.com'} aria-label="YouTube" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-xs">
                    <FaYoutube className="w-4 h-4 fill-current" />
                  </a>
                </div>

                {/* View Profile Button (Opens Team Detail Page) */}
                <Link 
                  href={`/team/${trainer.id}`}
                  className="w-full mt-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-50 group-hover:bg-[#ea580c] text-[#ea580c] group-hover:text-white font-bold text-[12.5px] uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-xs group-hover:shadow-md cursor-pointer"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
