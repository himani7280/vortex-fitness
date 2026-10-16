import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import RedirectForm from '../../components/ui/RedirectForm';
import siteData from '@/data/siteData';
import { MapPin, Phone, Mail, User, Phone as PhoneIcon, Dumbbell, MessageSquare, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const contactLocation = siteData.sections?.ContactLocation?.variants?.FitnessLocation1;
  const location = contactLocation?.address || siteData.header.topBar.location;
  const phone = contactLocation?.phone || siteData.header.topBar.phone;
  const email = contactLocation?.email || siteData.contact.email;
  const contactForm = siteData.sections?.ContactForm?.variants?.FitnessContactForm1 || siteData.contact.form;

  const addressParts = location.split(', ');
  const addressLine1 = addressParts[0] + (addressParts.length > 1 ? ',' : '');
  const addressLine2 = addressParts.slice(1).join(', ');


  return (
    <div className="w-full flex flex-col min-h-screen bg-white font-sans">
      <PageHeader title="Contact Us" breadcrumb="Contact Us" />
      
      <section className="w-full pt-8 md:pt-12 pb-12 md:pb-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
          
          {/* Top Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Location Box */}
            <div className="bg-[#f8f9fa] rounded-lg py-4 px-5 flex items-center gap-4 border border-gray-100">
              <div className="w-11 h-11 bg-[#ea580c] rounded-full flex items-center justify-center shrink-0">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-[#1a1a1a] mb-0.5">Our Location</h4>
                <p className="text-[#666666] text-[13px] leading-[1.35]">
                  {addressLine1}<br />{addressLine2}
                </p>
              </div>
            </div>

            {/* Call Us Box */}
            <div className="bg-[#f8f9fa] rounded-lg py-4 px-5 flex items-center gap-4 border border-gray-100">
              <div className="w-11 h-11 bg-[#ea580c] rounded-full flex items-center justify-center shrink-0">
                <Phone className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-[#1a1a1a] mb-0.5">Call Us</h4>
                <p className="text-[#666666] text-[13px] leading-[1.35]">
                  {phone}
                </p>
              </div>
            </div>

            {/* Email Us Box */}
            <div className="bg-[#f8f9fa] rounded-lg py-4 px-5 flex items-center gap-4 border border-gray-100">
              <div className="w-11 h-11 bg-[#ea580c] rounded-full flex items-center justify-center shrink-0">
                <Mail className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-[#1a1a1a] mb-0.5">Email Us</h4>
                <p className="text-[#666666] text-[13px] leading-[1.35]">
                  {email}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            
            {/* Left: Form */}
            <div className="w-full lg:w-1/2 py-6 px-5 sm:py-8 sm:px-8 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-[10px] border border-gray-100 flex flex-col justify-center">
              <div className="mb-5">
                <h2 className="font-heading text-3xl lg:text-[36px] font-black text-[#1a1a1a] mb-2">
                  {contactForm.titleStart || 'Send Us a'} <span className="text-[#ea580c]">{contactForm.titleHighlight || 'Message'}</span>
                </h2>
                <div className="w-10 h-[3px] bg-[#ea580c]"></div>
              </div>

              <RedirectForm className="flex flex-col gap-3.5">

                <div className="flex flex-col md:flex-row gap-3.5">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Full Name *" 
                      className="w-full pl-10 pr-3.5 py-3 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#ea580c] transition-colors text-[13.5px] placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number *" 
                      className="w-full pl-10 pr-3.5 py-3 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#ea580c] transition-colors text-[13.5px] placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email Address *" 
                    className="w-full pl-10 pr-3.5 py-3 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#ea580c] transition-colors text-[13.5px] placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Dumbbell className="h-4 w-4 text-gray-400" />
                  </div>
                  <select 
                    className="w-full pl-10 pr-3.5 py-3 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#ea580c] transition-colors text-[13.5px] text-[#1a1a1a] appearance-none bg-white cursor-pointer"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select Inquiry Type *</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="pt">Personal Training</option>
                    <option value="classes">Group Classes</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <div className="relative w-full mb-1">
                  <div className="absolute top-3.5 left-0 pl-3.5 pointer-events-none">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                  </div>
                  <textarea 
                    placeholder="Your Message *" 
                    rows={4}
                    className="w-full pl-10 pr-3.5 py-3 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#ea580c] transition-colors text-[13.5px] placeholder:text-gray-400 resize-none"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-fit bg-[#ea580c] hover:bg-[#d4501a] text-white font-bold py-3.5 px-8 rounded-[6px] transition-colors flex items-center justify-center gap-2 uppercase tracking-wide text-[13.5px] cursor-pointer"
                >
                  {contactForm.submitText || "SUBMIT MESSAGE"}
                  <ArrowRight className="w-4 h-4" />
                </button>

              </RedirectForm>
            </div>

            {/* Right: Map (fills height cleanly) */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="w-full h-full min-h-[360px] sm:min-h-[420px] rounded-[10px] overflow-hidden bg-gray-100 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528000654!2d-74.1444874459461!3d40.69766374865766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1714467000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: "360px" }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gym Location"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
