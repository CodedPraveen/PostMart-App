import { Text, View } from 'react-native';
import { cn } from '@/lib/cn';

interface BadgeProps {
  label: string;
  tone?: 'brand' | 'dark' | 'success' | 'warning';
}

export function Badge({ label, tone = 'brand' }: BadgeProps) {
  const tones = {
    brand: 'bg-primary/10 text-primary',
    dark: 'bg-secondary text-white',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  } as const;

  return (
    <View className={cn('self-start rounded-sm px-2 py-1', tones[tone].split(' ')[0])}>
      <Text className={cn('text-[10px] font-bold uppercase tracking-wider', tones[tone].split(' ')[1])}>{label}</Text>
    </View>
  );
}
