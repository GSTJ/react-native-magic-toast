![React Native Magic Toast Cover](https://user-images.githubusercontent.com/50031755/182908210-860f7e09-a644-4a74-8000-46f7f5bbf01e.png)

# React Native Magic Toast 🦄

A beautiful Toast library that can be called imperatively from anywhere!

| IOS                                                                                                                           | Android                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/GSTJ/react-native-magic-toast/assets/50031755/a9fb45ca-b199-4dcb-9c91-3b5564fbb1af" height=600/> | <img src="https://user-images.githubusercontent.com/50031755/155205325-d5f4c239-90b6-432b-9753-afe19d64695c.gif" height=600/> |

## Installation

```sh
npx expo install react-native-magic-toast magic-modal react-native-safe-area-context react-native-reanimated react-native-gesture-handler react-native-screens react-native-worklets
```

This toast uses [magic-modal](https://github.com/GSTJ/magic-modal) as a base for displaying it anywhere. [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) is here to prevent the modal message from being underneath safe areas.

magic-modal v10 sets the floor for the whole stack:

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

Install magic-modal yourself and keep one copy of it. Your application mounts the portal, and this package calls into the same module instance; a second copy has a portal ref nothing ever fills.

Older versions of this package depended on `react-native-magic-modal`, which is the same library under its previous name. Uninstall it once nothing else in your tree imports it.

If your app can't move to RN 0.81 yet, stay on `react-native-magic-toast@0.4.x`, which tracks magic-modal v4.

Web is out of scope here. `magic-modal` itself runs in the browser — import it directly and render your own toast component through it.

## Usage

Mount `MagicModalPortal` inside a `GestureHandlerRootView`, with a `SafeAreaProvider` around it so toasts can read the top inset:

```js
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

The gesture root is required on native. The portal owns the swipe surface a toast is dismissed with, and gesture handling needs a root view above it.

Then, you are free to use the magicToast as shown from anywhere you want.

One ordering rule: `SafeAreaProvider` renders `null` until it has measured its
insets, so `MagicModalPortal` is not mounted during the first commit. Calling
`magicToast` from the mount effect of the component that renders the provider
throws `MagicModalPortal not found`. `initialMetrics={initialWindowMetrics}`,
as above, covers iOS and Android; on web it is null and does nothing, so there
call the toast from a component below the portal.

```jsx
import { Toast, magicToast } from "react-native-magic-toast";

// ...

magicToast.alert("Oops! Something went wrong 😬");
magicToast.success("Hurray! Saved successfully");

// You can also use the show method to render a custom toast
magicToast.show(() => (
  /**
   * Toast.Container is obligatory as it handles the duration, but you are free
   * to customize the View as you wish. You can change the default background color,
   * padding, everything! The rest of the components are optional and just help you
   * to build a toast faster.
   */
  <Toast.Container duration={1000}>
    <MyCustomIcon />
    <Toast.Message>My custom toast</Toast.Message>
  </Toast.Container>
));
```

`Toast.Container` takes every `View` prop on top of `duration`, and
`Toast.Message` every `Text` prop, so the look is yours to override.
`ToastContainerProps` and `ToastMessageProps` are exported for components that
wrap them. `TOAST_TEST_ID` is the container's `testID`, for asserting a toast is
up in tests without matching on its wording.

## The handle a toast hands back

Every one of `alert`, `success` and `show` returns magic-modal's `ModalHandle` as-is.

Await it to find out when, and why, the toast left the screen:

```js
import { MagicModalHideReason } from "magic-modal";

const { reason } = await magicToast.success("Saved");

if (reason === MagicModalHideReason.SWIPE_COMPLETE) {
  // the user swiped it away before it timed out
}
```

Or keep it, and drive the toast while it is still up:

```js
const toast = magicToast.show(() => <UploadToast progress={0} />);

toast.update(() => <UploadToast progress={50} />);
toast.hide(); // takes it off screen now
toast.modalID; // identifies this entry in the stack
```

`update`, `hide` and `modalID` hang off the promise object, so anything that
adopts the handle hands the caller a plain promise without them. Returning it
from an `async` function is the usual way to lose them:

```js
// `modalID`, `update` and `hide` are gone from what the caller receives.
const notify = async () => magicToast.success("Saved");
```

Return the handle from a normal function, or await it where you show the toast.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](LICENSE.md)

Made with 💖 by [Gabriel Taveira](https://github.com/GSTJ)
