import { magicModal } from 'react-native-magic-modal';
import type { ModalChildren } from 'react-native-magic-modal/lib/typescript/utils/magicModalHandler';

/**
 * Shows a toast with the given component.
 * @param component The component to be shown.
 */
export const show = (component: ModalChildren) =>
  magicModal.show(component, {
    swipeDirection: 'up',
    hasBackdrop: false,
    coverScreen: false,
    style: { justifyContent: 'flex-start' },
    animationIn: 'fadeInDown',
    animationOut: 'fadeOutUp',
  });
