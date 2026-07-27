import type { MagicToastProps } from "../@types/magic-toast-props";

import React from "react";
import { StatusBar } from "react-native";

import { AlertIcon } from "../assets/alert-icon";
import { colors } from "../colors";
import { Toast } from "./Toast";

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
