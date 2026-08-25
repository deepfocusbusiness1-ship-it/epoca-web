'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types/epoca';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          (p.brand && p.brand.toLowerCase().includes(query.toLowerCase())) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Modal Container */}
      <div className="relative min-h-screen sm:min-h-0 sm:mt-16 max-w-3xl mx-auto px-4 z-10">
        <div className="bg-[#FAF9F6] border border-[#E8E4DC] shadow-2xl rounded-xs overflow-hidden flex flex-col max-h-[85vh]">
          {/* Search Header */}
          <div className="p-4 sm:p-6 border-b border-[#E8E4DC] flex items-center space-x-3 bg-white">
            <Search className="w-5 h-5 text-[#736E65]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por ambo, blazer, trench, lino, calzado..."
              className="flex-1 text-sm sm:text-base bg-transparent border-none focus:outline-none text-[#16203B] placeholder-[#888]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#736E65] hover:text-[#16203B] px-2 py-1"
              >
                Limpiar
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-[#736E65] hover:text-[#16203B] transition-colors"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {query.trim() === '' ? (
              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.25em] font-semibold text-[#736E65] uppercase">
                  Búsquedas Frecuentes
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Ambos Formales', 'Trench Perramus', 'Sacos de Lino', 'Camisas Broderie', 'Botas Chelsea', 'Chalecos'].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 bg-white border border-[#E8E4DC] text-xs text-[#555] hover:border-[#16203B] hover:text-[#16203B] rounded-xs transition-colors"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="py-12 text-center text-[#736E65] space-y-2">
                <p className="font-editorial text-2xl text-[#16203B]">
                  No se encontraron resultados para &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs font-light">
                  Probá buscando términos más generales como <em>sastrería</em>, <em>camisas</em> o <em>abrigos</em>.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[10px] tracking-[0.2em] font-semibold text-[#736E65] uppercase">
                  Resultados ({results.length})
                </p>
                <div className="divide-y divide-[#EFECE6]">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectProduct(item);
                        onClose();
                      }}
                      className="py-3 flex items-center space-x-4 cursor-pointer hover:bg-white p-2 rounded-xs transition-colors group"
                    >
                      <div className="w-14 h-16 relative bg-[#FAF9F6] rounded-xs overflow-hidden shrink-0 border border-[#E8E4DC]">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] text-[#736E65] uppercase tracking-wider">
                          {item.categoryLabel}
                        </span>
                        <h4 className="font-editorial text-base text-[#16203B] group-hover:text-[#C5A880] transition-colors leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#16203B]">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#A69E90] group-hover:text-[#16203B] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
