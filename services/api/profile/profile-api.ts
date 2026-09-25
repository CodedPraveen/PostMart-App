import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { ApiError } from '@/services/api/client/api-error';
import { apiRequest } from '@/services/api/client/api-client';

const profileSchema = z.object({ profile: z.object({ id: z.string(), name: z.string().nullish(), email: z.string().email().nullish(), phone: z.string().nullish() }) });

async function getProfile(signal?: AbortSignal) {
  const response = await apiRequest<unknown>('/api/mobile/profile', { authenticated: true, signal });
  const parsed = profileSchema.safeParse(response);
  if (!parsed.success) throw new ApiError('invalid-response');
  return parsed.data.profile;
}

export function useProfile(enabled: boolean) {
  return useQuery({ queryKey: ['profile'], queryFn: ({ signal }) => getProfile(signal), enabled });
}
