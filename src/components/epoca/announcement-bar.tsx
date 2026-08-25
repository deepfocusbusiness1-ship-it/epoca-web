'use client';

import React, { useState, useEffect } from 'react';
import { COMMERCIAL_ANNOUNCEMENTS } from '@/data/epoca-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % COMMERCIAL_ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? COMMERCIAL_ANNOUNCEMENTS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % COMMERCIAL_ANNOUNCEMENTS.length);
  };

  const currentAnnouncement = COMMERCIAL_ANNOUNCEMENTS[currentIndex];

  return (
    <div className="bg-[#0C1014] text-[#FAF9F6] border-b border-[#1E2638] text-[10px] sm:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase py-2 sm:py-2.5 px-2 sm:px-4 relative z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={handlePrev}
          aria-label="Mensaje anterior"
          className="text-[#9E9A93] hover:text-white transition-colors p-1 shrink-0"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="overflow-hidden flex-1 text-center px-2">
          {/* Desktop full message */}
          <p
            key={`desktop-${currentIndex}`}
            className="hidden sm:block animate-fade-in truncate transition-all duration-300 select-none"
          >
            {currentAnnouncement.desktop}
          </p>

          {/* Mobile adapted message (Never cut off) */}
          <p
            key={`mobile-${currentIndex}`}
            className="block sm:hidden animate-fade-in truncate text-[9.5px] tracking-[0.14em] transition-all duration-300 select-none font-semibold text-[#FAF9F6]"
          >
            {currentAnnouncement.mobile}
          </p>
        </div>

        <button
          onClick={handleNext}
          aria-label="Siguiente mensaje"
          className="text-[#9E9A93] hover:text-white transition-colors p-1 shrink-0"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
