"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { categories } from '@/data/siteData';

export default function BlogCategories() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="bg-[#16181d] p-6 pb-5">
        <h3 className="text-2xl font-bold text-white mb-3">All Categories</h3>
        <div className="h-1 w-10 bg-[#ea580c]"></div>
      </div>

      <div className="flex flex-col py-2">
        {categories.map((category, index) => {
          const isActive = activeIdx === index;
          return (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setActiveIdx(index);
              }}
              className={`flex items-center justify-between p-[14px] px-6 transition-all duration-300 w-full text-left group ${isActive ? 'bg-[#ea580c] text-white mx-3 my-1 rounded-md' : 'bg-white text-gray-500 hover:text-black border-b border-gray-100 mx-3'
                }`}
            >
              <span className="font-medium text-[15px]">
                {category.name}
              </span>
              <div className={`flex items-center gap-2 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#ea580c]'}`}>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
