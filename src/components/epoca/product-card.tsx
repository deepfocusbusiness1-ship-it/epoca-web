'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, ProductColor } from '@/types/epoca';
import { Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  onQuickView: (product: Product) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onQuickView,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Default', hex: '#141414', image: product.images[0] }
  );
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'U');
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Compute displayed image based on color swatch or hover
  const primaryImg = selectedColor.image || product.images[0];
  const secondaryImg = product.images[1] || primaryImg;
  const currentImage = isHovered ? secondaryImg : primaryImg;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  // Format currency
  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div
      className="group flex flex-col bg-white border border-[#E8E4DC] hover:border-[#C5A880]/70 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.discountBadge && (
          <span className="bg-[#16203B] text-[#FAF9F6] text-[9px] font-bold tracking-wider px-2 py-0.5 uppercase">
            {product.discountBadge}
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#C5A880] text-[#0C1014] text-[9px] font-bold tracking-wider px-2 py-0.5 uppercase">
            NUEVO
          </span>
        )}
      </div>

      {/* Image Gallery Container */}
      <div
        onClick={() => onQuickView(product)}
        className="aspect-[3/4] relative w-full overflow-hidden bg-[#F7F5F0] cursor-pointer"
      >
        <Image
          src={currentImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0C1014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 hover:bg-white text-[#16203B] text-[10px] font-semibold tracking-[0.18em] uppercase flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Rápida</span>
          </button>
        </div>
      </div>

      {/* Content & Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-[#736E65] uppercase mb-1">
            <span>{product.categoryLabel}</span>
            {product.brand && <span className="font-medium text-[#16203B]">{product.brand}</span>}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-editorial text-lg sm:text-xl font-normal text-[#16203B] hover:text-[#C5A880] transition-colors leading-snug cursor-pointer line-clamp-2 min-h-[48px]"
          >
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="mt-2.5 flex items-baseline space-x-2">
            <span className="text-sm sm:text-base font-semibold text-[#16203B]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#A69E90] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Installment Info */}
          <div className="mt-1 text-[11px] text-[#555] font-light">
            <span>
              {product.installments.count} cuotas sin interés de{' '}
              <strong className="font-semibold text-[#16203B]">
                {formatPrice(product.installments.amount)}
              </strong>
            </span>
          </div>
        </div>

        {/* Color and Size Selector Controls */}
        <div className="mt-4 pt-3 border-t border-[#EFECE6] space-y-3">
          {/* Colors */}
          {product.colors.length > 1 && (
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase text-[#736E65] tracking-wider">
                Color:
              </span>
              <div className="flex items-center space-x-1.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-offset-1 ring-[#16203B] scale-110'
                        : 'border-[#CCC] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 overflow-x-auto py-0.5">
              {product.sizes.slice(0, 5).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[10px] px-1.5 py-0.5 rounded-xs border uppercase font-medium transition-colors ${
                    selectedSize === size
                      ? 'bg-[#16203B] text-white border-[#16203B]'
                      : 'bg-[#FAF9F6] text-[#555] border-[#E8E4DC] hover:border-[#16203B]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Quick Add Button */}
            <button
              onClick={handleAdd}
              aria-label="Agregar al carrito"
              className={`p-2 rounded-xs transition-colors flex items-center justify-center shrink-0 ml-2 ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#16203B] text-[#FAF9F6] hover:bg-[#C5A880] hover:text-[#0C1014]'
              }`}
            >
              {isAdded ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4 stroke-[1.7]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
