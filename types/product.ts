export type ProductBadge = 'New' | 'Trending' | 'Bestseller' | 'Limited';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  image: string;
  imageAlt: string;
  description: string;
  sizes: string[];
  rating: number;
  reviewCount: number;
  badge?: ProductBadge;
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  stock: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Category {
  slug: string;
  name: string;
  eyebrow: string;
  image: string;
}

export interface Lifestyle {
  id: string;
  name: string;
  description: string;
  image: string;
  categorySlug: string;
}
