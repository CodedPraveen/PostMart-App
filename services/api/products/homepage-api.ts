import { z } from 'zod';
import { ApiError } from '@/services/api/client/api-error';
import { apiRequest } from '@/services/api/client/api-client';

// Exact public route: app/api/homepage/sections/[section]/route.js in `com`.
const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brand: z.string(),
  description: z.string(),
  price: z.number(),
  compareAtPrice: z.number().nullish(),
  stock: z.number(),
  image: z.string(),
  images: z.array(z.string()),
  sizes: z.array(z.number()),
  category: z.string(),
  categoryLabel: z.string(),
  isNew: z.boolean(),
  isTrending: z.boolean(),
}).passthrough();

const homepageSectionSchema = z.object({
  section: z.object({
    title: z.string(),
    subtitle: z.string().nullish(),
    enabled: z.boolean(),
  }),
  products: z.array(productSchema),
});

export type BackendProduct = z.infer<typeof productSchema>;
export type HomepageSection = z.infer<typeof homepageSectionSchema>;
export type HomepageSectionKey = 'featured' | 'trending';

export async function getHomepageSection(section: HomepageSectionKey, signal?: AbortSignal): Promise<HomepageSection> {
  const response = await apiRequest<unknown>(`/api/homepage/sections/${section}`, { signal });
  const parsed = homepageSectionSchema.safeParse(response);
  if (!parsed.success) throw new ApiError('invalid-response');
  return parsed.data;
}
