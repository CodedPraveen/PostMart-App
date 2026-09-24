import { Pressable, type PressableProps } from 'react-native';
import { cn } from '@/lib/cn';

interface IconButtonProps extends PressableProps {
  icon: React.ReactNode;
  selected?: boolean;
  size?: 'sm' | 'md';
}

export function IconButton({ icon, selected = false, size = 'md', className, ...props }: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      hitSlop={8}
      className={cn(
        'items-center justify-center rounded-full active:opacity-70',
        size === 'sm' ? 'h-10 w-10' : 'h-12 w-12',
        selected ? 'bg-primary/10' : 'bg-white',
        className,
      )}
      {...props}
    >
      {icon}
    </Pressable>
  );
}
