import { Image, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { routes } from '@/constants/routes';
import { useCartStore } from '@/store/cart/useCartStore';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
}

export function AppHeader({ title, showBack = false }: AppHeaderProps) {
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <View className="h-16 flex-row items-center justify-between px-5">
      <View className="flex-1 flex-row items-center">
        {showBack ? (
          <Pressable accessibilityLabel="Go back" hitSlop={12} onPress={() => router.back()} className="mr-3">
            <Feather name="arrow-left" size={24} color={colors.secondary} />
          </Pressable>
        ) : (
          <Image
            source={require('@/assets/images/logo-postmart.webp')}
            resizeMode="contain"
            accessibilityLabel="PostMart"
            style={{ width: 122, height: 36 }}
          />
        )}
        {title ? <Text className="text-lg font-semibold text-secondary">{title}</Text> : null}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Cart with ${cartCount} items`}
        hitSlop={10}
        onPress={() => router.push(routes.cart)}
        className="relative h-11 w-11 items-center justify-center"
      >
        <Feather name="shopping-bag" size={22} color={colors.secondary} />
        {cartCount > 0 ? (
          <View className="absolute right-0 top-0 min-w-5 items-center rounded-full bg-primary px-1 py-0.5">
            <Text className="text-[10px] font-bold text-white">{Math.min(cartCount, 99)}</Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}
