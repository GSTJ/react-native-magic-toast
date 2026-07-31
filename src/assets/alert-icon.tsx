import type { IconProps } from "../@types/icon-props";

import type { ViewStyle } from "react-native";

import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../colors";

/**
 * An exclamation mark: a rounded bar over a dot.
 *
 * Both are `View`s with a border radius of half their width, so the bar is a
 * stadium and the dot a circle. Every measurement is a fraction of `size`.
 */
export const AlertIcon = ({
  size = 20,
  color = colors.foreground,
}: IconProps) => {
  const stroke = size * 0.16;

  const box: ViewStyle = { width: size, height: size };

  const bar: ViewStyle = {
    width: stroke,
    height: size * 0.46,
    borderRadius: stroke / 2,
    backgroundColor: color,
  };

  const dot: ViewStyle = {
    width: stroke,
    height: stroke,
    borderRadius: stroke / 2,
    marginTop: size * 0.12,
    backgroundColor: color,
  };

  return (
    <View style={[styles.box, box]}>
      <View style={bar} />
      <View style={dot} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
});
