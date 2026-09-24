import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface TabBarIconProps {
  name: React.ComponentProps<typeof Feather>['name'];
  focused: boolean;
  badge?: number;
}

export function TabBarIcon({ name, focused, badge = 0 }: TabBarIconProps) {
  return (
    <View className="relative items-center">
      <Feather name={name} size={21} color={focused ? colors.secondary : colors.muted} />
      {focused ? <View className="absolute -bottom-2 h-1 w-1 rounded-full bg-primary" /> : null}
      {badge > 0 ? <View className="absolute -right-2 -top-1 h-2 w-2 rounded-full bg-primary" /> : null}
    </View>
  );
}
