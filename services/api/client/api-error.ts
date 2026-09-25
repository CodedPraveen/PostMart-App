export type ApiErrorKind =
  | 'configuration'
  | 'network'
  | 'timeout'
  | 'unauthorized'
  | 'forbidden'
  | 'not-found'
  | 'rate-limited'
  | 'server'
  | 'invalid-response'
  | 'request';

export class ApiError extends Error {
  constructor(
    public readonly kind: ApiErrorKind,
    public readonly status?: number,
  ) {
    super(messageForKind(kind));
    this.name = 'ApiError';
  }
}

function messageForKind(kind: ApiErrorKind): string {
  switch (kind) {
    case 'configuration': return 'PostMart is not configured on this device.';
    case 'network': return 'Could not connect. Check your internet connection and try again.';
    case 'timeout': return 'The request took too long. Please try again.';
    case 'unauthorized': return 'Please sign in to continue.';
    case 'forbidden': return 'You do not have access to this information.';
    case 'not-found': return 'This information is no longer available.';
    case 'rate-limited': return 'Too many requests. Please wait and try again.';
    case 'server': return 'PostMart is having trouble right now. Please try again.';
    case 'invalid-response': return 'PostMart returned an unexpected response.';
    case 'request': return 'This request could not be completed.';
  }
}

export function apiErrorFromStatus(status: number): ApiError {
  if (status === 401) return new ApiError('unauthorized', status);
  if (status === 403) return new ApiError('forbidden', status);
  if (status === 404) return new ApiError('not-found', status);
  if (status === 429) return new ApiError('rate-limited', status);
  if (status >= 500) return new ApiError('server', status);
  return new ApiError('request', status);
}
