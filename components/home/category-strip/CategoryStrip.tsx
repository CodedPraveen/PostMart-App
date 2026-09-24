import { FlatList, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { mockCategories } from '@/services/mock';
import { routes } from '@/constants/routes';
import { ProductImage } from '@/components/product/product-image/ProductImage';

export function CategoryStrip() {
  return (
    <FlatList
      horizontal
      data={mockCategories}
      keyExtractor={(item) => item.slug}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3 px-5"
      renderItem={({ item }) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Shop ${item.name}`}
          className="w-36 overflow-hidden rounded bg-white"
          onPress={() => router.push(routes.category(item.slug))}
        >
          <ProductImage uri={item.image} alt={item.name} className="h-36 w-full" />
          <View className="p-3">
            <Text className="text-[11px] font-semibold uppercase tracking-wider text-primary">{item.eyebrow}</Text>
            <Text className="mt-1 text-base font-semibold text-secondary">{item.name}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}
