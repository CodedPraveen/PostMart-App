import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { useUIStore } from '@/store/ui/useUIStore';

export function AppNotice() {
  const notice = useUIStore((state) => state.notice);
  const dismiss = useUIStore((state) => state.dismissNotice);

  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(dismiss, 3200);
    return () => clearTimeout(timeout);
  }, [notice, dismiss]);

  if (!notice) return null;

  return (
    <View className="absolute bottom-24 left-5 right-5 z-50 flex-row items-center rounded-lg bg-secondary px-4 py-3">
      <Feather name="info" size={19} color={colors.primary} />
      <Text accessibilityLiveRegion="polite" className="ml-3 flex-1 text-sm leading-5 text-white">{notice}</Text>
      <Pressable accessibilityLabel="Dismiss message" hitSlop={10} onPress={dismiss}>
        <Feather name="x" size={18} color={colors.surface} />
      </Pressable>
    </View>
  );
}
