import type { IconProps } from "../@types/icon-props";

import type { ViewStyle } from "react-native";

import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../colors";

/**
 * A check mark.
 *
 * It is one `View` with two of its four borders drawn, turned 45°: the right
 * and bottom edges of a box become the short and long strokes of a tick. Every
 * measurement is a fraction of `size`, so the stroke stays in proportion at any
 * size.
 */
export const SuccessIcon = ({
  size = 25,
  color = colors.foreground,
}: IconProps) => {
  const box: ViewStyle = { width: size, height: size };

  const tick: ViewStyle = {
    width: size * 0.36,
    height: size * 0.66,
    // Rotating about the centre of the box leaves the tick sitting low, since
    // the stroke only occupies two of the four edges. This lifts it back onto
    // the optical centre.
    marginTop: -size * 0.1,
    borderColor: color,
    borderRightWidth: size * 0.12,
    borderBottomWidth: size * 0.12,
  };

  return (
    <View style={[styles.box, box]}>
      <View style={[styles.tick, tick]} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  tick: {
    transform: [{ rotate: "45deg" }],
  },
});
