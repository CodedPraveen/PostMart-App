import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCatalogPage, getCategories, getProduct, type CatalogSort } from '@/services/api/products/catalog-api';

export function useCatalog(params: { category?: string; query?: string; sort?: CatalogSort }, enabled = true) {
  return useInfiniteQuery({
    queryKey: ['catalog', params.category ?? 'all', params.query ?? '', params.sort ?? 'latest'],
    initialPageParam: 1,
    enabled,
    queryFn: ({ pageParam, signal }) => getCatalogPage({ ...params, page: pageParam }, signal),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
  });
}

export function useProduct(id: string) {
  return useQuery({ queryKey: ['product', id], queryFn: ({ signal }) => getProduct(id, signal), enabled: Boolean(id) });
}

export function useCategories() {
  return useQuery({ queryKey: ['categories'], queryFn: ({ signal }) => getCategories(signal), staleTime: 5 * 60_000 });
}
