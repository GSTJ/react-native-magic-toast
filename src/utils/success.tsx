import type { ModalHandle } from "magic-modal";

import React from "react";

import { SuccessToast } from "../components/success-toast";
import { show } from "./show";

/**
 * Shows the default success toast.
 *
 * @param message The message to be shown.
 * @param duration The duration of the toast.
 * @returns The {@link ModalHandle} from {@link show}. Awaiting it resolves with
 * `{ reason }` once the toast is off screen; `modalID`, `update()` and `hide()`
 * hang off the same object. See {@link show} for the full contract.
 */
export const success = (
  message: string,
  duration?: number,
): ModalHandle<void> =>
  show<void>(() => <SuccessToast message={message} duration={duration} />);
