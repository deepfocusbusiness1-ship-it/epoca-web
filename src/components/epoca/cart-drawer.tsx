'use client';

import React from 'react';
import Image from 'next/image';
import { CartItem } from '@/types/epoca';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 120000;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50">
        <div className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col border-l border-[#E8E4DC] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#E8E4DC] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#16203B]" />
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#16203B]">
                Bolsa de Compras ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar bolsa"
              className="p-1.5 text-[#736E65] hover:text-[#16203B] transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="p-4 bg-[#F5F3EF] border-b border-[#E8E4DC] text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#16203B]">
              <div className="flex items-center space-x-1.5 font-medium">
                <Truck className="w-4 h-4 text-[#C5A880]" />
                {missingForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-semibold">
                    ¡Tenés envío gratis a todo el país!
                  </span>
                ) : (
                  <span>
                    Te faltan <strong>{formatPrice(missingForFreeShipping)}</strong> para envío gratis
                  </span>
                )}
              </div>
              <span className="font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#E8E4DC] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C5A880] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#736E65]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <div>
                  <p className="font-editorial text-2xl text-[#16203B]">
                    Tu bolsa está vacía
                  </p>
                  <p className="text-xs text-[#736E65] mt-1">
                    Descubrí nuestras colecciones de sastrería, abrigos y camisería.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#16203B] text-[#FAF9F6] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#C5A880] hover:text-[#0C1014] transition-colors"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                  className="flex space-x-4 p-3 bg-white border border-[#E8E4DC] rounded-xs relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 relative overflow-hidden bg-[#FAF9F6] shrink-0 rounded-xs">
                    <Image
                      src={item.selectedColor.image || item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-editorial text-base text-[#16203B] font-normal leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          aria-label="Eliminar producto"
                          className="text-[#A69E90] hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#736E65] mt-1 space-x-2">
                        <span>Color: <strong>{item.selectedColor.name}</strong></span>
                        <span>•</span>
                        <span>Talle: <strong>{item.selectedSize}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#E8E4DC] rounded-xs bg-[#FAF9F6]">
                        <button
                          onClick={() => onUpdateQuantity(idx, -1)}
                          className="px-2.5 py-0.5 text-xs hover:bg-[#EFECE6] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, 1)}
                          className="px-2.5 py-0.5 text-xs hover:bg-[#EFECE6] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-semibold text-[#16203B]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8E4DC] bg-white space-y-4">
              {/* Subtotal */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#736E65]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#16203B]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#736E65]">
                  <span>Envíos</span>
                  <span>
                    {missingForFreeShipping === 0 ? (
                      <span className="text-emerald-700 font-semibold">Gratis</span>
                    ) : (
                      'Calculado en el checkout'
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-[#16203B] pt-2 border-t border-[#EFECE6]">
                  <span>Total Estimado</span>
                  <span className="text-lg font-editorial">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-[10px] text-[#736E65]">
                  O hasta 6 cuotas sin interés de {formatPrice(subtotal / 6)}
                </p>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => alert('Redirigiendo a pasarela segura de pago de Época...')}
                  className="w-full py-4 bg-[#16203B] text-[#FAF9F6] hover:bg-[#C5A880] hover:text-[#0C1014] text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center space-x-2 transition-all duration-300 shadow-md"
                >
                  <span>Iniciar Compra Segura</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-center text-xs tracking-wider uppercase text-[#736E65] hover:text-[#16203B] font-medium transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#A69E90] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Transacciones encriptadas y protegidas</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
