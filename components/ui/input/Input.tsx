import { forwardRef } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors } from '@/constants/colors';
import { cn } from '@/lib/cn';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, error, left, right, className, ...props },
  ref,
) {
  return (
    <View className="gap-1.5">
      {label ? <Text className="text-sm font-medium text-secondary">{label}</Text> : null}
      <View
        className={cn(
          'min-h-12 flex-row items-center rounded border bg-white px-3',
          error ? 'border-error' : 'border-border',
        )}
      >
        {left}
        <TextInput
          ref={ref}
          className={cn('flex-1 py-3 text-[15px] text-secondary', Boolean(left) && 'ml-2', Boolean(right) && 'mr-2', className)}
          placeholderTextColor={colors.muted}
          {...props}
        />
        {right}
      </View>
      {error ? <Text className="text-xs text-error">{error}</Text> : null}
    </View>
  );
});
