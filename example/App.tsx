import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MagicModalPortal } from "react-native-magic-modal";
import { magicToast } from "react-native-magic-toast";
import { SafeAreaProvider } from "react-native-safe-area-context";

const colors = {
  button: "#000000",
  buttonText: "#ffffff",
};

/**
 * The demo screen, rendered below `MagicModalPortal` so the portal is mounted
 * by the time this component's effect runs.
 *
 * Firing the first toast from the component that renders `SafeAreaProvider`
 * does not work. The provider renders `null` until it has its insets, so
 * `MagicModalPortal` has not mounted yet and `magicModal.show` throws
 * "MagicModalPortal not found". `initialMetrics` covers that on iOS and
 * Android and does nothing on web, where `initialWindowMetrics` is null.
 */
const Demo = () => {
  React.useEffect(() => {
    magicToast.success("It works!!");
  }, []);

  return (
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
        <Text style={styles.buttonText}>Press me to fire a success toast!</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => (
  <SafeAreaProvider>
    <MagicModalPortal />
    <Demo />
  </SafeAreaProvider>
);

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
