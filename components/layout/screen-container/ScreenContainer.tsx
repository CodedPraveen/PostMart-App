import { ScrollView, View, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@/lib/cn';

interface ScreenContainerProps extends ScrollViewProps {
  children: React.ReactNode;
  scroll?: boolean;
  contentClassName?: string;
}

export function ScreenContainer({
  children,
  scroll = true,
  className,
  contentClassName,
  ...props
}: ScreenContainerProps) {
  return (
    <SafeAreaView edges={['top']} className={cn('flex-1 bg-background', className)}>
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName={cn('pb-8', contentClassName)}
          {...props}
        >
          {children}
        </ScrollView>
      ) : (
        <View className={cn('flex-1', contentClassName)}>{children}</View>
      )}
    </SafeAreaView>
  );
}
