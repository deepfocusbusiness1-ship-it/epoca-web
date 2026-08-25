'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HERO_SLIDES } from '@/data/epoca-data';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Slow auto-rotation (7 seconds), pausing on user interaction
  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentSlide, isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      aria-label="Carrusel de Campaña Época"
      className="relative w-full bg-[#0C1014] text-[#FAF9F6] overflow-hidden select-none border-b border-[#1E2638]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative w-full min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] lg:h-[78vh] max-h-[860px]">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          const isFirstSlide = index === 0;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* DESKTOP COMPOSITION (Horizontal Editorial Layout for lg+) */}
              <div className="hidden lg:flex relative w-full h-full items-center justify-between overflow-hidden">
                {/* Background Atmosphere Layer (Deep Institutional Navy + subtle blur) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    aria-hidden="true"
                    sizes="(max-width: 1024px) 0vw, 100vw"
                    priority={isFirstSlide}
                    loading={isFirstSlide ? 'eager' : 'lazy'}
                    fetchPriority="auto"
                    className="object-cover object-center filter blur-3xl scale-125 opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0C1014] via-[#0C1014]/92 to-[#16203B]/70" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#16203B]/40 via-[#0C1014]/85 to-[#0C1014]" />
                </div>

                {/* Content Container (Split Grid) */}
                <div className="relative z-10 max-w-7xl mx-auto w-full px-8 lg:px-12 grid grid-cols-12 gap-8 items-center h-full py-10">
                  {/* Left Column: Dedicated Safe Text Zone */}
                  <div className="col-span-7 space-y-6 pr-6 animate-fade-in">
                    {/* Tagline */}
                    <div className="inline-flex items-center space-x-2.5">
                      <span className="h-[1.5px] w-6 bg-[#C5A880]" />
                      <span className="text-xs tracking-[0.35em] uppercase font-semibold text-[#C5A880]">
                        {slide.tagline}
                      </span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-editorial text-4xl xl:text-5xl 2xl:text-6xl font-normal leading-[1.12] text-white tracking-wide">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-sm xl:text-base text-[#D8D2C6]/90 font-light leading-relaxed max-w-xl">
                      {slide.description}
                    </p>

                    {/* CTAs */}
                    <div className="pt-3 flex items-center space-x-4">
                      <Link
                        href={slide.primaryCta.href}
                        className="px-8 py-3.5 bg-[#FAF9F6] text-[#16203B] hover:bg-[#C5A880] hover:text-[#0C1014] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md rounded-xs"
                      >
                        {slide.primaryCta.text}
                      </Link>
                      <Link
                        href={slide.secondaryCta.href}
                        className="px-8 py-3.5 bg-transparent border border-white/60 text-white hover:bg-white/10 hover:border-white text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 rounded-xs"
                      >
                        {slide.secondaryCta.text}
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Crisp, Sharp, Unscaled Main Vertical Image with Fine Frame */}
                  <div className="col-span-5 flex justify-end items-center h-full">
                    <div className="relative h-[480px] xl:h-[530px] 2xl:h-[570px] aspect-[3/4] p-1.5 bg-[#16203B]/60 border border-[#C5A880]/35 shadow-2xl rounded-xs overflow-hidden group">
                      <div className="relative w-full h-full overflow-hidden rounded-xs bg-[#0C1014]">
                        <Image
                          src={slide.image}
                          alt={slide.alt || slide.title}
                          fill
                          priority={isFirstSlide}
                          loading={isFirstSlide ? 'eager' : 'lazy'}
                          fetchPriority={isFirstSlide ? 'high' : 'auto'}
                          sizes="(max-width: 1024px) 0vw, (max-width: 1280px) 42vw, (max-width: 1536px) 38vw, 550px"
                          className="object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
                        />
                        {/* Subtle inner shadow to blend frame */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOBILE & TABLET COMPOSITION (Vertical Responsive Layout for <lg) */}
              <div className="lg:hidden relative w-full h-full flex flex-col justify-end">
                {/* Full-height Vertical Image */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.alt || slide.title}
                    fill
                    priority={isFirstSlide}
                    loading={isFirstSlide ? 'eager' : 'lazy'}
                    fetchPriority={isFirstSlide ? 'high' : 'auto'}
                    sizes="(max-width: 1024px) 100vw, 0vw"
                    className={`object-cover ${slide.mobilePosition || 'object-center'}`}
                  />
                  {/* Heavy Deep Navy Gradient so text is 100% readable without covering face */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1014] via-[#0C1014]/80 to-[#16203B]/30" />
                </div>

                {/* Mobile Safe Text Zone (Bottom anchored, completely free of floating arrows) */}
                <div className="relative z-10 p-5 sm:p-8 space-y-3 pb-18 sm:pb-20 max-w-lg mx-auto w-full">
                  <span className="inline-block text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase font-bold text-[#C5A880] bg-[#0C1014]/80 backdrop-blur-xs px-2.5 py-1 border border-[#C5A880]/40 rounded-xs">
                    {slide.tagline}
                  </span>

                  <h2 className="font-editorial text-2xl sm:text-3xl font-normal leading-snug text-white drop-shadow-sm">
                    {slide.title}
                  </h2>

                  <p className="text-[11.5px] sm:text-xs text-[#D8D2C6]/90 font-light line-clamp-2 leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="pt-1.5 flex flex-col sm:flex-row gap-2">
                    <Link
                      href={slide.primaryCta.href}
                      className="w-full py-2.5 sm:py-3 bg-[#FAF9F6] text-[#16203B] text-center text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase transition-colors rounded-xs shadow-sm"
                    >
                      {slide.primaryCta.text}
                    </Link>
                    <Link
                      href={slide.secondaryCta.href}
                      className="w-full py-2.5 sm:py-3 bg-[#0C1014]/60 border border-white/60 text-white text-center text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase backdrop-blur-xs rounded-xs"
                    >
                      {slide.secondaryCta.text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Edge Floating Arrows (Only on lg+) */}
      <div className="hidden lg:block">
        <button
          onClick={handlePrev}
          aria-label="Diapositiva anterior"
          className="absolute left-4 xl:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#0C1014]/60 text-white/80 hover:text-white hover:bg-[#16203B] transition-all backdrop-blur-xs flex items-center justify-center border border-white/15"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Diapositiva siguiente"
          className="absolute right-4 xl:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#0C1014]/60 text-white/80 hover:text-white hover:bg-[#16203B] transition-all backdrop-blur-xs flex items-center justify-center border border-white/15"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Control Bar with Integrated Compact Controls (Active dot in warm gold) */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 sm:space-x-3 bg-[#0C1014]/80 px-3 py-1.5 rounded-full backdrop-blur-md border border-[#C5A880]/30 shadow-lg">
        {/* Mobile/Tablet Prev Button */}
        <button
          onClick={handlePrev}
          aria-label="Anterior"
          className="lg:hidden p-1 text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Indicators Dots */}
        <div className="flex items-center space-x-2 px-1">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ir a la diapositiva ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? 'w-6 bg-[#C5A880]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Mobile/Tablet Next Button */}
        <button
          onClick={handleNext}
          aria-label="Siguiente"
          className="lg:hidden p-1 text-white/70 hover:text-white transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Pause/Play Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
          className="text-white/60 hover:text-white pl-2 border-l border-white/20 transition-colors"
        >
          {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
        </button>
      </div>
    </section>
  );
}
