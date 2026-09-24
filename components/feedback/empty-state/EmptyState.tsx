import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/ui/button/Button';

interface EmptyStateProps {
  icon?: React.ComponentProps<typeof Feather>['name'];
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = 'package', title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <View className="mb-5 h-16 w-16 items-center justify-center rounded-full bg-white">
        <Feather name={icon} size={28} color={colors.secondary} />
      </View>
      <Text className="text-center text-xl font-semibold text-secondary">{title}</Text>
      <Text className="mt-2 max-w-[290px] text-center text-[15px] leading-6 text-muted">{description}</Text>
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} className="mt-6" /> : null}
    </View>
  );
}
