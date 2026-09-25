import { z } from 'zod';
import { ApiError } from '@/services/api/client/api-error';
import { apiRequest } from '@/services/api/client/api-client';
import { productSchema, type BackendProduct } from '@/services/api/products/homepage-api';
import type { Product } from '@/types/product';

const pageSchema = z.object({
  items: z.array(productSchema),
  page: z.number().int(),
  pageSize: z.number().int(),
  total: z.number().int(),
  hasMore: z.boolean(),
});
const detailSchema = z.object({ product: productSchema });
const categorySchema = z.object({
  items: z.array(z.object({
    id: z.string(), name: z.string(), slug: z.string(),
    collection: z.string(), parentId: z.string().nullable(), image: z.string().nullable(),
  })),
});

export type CatalogSort = 'latest' | 'popular' | 'price-asc' | 'price-desc';

export function toUiProduct(product: BackendProduct): Product {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.categoryLabel,
    categorySlug: product.category,
    price: product.price,
    oldPrice: product.compareAtPrice ?? undefined,
    image: product.image,
    imageAlt: product.name,
    description: product.description,
    sizes: product.sizes.map(String),
    stock: product.stock <= 0 ? 'out-of-stock' : product.stock <= 5 ? 'low-stock' : 'in-stock',
    isNew: product.isNew,
    trending: product.isTrending,
    badge: product.isNew ? 'New' : product.isTrending ? 'Trending' : undefined,
  };
}

export async function getCatalogPage(params: { page?: number; category?: string; query?: string; sort?: CatalogSort }, signal?: AbortSignal) {
  const search = new URLSearchParams({ page: String(params.page ?? 1), pageSize: '20', sort: params.sort ?? 'latest' });
  if (params.category && params.category !== 'all') search.set('category', params.category);
  if (params.query) search.set('q', params.query);
  const response = await apiRequest<unknown>(`/api/mobile/products?${search}`, { signal });
  const parsed = pageSchema.safeParse(response);
  if (!parsed.success) throw new ApiError('invalid-response');
  return { ...parsed.data, items: parsed.data.items.map(toUiProduct) };
}

export async function getProduct(id: string, signal?: AbortSignal) {
  const response = await apiRequest<unknown>(`/api/mobile/products/${encodeURIComponent(id)}`, { signal });
  const parsed = detailSchema.safeParse(response);
  if (!parsed.success) throw new ApiError('invalid-response');
  return { backend: parsed.data.product, product: toUiProduct(parsed.data.product) };
}

export async function getCategories(signal?: AbortSignal) {
  const response = await apiRequest<unknown>('/api/mobile/categories', { signal });
  const parsed = categorySchema.safeParse(response);
  if (!parsed.success) throw new ApiError('invalid-response');
  return parsed.data.items.filter((item) => item.collection === 'SHOES');
}
