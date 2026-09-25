import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '@/services/api/client/api-error';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: (failureCount, error) => {
        if (failureCount >= 1) return false;
        if (error instanceof ApiError) {
          return error.kind === 'network' || error.kind === 'timeout' || error.kind === 'server';
        }
        return false;
      },
    },
    mutations: { retry: false },
  },
});
