import { Pressable, Text, type PressableProps } from 'react-native';
import { cn } from '@/lib/cn';

interface ChipProps extends Omit<PressableProps, 'children'> {
  label: string;
  selected?: boolean;
}

export function Chip({ label, selected = false, disabled, className, ...props }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: Boolean(disabled) }}
      className={cn(
        'min-h-11 items-center justify-center rounded-sm border px-4',
        selected ? 'border-primary bg-primary/5' : 'border-border bg-white',
        disabled && 'opacity-35',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <Text className={cn('text-sm font-medium', selected ? 'text-primary' : 'text-secondary')}>{label}</Text>
    </Pressable>
  );
}
