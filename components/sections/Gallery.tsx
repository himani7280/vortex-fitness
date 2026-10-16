"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import siteData from '@/data/siteData';

const Gallery = () => {
  const gallery = (siteData.sections?.Gallery?.variants?.FitnessGallery1 || siteData.gallery) as any;
  const galleryImages = gallery.images;

  const [showAll, setShowAll] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, gallery.initialCount);

  const openLightbox = (index: number) => {
    
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section className="w-full bg-white pt-10 pb-4 md:pt-14 md:pb-6 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[2px] w-12 bg-[#ea580c]"></div>
            <span className="text-[#ea580c] font-bold tracking-[0.15em] text-[13px] uppercase">
              {gallery.topText}
            </span>
            <div className="h-[2px] w-12 bg-[#ea580c]"></div>
          </div>
          <h2 className="text-4xl md:text-[50px] font-black text-[#1a1a1a] font-heading tracking-tight mb-1 uppercase">
            {gallery.heading1}<span className="text-[#ea580c]">{gallery.heading2}</span>
          </h2>
          <p className="text-gray-500 text-[15px] md:text-[16px] max-w-2xl font-medium leading-relaxed">
            {gallery.description}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2 mb-6">
          {displayedImages.map((img: any, idx: number) => (

            <div
              key={img.id}
              className="relative group cursor-pointer rounded-xl overflow-hidden aspect-[4/3] bg-gray-100"
              onClick={() => openLightbox(idx)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Magnifying Glass Icon (Bottom Right) */}
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <Search className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {!showAll && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-white border-2 border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white font-bold py-3.5 px-10 rounded shadow-sm transition-all text-[15px] uppercase tracking-wider"
            >
              {gallery.buttonText}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-[110]"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-[#ea580c] rounded-full flex items-center justify-center text-white transition-all z-[110]"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image Container */}
          <div
            className="relative w-full max-w-5xl h-[60vh] md:h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImageIndex].src}
              alt={galleryImages[selectedImageIndex].alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-[#ea580c] rounded-full flex items-center justify-center text-white transition-all z-[110]"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 text-white/70 font-medium text-[15px] tracking-wide">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
