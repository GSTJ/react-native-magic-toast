import type { ModalHandle } from "magic-modal";

import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MagicModalPortal } from "magic-modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toast, magicToast } from "react-native-magic-toast";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

const colors = {
  button: "#000000",
  buttonText: "#ffffff",
  customToast: "#3b2f63",
  customToastText: "#ffffff",
  result: "#666666",
};

/**
 * A toast of the app's own, to show what `magicToast.show` takes: any
 * component, rendered by the portal with the toast's swipe and placement.
 *
 * `Toast.Container` is the piece that owns the duration, so the toast does not
 * need a timer of its own. Everything about the look is overridden here through
 * ordinary `View` props.
 */
const CustomToast = () => (
  <Toast.Container duration={3000} style={styles.customToast}>
    <Toast.Message style={styles.customToastText}>
      A toast of my own 🎨
    </Toast.Message>
  </Toast.Container>
);

/**
 * The demo screen. `MagicModalPortal` is a sibling below it, which is fine:
 * the portal's ref is attached during the commit, before this component's
 * effect runs.
 *
 * `initialMetrics` is what makes that true on the very first commit —
 * `SafeAreaProvider` renders `null` until it has measured its insets, and a
 * `null` provider has no portal under it to find. It covers iOS and Android,
 * and does nothing on web, where `initialWindowMetrics` is null.
 */
const Demo = () => {
  const [result, setResult] = React.useState("—");
  const dismissals = React.useRef(0);

  /**
   * Awaits a handle and reports why that toast went away. Numbered, because
   * consecutive toasts often leave for the same reason and the line has to
   * visibly change when one does.
   */
  const track = React.useCallback(async (handle: ModalHandle<void>) => {
    const { reason } = await handle;
    dismissals.current += 1;
    setResult(`#${dismissals.current} ${reason}`);
  }, []);

  // Fired, not tracked: the reported reason belongs to whatever the person
  // watching does next, and awaiting this one here would settle it for them.
  React.useEffect(() => {
    magicToast.success("It works!!");
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => track(magicToast.alert("Oops! Something went wrong 😬"))}
      >
        <Text style={styles.buttonText}>Press me to fire an alert!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => track(magicToast.success("Hurray! It works 🎉"))}
      >
        <Text style={styles.buttonText}>Press me to fire a success toast!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => track(magicToast.show<void>(CustomToast))}
      >
        <Text style={styles.buttonText}>Press me to fire a custom toast!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // A ten second toast, taken off screen after one. `hide` hangs off
          // the handle, so the caller can close a toast it opened.
          const toast = magicToast.success("Hiding this early…", 10_000);
          void track(toast);
          setTimeout(() => toast.hide(), 1000);
        }}
      >
        <Text style={styles.buttonText}>Press me to hide a toast early!</Text>
      </TouchableOpacity>

      <Text style={styles.result}>last dismissal: {result}</Text>
    </View>
  );
};

const App = () => (
  <GestureHandlerRootView style={styles.root}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Demo />
      <MagicModalPortal />
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
  customToast: {
    backgroundColor: colors.customToast,
    justifyContent: "center",
  },
  customToastText: {
    color: colors.customToastText,
    fontWeight: "bold",
  },
  result: {
    color: colors.result,
    marginTop: 10,
  },
});
