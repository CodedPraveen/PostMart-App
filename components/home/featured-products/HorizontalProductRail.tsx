import { Dimensions, FlatList, Text, View } from 'react-native';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product/product-card/ProductCard';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';

interface HorizontalProductRailProps {
  products: Product[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

const ITEM_WIDTH = Math.min(Dimensions.get('window').width * 0.62, 260);

export function HorizontalProductRail({
  products,
  loading = false,
  emptyTitle = 'No products available',
  emptyDescription = 'Check back soon for new footwear.',
}: HorizontalProductRailProps) {
  if (loading) {
    return (
      <View className="flex-row gap-4 px-5">
        {[0, 1, 2].map((item) => (
          <View key={item} className="w-[62%] max-w-[260px]">
            <Skeleton className="aspect-[4/5] w-full rounded" />
            <Skeleton className="mt-3 h-3 w-16" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-20" />
          </View>
        ))}
      </View>
    );
  }

  if (!products.length) {
    return (
      <View className="mx-5 rounded-lg border border-border bg-white px-5 py-6">
        <Text className="text-base font-semibold text-secondary">{emptyTitle}</Text>
        <Text className="mt-1 text-sm leading-5 text-muted">{emptyDescription}</Text>
      </View>
    );
  }

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
