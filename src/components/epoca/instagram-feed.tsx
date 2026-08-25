'use client';

import React from 'react';
import Image from 'next/image';
import { InstagramIcon } from '@/components/icons';
import { STORE_CONFIG } from '@/data/epoca-data';

const IMG_BASE = '/images/epoca/tienda-epoca';

export function InstagramFeed() {
  const instagramPosts = [
    {
      id: 'ig-1',
      image: `${IMG_BASE}/SaveClip.App_564149273_18381451120198789_3858940154214935583_n.jpg`,
      caption: 'Línea Perramus impermeable en Época',
    },
    {
      id: 'ig-2',
      image: `${IMG_BASE}/SaveClip.App_465147861_18337032643198789_9015899122532991315_n.jpg`,
      caption: 'Calzado formal de cuero artesanal',
    },
    {
      id: 'ig-3',
      image: `${IMG_BASE}/SaveClip.App_620718878_18394850947198789_2954994124997297077_n.jpg`,
      caption: 'Sastrería masculina en San Martín 1718',
    },
    {
      id: 'ig-4',
      image: `${IMG_BASE}/SaveClip.App_645843807_18401436832198789_2402270528448426280_n.jpg`,
      caption: 'Bordados artesanales en broderie puro algodón',
    },
    {
      id: 'ig-5',
      image: `${IMG_BASE}/SaveClip.App_631711685_18398647006198789_4908091859017524814_n.jpg`,
      caption: 'Trenchs y abrigos de temporada en Bulevar',
    },
    {
      id: 'ig-6',
      image: `${IMG_BASE}/SaveClip.App_645853118_18401434900198789_5570121412737538391_n.jpg`,
      caption: 'Cinturones trenzados y accesorios de autor',
    },
  ];

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
        <a
          href={STORE_CONFIG.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#736E65] hover:text-[#16203B] transition-colors"
        >
          <InstagramIcon className="w-4 h-4 text-[#C5A880]" />
          <span>{STORE_CONFIG.instagram.handle}</span>
        </a>
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#16203B] mt-2 font-normal">
          Seguinos en Instagram
        </h2>
        <div className="w-12 h-[1.5px] bg-[#C5A880] mx-auto mt-4" />
      </div>

      {/* Grid (2 cols mobile, 3 cols tablet, 6 cols desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href={STORE_CONFIG.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-[#FAF9F6] border border-[#E8E4DC] block rounded-xs shadow-2xs hover:shadow-md transition-shadow"
          >
            <Image
              src={post.image}
              alt={post.caption}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
              <InstagramIcon className="w-6 h-6 text-white mb-2" />
              <p className="text-[10px] text-white/90 font-light line-clamp-2 leading-tight">
                {post.caption}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
