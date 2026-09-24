import { View } from 'react-native';
import { cn } from '@/lib/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <View accessibilityLabel="Loading" className={cn('rounded bg-border/70', className)} />;
}
