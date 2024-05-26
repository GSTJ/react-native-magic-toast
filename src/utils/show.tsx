import { ModalChildren, magicModal } from 'react-native-magic-modal';

/**
 * Shows a toast with the given component.
 * @param component The component to be shown.
 */
export const show = (component: ModalChildren) =>
  magicModal.show(component, {
    swipeDirection: 'up',
    hideBackdrop: true,
    style: { justifyContent: 'flex-start' },
  });
