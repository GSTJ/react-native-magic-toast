import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SuccessIcon } from '../assets/SuccessIcon';
import { Toast } from './Toast';

import type { MagicToastProps } from 'src/@types/MagicToastProps';

export const SuccessToast: React.FC<MagicToastProps> = ({
  message,
  duration,
}) => {
  return (
    <Toast.Container style={styles.container} duration={duration}>
      <StatusBar barStyle="light-content" />
      <SuccessIcon fill="white" width={25} height={25} />
      <Toast.Message>{message}</Toast.Message>
    </Toast.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00af98',
    gap: 10,
  },
});
