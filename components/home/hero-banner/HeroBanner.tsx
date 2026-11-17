import { Feather } from '@expo/vector-icons';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { routes } from '@/constants/routes';

/**
 * Editorial footwear campaign banner for the Home screen.
 */
export function HeroBanner() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Step into your style. Shop now."
      onPress={() => router.push(routes.category('sneakers'))}
      className="mx-5 min-h-[320px] overflow-hidden rounded-lg bg-secondary active:opacity-90"
    >
      <ImageBackground
        source={require('@/assets/images/home-hero-campaign.png')}
        resizeMode="cover"
        className="min-h-[320px] flex-1"
        accessibilityIgnoresInvertColors
      >
        <View className="absolute inset-0 bg-secondary/35" />
        <View className="flex-1 justify-between p-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-bold uppercase tracking-[2px] text-white">PostMart editorial</Text>
            <View className="h-10 w-10 items-center justify-center rounded-full border border-white/30">
              <Feather name="arrow-up-right" size={17} color={colors.surface} />
            </View>
          </View>
          <View>
            <Text className="max-w-[290px] text-[34px] font-bold leading-[38px] text-white">STEP INTO YOUR STYLE</Text>
            <Text className="mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/70">Discover footwear made for every move.</Text>
            <View className="mt-6 flex-row items-center self-start border-b border-accent pb-1">
              <Text className="mr-2 text-sm font-semibold text-white">SHOP NOW</Text>
              <Feather name="arrow-right" size={16} color={colors.accent} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
