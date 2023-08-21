import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface MagicToastStyles {
  container: ViewStyle;
  message: TextStyle;
}

export const styles = StyleSheet.create<MagicToastStyles>({
  container: {
    backgroundColor: '#191919',
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  message: {
    color: 'white',
    fontWeight: 'bold',
  },
});
