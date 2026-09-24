import { mockProducts } from '@/services/mock';
import { HorizontalProductRail } from '@/components/home/featured-products/HorizontalProductRail';

export function TrendingProducts() {
  return <HorizontalProductRail products={mockProducts.filter((product) => product.trending)} />;
}
