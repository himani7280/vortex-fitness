import React from 'react';
import Image from 'next/image';
import siteData, { aboutPageVariant, AboutPageVariant } from '@/data/siteData';

interface AboutUsDetailsProps {
  className?: string;
}

const AboutUsDetails: React.FC<AboutUsDetailsProps> = ({ className = '' }) => {
  const details: AboutPageVariant = aboutPageVariant || siteData.about.details;
  const homeAbout = siteData.home.about;

  const badgeText = details?.badge || details?.topText || homeAbout?.badge || "MORE ABOUT US";
  const heading1 = details?.heading1 || details?.titleStart || homeAbout?.heading1 || "Unlock Your Full Potential,";
  const heading2 = details?.heading2 || details?.titleHighlight || homeAbout?.heading2 || "Achieve Your Goals.";
  const mainImage = details?.images?.main || homeAbout?.images?.main || "/about-main.jpg";
  const smallImage = details?.images?.small || homeAbout?.images?.small || "/about-small.jpg";

  const paragraphs = details?.paragraphs && details.paragraphs.length > 0
    ? details.paragraphs
    : [
        "Welcome to VortexFit, your ultimate destination for achieving your fitness goals. We understand the importance of leading a healthy lifestyle and provide a top-notch facility with modern equipment to support your fitness journey.",
        "Welcome to VortexFit, where certified trainers craft personalized workout routines tailored to your unique body, focusing on proper technique and sustainable progress.",
        "Welcome to VortexFit, a motivating community dedicated to your long-term wellness. We guide you every step of the way with expert advice, nutrition support, and constant motivation."
      ];

  return (
    <section 
      aria-label="About VortexFit Details"
      className={`w-full py-10 sm:py-12 md:py-14 lg:py-16 bg-white overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 xl:gap-10 2xl:gap-12 items-center">

        {/* Left Side: Images */}
        <div className="w-full flex justify-center lg:justify-start items-center">
          <div className="relative w-[270px] xs:w-[290px] sm:w-[330px] md:w-[370px] lg:w-[420px] xl:w-[470px] 2xl:w-[500px] lg:h-[415px] xl:h-[435px] 2xl:h-[455px] -translate-x-2 sm:-translate-x-3 lg:translate-x-0 mb-8 sm:mb-10 lg:mb-0 isolate">

            {/* Background orange block (Right) */}
            <div className="absolute top-[3%] -right-3 sm:-right-5 w-[40%] h-[95%] bg-[#f05a22] rounded-[1.5rem] sm:rounded-[2rem] -z-10"></div>

            {/* Background cream block (Left) */}
            <div className="absolute top-[10%] -left-3 sm:-left-5 w-[40%] h-[60%] bg-[#fdf2ee] rounded-[1.5rem] sm:rounded-[2rem] -z-10"></div>

            {/* L-Shape Dots Pattern */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 -z-10 hidden sm:block pointer-events-none">
              <div className="absolute bottom-0 left-0 flex gap-[6px]">
                <div className="flex flex-col gap-[6px]">
                  {[...Array(14)].map((_, i) => (
                    <div key={`v1-${i}`} className="w-[4px] h-[4px] rounded-full bg-[#ea580c]"></div>
                  ))}
                </div>
                <div className="flex flex-col gap-[6px]">
                  {[...Array(14)].map((_, i) => (
                    <div key={`v2-${i}`} className="w-[4px] h-[4px] rounded-full bg-[#ea580c]"></div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 flex flex-col gap-[6px]">
                <div className="flex gap-[6px]">
                  {[...Array(16)].map((_, i) => (
                    <div key={`h1-${i}`} className="w-[4px] h-[4px] rounded-full bg-[#ea580c]"></div>
                  ))}
                </div>
                <div className="flex gap-[6px]">
                  {[...Array(16)].map((_, i) => (
                    <div key={`h2-${i}`} className="w-[4px] h-[4px] rounded-full bg-[#ea580c]"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="group/main relative w-full h-full aspect-[4/5] lg:aspect-auto rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden shadow-xl z-10 bg-gray-200 cursor-pointer">
              <Image
                src={mainImage}
                alt="About VortexFit Main"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 550px"
                className="object-cover object-[75%_center] transition-transform duration-700 ease-out group-hover/main:scale-105"
                priority
              />
            </div>

            {/* Small Overlapping Image */}
            <div className="group/small absolute top-1/2 -translate-y-1/2 -right-5 sm:-right-7 md:-right-9 lg:-right-12 xl:-right-14 2xl:-right-16 w-[54%] sm:w-[56%] md:w-[58%] lg:w-[54%] xl:w-[54%] aspect-[4/5] lg:aspect-auto lg:h-[68%] rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden border-[5px] sm:border-[7px] border-white shadow-2xl z-20 bg-gray-200 cursor-pointer">
              <Image
                src={smallImage}
                alt="About VortexFit Training"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 320px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover/small:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center w-full lg:h-[415px] xl:h-[435px] 2xl:h-[455px]">
          {/* Top Title */}
          <div className="flex items-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
            <div className="w-8 sm:w-10 h-[2px] bg-[#f05a22]"></div>
            <span className="text-[#f05a22] tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm font-bold uppercase whitespace-nowrap">
              {badgeText}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-black leading-tight mb-4 sm:mb-5">
            {heading1}{' '}
            <span className="text-[#f05a22]">{heading2}</span>
          </h2>

          {/* Description Paragraphs from JSON */}
          <div className="flex flex-col gap-3.5 sm:gap-4 w-full">
            {paragraphs.map((paragraphText: string, pIdx: number) => {
              const highlightKeyword = "Welcome to VortexFit,";
              const hasPrefix = paragraphText.startsWith(highlightKeyword);
              const restText = hasPrefix ? paragraphText.slice(highlightKeyword.length) : paragraphText;

              return (
                <p key={pIdx} className="text-gray-600 text-[14.5px] sm:text-[15px] md:text-[15.5px] leading-relaxed font-normal hover:text-gray-900 transition-colors">
                  {hasPrefix ? (
                    <>
                      <span className="font-bold text-gray-900">{highlightKeyword}</span>
                      {restText}
                    </>
                  ) : (
                    paragraphText
                  )}
                </p>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUsDetails;
