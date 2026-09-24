import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { routes } from '@/constants/routes';
import { mockProducts } from '@/services/mock';
import { AppHeader } from '@/components/layout/app-header/AppHeader';
import { ScreenContainer } from '@/components/layout/screen-container/ScreenContainer';
import { SectionHeader } from '@/components/layout/section-header/SectionHeader';
import { HomeHero } from '@/components/home/hero/HomeHero';
import { CategoryStrip } from '@/components/home/category-strip/CategoryStrip';
import { LifestyleSection } from '@/components/home/lifestyle/LifestyleSection';
import { HorizontalProductRail } from '@/components/home/featured-products/HorizontalProductRail';
import { TrendingProducts } from '@/components/home/trending-products/TrendingProducts';

export function HomeScreen() {
  const featured = mockProducts.filter((product) => product.featured);
  const newest = mockProducts.filter((product) => product.isNew);

  return (
    <ScreenContainer>
      <AppHeader />
      <Pressable
        accessibilityRole="search"
        accessibilityLabel="Search PostMart"
        onPress={() => router.push(routes.search)}
        className="mx-5 mb-5 min-h-12 flex-row items-center rounded border border-border bg-white px-4"
      >
        <Feather name="search" size={20} color={colors.muted} />
        <Text className="ml-3 flex-1 text-[15px] text-muted">Search shoes, styles and brands</Text>
      </Pressable>

      <HomeHero />

      <View className="mt-10">
        <SectionHeader
          eyebrow="Find your pair"
          title="Shop categories"
          actionLabel="See all"
          onAction={() => router.push(routes.category('all'))}
        />
        <CategoryStrip />
      </View>

      <View className="mt-10">
        <SectionHeader title="Featured now" eyebrow="The PostMart edit" />
        <HorizontalProductRail products={featured} />
      </View>

      <View className="mt-10">
        <SectionHeader title="Shop by lifestyle" eyebrow="Wear it your way" />
        <LifestyleSection />
      </View>

      <View className="mt-10">
        <SectionHeader title="Most wanted" eyebrow="Popular this week" />
        <TrendingProducts />
      </View>

      <View className="mt-10">
        <SectionHeader title="New arrivals" eyebrow="Just landed" />
        <HorizontalProductRail products={newest} />
      </View>
    </ScreenContainer>
  );
}
