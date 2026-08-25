'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NAVIGATION_CATEGORIES, STORE_CONFIG } from '@/data/epoca-data';
import { X, ChevronDown, MapPin, Phone, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '@/components/icons';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0C1014]/70 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#FAF9F6] shadow-2xl flex flex-col z-50 overflow-y-auto animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#E8E4DC]">
          <div className="flex flex-col">
            <span className="font-editorial text-2xl tracking-[0.18em] font-normal uppercase text-[#16203B] leading-none pl-[0.18em]">
              {STORE_CONFIG.brand}
            </span>
            <span className="text-[8px] tracking-[0.42em] text-[#736E65] uppercase font-semibold mt-1 pl-[0.42em]">
              INDUMENTARIA
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="w-11 h-11 flex items-center justify-center text-[#16203B] hover:text-[#C5A880] transition-colors rounded-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Categories List */}
        <div className="p-6 flex-1">
          <ul className="space-y-4 text-sm font-medium tracking-[0.15em] uppercase text-[#16203B]">
            {NAVIGATION_CATEGORIES.map((cat) => (
              <li key={cat.title} className="border-b border-[#EFECE6] pb-3">
                <div className="flex items-center justify-between">
                  <Link
                    href={cat.href}
                    onClick={onClose}
                    className="hover:text-[#C5A880] transition-colors py-1 flex-1"
                  >
                    {cat.title}
                  </Link>
                  {cat.subcategories && (
                    <button
                      onClick={() => toggleCategory(cat.title)}
                      aria-label="Expandir subcategorías"
                      className="w-10 h-10 flex items-center justify-center text-[#736E65] hover:text-[#16203B]"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedCategory === cat.title ? 'rotate-180 text-[#16203B]' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Subcategories */}
                {cat.subcategories && expandedCategory === cat.title && (
                  <ul className="mt-2.5 pl-3 space-y-2 border-l-2 border-[#C5A880] animate-fade-in">
                    {cat.subcategories.map((sub) => (
                      <li key={sub.title}>
                        <Link
                          href={sub.href}
                          onClick={onClose}
                          className="text-xs text-[#555] hover:text-[#16203B] py-1 block capitalize font-normal"
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Boutique Details Card */}
          <div className="mt-8 p-4 bg-[#F5F3EF] border border-[#E8E4DC] rounded-xs space-y-3">
            <p className="text-[10px] tracking-[0.2em] font-semibold text-[#16203B] uppercase">
              Boutique {STORE_CONFIG.neighborhood}
            </p>
            <div className="flex items-start space-x-2.5 text-xs text-[#555]">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>{STORE_CONFIG.fullAddress}</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs text-[#555]">
              <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{STORE_CONFIG.schedule}</span>
            </div>
          </div>
        </div>

        {/* Footer Contact */}
        <div className="p-6 border-t border-[#E8E4DC] bg-white">
          <a
            href={STORE_CONFIG.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs tracking-wider uppercase font-medium text-[#16203B] hover:text-[#C5A880] transition-colors"
          >
            <div className="flex items-center space-x-2">
              <InstagramIcon className="w-4 h-4 text-[#C5A880]" />
              <span>{STORE_CONFIG.instagram.handle}</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
