import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

interface MagicToastStyles {
  container: ViewStyle;
  message: TextStyle;
}

export const styles = StyleSheet.create<MagicToastStyles>({
  container: {
    backgroundColor: colors.background,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  message: {
    color: colors.foreground,
    fontWeight: 'bold',
  },
});
