import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { routes } from '@/constants/routes';
import { profileSchema, type ProfileFormValues } from '@/schemas/profile';
import { useUIStore } from '@/store/ui/useUIStore';
import { AppHeader } from '@/components/layout/app-header/AppHeader';
import { ScreenContainer } from '@/components/layout/screen-container/ScreenContainer';
import { AppModal } from '@/components/ui/modal/AppModal';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';

type FeatherName = React.ComponentProps<typeof Feather>['name'];

const profileItems: Array<{ label: string; caption: string; icon: FeatherName; route?: string }> = [
  { label: 'Orders', caption: 'Order history will arrive in Phase 2', icon: 'package' },
  { label: 'Wishlist', caption: 'Review your saved products', icon: 'heart', route: routes.wishlist },
  { label: 'Addresses', caption: 'Saved addresses will connect later', icon: 'map-pin' },
  { label: 'Settings', caption: 'App preferences', icon: 'settings' },
];

export function ProfileScreen() {
  const [editVisible, setEditVisible] = useState(false);
  const showNotice = useUIStore((state) => state.showNotice);
  const { control, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', email: '' },
  });

  const submit = handleSubmit(() => {
    setEditVisible(false);
    showNotice('Profile details are validated locally for this UI preview.');
  });

  return (
    <ScreenContainer>
      <AppHeader title="Profile" />
      <View className="px-5">
        <View className="mt-3 rounded-lg bg-secondary p-6">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Feather name="user" size={25} color={colors.surface} />
          </View>
          <Text className="mt-5 text-2xl font-semibold text-white">Your PostMart space</Text>
          <Text className="mt-2 text-sm leading-5 text-white/65">Profile UI only. Sign-in and account data will be connected securely in a later phase.</Text>
          <Button label="Add profile details" variant="secondary" className="mt-5 self-start" onPress={() => setEditVisible(true)} />
        </View>

        <View className="mt-8 overflow-hidden rounded-lg bg-white px-4">
          {profileItems.map((item, index) => (
            <Pressable
              key={item.label}
              accessibilityRole="button"
              accessibilityLabel={`${item.label}. ${item.caption}`}
              onPress={() => item.route ? router.push(item.route as never) : showNotice(`${item.label} is a Phase 1 placeholder.`)}
              className={`min-h-20 flex-row items-center ${index < profileItems.length - 1 ? 'border-b border-border' : ''}`}
            >
              <View className="h-10 w-10 items-center justify-center rounded-full bg-background">
                <Feather name={item.icon} size={19} color={colors.secondary} />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-[15px] font-semibold text-secondary">{item.label}</Text>
                <Text className="mt-1 text-xs text-muted">{item.caption}</Text>
              </View>
              <Feather name="chevron-right" size={19} color={colors.muted} />
            </Pressable>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => showNotice('There is no active session to log out from in Phase 1.')}
          className="mt-5 min-h-14 flex-row items-center rounded-lg bg-white px-4"
        >
          <Feather name="log-out" size={19} color={colors.error} />
          <Text className="ml-4 text-[15px] font-semibold text-error">Logout</Text>
        </Pressable>
      </View>

      <AppModal visible={editVisible} title="Profile details" onClose={() => setEditVisible(false)}>
        <View className="gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Name" placeholder="Your name" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.name?.message} />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Email" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.email?.message} />
            )}
          />
          <Button label="Save locally" onPress={submit} fullWidth />
        </View>
      </AppModal>
    </ScreenContainer>
  );
}
