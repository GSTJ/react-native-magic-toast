![React Native Magic Toast Cover](https://user-images.githubusercontent.com/50031755/182908210-860f7e09-a644-4a74-8000-46f7f5bbf01e.png)

# React Native Magic Toast 🦄

A beautiful Toast library that can be called imperatively from anywhere!

| IOS                                                                                                                           | Android                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/GSTJ/react-native-magic-toast/assets/50031755/a9fb45ca-b199-4dcb-9c91-3b5564fbb1af" height=600/> | <img src="https://user-images.githubusercontent.com/50031755/155205325-d5f4c239-90b6-432b-9753-afe19d64695c.gif" height=600/> |

## Installation

```sh
npx expo install react-native-magic-toast react-native-magic-modal react-native-safe-area-context react-native-reanimated react-native-gesture-handler react-native-worklets
```

This toast uses [react-native-magic-modal](https://github.com/GSTJ/react-native-magic-modal) as a base for displaying it anywhere. [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) is here to prevent the modal message from being underneath safe areas.

magic-modal v7 sets the floor for the whole stack:

| Package                        | Minimum |
| ------------------------------ | ------- |
| react                          | 18      |
| react-native                   | 0.81    |
| react-native-reanimated        | 4       |
| react-native-gesture-handler   | 2.20    |
| react-native-worklets          | 0.5     |
| react-native-safe-area-context | 5       |

Reanimated 4 needs its Babel plugin. `babel-preset-expo` adds it for you; outside Expo, put `react-native-worklets/plugin` last in the plugin list of your `babel.config.js`.

If your app can't move to RN 0.81 yet, stay on `react-native-magic-toast@0.4.x`, which tracks magic-modal v4.

## Usage

Insert a SafeAreaProvider encapsulating your app and a MagicModalPortal right beneath it

```js
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MagicModalPortal } from "react-native-magic-modal";

export default function App() {
  return (
    <SafeAreaProvider>
      <MagicModalPortal />
      // <Router />
    </SafeAreaProvider>
  );
}
```

Then, you are free to use the magicToast as shown from anywhere you want.

```js
import { magicToast } from "react-native-magic-toast";

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](LICENSE.md)

Made with 💖 by [Gabriel Taveira](https://github.com/GSTJ)
