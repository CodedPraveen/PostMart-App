import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (value: string) => void;
  onClear: () => void;
}

export function RecentSearches({ searches, onSelect, onClear }: RecentSearchesProps) {
  if (!searches.length) return null;

  return (
    <View className="mt-7">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-secondary">Recent searches</Text>
        <Pressable accessibilityRole="button" hitSlop={8} onPress={onClear}>
          <Text className="text-sm font-medium text-muted">Clear</Text>
        </Pressable>
      </View>
      {searches.map((search) => (
        <Pressable
          key={search}
          accessibilityRole="button"
          onPress={() => onSelect(search)}
          className="min-h-12 flex-row items-center border-b border-border"
        >
          <Feather name="clock" size={17} color={colors.muted} />
          <Text className="ml-3 flex-1 text-[15px] text-secondary">{search}</Text>
          <Feather name="arrow-up-left" size={17} color={colors.muted} />
        </Pressable>
      ))}
    </View>
  );
}
