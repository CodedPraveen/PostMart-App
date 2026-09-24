import { ImageBackground, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { routes } from '@/constants/routes';

export function HomeHero() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Shop the everyday edit"
      onPress={() => router.push(routes.category('sneakers'))}
      className="mx-5 h-[390px] overflow-hidden rounded-lg bg-secondary"
    >
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=90' }}
        resizeMode="cover"
        className="h-full w-full justify-end"
        accessibilityLabel="Editorial sneaker collection"
      >
        <View className="absolute inset-0 bg-secondary/25" />
        <View className="p-6">
          <Text className="text-xs font-bold uppercase tracking-[2px] text-white">The everyday edit</Text>
          <Text className="mt-2 max-w-[280px] text-[34px] font-bold leading-[38px] text-white">Made for wherever you go next.</Text>
          <View className="mt-5 flex-row items-center self-start border-b border-white pb-1">
            <Text className="mr-2 text-sm font-semibold text-white">Shop the collection</Text>
            <Feather name="arrow-up-right" size={16} color={colors.surface} />
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
