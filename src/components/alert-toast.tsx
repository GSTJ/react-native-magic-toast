import React from 'react';
import { StatusBar } from 'react-native';
import { AlertIcon } from '../assets/alert-icon';
import { Toast } from './Toast';
import { colors } from '../colors';

import type { MagicToastProps } from '../@types/magic-toast-props';

export const AlertToast: React.FC<MagicToastProps> = ({
  message,
  duration,
}) => {
  return (
    <Toast.Container duration={duration}>
      <StatusBar barStyle="light-content" />
      <AlertIcon fill={colors.foreground} width={20} height={20} />
      <Toast.Message>{message}</Toast.Message>
    </Toast.Container>
  );
};
