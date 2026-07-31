import { alert } from "./utils/alert";
import { show } from "./utils/show";
import { success } from "./utils/success";

export type { MagicToastProps } from "./@types/magic-toast-props";
export type {
  ToastContainerProps,
  ToastMessageProps,
} from "./components/Toast";

/**
 * The pieces a custom toast is built from.
 *
 * `Toast.Container` owns the duration and the placement, so a component handed
 * to `magicToast.show` needs it to take itself off screen. `Toast.Message` is
 * the default text style and is optional.
 *
 * `TOAST_TEST_ID` is the `testID` on the container, for asserting a toast is up
 * without matching on its wording.
 *
 * @example
 * ```tsx
 * import { Toast, magicToast } from "react-native-magic-toast";
 *
 * magicToast.show(() => (
 *   <Toast.Container duration={1000}>
 *     <MyCustomIcon />
 *     <Toast.Message>My custom toast</Toast.Message>
 *   </Toast.Container>
 * ));
 * ```
 */
export { Toast, TOAST_TEST_ID } from "./components/Toast";

export const magicToast = {
  alert,
  success,
  show,
};
