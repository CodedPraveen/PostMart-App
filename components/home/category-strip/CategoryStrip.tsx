import { FlatList, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { routes } from '@/constants/routes';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';

interface CategoryStripProps {
  categories: { slug: string; name: string; image: string | null; parentId: string | null }[];
  loading?: boolean;
}

export function CategoryStrip({ categories, loading = false }: CategoryStripProps) {
  if (loading) {
    return (
      <View className="flex-row gap-3 px-5">
        {[0, 1, 2].map((item) => (
          <View key={item} className="w-40 overflow-hidden rounded-lg border border-border bg-white">
            <Skeleton className="h-36 w-full" />
            <View className="gap-2 p-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-28" />
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (!categories.length) {
    return (
      <View className="mx-5 items-center rounded-lg border border-border bg-white px-5 py-6">
        <Feather name="grid" size={22} color={colors.muted} />
        <Text className="mt-2 text-center text-sm font-medium text-secondary">Categories are coming soon.</Text>
        <Text className="mt-1 text-center text-xs leading-4 text-muted">Browse the latest footwear below.</Text>
      </View>
    );
  }

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
          className="w-40 overflow-hidden rounded-lg border border-border bg-white"
          onPress={() => router.push(routes.category(item.slug))}
        >
          {item.image ? (
            <ProductImage uri={item.image} alt={`${item.name} category`} className="h-36 w-full" />
          ) : (
            <View className="h-36 w-full items-center justify-center bg-background">
              <Feather name="image" size={24} color={colors.muted} />
              <Text className="mt-2 text-center text-[10px] text-muted">Image unavailable</Text>
            </View>
          )}
          <View className="p-3">
            <Text className="text-[10px] font-semibold uppercase tracking-wider text-accent">Shop category</Text>
            <Text numberOfLines={2} className="mt-1 min-h-10 text-base font-semibold leading-5 text-secondary">{item.name}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}
