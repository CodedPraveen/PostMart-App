import { router } from 'expo-router';
import { routes } from '@/constants/routes';
import { EmptyState } from '@/components/feedback/empty-state/EmptyState';

export function EmptyCart() {
  return (
    <EmptyState
      icon="shopping-bag"
      title="Your cart is taking a breather"
      description="Explore the edit and add a pair when something feels right."
      actionLabel="Start shopping"
      onAction={() => router.push(routes.home)}
    />
  );
}
