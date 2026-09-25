import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { routes } from '@/constants/routes';
import { useProduct } from '@/services/api/products/useCatalog';
import { useCartStore } from '@/store/cart/useCartStore';
import { useWishlistStore } from '@/store/wishlist/useWishlistStore';
import { useUIStore } from '@/store/ui/useUIStore';
import { AppHeader } from '@/components/layout/app-header/AppHeader';
import { ScreenContainer } from '@/components/layout/screen-container/ScreenContainer';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import { ProductPrice } from '@/components/product/product-price/ProductPrice';
import { ProductRating } from '@/components/product/product-rating/ProductRating';
import { Badge } from '@/components/ui/badge/Badge';
import { Button } from '@/components/ui/button/Button';
import { Chip } from '@/components/ui/chip/Chip';
import { EmptyState } from '@/components/feedback/empty-state/EmptyState';
import { ErrorState } from '@/components/feedback/error-state/ErrorState';
import { ProductGridSkeleton } from '@/components/feedback/loading/ProductGridSkeleton';

interface ProductDetailsScreenProps {
  id: string;
}

export function ProductDetailsScreen({ id }: ProductDetailsScreenProps) {
  const productQuery = useProduct(id);
  const product = productQuery.data?.product;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const isWishlisted = useWishlistStore((state) => state.productIds.includes(id));
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const showNotice = useUIStore((state) => state.showNotice);

  if (productQuery.isPending) {
    return <ScreenContainer><AppHeader title="Product details" showBack /><ProductGridSkeleton /></ScreenContainer>;
  }

  if (productQuery.isError) {
    return <ScreenContainer><AppHeader title="Product details" showBack /><ErrorState onRetry={() => productQuery.refetch()} /></ScreenContainer>;
  }

  if (!product) {
    return (
      <ScreenContainer>
        <AppHeader title="Product" showBack />
        <EmptyState
          title="Product not found"
          description="This pair may no longer be available."
          actionLabel="Browse products"
          onAction={() => router.replace(routes.category('all'))}
        />
      </ScreenContainer>
    );
  }

  const addToCart = () => {
    if (product.stock === 'out-of-stock') {
      showNotice('This item is currently unavailable.');
      return;
    }
    if (!selectedSize) {
      showNotice('Choose a size before adding to cart.');
      return;
    }
    addItem(product, selectedSize);
    showNotice(`${product.name} was added to your cart.`);
  };

  return (
    <ScreenContainer>
      <AppHeader title="Product details" showBack />
      <View className="relative">
        <ProductImage uri={product.image} alt={product.imageAlt} className="aspect-square w-full" />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          accessibilityState={{ selected: isWishlisted }}
          onPress={() => toggleWishlist(product.id)}
          className="absolute right-5 top-5 h-12 w-12 items-center justify-center rounded-full bg-white"
        >
          <Feather name="heart" size={22} color={isWishlisted ? colors.primary : colors.secondary} />
        </Pressable>
      </View>

      <View className="px-5 py-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-muted">{product.brand} · {product.category}</Text>
          {product.badge ? <Badge label={product.badge} /> : null}
        </View>
        <Text className="mt-3 text-[28px] font-bold leading-9 text-secondary">{product.name}</Text>
        <View className="mt-3 flex-row items-center justify-between">
          <ProductPrice price={product.price} oldPrice={product.oldPrice} size="lg" />
          {product.rating !== undefined && product.reviewCount !== undefined ? (
            <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
          ) : null}
        </View>

        <View className="mt-8 border-t border-border pt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-secondary">Select size</Text>
            <Text className="text-xs font-medium text-muted">UK sizing</Text>
          </View>
          <View className="mt-4 flex-row flex-wrap gap-3">
            {product.sizes.map((size) => (
              <Chip key={size} label={size} selected={selectedSize === size} onPress={() => setSelectedSize(size)} className="w-14" />
            ))}
          </View>
        </View>

        <View className="mt-8 border-t border-border pt-6">
          <Text className="text-lg font-semibold text-secondary">Details</Text>
          <Text className="mt-3 text-[15px] leading-6 text-muted">{product.description}</Text>
          <View className="mt-4 flex-row items-center">
            <View className={`mr-2 h-2 w-2 rounded-full ${product.stock === 'out-of-stock' ? 'bg-error' : product.stock === 'low-stock' ? 'bg-warning' : 'bg-success'}`} />
            <Text className={`text-sm font-medium ${product.stock === 'out-of-stock' ? 'text-error' : product.stock === 'low-stock' ? 'text-warning' : 'text-success'}`}>
              {product.stock === 'out-of-stock' ? 'Out of stock' : product.stock === 'low-stock' ? 'Only a few pairs left' : 'Available'}
            </Text>
          </View>
        </View>

        <Button label={selectedSize ? `Add size ${selectedSize} to cart` : 'Select a size'} onPress={addToCart} fullWidth className="mt-8" />
        <Text className="mt-3 text-center text-xs leading-5 text-muted">Final price and availability are confirmed by PostMart at checkout.</Text>
      </View>
    </ScreenContainer>
  );
}
