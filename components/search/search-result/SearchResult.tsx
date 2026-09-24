import { View } from 'react-native';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product/product-card/ProductCard';

interface SearchResultProps {
  products: Product[];
  cardWidth: number;
}

export function SearchResult({ products, cardWidth }: SearchResultProps) {
  return (
    <View className="flex-row flex-wrap gap-x-3 gap-y-7">
      {products.map((product) => <ProductCard key={product.id} product={product} width={cardWidth} />)}
    </View>
  );
}
