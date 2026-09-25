import { HorizontalProductRail } from '@/components/home/featured-products/HorizontalProductRail';
import type { Product } from '@/types/product';

export function TrendingProducts({ products }: { products: Product[] }) {
  return <HorizontalProductRail products={products} />;
}
