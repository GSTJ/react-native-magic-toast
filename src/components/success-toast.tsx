import type { MagicToastProps } from "../@types/magic-toast-props";

import React from "react";
import { StatusBar, StyleSheet } from "react-native";

import { SuccessIcon } from "../assets/success-icon";
import { colors } from "../colors";
import { Toast } from "./Toast";

export const SuccessToast: React.FC<MagicToastProps> = ({
  message,
  duration,
}) => {
  return (
    <Toast.Container style={styles.container} duration={duration}>
      <StatusBar barStyle="light-content" />
      <SuccessIcon fill={colors.foreground} width={25} height={25} />
      <Toast.Message>{message}</Toast.Message>
    </Toast.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.successBackground,
    gap: 10,
  },
});
