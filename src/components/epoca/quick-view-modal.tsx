'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, ProductColor } from '@/types/epoca';
import { X, ShoppingBag, ShieldCheck, Truck, CreditCard, Check } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, size: string, quantity: number) => void;
}

export function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product?.colors[0] || { name: 'Default', hex: '#141414', image: product?.images[0] || '' }
  );
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'U');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  if (!product) return null;

  const currentImage = product.images[activeImageIndex] || selectedColor.image || product.images[0];

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-[#FAF9F6] w-full max-w-4xl rounded-xs shadow-2xl overflow-hidden z-10 border border-[#E8E4DC] max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#16203B] shadow-xs transition-colors"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Left: Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-white border-b md:border-b-0 md:border-r border-[#E8E4DC]">
          <div className="aspect-[3/4] relative w-full overflow-hidden bg-[#FAF9F6] rounded-xs">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[center_20%]"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center space-x-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-16 relative overflow-hidden rounded-xs border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#16203B] opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="Miniatura" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#736E65] uppercase font-semibold">
              {product.categoryLabel}
            </span>

            <h2 className="font-editorial text-2xl sm:text-3xl text-[#16203B] font-normal leading-snug mt-1">
              {product.name}
            </h2>

            {/* Pricing */}
            <div className="mt-3 flex items-baseline space-x-3">
              <span className="text-xl sm:text-2xl font-bold text-[#16203B]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#A69E90] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Installments Card */}
            <div className="mt-2.5 p-3 bg-[#F5F3EF] border border-[#E8E4DC] rounded-xs flex items-center space-x-3 text-xs text-[#16203B]">
              <CreditCard className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>
                <strong>{product.installments.count} cuotas sin interés</strong> de{' '}
                {formatPrice(product.installments.amount)} con todas las tarjetas.
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-[#555] font-light leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div className="mt-5">
                <label className="text-[11px] font-semibold text-[#16203B] uppercase tracking-wider block mb-2">
                  Color: <span className="font-normal text-[#555]">{selectedColor.name}</span>
                </label>
                <div className="flex items-center space-x-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        selectedColor.name === c.name
                          ? 'ring-2 ring-offset-2 ring-[#16203B] scale-105'
                          : 'border-[#CCC] hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold text-[#16203B] uppercase tracking-wider">
                  Talle / Medida:
                </label>
                <span className="text-[10px] text-[#736E65] underline cursor-pointer">
                  Guía de talles
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-xs uppercase font-medium rounded-xs border transition-colors ${
                      selectedSize === sz
                        ? 'bg-[#16203B] text-white border-[#16203B]'
                        : 'bg-white text-[#555] border-[#E8E4DC] hover:border-[#16203B]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-5 flex items-center space-x-3">
              <span className="text-[11px] font-semibold text-[#16203B] uppercase tracking-wider">
                Cantidad:
              </span>
              <div className="flex items-center border border-[#E8E4DC] bg-white rounded-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm hover:bg-[#F3EFEA] transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-sm hover:bg-[#F3EFEA] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Button & Guarantees */}
          <div className="mt-8 pt-4 border-t border-[#E8E4DC] space-y-3">
            <button
              onClick={handleAdd}
              disabled={isAdded}
              className={`w-full py-4 text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center space-x-2 transition-all duration-300 shadow-md ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#16203B] text-[#FAF9F6] hover:bg-[#C5A880] hover:text-[#0C1014]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Agregado a la Bolsa!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar al Carrito</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-[#736E65] pt-2">
              <div className="flex items-center space-x-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Envíos a todo el país</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Compra protegida SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
