import React from 'react';
import { magicModal } from 'react-native-magic-modal';
import { MagicToast } from '../MagicToast';

export const alert = (message: string, duration?: number) =>
  magicModal.show(() => <MagicToast message={message} duration={duration} />, {
    swipeDirection: 'up',
    hasBackdrop: false,
    coverScreen: false,
    style: { justifyContent: 'flex-start' },
    animationIn: 'fadeInDown',
    animationOut: 'fadeOutUp',
  });
