import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, ArrowRight, ChevronRight, Target, Activity, Zap } from 'lucide-react';
import PageHeader from '../../../components/ui/PageHeader';
import siteData, { programDetailVariant, ProgramDetailItem, ProgramHighlight, ProgramCard } from '@/data/siteData';

export async function generateStaticParams() {
  const ids = programDetailVariant?.programs 
    ? Object.keys(programDetailVariant.programs) 
    : (siteData.home.programs.cards as ProgramCard[]).map((program) => program.id.toString());
  return ids.map((id) => ({ id }));
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
  const programId = parseInt(id, 10);
  const program: ProgramDetailItem | undefined = 
    programDetailVariant?.programs?.[id] || 
    (siteData.home.programs.cards.find((p: ProgramCard) => p.id === programId) as unknown as ProgramDetailItem);

  if (!program) {
    notFound();
  }

  const allPrograms: ProgramCard[] = 
    programDetailVariant?.cards || 
    siteData.sections?.Programs?.variants?.FitnessPrograms1?.cards || 
    siteData.home.programs.cards;

  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  const paragraphs = program.paragraphs && program.paragraphs.length > 0 
    ? program.paragraphs 
    : [
        `Our ${program.title} program is designed to help you build strength, endurance, speed, and confidence through structured, result-driven training.`,
        `This program includes a mix of focused techniques, conditioning drills, and high-intensity workouts to improve overall fitness.`
      ];

  const highlights = (program.highlights || []).map((h: ProgramHighlight) => ({
    ...h,
    iconNode: typeof h.icon === 'string' ? getHighlightIcon(h.icon) : <Target className="w-6 h-6" />
  }));

  const titleWords = program.title.trim().split(' ');
  const firstWords = titleWords.length > 1 ? titleWords.slice(0, -1).join(' ') : program.title;
  const lastWord = titleWords.length > 1 ? titleWords[titleWords.length - 1] : '';

  const contactPhone = program.phone || siteData.sections?.ContactLocation?.variants?.FitnessLocation1?.phone || siteData.header.topBar.phone;

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <PageHeader title={program.title} breadcrumb={`Programs / ${program.title}`} />

      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-6 py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Main Content Area */}
          <div className="lg:w-2/3 flex flex-col">
            {/* Main Image */}
            <div className="w-full h-[240px] sm:h-[340px] md:h-[420px] lg:h-[450px] relative rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-xl">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Title Section */}
            <div className="flex items-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
              <span className="text-[#ea580c] font-bold uppercase tracking-wider text-xs sm:text-[13px]">
                {programDetailVariant?.badge || 'PROGRAM DETAILS'}
              </span>
              <div className="h-[2px] w-8 sm:w-12 bg-[#ea580c]"></div>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-black leading-tight tracking-tight mb-4 sm:mb-5">
              {firstWords} {lastWord && <span className="text-[#ea580c]">{lastWord}</span>}
            </h2>

            {/* Description */}
            {paragraphs.map((pText: string, pIdx: number) => (
              <p key={pIdx} className="text-gray-600 text-[15px] md:text-[15.5px] mb-4 sm:mb-5 leading-relaxed font-normal">
                {pText}
              </p>
            ))}

            {/* Highlights Section */}
            {highlights.length > 0 && (
              <>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 mt-2">
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-black uppercase">PROGRAM HIGHLIGHTS</h3>
                  <div className="h-[2px] w-8 sm:w-12 bg-[#ea580c]"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {highlights.map((highlight: ProgramHighlight & { iconNode: React.ReactNode }, idx: number) => (
                    <div key={idx} className="group border border-gray-100 hover:border-[#ea580c] rounded-xl p-4 text-center hover:shadow-[0_12px_28px_rgba(234,88,12,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-orange-50 group-hover:bg-[#ea580c] text-[#ea580c] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_4px_12px_rgba(234,88,12,0.35)] flex items-center justify-center mb-3 transition-all duration-300">
                        {highlight.iconNode}
                      </div>
                      <h4 className="font-bold text-black group-hover:text-[#ea580c] mb-1 text-base transition-colors">{highlight.title}</h4>
                      <p className="text-[13px] text-gray-500 leading-snug">{highlight.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
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
                {allPrograms.map((p: ProgramCard) => {
                  const isActive = p.id === programId;
                  return (
                    <Link href={`/programs/${p.id}`} key={p.id}>
                      <div className={`flex items-center justify-between p-[14px] px-6 transition-all duration-300 ${isActive ? 'bg-[#ea580c] text-white mx-3 my-1 rounded-md shadow-sm' : 'bg-white text-gray-500 hover:text-[#ea580c] hover:translate-x-1.5 border-b border-gray-100 mx-3'}`}>
                        <span className="font-medium text-[15px]">{p.title}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-white' : 'text-gray-400 group-hover:translate-x-1'}`} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Contact Box */}
            <div className="bg-[#0b0c10] rounded-xl overflow-hidden relative shadow-xl">
              <div
                className="absolute inset-0 opacity-100 bg-cover bg-right"
                style={{ backgroundImage: "url('/images/red-gloves.jpg')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/90 to-transparent"></div>

              <div className="relative z-10 p-8 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-[2px] w-6 bg-[#ea580c]"></div>
                  <span className="text-[#ea580c] font-bold uppercase tracking-wider text-sm">{program.helpTitle || 'Have Questions?'}</span>
                </div>

                <h3 className="text-[40px] font-extrabold text-white mb-4">
                  LET&apos;S <span className="text-[#ea580c]">TALK</span>
                </h3>

                <p className="text-gray-300 mb-8 text-[15px] leading-relaxed max-w-[220px]">
                  {program.helpDescription || `Get in touch with our team for more details about the ${program.title} program.`}
                </p>

                <div className="flex items-center gap-4 mb-8 w-max">
                  <div className="w-12 h-12 bg-[#ea580c] rounded-lg flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-white/90 font-medium text-[13px] mb-0.5">Call Us Now</p>
                    <p className="text-[22px] font-extrabold text-white tracking-wide">{contactPhone}</p>
                  </div>
                </div>

                <Link href={program.helpButtonLink || "/contact"} className="group flex items-center gap-4 py-3 px-6 border border-[#ea580c] rounded-md hover:bg-[#ea580c] hover:shadow-[0_8px_20px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 w-max">
                  <span className="text-white font-bold text-sm">{program.helpButtonText || "Contact Us"}</span>
                  <div className="w-6 h-6 rounded-full border border-[#ea580c] flex items-center justify-center group-hover:bg-white group-hover:text-[#ea580c] transition-colors text-[#ea580c]">
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
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
