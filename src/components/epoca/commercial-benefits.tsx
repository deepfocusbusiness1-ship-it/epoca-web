'use client';

import React from 'react';
import { COMMERCIAL_BENEFITS } from '@/data/epoca-data';
import { CreditCard, Percent, Truck, Sparkles } from 'lucide-react';

export function CommercialBenefits() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-[#C5A880] stroke-[1.5]" />;
      case 'Percent':
        return <Percent className="w-6 h-6 text-[#C5A880] stroke-[1.5]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#C5A880] stroke-[1.5]" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-6 h-6 text-[#C5A880] stroke-[1.5]" />;
    }
  };

  return (
    <section className="bg-white border-y border-[#E8E4DC] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {COMMERCIAL_BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center p-4 rounded-xs group hover:bg-[#FAF9F6] transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#E8E4DC] flex items-center justify-center mb-4 group-hover:border-[#C5A880] group-hover:scale-110 transition-all duration-300">
                {getIcon(benefit.icon)}
              </div>
              <h3 className="font-editorial text-lg sm:text-xl text-[#16203B] font-normal leading-snug">
                {benefit.title}
              </h3>
              <p className="text-xs text-[#736E65] font-light mt-1.5 leading-relaxed max-w-xs">
                {benefit.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
