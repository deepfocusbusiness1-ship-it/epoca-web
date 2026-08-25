'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAVIGATION_CATEGORIES, STORE_CONFIG } from '@/data/epoca-data';
import { Search, ShoppingBag, Menu, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}

export function Header({
  cartCount,
  onOpenCart,
  onOpenMobileMenu,
  onOpenSearch,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F6]/95 backdrop-blur-md shadow-xs border-b border-[#E8E4DC]'
          : 'bg-[#FAF9F6] border-b border-[#EFECE6]'
      }`}
    >
      {/* Top Header Bar with True 3-Column CSS Grid (Guarantees exact 50% center on all viewports) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20 sm:h-24">
          {/* Left Controls (justify-self-start) */}
          <div className="justify-self-start flex items-center">
            {/* Mobile Menu & Search Buttons (Touch target >= 44x44px) */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={onOpenMobileMenu}
                aria-label="Abrir menú"
                className="w-11 h-11 flex items-center justify-center -ml-2 text-[#16203B] hover:text-[#C5A880] transition-colors rounded-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
              <button
                onClick={onOpenSearch}
                aria-label="Buscar"
                className="w-11 h-11 flex items-center justify-center text-[#16203B] hover:text-[#C5A880] transition-colors rounded-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Desktop Left Search Bar */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={onOpenSearch}
                className="flex items-center space-x-2.5 text-xs text-[#736E65] hover:text-[#16203B] transition-colors py-2 px-3.5 rounded-full bg-[#F5F3EF] border border-[#E8E4DC]/80 group w-64 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <Search className="w-3.5 h-3.5 text-[#736E65] group-hover:text-[#16203B] transition-colors" />
                <span className="font-light tracking-wide">Buscar sastrería, abrigos...</span>
              </button>
            </div>
          </div>

          {/* Center Brand Logo (justify-self-center -> EXACT 50% Viewport Center) */}
          <div className="justify-self-center flex items-center justify-center">
            <Link
              href="/"
              className="group flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 rounded-xs py-1 px-1.5"
            >
              {/* Official Round Emblem */}
              <div className="relative w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] rounded-full overflow-hidden shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/epoca/brand/logo-epoca-round.webp"
                  alt="ÉPOCA Indumentaria"
                  fill
                  priority
                  sizes="58px"
                  className="object-contain"
                />
              </div>

              {/* Wordmark (hidden on smaller mobile to keep focus on round emblem, visible on sm+) */}
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-editorial text-2xl md:text-3xl tracking-[0.2em] font-normal uppercase text-[#16203B] group-hover:text-[#C5A880] transition-colors duration-300 leading-none">
                  {STORE_CONFIG.brand}
                </span>
                <span className="text-[8px] md:text-[9px] tracking-[0.45em] text-[#736E65] uppercase font-semibold mt-1">
                  INDUMENTARIA
                </span>
              </div>
            </Link>
          </div>

          {/* Right Controls (justify-self-end) */}
          <div className="justify-self-end flex items-center space-x-1 sm:space-x-4">
            <a
              href="#boutique"
              className="hidden lg:inline-flex text-[11px] font-medium tracking-[0.18em] uppercase text-[#736E65] hover:text-[#16203B] transition-colors"
            >
              Boutique
            </a>

            <button
              onClick={() => alert('Próximamente: Portal de Clientes Época')}
              aria-label="Mi Cuenta"
              className="hidden sm:flex w-11 h-11 items-center justify-center text-[#16203B] hover:text-[#C5A880] transition-colors rounded-xs"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Bolsa de compras"
              className="relative w-11 h-11 flex items-center justify-center -mr-2 text-[#16203B] hover:text-[#C5A880] transition-colors group rounded-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#16203B] text-[#FAF9F6] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-[#C5A880] transition-colors shadow-2xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Desktop lg+) */}
      <nav className="hidden lg:block border-t border-[#EFECE6] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center space-x-8 xl:space-x-12 py-3 text-xs tracking-[0.2em] font-medium uppercase text-[#16203B]">
            {NAVIGATION_CATEGORIES.map((cat) => (
              <li
                key={cat.title}
                className="relative py-1"
                onMouseEnter={() => setActiveDropdown(cat.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={cat.href}
                  className={`inline-flex items-center space-x-1 transition-colors ${
                    cat.featured
                      ? 'text-[#16203B] font-semibold hover:text-[#C5A880]'
                      : 'text-[#16203B]/85 hover:text-[#C5A880]'
                  }`}
                >
                  <span>{cat.title}</span>
                  {cat.subcategories && (
                    <ChevronDown className="w-3 h-3 text-[#736E65] opacity-70" />
                  )}
                </Link>

                {/* Subcategory Dropdown Mega Menu */}
                {cat.subcategories && activeDropdown === cat.title && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white border border-[#E8E4DC] shadow-xl p-5 z-40 animate-in fade-in zoom-in-95 duration-150 rounded-xs">
                    <div className="space-y-4">
                      {cat.bannerImage && (
                        <div className="aspect-[16/9] relative overflow-hidden rounded-xs bg-[#FAF9F6] border border-[#E8E4DC]/60">
                          <Image
                            src={cat.bannerImage}
                            alt={cat.bannerTitle || cat.title}
                            fill
                            sizes="300px"
                            className="object-cover object-[center_20%]"
                          />
                          {cat.bannerTitle && (
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2.5">
                              <span className="text-[10px] text-white tracking-widest uppercase font-semibold">
                                {cat.bannerTitle}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <ul className="space-y-2 text-[11px] tracking-widest text-[#555]">
                        {cat.subcategories.map((sub) => (
                          <li key={sub.title}>
                            <Link
                              href={sub.href}
                              className="block py-1 hover:text-[#16203B] hover:translate-x-1 transition-all capitalize font-normal text-xs"
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
