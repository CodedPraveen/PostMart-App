export const routes = {
  home: '/(tabs)',
  search: '/(tabs)/search',
  wishlist: '/(tabs)/wishlist',
  cart: '/(tabs)/cart',
  profile: '/(tabs)/profile',
  product: (id: string) => `/product/${id}` as const,
  category: (slug: string) => `/category/${slug}` as const,
} as const;
