import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
}

export function ProductRating({ rating, reviewCount }: ProductRatingProps) {
  return (
    <View className="flex-row items-center">
      <Feather name="star" size={15} color={colors.primary} />
      <Text className="ml-1 text-sm font-semibold text-secondary">{rating.toFixed(1)}</Text>
      <Text className="ml-1 text-sm text-muted">({reviewCount})</Text>
    </View>
  );
}
