import { View } from 'react-native';
import { router } from 'expo-router';
import { routes } from '@/constants/routes';
import { useCatalog, useCategories } from '@/services/api/products/useCatalog';
import { useHomepageSection } from '@/services/api/products/useHomepageSection';
import { toUiProduct } from '@/services/api/products/catalog-api';
import { AppHeader } from '@/components/layout/app-header/AppHeader';
import { HomeSearchBar } from '@/components/home/home-search/HomeSearchBar';
import { ScreenContainer } from '@/components/layout/screen-container/ScreenContainer';
import { SectionHeader } from '@/components/layout/section-header/SectionHeader';
import { HeroBanner } from '@/components/home/hero-banner/HeroBanner';
import { CategoryStrip } from '@/components/home/category-strip/CategoryStrip';
import { LifestyleSection } from '@/components/home/lifestyle/LifestyleSection';
import { HorizontalProductRail } from '@/components/home/featured-products/HorizontalProductRail';
import { TrendingProducts } from '@/components/home/trending-products/TrendingProducts';
import { ProductGridSkeleton } from '@/components/feedback/loading/ProductGridSkeleton';
import { ErrorState } from '@/components/feedback/error-state/ErrorState';

export function HomeScreen() {
  const featuredQuery = useHomepageSection('featured');
  const trendingQuery = useHomepageSection('trending');
  const catalogQuery = useCatalog({ sort: 'latest' });
  const categoriesQuery = useCategories();
  const featured = featuredQuery.data?.products.map(toUiProduct) ?? [];
  const trending = trendingQuery.data?.products.map(toUiProduct) ?? [];
  const newest = catalogQuery.data?.pages[0]?.items.filter((product) => product.isNew) ?? [];
  const catalogError = featuredQuery.isError || trendingQuery.isError || catalogQuery.isError || categoriesQuery.isError;

  return (
    <ScreenContainer>
      <AppHeader showWishlist />
      <HomeSearchBar />

      <HeroBanner />

      <View className="mt-10">
        <SectionHeader
          eyebrow="Find your pair"
          title="Shop categories"
          actionLabel="See all"
          onAction={() => router.push(routes.category('all'))}
        />
        {!categoriesQuery.isError ? (
          <CategoryStrip categories={categoriesQuery.data ?? []} loading={categoriesQuery.isPending} />
        ) : null}
      </View>

      <View className="mt-10">
        <SectionHeader title="Featured now" eyebrow="The PostMart edit" />
        {featuredQuery.isPending ? <ProductGridSkeleton /> : <HorizontalProductRail products={featured} />}
      </View>

      <View className="mt-10">
        <SectionHeader title="Shop by lifestyle" eyebrow="Wear it your way" />
        <LifestyleSection />
      </View>

      <View className="mt-10">
        <SectionHeader title="Most wanted" eyebrow="Popular this week" />
        {trendingQuery.isPending ? <ProductGridSkeleton /> : <TrendingProducts products={trending} />}
      </View>

      <View className="mt-10">
        <SectionHeader title="New arrivals" eyebrow="Just landed" />
        <HorizontalProductRail products={newest} />
      </View>
      {catalogError ? <ErrorState onRetry={() => {
        void featuredQuery.refetch();
        void trendingQuery.refetch();
        void catalogQuery.refetch();
        void categoriesQuery.refetch();
      }} /> : null}
    </ScreenContainer>
  );
}
