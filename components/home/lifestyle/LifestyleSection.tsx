import { Dimensions, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { mockLifestyles } from '@/services/mock';
import { routes } from '@/constants/routes';
import { ProductImage } from '@/components/product/product-image/ProductImage';

const CARD_WIDTH = Math.min(Dimensions.get('window').width - 40, 440);

export function LifestyleSection() {
  return (
    <View className="gap-4 px-5">
      {mockLifestyles.map((item) => (
        <Pressable
          key={item.id}
          accessibilityRole="button"
          accessibilityLabel={`Shop ${item.name}`}
          className="overflow-hidden rounded-lg bg-secondary"
          onPress={() => router.push(routes.category(item.categorySlug))}
          style={{ width: CARD_WIDTH }}
        >
          <ProductImage uri={item.image} alt={item.name} className="h-52 w-full opacity-90" />
          <View className="p-5">
            <Text className="text-xl font-semibold text-white">{item.name}</Text>
            <Text className="mt-1 text-sm leading-5 text-white/70">{item.description}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
