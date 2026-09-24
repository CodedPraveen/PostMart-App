import { useMemo, useState } from 'react';
import { Keyboard, Text, useWindowDimensions, View } from 'react-native';
import { mockProducts } from '@/services/mock';
import { AppHeader } from '@/components/layout/app-header/AppHeader';
import { ScreenContainer } from '@/components/layout/screen-container/ScreenContainer';
import { SearchBar } from '@/components/search/search-bar/SearchBar';
import { RecentSearches } from '@/components/search/recent-searches/RecentSearches';
import { SearchResult } from '@/components/search/search-result/SearchResult';
import { EmptyState } from '@/components/feedback/empty-state/EmptyState';
import { ProductGridSkeleton } from '@/components/feedback/loading/ProductGridSkeleton';
import { ErrorState } from '@/components/feedback/error-state/ErrorState';

type SearchStatus = 'initial' | 'searching' | 'results' | 'empty' | 'error';

export function SearchScreen() {
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [recent, setRecent] = useState(['white sneakers', 'running', 'slides']);
  const [forcedStatus, setForcedStatus] = useState<SearchStatus | null>(null);

  const results = useMemo(() => {
    const term = (submitted || query).trim().toLowerCase();
    if (!term) return [];
    return mockProducts.filter((product) =>
      [product.name, product.brand, product.category].some((value) => value.toLowerCase().includes(term)),
    );
  }, [query, submitted]);

  const status: SearchStatus = forcedStatus ?? (!query.trim() ? 'initial' : results.length ? 'results' : 'empty');
  const submit = () => {
    const clean = query.trim();
    if (!clean) return;
    setSubmitted(clean);
    setRecent((items) => [clean, ...items.filter((item) => item !== clean)].slice(0, 4));
    Keyboard.dismiss();
  };
  const selectRecent = (value: string) => {
    setQuery(value);
    setSubmitted(value);
  };

  return (
    <ScreenContainer>
      <AppHeader title="Search" />
      <View className="px-5">
        <SearchBar value={query} onChangeText={(value) => { setQuery(value); setForcedStatus(null); }} onSubmit={submit} />

        {status === 'initial' ? (
          <>
            <RecentSearches searches={recent} onSelect={selectRecent} onClear={() => setRecent([])} />
            <View className="mt-8 rounded-lg bg-secondary p-6">
              <Text className="text-xs font-bold uppercase tracking-[1.5px] text-primary">Try something new</Text>
              <Text className="mt-2 text-2xl font-semibold text-white">Search by mood, movement or style.</Text>
              <Text className="mt-2 text-sm leading-5 text-white/65">Try “running”, “sneakers” or a brand from our curated mock collection.</Text>
            </View>
          </>
        ) : null}
      </View>

      {status === 'searching' ? <View className="mt-8"><ProductGridSkeleton /></View> : null}
      {status === 'error' ? <ErrorState onRetry={() => setForcedStatus(null)} /> : null}
      {status === 'empty' ? (
        <EmptyState
          icon="search"
          title="No matching pairs"
          description={`We could not find anything for “${query}”. Try a broader style or category.`}
          actionLabel="Clear search"
          onAction={() => setQuery('')}
        />
      ) : null}
      {status === 'results' ? (
        <View className="mt-7 px-5 pb-8">
          <Text className="mb-4 text-sm font-medium text-muted">{results.length} result{results.length === 1 ? '' : 's'}</Text>
          <SearchResult products={results} cardWidth={(width - 52) / 2} />
        </View>
      ) : null}
    </ScreenContainer>
  );
}
