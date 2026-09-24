import { Text, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';
import { mockProducts } from '@/services/mock';
import { routes } from '@/constants/routes';
import { useWishlistStore } from '@/store/wishlist/useWishlistStore';
import { AppHeader } from '@/components/layout/app-header/AppHeader';
import { ScreenContainer } from '@/components/layout/screen-container/ScreenContainer';
import { ProductCard } from '@/components/product/product-card/ProductCard';
import { EmptyState } from '@/components/feedback/empty-state/EmptyState';

export function WishlistScreen() {
  const { width } = useWindowDimensions();
  const productIds = useWishlistStore((state) => state.productIds);
  const products = mockProducts.filter((product) => productIds.includes(product.id));

  return (
    <ScreenContainer>
      <AppHeader title="Wishlist" />
      {products.length ? (
        <View className="px-5">
          <Text className="mt-3 text-[28px] font-bold text-secondary">Saved for later</Text>
          <Text className="mt-1 text-sm text-muted">{products.length} considered pair{products.length === 1 ? '' : 's'}</Text>
          <View className="mt-6 flex-row flex-wrap gap-x-3 gap-y-7">
            {products.map((product) => <ProductCard key={product.id} product={product} width={(width - 52) / 2} />)}
          </View>
        </View>
      ) : (
        <EmptyState
          icon="heart"
          title="Keep your favourites close"
          description="Tap the heart on a product to build a shortlist you can return to here."
          actionLabel="Discover products"
          onAction={() => router.push(routes.home)}
        />
      )}
    </ScreenContainer>
  );
}
