import { useLocalSearchParams } from 'expo-router';
import { ProductDetailsScreen } from '@/features/products/ProductDetailsScreen';

export default function ProductRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProductDetailsScreen id={id} />;
}
