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

  return (
    <div className="w-full flex flex-col min-h-screen bg-white font-sans">
      <PageHeader title="Our Team" breadcrumb="Our Team" />
      
      <section className="w-full py-10 md:py-14 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
          
          <div className="text-center mb-8">
            <span className="text-[#ea580c] font-bold text-[14px] tracking-[0.1em] uppercase flex items-center justify-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-[#ea580c]"></span> {teamSection.badge} <span className="w-8 h-[2px] bg-[#ea580c]"></span>
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-[#1a1a1a] mb-3">
              {teamSection.titleStart}<span className="text-[#ea580c]">{teamSection.titleHighlight}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {teamSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainersList.map((trainer: any) => (

              <div 
                key={trainer.id} 
                className="bg-white rounded-[2rem] p-5 flex flex-col items-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square mb-5 isolate group">
                  {/* Decorative Orange Box */}
                  <div className="absolute -top-3 -left-3 w-16 h-16 bg-[#ea580c] rounded-tl-2xl rounded-br-lg -z-10 transition-transform group-hover:scale-110 duration-300"></div>
                  
                  {/* Image */}
                  <Link href={`/team/${trainer.id}`} className="block relative w-full h-full rounded-2xl overflow-hidden">
                    <Image 
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                </div>

                {/* Info */}
                <Link href={`/team/${trainer.id}`}>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-1 hover:text-[#ea580c] transition-colors">
                    {trainer.name}
                  </h3>
                </Link>
                
                <p className="text-[#ea580c] text-[11px] font-bold tracking-wider uppercase mb-3 text-center">
                  {trainer.role}
                </p>
                
                {/* Divider */}
                <div className="w-8 h-[2px] bg-orange-200 mb-4 rounded-full"></div>

                {/* Socials */}
                <div className="flex items-center gap-2 mb-4">
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.facebook || 'https://www.facebook.com'} aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white transition-colors">
                    <FaFacebookF className="w-4 h-4 fill-current" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.instagram || 'https://www.instagram.com'} aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white transition-colors">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.linkedin || 'https://www.linkedin.com'} aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white transition-colors">
                    <FaLinkedinIn className="w-4 h-4 fill-current" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.youtube || 'https://www.youtube.com'} aria-label="YouTube" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-[#ea580c] hover:text-white transition-colors">
                    <FaYoutube className="w-4 h-4 fill-current" />
                  </a>
                </div>

                {/* View Profile Link */}
                <Link href={`/team/${trainer.id}`} className="inline-flex items-center gap-2 text-[#ea580c] font-bold text-[13px] uppercase tracking-wide hover:text-[#1a1a1a] transition-colors mt-auto">
                  View Profile <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
