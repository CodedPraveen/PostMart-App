import { HorizontalProductRail } from '@/components/home/featured-products/HorizontalProductRail';
import type { Product } from '@/types/product';

interface TrendingProductsProps {
  products: Product[];
  loading?: boolean;
}

export function TrendingProducts({ products, loading = false }: TrendingProductsProps) {
  return (
    <HorizontalProductRail
      products={products}
      loading={loading}
      emptyTitle="No trending footwear yet"
      emptyDescription="Popular pairs will appear here as shoppers discover them."
    />
  );
}
