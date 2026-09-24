import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import type { CartItem } from '@/types/cart';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import { ProductPrice } from '@/components/product/product-price/ProductPrice';

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  return (
    <View className="flex-row border-b border-border py-5">
      <ProductImage uri={item.product.image} alt={item.product.imageAlt} className="h-32 w-28 rounded" />
      <View className="ml-4 flex-1">
        <Text className="text-[11px] font-semibold uppercase tracking-wider text-muted">{item.product.brand}</Text>
        <Text className="mt-1 text-base font-semibold leading-5 text-secondary">{item.product.name}</Text>
        <Text className="mt-1 text-sm text-muted">Size {item.size}</Text>
        <View className="mt-3"><ProductPrice price={item.product.price * item.quantity} /></View>
        <View className="mt-3 flex-row items-center justify-between">
          <View className="h-10 flex-row items-center rounded-sm border border-border bg-white">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Decrease quantity"
              className="h-full w-10 items-center justify-center"
              onPress={() => onQuantityChange(item.quantity - 1)}
            >
              <Feather name="minus" size={16} color={colors.secondary} />
            </Pressable>
            <Text accessibilityLabel={`Quantity ${item.quantity}`} className="w-8 text-center text-sm font-semibold text-secondary">
              {item.quantity}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Increase quantity"
              className="h-full w-10 items-center justify-center"
              onPress={() => onQuantityChange(item.quantity + 1)}
            >
              <Feather name="plus" size={16} color={colors.secondary} />
            </Pressable>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${item.product.name}`} hitSlop={10} onPress={onRemove}>
            <Text className="text-sm font-medium text-error">Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
