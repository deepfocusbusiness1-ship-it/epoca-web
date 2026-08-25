'use client';

import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
  };

  return (
    <section className="bg-[#0C1014] text-[#FAF9F6] py-16 sm:py-24 border-t border-[#1E2638] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <span className="text-[11px] tracking-[0.35em] uppercase text-[#C5A880] font-semibold block">
          CLUB ÉPOCA PRIVÉ
        </span>

        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight max-w-2xl mx-auto text-white">
          Accedé primero a las nuevas colecciones y beneficios exclusivos
        </h2>

        <p className="text-xs sm:text-sm text-[#D8D2C6]/80 font-light max-w-md mx-auto leading-relaxed">
          Suscribite a nuestro boletín para recibir invitaciones privadas a preventas, lanzamientos de temporada y promociones especiales.
        </p>

        {isSubmitted ? (
          <div className="p-4 bg-white/10 border border-[#C5A880]/50 rounded-xs inline-flex items-center space-x-2.5 text-xs text-[#FAF9F6] animate-fade-in">
            <Check className="w-4 h-4 text-[#C5A880]" />
            <span>¡Gracias por suscribirte! Te hemos enviado un beneficio de bienvenida.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto pt-2"
          >
            <div className="relative w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#736E65]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresá tu correo electrónico..."
                className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder-[#888] text-xs focus:outline-none focus:border-[#C5A880] rounded-xs transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF9F6] text-[#16203B] hover:bg-[#C5A880] hover:text-[#0C1014] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap shadow-md"
            >
              Suscribirme
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#A69E90] font-light">
          Respetamos tu privacidad. Podés desuscribirte en cualquier momento con un solo clic.
        </p>
      </div>
    </section>
  );
}
