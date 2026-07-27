import React from "react";

import { AlertToast } from "../components/alert-toast";
import { show } from "./show";

/**
 * Shows the default alert toast.
 * @param message The message to be shown.
 * @param duration The duration of the toast.
 */
export const alert = (message: string, duration?: number) =>
  show(() => <AlertToast message={message} duration={duration} />);
