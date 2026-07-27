import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MagicModalPortal } from "react-native-magic-modal";
import { magicToast } from "react-native-magic-toast";
import { SafeAreaProvider } from "react-native-safe-area-context";

const colors = {
  button: "#000000",
  buttonText: "#ffffff",
};

const App = () => {
  React.useEffect(() => {
    magicToast.success("It works!!");
  }, []);

  return (
    <SafeAreaProvider>
      <MagicModalPortal />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => magicToast.alert("Oops! Something went wrong 😬")}
        >
          <Text style={styles.buttonText}>Press me to fire an alert!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => magicToast.success("Hurray! It works 🎉")}
        >
          <Text style={styles.buttonText}>
            Press me to fire a success toast!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.button,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: "bold",
  },
});
