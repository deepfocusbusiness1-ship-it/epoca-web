'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_CATEGORIES } from '@/data/epoca-data';
import { ArrowUpRight } from 'lucide-react';

export function FeaturedCategories() {
  return (
    <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[#736E65] font-semibold">
          UNIVERSO ÉPOCA
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#16203B] mt-2 font-normal">
          Colecciones & Líneas Exclusivas
        </h2>
        <div className="w-12 h-[1.5px] bg-[#C5A880] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {FEATURED_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative overflow-hidden bg-white border border-[#E8E4DC] block rounded-xs shadow-xs hover:shadow-xl transition-shadow"
          >
            {/* Image Container */}
            <div className="aspect-[3/4] relative overflow-hidden bg-[#FAF9F6]">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-[center_20%] group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1014]/90 via-[#16203B]/25 to-transparent" />

              {/* Badge */}
              {category.badge && (
                <div className="absolute top-3.5 left-3.5">
                  <span className="bg-[#16203B]/90 backdrop-blur-xs text-[#FAF9F6] text-[9px] font-bold tracking-[0.2em] px-2.5 py-1 uppercase border border-[#FAF9F6]/20">
                    {category.badge}
                  </span>
                </div>
              )}

              {/* Content Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-normal leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#E8E4DC]/80 font-light mt-1">
                    {category.subtitle}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:bg-[#C5A880] group-hover:text-[#0C1014] transition-all duration-300 shrink-0 ml-2">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#0C1014] transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
