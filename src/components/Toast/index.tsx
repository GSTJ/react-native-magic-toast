import React, { useEffect } from 'react';
import { View, ViewProps, TextProps, Text } from 'react-native';
import { magicModal } from 'react-native-magic-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

export const TOAST_TEST_ID = 'magic-toast';

interface ContainerProps extends ViewProps {
  duration?: number;
}

/**
 * The container of the toast. It is responsible for hiding the toast after a
 * certain amount of time.
 * @param props.duration The duration of the toast.
 * @example
 *  <Toast.Container duration={3000}>
 *    <Toast.Message>My message</Toast.Message>
 *  </Toast.Container>
 */
const Container: React.FC<ContainerProps> = ({ duration = 3000, ...props }) => {
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    const timeout = setTimeout(magicModal.hide, duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  return (
    <View
      testID={TOAST_TEST_ID}
      {...props}
      style={[styles.container, { paddingTop: 25 + top }, props.style]}
    />
  );
};

/**
 * A default Toast message component to help you get started.
 * @example
 *  <Toast.Container duration={3000}>
 *    <Toast.Message>My message</Toast.Message>
 *  </Toast.Container>
 */
const Message: React.FC<TextProps> = (props) => (
  <Text {...props} style={[styles.message, props.style]} />
);

export const Toast = {
  Container,
  Message,
};
