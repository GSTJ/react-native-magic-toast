import type { ModalChildren, ModalHandle } from "magic-modal";

import { magicModal } from "magic-modal";

/**
 * Shows a toast with the given component.
 *
 * @param component The component to be shown.
 * @returns The {@link ModalHandle} magic-modal hands back, untouched.
 *
 * Awaiting it resolves when the toast leaves the screen — auto-hide, swipe, or
 * an explicit `hide()` — with `{ reason }`, plus `data` when the toast hid
 * itself through `useMagicModal().hide(data)`.
 *
 * ```tsx
 * const { reason } = await magicToast.show(() => <MyToast />);
 * ```
 *
 * The handle is that promise with `modalID`, `update()` and `hide()` hanging
 * off it, so a toast can be driven while it is still up:
 *
 * ```tsx
 * const toast = magicToast.show(() => <UploadToast progress={0} />);
 * toast.update(() => <UploadToast progress={50} />);
 * toast.hide();
 * ```
 *
 * Those extras live on the promise object, so anything that adopts the handle
 * hands back a plain promise without them. Returning it from an `async`
 * function is the common way to lose them:
 *
 * ```tsx
 * // `modalID`, `update` and `hide` are gone from what the caller receives.
 * const notify = async () => magicToast.show(() => <MyToast />);
 * ```
 *
 * Return the handle from a non-async function, or await it where you show it.
 */
export const show = <T,>(component: ModalChildren): ModalHandle<T> =>
  magicModal.show<T>(component, {
    swipeDirection: "up",
    hideBackdrop: true,
    style: { justifyContent: "flex-start" },
  });
