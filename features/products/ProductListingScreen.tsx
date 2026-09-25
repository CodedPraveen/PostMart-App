import { useState } from 'react';
import { FlatList, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { useCatalog, useCategories } from '@/services/api/products/useCatalog';
import type { CatalogSort } from '@/services/api/products/catalog-api';
import { AppHeader } from '@/components/layout/app-header/AppHeader';
import { ScreenContainer } from '@/components/layout/screen-container/ScreenContainer';
import { ProductCard } from '@/components/product/product-card/ProductCard';
import { AppModal } from '@/components/ui/modal/AppModal';
import { Chip } from '@/components/ui/chip/Chip';
import { EmptyState } from '@/components/feedback/empty-state/EmptyState';
import { ErrorState } from '@/components/feedback/error-state/ErrorState';
import { ProductGridSkeleton } from '@/components/feedback/loading/ProductGridSkeleton';

interface ProductListingScreenProps {
  initialCategory?: string;
}

const sortLabels: Record<CatalogSort, string> = {
  latest: 'Latest',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  popular: 'Most popular',
};

export function ProductListingScreen({ initialCategory = 'all' }: ProductListingScreenProps) {
  const { width } = useWindowDimensions();
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<CatalogSort>('latest');
  const [activeModal, setActiveModal] = useState<'filter' | 'sort' | null>(null);
  const catalog = useCatalog({ category, sort });
  const categories = useCategories();

  const products = catalog.data?.pages.flatMap((page) => page.items) ?? [];

  const categoryName = category === 'all' ? 'All shoes' : categories.data?.find((item) => item.slug === category)?.name ?? 'Collection';
  const cardWidth = (width - 52) / 2;

  if (catalog.isPending) {
    return (
      <ScreenContainer>
        <AppHeader title={categoryName} showBack />
        <ProductGridSkeleton />
      </ScreenContainer>
    );
  }

  if (catalog.isError) {
    return (
      <ScreenContainer>
        <AppHeader title={categoryName} showBack />
        <ErrorState onRetry={() => catalog.refetch()} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll={false}>
      <AppHeader title={categoryName} showBack />
      <View className="px-5 pb-4 pt-2">
        <Text className="text-[28px] font-bold text-secondary">{categoryName}</Text>
        <Text className="mt-1 text-sm text-muted">{catalog.data?.pages[0]?.total ?? products.length} considered pairs</Text>
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
        onEndReached={() => { if (catalog.hasNextPage && !catalog.isFetchingNextPage) void catalog.fetchNextPage(); }}
        onEndReachedThreshold={0.5}
        refreshing={catalog.isRefetching}
        onRefresh={() => { void catalog.refetch(); }}
        ListEmptyComponent={
          <EmptyState title="No pairs found" description="Try a different category or clear your filters." icon="search" />
        }
      />

      <AppModal visible={activeModal === 'filter'} title="Filter by category" onClose={() => setActiveModal(null)}>
        <View className="flex-row flex-wrap gap-3">
          <Chip label="All shoes" selected={category === 'all'} onPress={() => { setCategory('all'); setActiveModal(null); }} />
          {(categories.data ?? []).map((item) => (
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
          {(Object.keys(sortLabels) as CatalogSort[]).map((option) => (
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
