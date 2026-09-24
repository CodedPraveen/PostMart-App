import { Text, View } from 'react-native';
import { useCartStore } from '@/store/cart/useCartStore';
import { useUIStore } from '@/store/ui/useUIStore';
import { AppHeader } from '@/components/layout/app-header/AppHeader';
import { ScreenContainer } from '@/components/layout/screen-container/ScreenContainer';
import { CartItemRow } from '@/components/cart/cart-item/CartItemRow';
import { CartSummary } from '@/components/cart/cart-summary/CartSummary';
import { EmptyCart } from '@/components/cart/empty-cart/EmptyCart';

export function CartScreen() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const showNotice = useUIStore((state) => state.showNotice);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ScreenContainer contentClassName={items.length ? 'px-5' : undefined}>
      <View className={items.length ? '-mx-5' : undefined}><AppHeader title="Cart" /></View>
      {items.length ? (
        <>
          <Text className="mt-3 text-[28px] font-bold text-secondary">Your bag</Text>
          <Text className="mt-1 text-sm text-muted">{itemCount} item{itemCount === 1 ? '' : 's'} · local cart</Text>
          <View className="mt-3">
            {items.map((item) => (
              <CartItemRow
                key={`${item.product.id}-${item.size}`}
                item={item}
                onQuantityChange={(quantity) => setQuantity(item.product.id, item.size, quantity)}
                onRemove={() => removeItem(item.product.id, item.size)}
              />
            ))}
          </View>
          <CartSummary
            subtotal={subtotal}
            onCheckout={() => showNotice('Checkout will connect to the PostMart backend in a later phase.')}
          />
        </>
      ) : <EmptyCart />}
    </ScreenContainer>
  );
}
