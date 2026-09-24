import { Tabs } from 'expo-router';
import { colors } from '@/constants/colors';
import { useCartStore } from '@/store/cart/useCartStore';
import { TabBarIcon } from '@/components/layout/bottom-navigation/TabBarIcon';

export default function TabsLayout() {
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ focused }) => <TabBarIcon name="home" focused={focused} /> }} />
      <Tabs.Screen name="search" options={{ title: 'Search', tabBarIcon: ({ focused }) => <TabBarIcon name="search" focused={focused} /> }} />
      <Tabs.Screen name="wishlist" options={{ title: 'Wishlist', tabBarIcon: ({ focused }) => <TabBarIcon name="heart" focused={focused} /> }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart', tabBarIcon: ({ focused }) => <TabBarIcon name="shopping-bag" focused={focused} badge={cartCount} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ focused }) => <TabBarIcon name="user" focused={focused} /> }} />
    </Tabs>
  );
}
