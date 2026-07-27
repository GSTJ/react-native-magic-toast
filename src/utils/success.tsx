import React from "react";

import { SuccessToast } from "../components/success-toast";
import { show } from "./show";

/**
 * Shows the default success toast.
 * @param message The message to be shown.
 * @param duration The duration of the toast.
 */
export const success = (message: string, duration?: number) =>
  show(() => <SuccessToast message={message} duration={duration} />);
