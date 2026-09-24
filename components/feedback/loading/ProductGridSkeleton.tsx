import { View } from 'react-native';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';

export function ProductGridSkeleton() {
  return (
    <View className="flex-row flex-wrap gap-y-7 px-5">
      {[0, 1, 2, 3].map((item) => (
        <View key={item} className="w-1/2 pr-2">
          <Skeleton className="aspect-[4/5] w-full" />
          <Skeleton className="mt-3 h-3 w-16" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-20" />
        </View>
      ))}
    </View>
  );
}
