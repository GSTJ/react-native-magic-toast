import React, { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { magicModal } from 'react-native-magic-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlertIcon } from './assets/AlertIcon';
import { styles } from './MagicToast.styles';

export const TOAST_TEST_ID = 'magic-toast';

export interface IMagicToast {
  message: string;
  duration?: number;
}

export const MagicToast: React.FC<IMagicToast> = ({
  message,
  duration = 3000,
}) => {
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    const timeout = setTimeout(magicModal.hide, duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  return (
    <View
      testID={TOAST_TEST_ID}
      style={[styles.container, { paddingTop: 25 + top }]}
    >
      <StatusBar barStyle="light-content" />
      <AlertIcon fill="white" width={20} height={20} style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
