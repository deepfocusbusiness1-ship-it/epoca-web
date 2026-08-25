'use client';

import React, { useState } from 'react';
import { Product, ProductColor } from '@/types/epoca';
import { ProductCard } from './product-card';
import { SlidersHorizontal } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  onQuickView: (product: Product) => void;
}

export function ProductGrid({
  products,
  onAddToCart,
  onQuickView,
}: ProductGridProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<string>('destacados');

  const filterTabs = [
    { id: 'todos', label: 'Todos los Artículos' },
    { id: 'hombre', label: 'Sastrería & Hombre' },
    { id: 'mujer', label: 'Colección Mujer' },
    { id: 'perramus', label: 'Línea Perramus' },
    { id: 'accesorios', label: 'Calzado & Accesorios' },
  ];

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'todos') return true;
    return p.category === selectedFilter;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'precio-menor') return a.price - b.price;
    if (sortBy === 'precio-mayor') return b.price - a.price;
    if (sortBy === 'novedades') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0; // Default destacados
  });

  return (
    <section id="catalogo" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E4DC] pb-6 mb-10">
        <div>
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#736E65] font-semibold">
            CATÁLOGO ÉPOCA
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#141414] mt-1.5 font-normal">
            Prendas Seleccionadas
          </h2>
        </div>

        {/* Sorting Dropdown */}
        <div className="mt-4 md:mt-0 flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 text-[#736E65]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="tracking-wider uppercase">Ordenar:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border border-[#E8E4DC] px-3 py-1.5 rounded-xs text-[#141414] text-xs focus:outline-none focus:border-[#141414]"
          >
            <option value="destacados">Destacados & Recomendados</option>
            <option value="precio-menor">Menor Precio</option>
            <option value="precio-mayor">Mayor Precio</option>
            <option value="novedades">Novedades</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium whitespace-nowrap transition-all duration-200 rounded-xs border ${
              selectedFilter === tab.id
                ? 'bg-[#141414] text-[#FAF9F6] border-[#141414] shadow-xs'
                : 'bg-white text-[#736E65] border-[#E8E4DC] hover:border-[#141414] hover:text-[#141414]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {/* Results Count */}
      <div className="mt-12 text-center text-xs text-[#736E65] tracking-widest uppercase">
        Mostrando {sortedProducts.length} de {products.length} artículos exclusivos
      </div>
    </section>
  );
}
