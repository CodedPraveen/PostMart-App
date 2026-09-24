import { useCallback, useMemo, useState } from 'react';
import { Image, Text, View, type ImageProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { cn } from '@/lib/cn';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';

interface ProductImageProps extends Omit<ImageProps, 'source'> {
  uri: string;
  alt: string;
  className?: string;
}

export function ProductImage({ uri, alt, className, ...props }: ProductImageProps) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const source = useMemo(() => ({ uri }), [uri]);
  const handleLoadStart = useCallback(() => setLoading(true), []);
  const handleLoadEnd = useCallback(() => setLoading(false), []);
  const handleError = useCallback(() => {
    setFailed(true);
    setLoading(false);
  }, []);

  return (
    <View className={cn('overflow-hidden bg-[#F0F0ED]', className)}>
      {loading && !failed ? <Skeleton className="absolute inset-0 h-full w-full" /> : null}
      {failed ? (
        <View className="h-full w-full items-center justify-center p-4">
          <Feather name="image" size={26} color={colors.muted} />
          <Text className="mt-2 text-center text-xs text-muted">Image unavailable</Text>
        </View>
      ) : (
        <Image
          source={source}
          accessibilityLabel={alt}
          resizeMode="cover"
          className="h-full w-full"
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          {...props}
        />
      )}
    </View>
  );
}
