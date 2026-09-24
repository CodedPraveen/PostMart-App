import { Text, View } from 'react-native';
import { formatCurrency, getDiscountPercentage } from '@/utils/currency';

interface ProductPriceProps {
  price: number;
  oldPrice?: number;
  size?: 'sm' | 'lg';
}

export function ProductPrice({ price, oldPrice, size = 'sm' }: ProductPriceProps) {
  const discount = getDiscountPercentage(price, oldPrice);

  return (
    <View className="flex-row flex-wrap items-center gap-2">
      <Text className={size === 'lg' ? 'text-2xl font-bold text-secondary' : 'text-base font-semibold text-secondary'}>
        {formatCurrency(price)}
      </Text>
      {oldPrice ? <Text className="text-sm text-muted line-through">{formatCurrency(oldPrice)}</Text> : null}
      {discount > 0 ? <Text className="text-xs font-bold text-primary">{discount}% OFF</Text> : null}
    </View>
  );
}
