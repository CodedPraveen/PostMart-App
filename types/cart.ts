import type { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
