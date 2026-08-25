export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'hombre' | 'mujer' | 'perramus' | 'accesorios' | 'sastreria';
  categoryLabel: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  installments: {
    count: number;
    amount: number;
  };
  discountBadge?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  details: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface NavCategory {
  title: string;
  href: string;
  featured?: boolean;
  subcategories?: {
    title: string;
    href: string;
  }[];
  bannerImage?: string;
  bannerTitle?: string;
}
