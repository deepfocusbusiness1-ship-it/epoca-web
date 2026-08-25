'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, ArrowUp } from 'lucide-react';
import { InstagramIcon } from '@/components/icons';
import { STORE_CONFIG } from '@/data/epoca-data';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C1014] text-[#FAF9F6] border-t border-[#1E2638] relative overflow-hidden pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#1E2638]">
          {/* Brand Info (Institutional Rectangular Navy Plaque in Gold & Ivory) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="inline-block bg-[#16203B] px-5 py-2.5 rounded-[2px] border border-[#C5A880]/35 shadow-sm">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="font-editorial text-2xl sm:text-3xl tracking-[0.2em] font-normal uppercase text-[#C5A880] leading-none pl-[0.2em]">
                  {STORE_CONFIG.brand}
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.42em] text-[#FAF9F6]/90 uppercase font-medium mt-1 pl-[0.42em]">
                  INDUMENTARIA
                </span>
              </div>
            </div>

            <p className="text-xs text-[#D8D2C6]/85 font-light leading-relaxed max-w-sm pt-1">
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
