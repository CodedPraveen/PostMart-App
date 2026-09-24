import { create } from 'zustand';
import type { CartItem } from '@/types/cart';
import type { Product } from '@/types/product';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product, size) =>
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { items: [...state.items, { product, size, quantity: 1 }] };
    }),
  removeItem: (productId, size) =>
    set((state) => ({
      items: state.items.filter((item) => !(item.product.id === productId && item.size === size)),
    })),
  setQuantity: (productId, size, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((item) => !(item.product.id === productId && item.size === size))
          : state.items.map((item) =>
              item.product.id === productId && item.size === size ? { ...item, quantity } : item,
            ),
    })),
  clearCart: () => set({ items: [] }),
}));
