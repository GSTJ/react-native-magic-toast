import React from 'react';
import { show } from './show';
import { AlertToast } from '../components/AlertToast';

/**
 * Shows the default alert toast.
 * @param message The message to be shown.
 * @param duration The duration of the toast.
 */
export const alert = (message: string, duration?: number) =>
  show(() => <AlertToast message={message} duration={duration} />);
