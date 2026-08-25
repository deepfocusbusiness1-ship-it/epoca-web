'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { STORE_CONFIG } from '@/data/epoca-data';

const IMG_BASE = '/images/epoca/tienda-epoca';

export function EditorialShowcase() {
  return (
    <div className="space-y-20 sm:space-y-32 my-16 sm:my-28">
      {/* 1. SECCIÓN DE ASESORAMIENTO & MANIFIESTO (Panel azul marino refinado) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0C1014] text-[#FAF9F6] grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-[#1E2638] shadow-2xl rounded-xs">
          {/* Text Content */}
          <div className="lg:col-span-6 p-8 sm:p-14 lg:p-16 flex flex-col justify-between space-y-8 order-2 lg:order-1">
            <div className="space-y-5">
              <div className="inline-flex items-center space-x-2 text-[#C5A880]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] font-semibold tracking-[0.3em] uppercase">
                  EXPERIENCIA & ASESORAMIENTO
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-white">
                “Te ayudamos a elegir tu outfit para cada ocasión.”
              </h2>

              <p className="text-xs sm:text-sm text-[#D8D2C6]/85 font-light leading-relaxed">
                En Época entendemos el vestir como una expresión de elegancia natural. Brindamos un servicio de asesoramiento personalizado para que encuentres la combinación justa entre sastrería a medida, camisería italiana y abrigos de autor para tus momentos más importantes.
              </p>
            </div>

            <div className="pt-4 border-t border-[#1E2638] flex flex-wrap items-center gap-4">
              <Link
                href="#hombre"
                className="px-6 py-3.5 bg-[#FAF9F6] text-[#16203B] hover:bg-[#C5A880] hover:text-[#0C1014] text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center space-x-2 shadow-sm rounded-xs"
              >
                <span>Sastrería Masculina</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="#boutique"
                className="text-xs tracking-[0.18em] uppercase text-[#C5A880] hover:text-white transition-colors"
              >
                Visitar Boutique {STORE_CONFIG.address} →
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[500px] bg-[#16203B] order-1 lg:order-2 overflow-hidden">
            <Image
              src={`${IMG_BASE}/SaveClip.App_632062307_18398646940198789_8896801041264093428_n.jpg`}
              alt="Hombre con saco sastrero disfrutando de un café en la boutique Época"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_25%]"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE SASTRERÍA MASCULINA (Protagonista de cuerpo entero + detalles) */}
      <section id="hombre" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#736E65] font-semibold">
            SASTRERÍA DE AUTOR
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#16203B] mt-2 font-normal">
            Colección Masculina & Detalles de Corte
          </h2>
          <div className="w-12 h-[1.5px] bg-[#C5A880] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Protagonist Image (Full Body Suit) */}
          <div className="lg:col-span-7 relative min-h-[500px] sm:min-h-[600px] bg-white border border-[#E8E4DC] p-3 shadow-md rounded-xs group overflow-hidden">
            <div className="relative w-full h-full min-h-[480px] overflow-hidden rounded-xs bg-[#FAF9F6]">
              <Image
                src={`${IMG_BASE}/SaveClip.App_620718878_18394850947198789_2954994124997297077_n.jpg`}
                alt="Hombre de cuerpo entero con traje sastrero y corbata en Época"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-[center_20%] group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1014]/90 via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white space-y-2">
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C5A880]">
                  CALCE & ESTRUCTURA
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-normal">
                  Ambos y Sacos Sastreros Formales
                </h3>
                <p className="text-xs sm:text-sm text-[#E8E4DC]/90 font-light max-w-md">
                  Lanas nobles de hilado peinado, solapas con caída precisa y forrería en jacquard personalizado.
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Details Grid (3 detail cards) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {/* Detail 1: Saco / Cuello */}
            <div className="bg-white border border-[#E8E4DC] p-4 flex items-center space-x-4 group hover:border-[#C5A880] transition-colors rounded-xs">
              <div className="w-24 h-24 relative overflow-hidden bg-[#FAF9F6] shrink-0 rounded-xs">
                <Image
                  src={`${IMG_BASE}/SaveClip.App_464976222_18337032631198789_5157326501465087473_n.jpg`}
                  alt="Detalle de solapa y textura de saco sastrero"
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[9px] tracking-widest text-[#736E65] uppercase font-semibold">
                  DETALLE SASTRERO
                </span>
                <h4 className="font-editorial text-base text-[#16203B] leading-tight">
                  Texturas & Paños Nobles
                </h4>
                <p className="text-xs text-[#666] font-light line-clamp-2">
                  Hilados de alta torsión con estructura semiforrada y solapa de muesca.
                </p>
              </div>
            </div>

            {/* Detail 2: Camisería fina */}
            <div className="bg-white border border-[#E8E4DC] p-4 flex items-center space-x-4 group hover:border-[#C5A880] transition-colors rounded-xs">
              <div className="w-24 h-24 relative overflow-hidden bg-[#FAF9F6] shrink-0 rounded-xs">
                <Image
                  src={`${IMG_BASE}/SaveClip.App_620429598_18394850008198789_8163320980889236732_n.jpg`}
                  alt="Detalle de camisería y perchero en boutique"
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[9px] tracking-widest text-[#736E65] uppercase font-semibold">
                  CAMISERÍA
                </span>
                <h4 className="font-editorial text-base text-[#16203B] leading-tight">
                  Poplín de Algodón Egipcio
                </h4>
                <p className="text-xs text-[#666] font-light line-clamp-2">
                  Cuellos italianos estructurados con ballenas desmontables.
                </p>
              </div>
            </div>

            {/* Detail 3: Percheros & Ambiente boutique */}
            <div className="bg-white border border-[#E8E4DC] p-4 flex items-center space-x-4 group hover:border-[#C5A880] transition-colors rounded-xs">
              <div className="w-24 h-24 relative overflow-hidden bg-[#FAF9F6] shrink-0 rounded-xs">
                <Image
                  src={`${IMG_BASE}/SaveClip.App_573844237_18384586711198789_8372641869216465007_n.jpg`}
                  alt="Perchero con variedad de prendas y abrigos en Época"
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[9px] tracking-widest text-[#736E65] uppercase font-semibold">
                  SELECCIÓN EXCLUSIVA
                </span>
                <h4 className="font-editorial text-base text-[#16203B] leading-tight">
                  Amplitud de Talles & Variantes
                </h4>
                <p className="text-xs text-[#666] font-light line-clamp-2">
                  Disponibilidad de talles del 46 al 56 con servicio de ajuste en boutique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN MUJER / LÍNEA PERRAMUS & LINO (Split Editorial) */}
      <section id="perramus" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Card 1: Perramus Mujer */}
          <div className="group relative overflow-hidden bg-white border border-[#E8E4DC] p-6 sm:p-10 flex flex-col justify-between space-y-6 rounded-xs shadow-xs hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] relative overflow-hidden bg-[#FAF9F6] rounded-xs">
              <Image
                src={`${IMG_BASE}/SaveClip.App_564149273_18381451120198789_3858940154214935583_n.jpg`}
                alt="Mujer con piloto Perramus y paraguas"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-3.5 left-3.5">
                <span className="bg-[#16203B] text-[#FAF9F6] text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase">
                  PERRAMUS OFICIAL
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-[#736E65] uppercase">
                HERENCIA & PROTECCIÓN
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#16203B] font-normal">
                Trenchs & Pilotos Impermeables
              </h3>
              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                Gabardinas resinadas de máxima repelencia, charreteras de hombro, cinturón envolvente y terminaciones de confección impecable.
              </p>
            </div>

            <Link
              href="#catalogo"
              className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#16203B] group-hover:text-[#C5A880] transition-colors"
            >
              <span>Ver Línea Perramus</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Lino y Camisería */}
          <div id="mujer" className="group relative overflow-hidden bg-white border border-[#E8E4DC] p-6 sm:p-10 flex flex-col justify-between space-y-6 rounded-xs shadow-xs hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] relative overflow-hidden bg-[#FAF9F6] rounded-xs">
              <Image
                src={`${IMG_BASE}/SaveClip.App_645818425_18401436823198789_2789554754393725653_n.jpg`}
                alt="Mujer con camisa blanca bordada broderie"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-3.5 left-3.5">
                <span className="bg-[#C5A880] text-[#0C1014] text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase">
                  COLECCIÓN FEMENINA
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-[#736E65] uppercase">
                TEXTURAS & BRODERIE
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#16203B] font-normal">
                Puro Algodón, Lino & Calados
              </h3>
              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                Blusas con bordados ingleses en relieve, camisas de lino prelavado y prendas frescas de caída etérea para toda ocasión.
              </p>
            </div>

            <Link
              href="#catalogo"
              className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#16203B] group-hover:text-[#C5A880] transition-colors"
            >
              <span>Explorar Camisería</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN “LA BOUTIQUE” (San Martín 1718 • Experiencia & Fachada) */}
      <section id="boutique" className="bg-[#F5F3EF] border-y border-[#E8E4DC] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          {/* Images Showcase */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="aspect-[3/4] relative overflow-hidden rounded-xs shadow-md border border-[#E8E4DC]">
                <Image
                  src={`${IMG_BASE}/SaveClip.App_681929517_18410756026198789_9008091518900268971_n.jpg`}
                  alt="Experiencia y calidez dentro de la boutique Época"
                  fill
                  sizes="350px"
                  className="object-cover object-[center_20%]"
                />
              </div>
              <div className="aspect-[4/3] relative overflow-hidden rounded-xs shadow-sm border border-[#E8E4DC]">
                <Image
                  src={`${IMG_BASE}/SaveClip.App_645864225_18401434501198789_5810611658238367148_n.jpg`}
                  alt="Detalle de ambientación y lámpara en la boutique"
                  fill
                  sizes="350px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6 sm:pt-8">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xs shadow-sm border border-[#E8E4DC]">
                <Image
                  src={`${IMG_BASE}/SaveClip.App_645953178_18401434492198789_1281450954209585632_n.jpg`}
                  alt="Vitrina con gorra y accesorios de fin de semana"
                  fill
                  sizes="350px"
                  className="object-cover"
                />
              </div>
              <div className="aspect-[3/4] relative overflow-hidden rounded-xs shadow-md border border-[#E8E4DC]">
                <Image
                  src={`${IMG_BASE}/SaveClip.App_573844237_18384586711198789_8372641869216465007_n.jpg`}
                  alt="Ambiente y percheros de indumentaria en San Martín 1718"
                  fill
                  sizes="350px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Boutique Details Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2 text-[#736E65]">
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase">
                {STORE_CONFIG.address.toUpperCase()} • {STORE_CONFIG.neighborhood.toUpperCase()}
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#16203B] font-normal leading-tight">
              Un espacio dedicado a la sastrería y el buen vestir
            </h2>

            <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
              Te esperamos en nuestra boutique de {STORE_CONFIG.address} ({STORE_CONFIG.city}) para brindarte una atención cercana y profesional. Podés probarte cada prenda en un entorno distinguido y acceder a nuestro servicio de asesoramiento y sastrería a medida.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-[#16203B] bg-white p-4 rounded-xs border border-[#E8E4DC]">
              <p>
                <strong>Horarios de atención:</strong> {STORE_CONFIG.schedule}
              </p>
              <p>
                <strong>Financiación:</strong> {STORE_CONFIG.installmentsLabel} • {STORE_CONFIG.discountCashTransferLabel}.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={STORE_CONFIG.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#16203B] text-[#FAF9F6] hover:bg-[#C5A880] hover:text-[#0C1014] text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-md rounded-xs"
              >
                <span>Consultar por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
