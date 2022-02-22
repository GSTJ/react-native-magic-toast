import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IMagicToastStyles {
  container: ViewStyle;
  message: TextStyle;
  icon: ViewStyle;
}

export const styles = StyleSheet.create<IMagicToastStyles>({
  container: {
    backgroundColor: '#191919',
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 15,
  },
});
