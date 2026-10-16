import React from 'react';
import Image from 'next/image';
import { Users, Calendar, Dumbbell, Headset, User, Phone, Mail, MessageSquare } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import RedirectForm from '../../components/ui/RedirectForm';
import siteData, { enquireVariant } from '@/data/siteData';

export default function EnquirePage() {
  const enquire = siteData.sections?.EnquiryForm?.variants?.FitnessEnquiryForm1 || enquireVariant || siteData.enquire;
  const form = (enquire as any).form || {};

  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-[26px] h-[26px] text-[#ea580c]" />,
    Calendar: <Calendar className="w-[26px] h-[26px] text-[#ea580c]" />,
    Dumbbell: <Dumbbell className="w-[26px] h-[26px] text-[#ea580c]" />,
    Headset: <Headset className="w-[26px] h-[26px] text-[#ea580c]" />
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-white font-sans">
      <PageHeader title={enquire.badge === 'GET IN TOUCH' ? 'Enquire Now' : enquire.badge} breadcrumb="Enquire Now" />

      <section className="w-full py-8 md:py-12 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* Left Column - Info */}
            <div className="w-full lg:w-[31%] py-8 pr-6 pl-2 lg:py-10 lg:pr-8 lg:pl-2 flex flex-col justify-center">
              <div className="mb-5">
                <span className="text-[#ea580c] font-bold text-[13px] tracking-[0.1em] uppercase flex items-center gap-2 mb-2">
                  {enquire.badge} <span className="w-6 h-[2px] bg-[#ea580c]"></span>
                </span>
                <h2 className="font-heading text-4xl lg:text-[48px] font-black text-[#1a1a1a] leading-[1]">
                  {enquire.titleStart} <br />
                  <span className="text-[#ea580c]">{enquire.titleHighlight}</span>
                </h2>
                <p className="mt-3 text-[#666666] text-[14px] leading-[1.5]">
                  {enquire.description}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {enquire.benefits.map((benefit: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-[54px] h-[54px] rounded-[8px] bg-[#fff3ed] flex items-center justify-center shrink-0">
                      {iconMap[benefit.icon] || <Users className="w-[26px] h-[26px] text-[#ea580c]" />}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-[#1a1a1a] mb-0.5">{benefit.title}</h4>
                      <p className="text-[#666666] text-[13px] leading-[1.4]">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Column - Image */}
            <div className="w-full lg:w-[31%] relative min-h-[500px] lg:min-h-full rounded-[10px] overflow-hidden mt-6 lg:mt-0">
              <Image
                src={enquire.image}
                alt="Fitness Woman"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div 
                className="absolute bottom-0 left-0 right-0 p-6 pt-10 bg-black/95"
                style={{ clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 100%)' }}
              >
                <h3 className="text-white font-heading font-black text-[20px] leading-[1.2]">
                  {enquire.imageCallout}
                </h3>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[40%] py-6 px-6 lg:py-8 lg:px-8 bg-white shadow-2xl rounded-[10px] flex flex-col justify-center mt-6 lg:mt-0 lg:ml-3">
              <div className="mb-6">
                <h2 className="font-heading text-3xl lg:text-[36px] font-black text-[#1a1a1a] mb-2">
                  {form.titleStart || 'Enquiry'} <span className="text-[#ea580c]">{form.titleHighlight || 'Form'}</span>
                </h2>
                <div className="w-10 h-[3px] bg-[#ea580c]"></div>
              </div>

              <RedirectForm className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder={form.fullNamePlaceholder || "Full Name *"} 
                      className="w-full pl-9 pr-3 py-2.5 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#ea580c] transition-colors text-[13px] placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="tel" 
                      placeholder={form.phonePlaceholder || "Phone Number *"} 
                      className="w-full pl-9 pr-3 py-2.5 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#ea580c] transition-colors text-[13px] placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    placeholder={form.emailPlaceholder || "Email Address *"} 
                    className="w-full pl-9 pr-3 py-2.5 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#ea580c] transition-colors text-[13px] placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Dumbbell className="h-4 w-4 text-gray-400" />
                  </div>
                  <select 
                    defaultValue=""
                    className="w-full pl-9 pr-3 py-2.5 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#ea580c] transition-colors text-[13px] text-[#1a1a1a] appearance-none bg-white"
                    required
                  >
                    <option value="" disabled>{form.programPlaceholder || "Select Program Interested In *"}</option>
                    {(form.programOptions || [
                      { value: "gym", label: "Gym Fitness Class" },
                      { value: "powerlifting", label: "Power Lifting Class" },
                      { value: "bodybuilding", label: "Body Building" },
                      { value: "boxing", label: "Boxing Class" },
                      { value: "yoga", label: "Yoga & Flexibility" }
                    ]).map((opt: any) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <div className="relative w-full">
                  <div className="absolute top-2.5 left-0 pl-3 pointer-events-none">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                  </div>
                  <textarea 
                    placeholder={form.messagePlaceholder || "Your Message *"} 
                    rows={4}
                    className="w-full pl-9 pr-3 py-2.5 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#ea580c] transition-colors text-[13px] placeholder:text-gray-400 resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <input 
                    type="checkbox" 
                    id="agree" 
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]"
                    required
                  />
                  <label htmlFor="agree" className="text-[12px] text-gray-500">
                    {form.consentText || "I agree to be contacted by the VortexFit team."}
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full mt-1 bg-[#ea580c] hover:bg-[#d4501a] text-white font-bold py-3 px-8 rounded-[6px] transition-colors flex items-center justify-center gap-2 uppercase tracking-wide text-[13px]"
                >
                  {form.submitButtonText || "SUBMIT ENQUIRY"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
                
                <p className="text-center text-[11px] text-gray-400 mt-1">
                  {form.responseTimeNotice || "We typically respond within 24 hours."}
                </p>
              </RedirectForm>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
