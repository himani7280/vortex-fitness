import React from 'react';
import Image from 'next/image';
import { Dumbbell, Activity, ShieldCheck } from 'lucide-react';
import siteData from '@/data/siteData';

const iconClass = "w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 stroke-[2]";
const iconMap: Record<string, React.ReactNode> = {
  dumbbell: <Dumbbell className={iconClass} />,
  activity: <Activity className={iconClass} />,
  shield: <ShieldCheck className={iconClass} />,
};

const WhyChooseUs = () => {
  const whyChooseUs = (siteData.sections?.WhyChooseUs?.variants?.FitnessWhyChooseUs1 || siteData.about.whyChooseUs) as any;


  return (
    <section className="w-full py-10 sm:py-12 md:py-14 lg:py-16 bg-[#0a0a0a] overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-12 items-center">

        {/* Left Side: Images */}
        <div className="relative w-full max-w-[550px] xl:max-w-[620px] h-[380px] sm:h-[420px] md:h-[460px] xl:h-[480px] mx-auto xl:mr-auto xl:ml-[-4%] isolate mt-8 md:mt-0">

          {/* Deadlift image (Left, slightly lower) */}
          <div className="group/left absolute bottom-0 left-0 w-[55%] h-[85%] z-10 rounded-xl overflow-hidden shadow-2xl cursor-pointer">
            <Image
              src={whyChooseUs.images.left.src}
              fill
              className="object-cover object-[60%_0%] grayscale-[10%] group-hover/left:scale-105 group-hover/left:grayscale-0 transition-all duration-700 ease-out"
              alt={whyChooseUs.images.left.alt}
            />
          </div>

          {/* Curls image (Right, slightly higher) */}
          <div className="group/right absolute top-0 right-0 w-[50%] h-[85%] z-0 rounded-xl overflow-hidden shadow-xl cursor-pointer">
            <Image
              src={whyChooseUs.images.right.src}
              fill
              className="object-cover object-center grayscale-[10%] group-hover/right:scale-105 group-hover/right:grayscale-0 transition-all duration-700 ease-out"
              alt={whyChooseUs.images.right.alt}
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/15 group-hover/right:opacity-0 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col xl:pl-8 justify-center">

          {/* Top Title */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[#ea580c] tracking-[0.2em] text-[13px] font-bold uppercase">
              {whyChooseUs.topText}
            </span>
            <div className="w-16 h-[2px] bg-[#ea580c]"></div>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight mb-5">
            {whyChooseUs.heading1} <br />
            <span className="text-[#ea580c]">{whyChooseUs.heading2}</span>
          </h2>

          {/* Features List */}
          <div className="flex flex-col gap-4">
            {whyChooseUs.features.map((feature: any, idx: number) => {

              const isLast = idx === whyChooseUs.features.length - 1;
              return (
                <div key={feature.title} className={`flex gap-4 items-start group cursor-pointer hover:translate-x-2 transition-all duration-300 ${isLast ? '' : 'pb-4 border-b border-gray-800'}`}>
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#161616] text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white group-hover:border-[#ea580c] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center justify-center border border-gray-800 shadow-inner transition-all duration-300">
                    {iconMap[feature.icon] ?? iconMap.dumbbell}
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <h4 className="text-[18px] md:text-[20px] font-bold text-white group-hover:text-[#ea580c] mb-1 transition-colors">{feature.title}</h4>
                    <p className="text-gray-400 group-hover:text-gray-200 leading-relaxed text-[14px] md:text-[15px] max-w-[450px] transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
