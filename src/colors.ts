/**
 * The toast palette.
 *
 * `react-native/no-color-literals` bans colour strings written inline in a
 * `StyleSheet`, which is a good excuse to keep the three colours this library
 * paints with in one place instead of three.
 */
export const colors = {
  /** Background of the default (alert) toast. */
  background: "#191919",
  /** Background of the success toast. */
  successBackground: "#00af98",
  /** Message text and icon fill, on either background. */
  foreground: "white",
} as const;
