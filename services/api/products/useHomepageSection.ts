import { useQuery } from '@tanstack/react-query';
import { getApiBaseUrl } from '@/services/api/client/api-client';
import { getHomepageSection, type HomepageSectionKey } from '@/services/api/products/homepage-api';

export function useHomepageSection(section: HomepageSectionKey) {
  return useQuery({
    queryKey: ['homepage', section],
    queryFn: ({ signal }) => getHomepageSection(section, signal),
    enabled: Boolean(getApiBaseUrl()),
    staleTime: 60_000,
    retry: 1,
  });
}
