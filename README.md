<p align="center">
  <img
    alt="A success toast, an alert toast and a custom toast opening and timing out in the example app"
    src="https://assets.gabrieltaveira.dev/react-native-magic-toast/demo.gif"
    width="320"
  />
</p>

<p align="center">Call a toast from anywhere in a React Native app and await the reason it left the screen.</p>

<p align="center">
  <a aria-label="npm version" href="https://www.npmjs.com/package/react-native-magic-toast"><img alt="npm version" src="https://shieldcn.dev/npm/react-native-magic-toast.svg?variant=branded&amp;size=xs&amp;mode=light" /></a>
  <a aria-label="npm downloads" href="https://www.npmjs.com/package/react-native-magic-toast"><img alt="npm downloads" src="https://shieldcn.dev/npm/react-native-magic-toast/downloads.svg?variant=branded&amp;size=xs&amp;mode=light" /></a>
  <a aria-label="GitHub stars" href="https://github.com/GSTJ/react-native-magic-toast/stargazers"><img alt="GitHub stars" src="https://shieldcn.dev/github/GSTJ/react-native-magic-toast/stars.svg?variant=branded&amp;size=xs&amp;mode=light" /></a>
  <a aria-label="license" href="https://github.com/GSTJ/react-native-magic-toast/blob/master/LICENSE"><img alt="license" src="https://shieldcn.dev/github/GSTJ/react-native-magic-toast/license.svg?variant=branded&amp;size=xs&amp;mode=light" /></a>
</p>

<p align="center">
  <a href="https://magic-modal.gabrieltaveira.dev/docs/">magic-modal docs</a> | <a href="https://github.com/GSTJ/react-native-magic-toast/issues">Issues</a> | <a href="CONTRIBUTING.md">Contributing</a>
</p>

## How it works

1. [magic-modal](https://github.com/GSTJ/magic-modal) renders the stack. Mount `MagicModalPortal` once, near the root.
2. `magicToast.alert`, `.success` and `.show` each push one entry and hand back the handle magic-modal returns.
3. `Toast.Container` runs the timer that hides it.

```jsx
import { magicToast } from "react-native-magic-toast";

magicToast.alert("Something went wrong");
magicToast.success("Saved");
```

`magicToast.show` takes a component for anything else.

## Installation

```sh
npx expo install react-native-magic-toast magic-modal react-native-safe-area-context react-native-reanimated react-native-gesture-handler react-native-screens react-native-worklets
```

Install `magic-modal` yourself and keep one copy of it. Your app mounts the portal and this package calls into the same module instance. A second copy leaves you with a portal ref nothing ever fills. [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) keeps the message clear of the status bar.

magic-modal v10 requires these minimums:

| Package                        | Minimum |
| ------------------------------ | ------- |
| react                          | 18      |
| react-native                   | 0.81    |
| react-native-reanimated        | 4.1     |
| react-native-gesture-handler   | 2.20    |
| react-native-screens           | 4.19    |
| react-native-worklets          | 0.5     |
| react-native-safe-area-context | 5       |

Reanimated 4 needs its Babel plugin. `babel-preset-expo` adds it for you; outside Expo, put `react-native-worklets/plugin` last in the plugin list of your `babel.config.js`.

If your app can't move to RN 0.81 yet, stay on `react-native-magic-toast@0.4.x`, which tracks magic-modal v4.

Older versions of this package depended on `react-native-magic-modal`, the same library under its previous name. Uninstall it once nothing else in your tree imports it.

On the web, use magic-modal directly and render your own toast component through it.

## Setup

Mount `MagicModalPortal` inside a `GestureHandlerRootView`, with a `SafeAreaProvider` around it:

```jsx
import { MagicModalPortal } from "magic-modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        {/* <Router /> */}
        <MagicModalPortal />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

`GestureHandlerRootView` is required on native: the swipe that takes a toast off screen is a gesture handler and needs a root view above the portal.

`SafeAreaProvider` renders `null` until it has measured its insets, so on the first commit there's no portal under it to find, and `magicToast` called from the mount effect of the component that renders the provider throws `MagicModalPortal not found`. `initialWindowMetrics` covers iOS and Android. On the web it's null and does nothing; call the toast from a component below the portal instead.

## Custom toasts

`magicToast.show` renders any component through the same portal, with the same swipe and placement:

```jsx
import { Toast, magicToast } from "react-native-magic-toast";

const UploadFailed = () => (
  <Toast.Container duration={5000} style={{ backgroundColor: "#3b2f63" }}>
    <MyCustomIcon />
    <Toast.Message style={{ fontStyle: "italic" }}>
      Upload failed, we'll retry
    </Toast.Message>
  </Toast.Container>
);

magicToast.show(UploadFailed);
```

A custom toast needs `Toast.Container`, which hides it when `duration` runs out. It takes every `View` prop on top of `duration`, and `Toast.Message` takes every `Text` prop. `ToastContainerProps` and `ToastMessageProps` are exported for components that wrap either one. `TOAST_TEST_ID` is the container's `testID`, for tests that assert a toast is up by ID.

## The handle

`alert`, `success` and `show` all return magic-modal's `ModalHandle`.

Await it to find out when the toast left and why:

```jsx
import { MagicModalHideReason } from "magic-modal";

const { reason } = await magicToast.success("Saved");

if (reason === MagicModalHideReason.SWIPE_COMPLETE) {
  // swiped away before it timed out
}
```

Or keep it, and drive the toast while it's still up:

```jsx
const toast = magicToast.show(() => <UploadToast progress={0} />);

toast.update(() => <UploadToast progress={50} />);
toast.hide(); // takes it off screen now
toast.modalID; // identifies this entry in the stack
```

`update`, `hide` and `modalID` hang off the promise object itself. Return the handle from an `async` function and the caller receives that function's own promise instead:

```jsx
// `modalID`, `update` and `hide` are gone from what the caller receives.
const notify = async () => magicToast.success("Saved");
```

Return the handle from a normal function, or await it where you show the toast.

## Contributing

See the [contributing guide](CONTRIBUTING.md) for the development workflow.

## License

react-native-magic-toast is licensed under the [MIT License](LICENSE).
