import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';
import { colors } from '@/constants/colors';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

const buttonClasses: Record<ButtonVariant, string> = {
  primary: 'bg-secondary',
  secondary: 'bg-white border border-border',
  outline: 'border border-secondary bg-transparent',
  ghost: 'bg-transparent',
};

const labelClasses: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-secondary',
  outline: 'text-secondary',
  ghost: 'text-secondary',
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      className={cn(
        'min-h-12 flex-row items-center justify-center rounded px-5 active:opacity-80',
        buttonClasses[variant],
        fullWidth && 'w-full',
        isDisabled && 'opacity-40',
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.surface : colors.secondary} />
      ) : (
        <Text className={cn('text-[15px] font-semibold', labelClasses[variant])}>{label}</Text>
      )}
    </Pressable>
  );
}
