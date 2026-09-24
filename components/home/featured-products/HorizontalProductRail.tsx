import { Dimensions, FlatList } from 'react-native';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product/product-card/ProductCard';

interface HorizontalProductRailProps {
  products: Product[];
}

const ITEM_WIDTH = Math.min(Dimensions.get('window').width * 0.62, 260);

export function HorizontalProductRail({ products }: HorizontalProductRailProps) {
  return (
    <FlatList
      horizontal
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} width={ITEM_WIDTH} />}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-4 px-5"
      initialNumToRender={3}
      windowSize={4}
    />
  );
}
