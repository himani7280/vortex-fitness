import React from 'react';
import Image from 'next/image';
import siteData from '@/data/siteData';

interface AboutUsDetailsProps {
  className?: string;
}

const AboutUsDetails: React.FC<AboutUsDetailsProps> = ({ className = '' }) => {
  const about = (siteData.sections?.About?.variants?.FitnessAbout1 || siteData.home.about) as any;
  const details = (siteData.sections?.AboutPage?.variants?.FitnessAboutPage1 || siteData.about.details) as any;


  return (
    <section 
      aria-label="About VortexFit Details"
      className={`w-full py-10 sm:py-14 md:py-16 lg:py-20 bg-white overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-16 items-center">

        {/* Left Side: Images */}
        <div className="w-full flex justify-center lg:justify-start">
          <div className="relative w-[280px] sm:w-[330px] md:w-[370px] lg:w-[390px] xl:w-[420px] -translate-x-3 sm:-translate-x-4 lg:translate-x-0 lg:ml-5 mb-8 sm:mb-10 lg:mb-0 isolate">

            {/* Background orange block (Right) */}
            <div className="absolute top-[3%] -right-3 sm:-right-5 w-[40%] h-[95%] bg-[#f05a22] rounded-[1.5rem] sm:rounded-[2rem] -z-10"></div>

            {/* Background cream block (Left) */}
            <div className="absolute top-[10%] -left-3 sm:-left-5 w-[40%] h-[60%] bg-[#fdf2ee] rounded-[1.5rem] sm:rounded-[2rem] -z-10"></div>

            {/* L-Shape Dots Pattern */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 -z-10 hidden sm:block pointer-events-none">
              {/* Vertical line (Left) */}
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
              {/* Horizontal line (Bottom) */}
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
            <div className="relative w-full aspect-[3/4] rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden shadow-xl z-10 bg-gray-200">
              <Image
                src={about.images.main}
                alt="About VortexFit Main"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 420px"
                className="object-cover object-[75%_center]"
                priority
              />
            </div>

            {/* Small Overlapping Image */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-6 sm:-right-8 md:-right-10 lg:-right-12 xl:-right-14 w-[54%] sm:w-[56%] md:w-[58%] lg:w-[56%] xl:w-[58%] aspect-[4/5] rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden border-[5px] sm:border-[7px] border-white shadow-2xl z-20 bg-gray-200">
              <Image
                src={about.images.small}
                alt="About VortexFit Training"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 250px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Content (Aligned with Header Right Edge) */}
        <div className="flex flex-col w-full">
          {/* Top Title */}
          <div className="flex items-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
            <div className="w-8 sm:w-10 h-[2px] bg-[#f05a22]"></div>
            <span className="text-[#f05a22] tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm font-bold uppercase whitespace-nowrap">
              {about.topText}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] font-extrabold text-black leading-tight sm:leading-[1.1] mb-4 sm:mb-6">
            {about.heading1}{' '}
            <span className="text-[#f05a22]">{about.heading2}</span>
          </h2>

          {/* Description Paragraphs */}
          <div className="flex flex-col gap-4 sm:gap-5 w-full">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
              <span className="font-bold text-gray-900">{details.intro.highlight}</span> {details.intro.text}
            </p>
            {details.paragraphs.map((paragraph: string, idx: number) => {

              const HIGHLIGHT = "Welcome to VortexFit,";
              const startsWithHighlight = paragraph.startsWith(HIGHLIGHT);
              return (
                <p key={idx} className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                  {startsWithHighlight ? (
                    <>
                      <span className="font-bold text-gray-900">{HIGHLIGHT}</span>
                      {paragraph.slice(HIGHLIGHT.length)}
                    </>
                  ) : (
                    paragraph
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
