import type { ModalHandle } from "magic-modal";

import React from "react";

import { AlertToast } from "../components/alert-toast";
import { show } from "./show";

/**
 * Shows the default alert toast.
 *
 * @param message The message to be shown.
 * @param duration The duration of the toast.
 * @returns The {@link ModalHandle} from {@link show}. Awaiting it resolves with
 * `{ reason }` once the toast is off screen; `modalID`, `update()` and `hide()`
 * hang off the same object. See {@link show} for the full contract.
 */
export const alert = (message: string, duration?: number): ModalHandle<void> =>
  show<void>(() => <AlertToast message={message} duration={duration} />);
