import { Text, View } from 'react-native';
import { formatCurrency } from '@/utils/currency';
import { Button } from '@/components/ui/button/Button';

interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
}

export function CartSummary({ subtotal, onCheckout }: CartSummaryProps) {
  return (
    <View className="mt-7 rounded-lg bg-white p-5">
      <Text className="text-lg font-semibold text-secondary">Order summary</Text>
      <View className="mt-5 flex-row justify-between">
        <Text className="text-sm text-muted">Subtotal</Text>
        <Text className="text-sm font-semibold text-secondary">{formatCurrency(subtotal)}</Text>
      </View>
      <View className="mt-3 flex-row justify-between">
        <Text className="text-sm text-muted">Delivery</Text>
        <Text className="text-sm font-semibold text-success">Calculated later</Text>
      </View>
      <View className="my-5 border-t border-border" />
      <View className="flex-row items-end justify-between">
        <Text className="text-base font-semibold text-secondary">Mock total</Text>
        <Text className="text-2xl font-bold text-secondary">{formatCurrency(subtotal)}</Text>
      </View>
      <Button label="Continue to checkout" fullWidth className="mt-5" onPress={onCheckout} />
      <Text className="mt-3 text-center text-xs leading-5 text-muted">Checkout is intentionally unavailable in Phase 1.</Text>
    </View>
  );
}
