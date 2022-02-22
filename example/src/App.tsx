import * as React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { magicToast } from 'react-native-magic-toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MagicModalPortal } from 'react-native-magic-modal';

export default function App() {
  React.useEffect(() => {
    magicToast.alert('It works!!');
  }, []);

  return (
    <SafeAreaProvider>
      <MagicModalPortal />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => magicToast.alert('Oops! Something went wrong 😬')}
        >
          <Text style={styles.buttonText}>Press me!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
