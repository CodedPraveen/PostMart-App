import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { routes } from '@/constants/routes';
import { usePostmartAuth } from '@/features/auth/PostmartAuthProvider';
import { useProfile } from '@/services/api/profile/profile-api';
import { useUIStore } from '@/store/ui/useUIStore';
import { AppHeader } from '@/components/layout/app-header/AppHeader';
import { ScreenContainer } from '@/components/layout/screen-container/ScreenContainer';
import { Button } from '@/components/ui/button/Button';
import { ErrorState } from '@/components/feedback/error-state/ErrorState';

export function ProfileScreen() {
  const auth = usePostmartAuth();
  const profile = useProfile(auth.isLoaded && auth.isSignedIn);
  const showNotice = useUIStore((state) => state.showNotice);

  const signIn = async () => {
    try {
      await auth.signIn();
    } catch {
      showNotice('Sign-in did not finish. Please try again.');
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch {
      showNotice('Could not sign out. Please try again.');
    }
  };

  return (
    <ScreenContainer>
      <AppHeader title="Profile" />
      <View className="px-5">
        <View className="mt-3 rounded-lg bg-secondary p-6">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Feather name="user" size={25} color={colors.surface} />
          </View>
          <Text className="mt-5 text-2xl font-semibold text-white">
            {profile.data?.name || (auth.isSignedIn ? 'Your PostMart space' : 'Welcome to PostMart')}
          </Text>
          <Text className="mt-2 text-sm leading-5 text-white/65">
            {profile.data?.email || profile.data?.phone || (auth.isSignedIn ? 'Loading your account…' : 'Sign in with Google or email to keep your purchases together.')}
          </Text>
          {!auth.isSignedIn ? (
            <Button
              label={auth.configured ? 'Sign in with Google or email' : 'Clerk is not configured'}
              variant="secondary"
              className="mt-5 self-start"
              disabled={!auth.configured || !auth.isLoaded}
              onPress={() => { void signIn(); }}
            />
          ) : null}
        </View>

        {auth.isSignedIn && profile.isError ? <ErrorState onRetry={() => profile.refetch()} /> : null}

        <View className="mt-8 overflow-hidden rounded-lg bg-white px-4">
          <Pressable accessibilityRole="button" onPress={() => showNotice('Orders are being connected to PostMart.')} className="min-h-20 flex-row items-center border-b border-border">
            <Feather name="package" size={19} color={colors.secondary} />
            <Text className="ml-4 flex-1 text-[15px] font-semibold text-secondary">Orders</Text>
            <Feather name="chevron-right" size={19} color={colors.muted} />
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => router.push(routes.wishlist)} className="min-h-20 flex-row items-center border-b border-border">
            <Feather name="heart" size={19} color={colors.secondary} />
            <Text className="ml-4 flex-1 text-[15px] font-semibold text-secondary">Wishlist</Text>
            <Feather name="chevron-right" size={19} color={colors.muted} />
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => showNotice('Addresses are being connected to PostMart.')} className="min-h-20 flex-row items-center">
            <Feather name="map-pin" size={19} color={colors.secondary} />
            <Text className="ml-4 flex-1 text-[15px] font-semibold text-secondary">Addresses</Text>
            <Feather name="chevron-right" size={19} color={colors.muted} />
          </Pressable>
        </View>

        {auth.isSignedIn ? (
          <Pressable accessibilityRole="button" onPress={() => { void signOut(); }} className="mt-5 min-h-14 flex-row items-center rounded-lg bg-white px-4">
            <Feather name="log-out" size={19} color={colors.error} />
            <Text className="ml-4 text-[15px] font-semibold text-error">Logout</Text>
          </Pressable>
        ) : null}
      </View>
    </ScreenContainer>
  );
}
