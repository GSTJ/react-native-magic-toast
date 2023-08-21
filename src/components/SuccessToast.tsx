import React from 'react';
import { StatusBar } from 'react-native';
import { SuccessIcon } from '../assets/SuccessIcon';
import { Toast } from './Toast';

import type { MagicToastProps } from 'src/@types/MagicToastProps';

export const SuccessToast: React.FC<MagicToastProps> = ({
  message,
  duration,
}) => {
  return (
    <Toast.Container duration={duration}>
      <StatusBar barStyle="light-content" />
      <SuccessIcon fill="white" width={20} height={20} />
      <Toast.Message>{message}</Toast.Message>
    </Toast.Container>
  );
};
