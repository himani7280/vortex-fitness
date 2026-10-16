import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ArrowRight, ChevronRight, Target, Activity, Zap } from 'lucide-react';
import PageHeader from '../../../components/ui/PageHeader';
import { Suspense } from 'react';
import siteData from '@/data/siteData';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return siteData.home.programs.cards.map((program: any) => ({
    id: program.id.toString(),
  }));
}

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <ProgramDetailContent params={params} />
    </Suspense>
  );
}

async function ProgramDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const programId = parseInt(id);
  const programDetailVariant = siteData.sections?.ProgramDetail?.variants?.FitnessProgramDetail1;
  const programFromVariant = (programDetailVariant?.programs as any)?.[id];
  const programFromHome = siteData.home.programs.cards.find((p: any) => p.id === programId);
  const program = programFromVariant || programFromHome;

  if (!program) {
    notFound();
  }

  const allPrograms = siteData.sections?.Programs?.variants?.FitnessPrograms1?.cards || siteData.home.programs.cards;

  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  const paragraphs = program.paragraphs || [
    `Our ${program.title} program is designed to help you build strength, endurance, speed, and confidence through structured, result-driven training. Whether you are a beginner or looking to improve your technique, our expert coaches provide the right guidance.`,
    `This program includes a mix of focused techniques, conditioning drills, and high-intensity workouts to improve overall fitness, coordination, and mental discipline. You will train in a safe, motivating environment.`
  ];

  const highlights = (program.highlights || [
    { title: `${program.title.split(' ')[0]} Techniques`, desc: "Learn proper techniques, combinations, and defensive moves.", icon: "Target" },
    { title: "Improved Endurance", desc: "Increase stamina and cardiovascular fitness with high-intensity drills.", icon: "Activity" },
    { title: "Full Body Workout", desc: "Engage multiple muscle groups for strength, power, and agility.", icon: "Zap" },
    { title: "Better Coordination", desc: "Enhance hand-eye coordination, reflexes and footwork.", icon: "Target" },
    { title: "Mental Discipline", desc: "Build focus, confidence and resilience both inside and outside the gym.", icon: "Activity" },
    { title: "Weight Management", desc: "Burn calories, reduce stress and maintain a healthier lifestyle.", icon: "Zap" }
  ]).map((h: any) => ({
    ...h,
    iconNode: typeof h.icon === 'string' ? getHighlightIcon(h.icon) : <Target className="w-6 h-6" />
  }));

  const titleWord = program.title.split(' ')[0].toUpperCase();
  const restOfTitle = program.title.split(' ').slice(1).join(' ').toUpperCase();


  const heroVariant = siteData.sections?.Hero?.variants?.FitnessProgramDetailHero1;
  const bannerTitle = heroVariant?.title || "Program Detail";

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <PageHeader title={bannerTitle} breadcrumb={`Programs / ${program.title}`} />

      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-6 py-6 sm:py-10 md:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Main Content Area */}
          <div className="lg:w-2/3 flex flex-col">
            {/* Main Image */}
            <div className="w-full h-[240px] sm:h-[340px] md:h-[420px] lg:h-[450px] relative rounded-xl overflow-hidden mb-6 sm:mb-10 shadow-xl">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Title Section */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="text-[#ea580c] font-bold uppercase tracking-wider text-xs sm:text-sm">{program.title}</span>
              <div className="h-[2px] w-8 sm:w-12 bg-[#ea580c]"></div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-extrabold font-heading text-black leading-tight tracking-tight mb-4 sm:mb-5">
              CHAMPION {titleWord} <span className="text-[#ea580c]">{restOfTitle || 'TRAINING'}</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base md:text-[17px]">
              {paragraphs[0]}
            </p>

            <p className="text-gray-600 mb-6 sm:mb-10 leading-relaxed text-sm sm:text-base md:text-[17px]">
              {paragraphs[1]}
            </p>

            {/* Highlights Section */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 mt-2">
              <h3 className="text-lg sm:text-xl font-bold font-heading text-black uppercase">PROGRAM HIGHLIGHTS</h3>
              <div className="h-[2px] w-8 sm:w-12 bg-[#ea580c]"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {highlights.map((highlight: any, idx: number) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-4 text-center hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-[#ea580c] mb-3">
                    {highlight.iconNode}
                  </div>
                  <h4 className="font-bold text-black mb-1 text-base">{highlight.title}</h4>
                  <p className="text-[13px] text-gray-500 leading-snug">{highlight.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-10">
            {/* All Programs List */}
            <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
              <div className="bg-[#16181d] p-6 pb-5">
                <h3 className="text-2xl font-bold text-white mb-3">All Programs</h3>
                <div className="h-1 w-10 bg-[#ea580c]"></div>
              </div>

              <div className="flex flex-col py-2">
                {allPrograms.map((p: any) => {
                  const isActive = p.id === programId;
                  return (
                    <Link href={`/programs/${p.id}`} key={p.id}>
                      <div className={`flex items-center justify-between p-[14px] px-6 transition-all ${isActive ? 'bg-[#ea580c] text-white mx-3 my-1 rounded-md' : 'bg-white text-gray-500 hover:text-black border-b border-gray-100 mx-3'}`}>
                        <span className="font-medium text-[15px]">{p.title}</span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Contact Box */}
            <div className="bg-[#0b0c10] rounded-xl overflow-hidden relative shadow-xl">
              {/* Background image overlay */}
              <div
                className="absolute inset-0 opacity-100 bg-cover bg-right"
                style={{ backgroundImage: "url('/images/red-gloves.jpg')" }}
              ></div>
              {/* Gradient to darken the left side so text is readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/90 to-transparent"></div>

              <div className="relative z-10 p-8 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-[2px] w-6 bg-[#ea580c]"></div>
                  <span className="text-[#ea580c] font-bold uppercase tracking-wider text-sm">{program.helpTitle || 'Have Questions?'}</span>
                </div>

                <h3 className="text-[40px] font-extrabold text-white mb-4">
                  LET'S <span className="text-[#ea580c]">TALK</span>
                </h3>

                <p className="text-gray-300 mb-8 text-[15px] leading-relaxed max-w-[220px]">
                  {program.helpDescription || `Get in touch with our team for more details about the ${program.title} program.`}
                </p>

                <div className="flex items-center gap-4 mb-8 w-max">
                  <div className="w-12 h-12 bg-[#ea580c] rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-white/90 font-medium text-[13px] mb-0.5">Call Us Now</p>
                    <p className="text-[22px] font-extrabold text-white tracking-wide">{program.phone || '+1 00000 00000'}</p>
                  </div>
                </div>

                <Link href={program.helpButtonLink || "/contact"} className="group flex items-center gap-4 py-3 px-6 border border-[#ea580c] rounded-md hover:bg-[#ea580c] transition-colors duration-300 w-max">
                  <span className="text-white font-bold text-sm">{program.helpButtonText || "Contact Us"}</span>
                  <div className="w-6 h-6 rounded-full border border-[#ea580c] flex items-center justify-center group-hover:bg-white group-hover:text-[#ea580c] transition-colors text-[#ea580c]">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}
