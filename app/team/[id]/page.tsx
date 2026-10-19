import React from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import siteData, { teamData, teamProfileVariant, TeamMemberProfile, Specialization } from '@/data/siteData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { 
  Trophy, Users, Star, ArrowRight, Dumbbell, Activity, Heart, 
  BicepsFlexed, Utensils, Apple, Sparkles, Flame, HeartPulse, Zap, Target 
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import StatCounter from '../../../components/ui/StatCounter';

export async function generateStaticParams() {
  const ids = teamProfileVariant?.members 
    ? Object.keys(teamProfileVariant.members) 
    : teamData.map((member) => member.id);
  return ids.map((id) => ({ id }));
}

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const trainer: TeamMemberProfile | undefined = 
    teamProfileVariant?.members?.[resolvedParams.id] || 
    teamData.find((t) => t.id === resolvedParams.id);
  
  if (!trainer) {
    notFound();
  }

  const nameParts = trainer.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // Helper to get improved and context-relevant icons for specializations
  const getSpecializationIcon = (title: string, iconName?: string) => {
    const t = title.toLowerCase();
    const iconClass = "w-6 h-6 stroke-[2]";
    if (t.includes('meal') || t.includes('nutrition') || t.includes('diet')) {
      return <Utensils className={iconClass} />;
    }
    if (t.includes('macro') || t.includes('supplement')) {
      return <Apple className={iconClass} />;
    }
    if (t.includes('yoga') || t.includes('flexibility') || t.includes('mobility')) {
      return <Sparkles className={iconClass} />;
    }
    if (t.includes('hiit') || t.includes('crossfit') || t.includes('endurance')) {
      return <Flame className={iconClass} />;
    }
    if (t.includes('weight') || t.includes('loss') || t.includes('cardio')) {
      return <HeartPulse className={iconClass} />;
    }
    if (t.includes('transformation') || t.includes('muscle') || t.includes('core')) {
      return <BicepsFlexed className={iconClass} />;
    }
    if (t.includes('functional') || t.includes('sports') || t.includes('conditioning')) {
      return <Zap className={iconClass} />;
    }
    if (t.includes('lifestyle') || t.includes('habit') || t.includes('coaching')) {
      return <Target className={iconClass} />;
    }
    if (iconName === 'running') return <Activity className={iconClass} />;
    if (iconName === 'heart') return <Heart className={iconClass} />;
    if (iconName === 'biceps') return <BicepsFlexed className={iconClass} />;
    return <Dumbbell className={iconClass} />;
  };

  const heroVariant = siteData.sections?.Hero?.variants?.FitnessTeamDetailsHero1;
  const bannerTitle = heroVariant?.title || "Team Detail";

  return (
    <div className="w-full flex flex-col min-h-screen bg-white font-sans">
      <PageHeader title={bannerTitle} breadcrumb={`Team / ${trainer.name}`} />

      {/* Main Details Section */}
      <section className="w-full pt-10 pb-8 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Image */}
            <div className="w-full lg:w-[45%] relative">
              <div className="absolute top-[10%] -left-4 lg:-left-6 w-8 h-[45%] bg-[#ea580c] rounded-l-[16px] -z-20"></div>
              <div className="absolute -bottom-4 lg:-bottom-6 left-[20%] w-[55%] h-8 bg-[#ea580c] rounded-b-[16px] -z-20"></div>
              <div className="absolute bottom-[10%] -right-4 lg:-right-6 w-8 h-[25%] bg-[#ea580c] rounded-r-[16px] -z-20"></div>
              
              <div className="w-full relative h-[450px] md:h-[550px] drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
                <div 
                  className="absolute top-0 -left-[12px] -right-[16px] -bottom-[12px] bg-[#ea580c] rounded-[24px] z-0"
                  style={{ clipPath: 'polygon(0% 0%, 96% 0%, 97.5% 1%, 98.5% 3%, 99.5% 6%, 100% 10%, 88% 85%, 87.3% 91%, 86.2% 96%, 84.5% 98.5%, 82% 100%, 0% 100%)' }}
                ></div>

                <div 
                  className="absolute inset-0 rounded-[24px] overflow-hidden z-10 bg-black"
                  style={{ clipPath: 'polygon(0% 0%, 96% 0%, 97.5% 1%, 98.5% 3%, 99.5% 6%, 100% 10%, 88% 85%, 87.3% 91%, 86.2% 96%, 84.5% 98.5%, 82% 100%, 0% 100%)' }}
                >
                  <Image 
                    src={trainer.image} 
                    alt={trainer.name} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-[55%] pt-2">
              <div className="text-[#ea580c] font-bold text-[12px] tracking-[0.1em] uppercase flex items-center gap-3 mb-2">
                {trainer.role} <span className="w-12 h-[2px] bg-[#ea580c]"></span>
              </div>
              
              <h1 className="font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold mb-4 uppercase leading-tight">
                <span className="text-[#1a1a1a]">{firstName}</span> <span className="text-[#ea580c]">{lastName}</span>
              </h1>
              
              <p className="text-gray-500 text-[14px] leading-[1.7] mb-6 max-w-2xl">
                {trainer.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* Stat 1 */}
                <div className="group bg-white border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(234,88,12,0.14)] hover:border-orange-200 hover:-translate-y-1.5 transition-all duration-300 rounded-[16px] p-8 text-center flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-16 h-16 bg-[#fff5f0] group-hover:bg-[#ea580c] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_4px_14px_rgba(234,88,12,0.35)] rounded-full flex items-center justify-center mb-4 text-[#ea580c] transition-all duration-300">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-[#1a1a1a] text-[17px] mb-1">Experience</h4>
                  <div className="font-black text-[#1a1a1a] text-[24px]">
                    <StatCounter value={trainer.experience} />
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="group bg-white border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(234,88,12,0.14)] hover:border-orange-200 hover:-translate-y-1.5 transition-all duration-300 rounded-[16px] p-8 text-center flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-16 h-16 bg-[#fff5f0] group-hover:bg-[#ea580c] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_4px_14px_rgba(234,88,12,0.35)] rounded-full flex items-center justify-center mb-4 text-[#ea580c] transition-all duration-300">
                    <Users className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-[#1a1a1a] text-[17px] mb-1">Clients Trained</h4>
                  <div className="font-black text-[#1a1a1a] text-[24px]">
                    <StatCounter value={trainer.clients} />
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="group bg-white border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(234,88,12,0.14)] hover:border-orange-200 hover:-translate-y-1.5 transition-all duration-300 rounded-[16px] p-8 text-center flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-16 h-16 bg-[#fff5f0] group-hover:bg-[#ea580c] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_4px_14px_rgba(234,88,12,0.35)] rounded-full flex items-center justify-center mb-4 text-[#ea580c] transition-all duration-300">
                    <Star className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-[#1a1a1a] text-[17px] mb-1">Specialization</h4>
                  <p className="text-gray-500 text-[14px] leading-snug px-1">{trainer.specializationsTitle}</p>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:justify-between">
                {/* Socials */}
                <div className="flex gap-4">
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.facebook || 'https://www.facebook.com'} aria-label="Facebook" className="w-13 h-13 rounded-full bg-[#f8f9fa] text-[#1a1a1a] hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-1 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-[0_6px_16px_rgba(234,88,12,0.35)]">
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.instagram || 'https://www.instagram.com'} aria-label="Instagram" className="w-13 h-13 rounded-full bg-[#f8f9fa] text-[#1a1a1a] hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-1 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-[0_6px_16px_rgba(234,88,12,0.35)]">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.linkedin || 'https://www.linkedin.com'} aria-label="LinkedIn" className="w-13 h-13 rounded-full bg-[#f8f9fa] text-[#1a1a1a] hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-1 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-[0_6px_16px_rgba(234,88,12,0.35)]">
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href={trainer.socials?.youtube || 'https://www.youtube.com'} aria-label="YouTube" className="w-13 h-13 rounded-full bg-[#f8f9fa] text-[#1a1a1a] hover:bg-[#ea580c] hover:text-white hover:scale-115 hover:-translate-y-1 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-[0_6px_16px_rgba(234,88,12,0.35)]">
                    <FaYoutube className="w-5 h-5" />
                  </a>
                </div>

                {/* Button */}
                <Link href={`/enquire?trainer=${encodeURIComponent(trainer.name)}`} className="group bg-[#ea580c] hover:bg-[#d4501a] text-white font-bold py-4 px-10 rounded-[8px] hover:shadow-[0_10px_25px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-3 uppercase tracking-wide text-[15px] cursor-pointer">
                  <span>Enquiry Now</span>
                  <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* About & Quote Section */}
      <section className="w-full pt-8 pb-4 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: About Text */}
            <div className="w-full md:w-[60%]">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#1a1a1a] flex items-center gap-4 mb-4">
                About {firstName} <span className="w-12 h-[2px] bg-[#ea580c]"></span>
              </h2>
              <p className="text-gray-500 text-[14px] leading-[1.7]">
                {trainer.about}
              </p>
            </div>
            {/* Right: Quote Box */}
            <div className="w-full md:w-[40%]">
              <div className="bg-[#f8f9fa] hover:bg-white border border-transparent hover:border-orange-200 transition-all duration-300 p-6 rounded-[12px] relative overflow-hidden shadow-xs hover:shadow-md">
                <div className="absolute top-2 left-4 text-[80px] text-gray-200 opacity-60 leading-none">
                  “
                </div>
                <p className="text-[#1a1a1a] text-[14px] italic font-medium leading-[1.6] relative z-10 mb-4 mt-6">
                  &ldquo;{trainer.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2 relative z-10">
                  <span className="w-6 h-[2px] bg-[#ea580c]"></span>
                  <span className="font-bold text-[#1a1a1a] text-[13px]">{trainer.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="w-full pt-4 pb-10 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#1a1a1a] flex items-center gap-4 mb-4">
            Specializations <span className="w-12 h-[2px] bg-[#ea580c]"></span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trainer.specializations.map((spec: Specialization, index: number) => (
              <div key={index} className="group bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-[14px] p-6 text-center flex flex-col items-center hover:shadow-[0_14px_30px_rgba(234,88,12,0.15)] hover:border-orange-200 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#fff5f0] group-hover:bg-[#ea580c] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_4px_14px_rgba(234,88,12,0.35)] transition-all duration-300 flex items-center justify-center mb-4 text-[#ea580c] shadow-sm">
                  {getSpecializationIcon(spec.title, spec.icon)}
                </div>
                <h4 className="font-bold text-[#1a1a1a] group-hover:text-[#ea580c] text-[15px] mb-2 transition-colors">{spec.title}</h4>
                <p className="text-gray-500 text-[13px] leading-[1.5]">
                  {spec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
