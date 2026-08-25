'use client';

import React, { useState } from 'react';
import { PRODUCTS_CATALOG } from '@/data/epoca-data';
import { Product, ProductColor, CartItem } from '@/types/epoca';
import { AnnouncementBar } from '@/components/epoca/announcement-bar';
import { Header } from '@/components/epoca/header';
import { MobileMenuDrawer } from '@/components/epoca/mobile-menu-drawer';
import { HeroCarousel } from '@/components/epoca/hero-carousel';
import { FeaturedCategories } from '@/components/epoca/featured-categories';
import { ProductGrid } from '@/components/epoca/product-grid';
import { EditorialShowcase } from '@/components/epoca/editorial-showcase';
import { CommercialBenefits } from '@/components/epoca/commercial-benefits';
import { InstagramFeed } from '@/components/epoca/instagram-feed';
import { NewsletterSection } from '@/components/epoca/newsletter-section';
import { Footer } from '@/components/epoca/footer';
import { CartDrawer } from '@/components/epoca/cart-drawer';
import { QuickViewModal } from '@/components/epoca/quick-view-modal';
import { SearchModal } from '@/components/epoca/search-modal';

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor: color,
            selectedSize: size,
            quantity,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#16203B] selection:bg-[#C5A880] selection:text-[#0C1014]">
      {/* 1. Commercial Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Luxury Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 3. Mobile Navigation Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 4. Full-bleed Campaign Hero Banner */}
        <HeroCarousel />

        {/* 5. Featured Categories & Collections */}
        <FeaturedCategories />

        {/* 6. Curated Product Catalog Grid */}
        <ProductGrid
          products={PRODUCTS_CATALOG}
          onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 7. High-impact Editorial Storytelling & Boutique Flagship */}
        <EditorialShowcase />

        {/* 8. Commercial Guarantees & Benefits */}
        <CommercialBenefits />

        {/* 9. Curated Instagram Moments */}
        <InstagramFeed />

        {/* 10. Luxury Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* 11. Complete Brand Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, c, s, q) => handleAddToCart(p, c, s, q)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS_CATALOG}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />
    </div>
  );
}
