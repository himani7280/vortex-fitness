import React from 'react';
import Image from 'next/image';
import { Dumbbell, Activity, HeartPulse, Sparkles, Apple, BicepsFlexed } from 'lucide-react';
import siteData from '@/data/siteData';

const iconClass = "w-7 h-7 text-[#ea580c]";
const iconMap: Record<string, React.ReactNode> = {
  dumbbell: <Dumbbell className={iconClass} strokeWidth={1.8} />,
  activity: <Activity className={iconClass} strokeWidth={1.8} />,
  heart: <HeartPulse className={iconClass} strokeWidth={1.8} />,
  biceps: <BicepsFlexed className={iconClass} strokeWidth={1.8} />,
  sparkles: <Sparkles className={iconClass} strokeWidth={1.8} />,
  apple: <Apple className={iconClass} strokeWidth={1.8} />,
};

const FitnessPrograms = () => {
  const fitnessPrograms = (siteData.sections?.ProgramsPage?.variants?.FitnessProgramsPage1 || siteData.programsPage.fitnessPrograms) as any;
  const features = fitnessPrograms.features || siteData.programsPage.fitnessPrograms.features;
  const images = fitnessPrograms.images || siteData.programsPage.fitnessPrograms.images;



  return (
    <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-white overflow-hidden relative">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center relative z-10">

        {/* Left Side: Content */}
        <div className="flex flex-col justify-center">
          {/* Top Label */}
          <div className="flex items-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
            <span className="text-[#ea580c] tracking-[0.2em] text-xs sm:text-[13px] font-bold uppercase whitespace-nowrap">
              {fitnessPrograms.topText || fitnessPrograms.badge || "OUR PROGRAMS"}
            </span>
            <div className="w-12 sm:w-16 h-[2px] bg-[#ea580c]"></div>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] font-extrabold text-black leading-tight sm:leading-[1.1] mb-3 sm:mb-4">
            {fitnessPrograms.titleStart || fitnessPrograms.headingLine1 || 'Fitness Programs'}{' '}
            <br className="hidden sm:block" />
            {fitnessPrograms.titlePrefix || fitnessPrograms.headingLine2Prefix || 'For a '}
            <span className="text-[#ea580c]">{fitnessPrograms.titleHighlight || fitnessPrograms.headingHighlight || 'Stronger'}</span>
            {fitnessPrograms.titleSuffix || fitnessPrograms.headingLine2Suffix || ' You'}
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-7 max-w-xl">
            {fitnessPrograms.description}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full">
            {features.map((feature: any, idx: number) => (
              <div key={idx} className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-xl p-3.5 flex flex-col items-start gap-1.5 hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5">
                <div className="flex-shrink-0">
                  {iconMap[feature.icon] ?? iconMap.dumbbell}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-black font-bold text-[13px] sm:text-[14px] leading-tight mb-0.5">{feature.title}</h4>
                  <p className="text-gray-500 text-[11px] sm:text-[12px] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Images */}
        <div className="relative w-full max-w-[480px] sm:max-w-[540px] xl:max-w-none h-[360px] sm:h-[420px] md:h-[480px] lg:h-[500px] xl:h-[530px] flex justify-center items-center mx-auto mt-6 xl:mt-0 overflow-hidden">

          {/* Top Group (Image + Accent) */}
          <div className="absolute top-[5%] left-[8%] sm:left-[10%] w-[62%] sm:w-[60%] h-[72%] sm:h-[70%] z-10 skew-x-[-12deg] sm:skew-x-[-15deg]">
            {/* Top Right Orange Solid Accent */}
            <div className="absolute top-[10%] -right-4 sm:-right-6 w-4 sm:w-6 h-[70%] bg-[#ea580c] z-0"></div>

            {/* Top Slanted Image Box */}
            <div className="relative w-full h-full overflow-hidden z-10 rounded-sm">
              <div className="w-full h-full skew-x-[12deg] sm:skew-x-[15deg] scale-[1.35] origin-center">
                <Image src={images.main.src} fill className="object-cover object-[50%_20%]" alt={images.main.alt} sizes="(max-width: 768px) 60vw, 40vw" />
              </div>
            </div>
          </div>

          {/* Bottom Group (Image + Accent) */}
          <div className="absolute bottom-[7%] right-[8%] sm:right-[10%] w-[42%] sm:w-[40%] h-[58%] sm:h-[55%] z-20 skew-x-[-12deg] sm:skew-x-[-15deg]">
            {/* Bottom Right Orange Solid Accent */}
            <div className="absolute top-[10%] -right-4 sm:-right-6 w-4 sm:w-6 h-[70%] bg-[#ea580c] z-0"></div>

            {/* Bottom Slanted Image Box */}
            <div className="relative w-full h-full overflow-hidden border-l-[4px] sm:border-l-[6px] border-t-[4px] sm:border-t-[6px] border-white z-10 rounded-sm shadow-xl">
              <div className="w-full h-full skew-x-[12deg] sm:skew-x-[15deg] scale-[1.35] origin-center">
                <Image src={images.secondary.src} fill className="object-cover object-[50%_30%]" alt={images.secondary.alt} sizes="(max-width: 768px) 40vw, 25vw" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FitnessPrograms;
