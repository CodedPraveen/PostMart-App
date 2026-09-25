import { FlatList, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { routes } from '@/constants/routes';
import { ProductImage } from '@/components/product/product-image/ProductImage';

interface CategoryStripProps {
  categories: { slug: string; name: string; image: string | null }[];
}

export function CategoryStrip({ categories }: CategoryStripProps) {
  return (
    <FlatList
      horizontal
      data={categories}
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
          {item.image ? <ProductImage uri={item.image} alt={item.name} className="h-36 w-full" /> : <View className="h-36 w-full bg-background" />}
          <View className="p-3">
            <Text className="text-[11px] font-semibold uppercase tracking-wider text-primary">Shop category</Text>
            <Text className="mt-1 text-base font-semibold text-secondary">{item.name}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}
