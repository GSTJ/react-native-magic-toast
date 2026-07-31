import type { ViewProps, TextProps } from "react-native";

import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { useMagicModal } from "magic-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles } from "./styles";

export const TOAST_TEST_ID = "magic-toast";

/** Props of {@link Toast.Container}. Every `View` prop, plus `duration`. */
export type ToastContainerProps = {
  /** How long the toast stays up, in milliseconds. Defaults to 3000. */
  duration?: number;
} & ViewProps;

/** Props of {@link Toast.Message}. A `Text`, styled for the toast. */
export type ToastMessageProps = TextProps;

/**
 * The container of the toast. It is responsible for hiding the toast after a
 * certain amount of time.
 * @param props.duration The duration of the toast.
 * @example
 *  <Toast.Container duration={3000}>
 *    <Toast.Message>My message</Toast.Message>
 *  </Toast.Container>
 */
const Container: React.FC<ToastContainerProps> = ({
  duration = 3000,
  ...props
}) => {
  const { top } = useSafeAreaInsets();
  const { hide } = useMagicModal();

  useEffect(() => {
    const timeout = setTimeout(() => hide(), duration);
    return () => clearTimeout(timeout);
  }, [duration, hide]);

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
const Message: React.FC<ToastMessageProps> = (props) => (
  <Text {...props} style={[styles.message, props.style]} />
);

export const Toast = {
  Container,
  Message,
};
