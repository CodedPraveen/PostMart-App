import { useLocalSearchParams } from 'expo-router';
import { ProductListingScreen } from '@/features/products/ProductListingScreen';

export default function CategoryRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return <ProductListingScreen initialCategory={slug} />;
}
