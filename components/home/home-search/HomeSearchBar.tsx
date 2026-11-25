import { Feather } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { routes } from '@/constants/routes';

export function HomeSearchBar() {
  return (
    <Pressable
      accessibilityRole="search"
      accessibilityLabel="Search shoes, brands and styles"
      onPress={() => router.push(routes.search)}
      className="mx-5 mb-5 min-h-12 flex-row items-center rounded-md border border-border bg-white px-4 active:opacity-80"
    >
      <Feather name="search" size={20} color={colors.muted} />
      <Text className="ml-3 flex-1 text-[15px] leading-5 text-muted">Search shoes, brands and styles</Text>
    </Pressable>
  );
}
