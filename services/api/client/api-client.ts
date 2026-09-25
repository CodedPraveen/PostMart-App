import { ApiError, apiErrorFromStatus } from '@/services/api/client/api-error';
import { getAccessToken } from '@/services/api/client/auth-handler';

const REQUEST_TIMEOUT_MS = 12_000;

export function getApiBaseUrl(): string | null {
  const value = process.env.EXPO_PUBLIC_POSTMART_API_URL?.trim();
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(parsed.hostname))) {
      return null;
    }
    if (parsed.username || parsed.password || parsed.search || parsed.hash) return null;
    return parsed.href.replace(/\/$/, '');
  } catch {
    return null;
  }
}

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface ApiRequestOptions {
  method?: HttpMethod;
  body?: unknown;
  authenticated?: boolean;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export async function apiRequest<T>(path: `/${string}`, options: ApiRequestOptions = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) throw new ApiError('configuration');
  if (path.startsWith('//')) throw new ApiError('configuration');

  const { method = 'GET', body, authenticated = false, signal, timeoutMs = REQUEST_TIMEOUT_MS } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });

  try {
    const token = authenticated ? await getAccessToken() : null;
    if (authenticated && !token) throw new ApiError('unauthorized');

    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) throw apiErrorFromStatus(response.status);
    if (response.status === 204) return undefined as T;
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) throw new ApiError('invalid-response', response.status);
    try {
      return (await response.json()) as T;
    } catch {
      throw new ApiError('invalid-response', response.status);
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (controller.signal.aborted && !signal?.aborted) throw new ApiError('timeout');
    if (signal?.aborted) throw error;
    throw new ApiError('network');
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}
