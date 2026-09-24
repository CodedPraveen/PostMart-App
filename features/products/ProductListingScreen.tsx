import { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import type { Product } from '@/types/product';
import { mockCategories, mockProducts } from '@/services/mock';
import { AppHeader } from '@/components/layout/app-header/AppHeader';
import { ScreenContainer } from '@/components/layout/screen-container/ScreenContainer';
import { ProductCard } from '@/components/product/product-card/ProductCard';
import { AppModal } from '@/components/ui/modal/AppModal';
import { Chip } from '@/components/ui/chip/Chip';
import { EmptyState } from '@/components/feedback/empty-state/EmptyState';
import { ErrorState } from '@/components/feedback/error-state/ErrorState';
import { ProductGridSkeleton } from '@/components/feedback/loading/ProductGridSkeleton';

type ListingStatus = 'normal' | 'loading' | 'error';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';

interface ProductListingScreenProps {
  initialCategory?: string;
  status?: ListingStatus;
}

const sortLabels: Record<SortOption, string> = {
  featured: 'Featured',
  'price-low': 'Price: low to high',
  'price-high': 'Price: high to low',
  rating: 'Top rated',
};

export function ProductListingScreen({ initialCategory = 'all', status = 'normal' }: ProductListingScreenProps) {
  const { width } = useWindowDimensions();
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>('featured');
  const [activeModal, setActiveModal] = useState<'filter' | 'sort' | null>(null);

  const products = useMemo(() => {
    const filtered = category === 'all' ? [...mockProducts] : mockProducts.filter((item) => item.categorySlug === category);
    if (sort === 'price-low') return filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating') return filtered.sort((a, b) => b.rating - a.rating);
    return filtered.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [category, sort]);

  const categoryName = category === 'all' ? 'All shoes' : mockCategories.find((item) => item.slug === category)?.name ?? 'Collection';
  const cardWidth = (width - 52) / 2;

  if (status === 'loading') {
    return (
      <ScreenContainer>
        <AppHeader title={categoryName} showBack />
        <ProductGridSkeleton />
      </ScreenContainer>
    );
  }

  if (status === 'error') {
    return (
      <ScreenContainer>
        <AppHeader title={categoryName} showBack />
        <ErrorState onRetry={() => undefined} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll={false}>
      <AppHeader title={categoryName} showBack />
      <View className="px-5 pb-4 pt-2">
        <Text className="text-[28px] font-bold text-secondary">{categoryName}</Text>
        <Text className="mt-1 text-sm text-muted">{products.length} considered pairs</Text>
        <View className="mt-5 flex-row gap-3">
          <Pressable
            accessibilityRole="button"
            onPress={() => setActiveModal('filter')}
            className="min-h-11 flex-1 flex-row items-center justify-center rounded border border-border bg-white"
          >
            <Feather name="sliders" size={17} color={colors.secondary} />
            <Text className="ml-2 text-sm font-semibold text-secondary">Filter</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => setActiveModal('sort')}
            className="min-h-11 flex-1 flex-row items-center justify-center rounded border border-border bg-white"
          >
            <Feather name="chevrons-up" size={17} color={colors.secondary} />
            <Text numberOfLines={1} className="ml-2 text-sm font-semibold text-secondary">{sortLabels[sort]}</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
        columnWrapperClassName="gap-3"
        contentContainerClassName="gap-y-7 px-5 pb-10"
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        ListEmptyComponent={
          <EmptyState title="No pairs found" description="Try a different category or clear your filters." icon="search" />
        }
      />

      <AppModal visible={activeModal === 'filter'} title="Filter by category" onClose={() => setActiveModal(null)}>
        <View className="flex-row flex-wrap gap-3">
          <Chip label="All shoes" selected={category === 'all'} onPress={() => { setCategory('all'); setActiveModal(null); }} />
          {mockCategories.map((item) => (
            <Chip
              key={item.slug}
              label={item.name}
              selected={category === item.slug}
              onPress={() => { setCategory(item.slug); setActiveModal(null); }}
            />
          ))}
        </View>
      </AppModal>

      <AppModal visible={activeModal === 'sort'} title="Sort products" onClose={() => setActiveModal(null)}>
        <View className="gap-3">
          {(Object.keys(sortLabels) as SortOption[]).map((option) => (
            <Chip
              key={option}
              label={sortLabels[option]}
              selected={sort === option}
              onPress={() => { setSort(option); setActiveModal(null); }}
              className="items-start"
            />
          ))}
        </View>
      </AppModal>
    </ScreenContainer>
  );
}
