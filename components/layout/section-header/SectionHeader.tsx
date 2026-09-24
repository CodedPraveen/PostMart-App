import { Pressable, Text, View } from 'react-native';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ eyebrow, title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <View className="mb-4 flex-row items-end justify-between px-5">
      <View>
        {eyebrow ? <Text className="mb-1 text-xs font-semibold uppercase tracking-[1.5px] text-primary">{eyebrow}</Text> : null}
        <Text className="text-[22px] font-semibold text-secondary">{title}</Text>
      </View>
      {actionLabel && onAction ? (
        <Pressable accessibilityRole="button" hitSlop={8} onPress={onAction}>
          <Text className="text-sm font-semibold text-secondary underline">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
