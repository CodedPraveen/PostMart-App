import { Feather } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { Input } from '@/components/ui/input/Input';

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChangeText, onSubmit, autoFocus = false }: SearchBarProps) {
  return (
    <Input
      accessibilityLabel="Search products"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmit}
      autoFocus={autoFocus}
      returnKeyType="search"
      placeholder="Search shoes, styles and brands"
      left={<Feather name="search" size={20} color={colors.muted} />}
      right={value ? (
        <Pressable accessibilityLabel="Clear search" hitSlop={10} onPress={() => onChangeText('')}>
          <Feather name="x" size={19} color={colors.muted} />
        </Pressable>
      ) : undefined}
    />
  );
}
