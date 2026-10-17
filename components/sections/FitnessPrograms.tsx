import React from 'react';
import Image from 'next/image';
import { Dumbbell, Activity, HeartPulse, Sparkles, Apple, BicepsFlexed } from 'lucide-react';
import siteData from '@/data/siteData';

const iconClass = "w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]";
const iconMap: Record<string, React.ReactNode> = {
  dumbbell: <Dumbbell className={iconClass} />,
  activity: <Activity className={iconClass} />,
  heart: <HeartPulse className={iconClass} />,
  biceps: <BicepsFlexed className={iconClass} />,
  sparkles: <Sparkles className={iconClass} />,
  apple: <Apple className={iconClass} />,
};

const FitnessPrograms = () => {
  const fitnessPrograms = (siteData.sections?.ProgramsPage?.variants?.FitnessProgramsPage1 || siteData.programsPage.fitnessPrograms) as any;
  const features = fitnessPrograms.features || siteData.programsPage.fitnessPrograms.features;
  const images = fitnessPrograms.images || siteData.programsPage.fitnessPrograms.images;

  return (
    <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-white overflow-hidden relative">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-center relative z-10">

        {/* Left Side: Content */}
        <div className="flex flex-col justify-center w-full max-w-2xl lg:max-w-none">
          {/* Top Label */}
          <div className="flex items-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
            <span className="text-[#ea580c] tracking-[0.2em] text-xs sm:text-[13px] font-bold uppercase whitespace-nowrap">
              {fitnessPrograms.topText || fitnessPrograms.badge || "OUR PROGRAMS"}
            </span>
            <div className="w-12 sm:w-16 h-[2px] bg-[#ea580c]"></div>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-extrabold text-black leading-tight sm:leading-[1.15] mb-3 sm:mb-4">
            {fitnessPrograms.titleStart || fitnessPrograms.headingLine1 || 'Fitness Programs'}{' '}
            <br className="hidden sm:block" />
            {fitnessPrograms.titlePrefix || fitnessPrograms.headingLine2Prefix || 'For a '}
            <span className="text-[#ea580c]">{fitnessPrograms.titleHighlight || fitnessPrograms.headingHighlight || 'Stronger'}</span>
            {fitnessPrograms.titleSuffix || fitnessPrograms.headingLine2Suffix || ' You'}
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm sm:text-[14.5px] lg:text-[15px] xl:text-[15.5px] leading-relaxed mb-5 sm:mb-6 max-w-xl font-normal">
            {fitnessPrograms.description}
          </p>

          {/* Features Grid (2 Columns, perfectly balanced height & symmetrical text flow) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 xl:gap-3.5 w-full">
            {features.map((feature: any, idx: number) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-xl p-2.5 sm:p-3 xl:p-3.5 flex items-center gap-3 hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 group cursor-pointer hover:border-[#ea580c] h-full"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-orange-50 text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white flex items-center justify-center transition-all duration-300">
                  {iconMap[feature.icon] ?? iconMap.dumbbell}
                </div>
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <h4 className="text-black group-hover:text-[#ea580c] font-bold text-[13px] sm:text-[13.5px] xl:text-[14px] leading-tight mb-0.5 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-[11px] sm:text-[11.5px] xl:text-[12px] leading-relaxed line-clamp-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Slanted Composition Images (aligned flush to right on desktop, centered on mobile/tablet) */}
        <div className="w-full flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
          <div className="relative w-full max-w-[310px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[480px] xl:max-w-[530px] 2xl:max-w-[560px] h-[300px] sm:h-[380px] md:h-[420px] lg:h-[470px] xl:h-[500px] 2xl:h-[520px] flex justify-center items-center">

            {/* Top Slanted Image Group */}
            <div className="absolute top-[2%] left-[4%] sm:left-[6%] w-[66%] sm:w-[64%] h-[74%] sm:h-[72%] z-10 -skew-x-[12deg] sm:-skew-x-[14deg]">
              {/* Top Right Orange Solid Accent */}
              <div className="absolute top-[8%] -right-2.5 sm:-right-3.5 md:-right-4 w-3 sm:w-4.5 h-[72%] bg-[#ea580c] rounded-sm z-0"></div>

              {/* Top Slanted Image Frame */}
              <div className="relative w-full h-full overflow-hidden z-10 rounded-xl shadow-xl">
                <div className="w-full h-full skew-x-[12deg] sm:skew-x-[14deg] scale-[1.3] origin-center">
                  <Image 
                    src={images.main.src} 
                    fill 
                    className="object-cover object-[50%_20%]" 
                    alt={images.main.alt} 
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 40vw" 
                    priority 
                  />
                </div>
              </div>
            </div>

            {/* Bottom Slanted Image Group */}
            <div className="absolute bottom-[2%] right-[4%] sm:right-[6%] w-[48%] sm:w-[46%] h-[60%] sm:h-[58%] z-20 -skew-x-[12deg] sm:-skew-x-[14deg]">
              {/* Bottom Right Orange Solid Accent */}
              <div className="absolute top-[8%] -right-2.5 sm:-right-3.5 md:-right-4 w-3 sm:w-4.5 h-[72%] bg-[#ea580c] rounded-sm z-0"></div>

              {/* Bottom Slanted Image Frame */}
              <div className="relative w-full h-full overflow-hidden border-l-[4px] sm:border-l-[5px] border-t-[4px] sm:border-t-[5px] border-white z-10 rounded-xl shadow-2xl">
                <div className="w-full h-full skew-x-[12deg] sm:skew-x-[14deg] scale-[1.3] origin-center">
                  <Image 
                    src={images.secondary.src} 
                    fill 
                    className="object-cover object-[50%_30%]" 
                    alt={images.secondary.alt} 
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 25vw" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FitnessPrograms;
