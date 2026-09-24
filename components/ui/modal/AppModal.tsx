import { Modal, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { IconButton } from '@/components/ui/icon-button/IconButton';

interface AppModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function AppModal({ visible, title, onClose, children }: AppModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-secondary/40">
        <Pressable className="flex-1" onPress={onClose} accessibilityLabel="Close modal" />
        <View className="rounded-t-[20px] bg-white p-5 pb-8">
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-secondary">{title}</Text>
            <IconButton
              accessibilityLabel="Close"
              icon={<Feather name="x" size={22} color={colors.secondary} />}
              onPress={onClose}
            />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}
