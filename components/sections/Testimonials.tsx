"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Star, Dumbbell } from 'lucide-react';
import siteData from '@/data/siteData';

const Testimonials = () => {
  const testimonialsPage = (siteData.sections?.Reviews?.variants?.FitnessReviews1 || siteData.testimonialsPage) as any;
  const testimonialsData = testimonialsPage.items;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Responsive cards to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonialsData.length / cardsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const visibleTestimonials = testimonialsData.slice(
    currentIndex * cardsToShow,
    currentIndex * cardsToShow + cardsToShow
  );

  return (
    <section className="w-full bg-white py-8 md:py-12 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 relative">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-[2px] w-12 bg-[#f05a22]"></div>
            <Dumbbell className="w-5 h-5 text-[#f05a22] -mr-1" />
            <span className="text-[#f05a22] font-bold tracking-[0.15em] text-[13px] uppercase">
              {testimonialsPage.topText}
            </span>
            <div className="h-[2px] w-12 bg-[#f05a22]"></div>
          </div>
          <h2 className="text-4xl md:text-[50px] font-black text-[#1a1a1a] font-heading tracking-tight mb-2">
            {testimonialsPage.heading1}<span className="text-[#f05a22]">{testimonialsPage.heading2}</span>
          </h2>
          <p className="text-gray-500 text-[16px] max-w-2xl font-medium">
            {testimonialsPage.description}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2 min-h-[300px]">
            {visibleTestimonials.map((testimonial: any) => (

              <div key={testimonial.id} className="bg-white border border-gray-100 rounded-[20px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div>
                  <div className="flex gap-4 mb-5">
                    {/* Orange Quote */}
                    <div className="flex-shrink-0 mt-1">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#ea580c" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 14.5C6 16.9853 7.98528 19 10.4706 19C12.9559 19 14.9412 16.9853 14.9412 14.5C14.9412 12.0147 12.9559 10 10.4706 10H9.5C9.5 7.5 11.5 6.5 13 6.5V3.5C9 3.5 6 6.5 6 10.5V14.5ZM16 14.5C16 16.9853 17.9853 19 20.4706 19C22.9559 19 24.9412 16.9853 24.9412 14.5C24.9412 12.0147 22.9559 10 20.4706 10H19.5C19.5 7.5 21.5 6.5 23 6.5V3.5C19 3.5 16 6.5 16 10.5V14.5Z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                  {/* Stars */}
                  <div className="flex items-center gap-[2px] mb-5 pl-12">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-[16px] h-[16px] fill-[#ea580c] text-[#ea580c]" />
                    ))}
                  </div>
                </div>

                {/* Avatar & Info */}
                <div className="flex items-center gap-4">
                  <div className="w-[65px] h-[65px] rounded-full overflow-hidden relative bg-orange-50 flex-shrink-0">
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-[2px] bg-[#ea580c]"></div>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-[#1a1a1a] text-[16px]">{testimonial.name}</h4>
                      <p className="text-gray-400 text-[13px]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows below the grid, centered */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all shadow-sm"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
