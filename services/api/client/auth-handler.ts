// Clerk or a future backend phone session may supply a short-lived token here.
// Token persistence belongs to the official auth SDK or secure native storage,
// never to this module or the Zustand stores.
export type AccessTokenProvider = () => Promise<string | null>;

let accessTokenProvider: AccessTokenProvider | null = null;

export function setAccessTokenProvider(provider: AccessTokenProvider | null): void {
  accessTokenProvider = provider;
}

export async function getAccessToken(): Promise<string | null> {
  return accessTokenProvider?.() ?? null;
}
