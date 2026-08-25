'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, ArrowUp } from 'lucide-react';
import { InstagramIcon } from '@/components/icons';
import { STORE_CONFIG } from '@/data/epoca-data';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C1014] text-[#FAF9F6] border-t border-[#1E2638] relative overflow-hidden pt-16 pb-12">
      {/* Subtle brand ring gradient accent line at the very top of footer */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#D300C5]/40 via-[#FF5F18]/50 to-[#EAB802]/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#1E2638]">
          {/* Brand Info with Official Round Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-md">
                <Image
                  src="/images/epoca/brand/logo-epoca-round.webp"
                  alt="ÉPOCA Indumentaria"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-editorial text-2xl tracking-[0.2em] font-normal uppercase text-white leading-none">
                  {STORE_CONFIG.brand}
                </span>
                <span className="text-[8px] tracking-[0.45em] text-[#C5A880] uppercase font-semibold mt-1">
                  INDUMENTARIA
                </span>
              </div>
            </div>

            <p className="text-xs text-[#D8D2C6]/85 font-light leading-relaxed max-w-sm">
              Sastrería de autor, prendas de lino, abrigos Perramus y calzado artesanal. Diseñado para quienes aprecian la elegancia atemporal y la confección de excelencia.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#D8D2C6]/90">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{STORE_CONFIG.fullAddress}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{STORE_CONFIG.schedule}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <InstagramIcon className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href={STORE_CONFIG.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A880] transition-colors"
                >
                  {STORE_CONFIG.instagram.handle}
                </a>
              </div>
            </div>
          </div>

          {/* Colecciones Column */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] font-semibold text-white uppercase mb-4">
              Colecciones
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D8D2C6]/75">
              <li>
                <Link href="#hombre" className="hover:text-[#C5A880] transition-colors">
                  Sastrería & Ambos
                </Link>
              </li>
              <li>
                <Link href="#mujer" className="hover:text-[#C5A880] transition-colors">
                  Colección Mujer
                </Link>
              </li>
              <li>
                <Link href="#perramus" className="hover:text-[#C5A880] transition-colors">
                  Línea Perramus Oficial
                </Link>
              </li>
              <li>
                <Link href="#catalogo" className="hover:text-[#C5A880] transition-colors">
                  Camisería & Puro Lino
                </Link>
              </li>
              <li>
                <Link href="#accesorios" className="hover:text-[#C5A880] transition-colors">
                  Calzado & Marroquinería
                </Link>
              </li>
            </ul>
          </div>

          {/* Atención al Cliente / Beneficios */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] font-semibold text-white uppercase mb-4">
              Información de Tienda
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A69E90]">
              <li>
                <span>Envíos bonificados a todo el país</span>
              </li>
              <li>
                <span>{STORE_CONFIG.installmentsLabel}</span>
              </li>
              <li>
                <span>{STORE_CONFIG.discountCashTransferLabel}</span>
              </li>
              <li>
                <a
                  href={STORE_CONFIG.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A880] text-[#D8D2C6] transition-colors inline-block"
                >
                  Consultas por WhatsApp →
                </a>
              </li>
            </ul>
          </div>

          {/* Boutique & Legal */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] font-semibold text-white uppercase mb-4">
              La Boutique
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A69E90]">
              <li>
                <Link href="#boutique" className="hover:text-white text-[#D8D2C6] transition-colors">
                  {STORE_CONFIG.address} ({STORE_CONFIG.neighborhood})
                </Link>
              </li>
              <li>
                <span>{STORE_CONFIG.city}, {STORE_CONFIG.province}</span>
              </li>
              <li>
                <span>Asesoramiento y sastrería a medida</span>
              </li>
              <li className="pt-2 text-[11px] text-[#736E65]">
                <span>Términos y condiciones comerciales de Época</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#736E65]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span className="text-[11px]">
              © {new Date().getFullYear()} {STORE_CONFIG.name}. Todos los derechos reservados.
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[11px]">
              {STORE_CONFIG.address}, {STORE_CONFIG.city}
            </span>
          </div>

          {/* Payment & Back to top */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#A69E90]">
              <span>Tarjetas 3 y 6 pagos</span>
              <span>•</span>
              <span>Mercado Pago</span>
              <span>•</span>
              <span>Efectivo 15% OFF</span>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Volver arriba"
              className="p-2 rounded-full border border-[#2A344A] hover:border-[#C5A880] hover:text-white transition-colors flex items-center justify-center"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
