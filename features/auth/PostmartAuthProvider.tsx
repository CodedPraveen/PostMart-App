import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { ClerkProvider, useAuth, useClerk } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { useHostedAuth } from '@clerk/expo/hosted-auth';
import { setAccessTokenProvider } from '@/services/api/client/auth-handler';
import { queryClient } from '@/lib/query-client';

interface AuthContextValue {
  configured: boolean;
  isLoaded: boolean;
  isSignedIn: boolean;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

const unavailable: AuthContextValue = {
  configured: false,
  isLoaded: true,
  isSignedIn: false,
  signIn: async () => false,
  signOut: async () => undefined,
};

const AuthContext = createContext<AuthContextValue>(unavailable);

function ClerkSessionBridge({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const clerk = useClerk();
  const { startHostedAuth } = useHostedAuth();

  useEffect(() => {
    setAccessTokenProvider(() => getToken());
    return () => setAccessTokenProvider(null);
  }, [getToken]);

  const value = useMemo<AuthContextValue>(() => ({
    configured: true,
    isLoaded,
    isSignedIn: Boolean(isSignedIn),
    signIn: async () => {
      const result = await startHostedAuth();
      return Boolean(result.createdSessionId);
    },
    signOut: async () => {
      await clerk.signOut();
      queryClient.clear();
    },
  }), [clerk, isLoaded, isSignedIn, startHostedAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function PostmartAuthProvider({ children }: { children: ReactNode }) {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
  if (!publishableKey) return <AuthContext.Provider value={unavailable}>{children}</AuthContext.Provider>;
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkSessionBridge>{children}</ClerkSessionBridge>
    </ClerkProvider>
  );
}

export function usePostmartAuth() {
  return useContext(AuthContext);
}
