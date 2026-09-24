import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { routes } from '@/constants/routes';
import type { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge/Badge';
import { IconButton } from '@/components/ui/icon-button/IconButton';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import { ProductPrice } from '@/components/product/product-price/ProductPrice';
import { useWishlistStore } from '@/store/wishlist/useWishlistStore';

interface ProductCardProps {
  product: Product;
  width?: number;
}

export const ProductCard = memo(function ProductCard({ product, width }: ProductCardProps) {
  const isWishlisted = useWishlistStore((state) => state.productIds.includes(product.id));
  const toggle = useWishlistStore((state) => state.toggle);

  const openProduct = () => router.push(routes.product(product.id));

  return (
    <View className="relative overflow-hidden" style={width ? { width } : undefined}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View ${product.name}, ${product.price} rupees`}
        className="aspect-[4/5] overflow-hidden rounded bg-[#F0F0ED]"
        onPress={openProduct}
      >
        <ProductImage uri={product.image} alt={product.imageAlt} className="h-full w-full" />
        {product.badge ? (
          <View className="absolute left-2 top-2">
            <Badge label={product.badge} />
          </View>
        ) : null}
      </Pressable>
      <IconButton
        icon={<Feather name="heart" size={19} color={isWishlisted ? colors.primary : colors.secondary} />}
        selected={isWishlisted}
        accessibilityLabel={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        className="absolute right-2 top-2"
        size="sm"
        onPress={() => toggle(product.id)}
      />
      <Pressable accessibilityRole="button" accessibilityLabel={`View details for ${product.name}`} onPress={openProduct}>
        <Text numberOfLines={1} className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          {product.brand}
        </Text>
        <Text numberOfLines={2} className="mt-1 min-h-11 text-[15px] font-semibold leading-5 text-secondary">
          {product.name}
        </Text>
        <ProductPrice price={product.price} oldPrice={product.oldPrice} />
      </Pressable>
    </View>
  );
});
