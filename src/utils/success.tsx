import React from 'react';
import { show } from './show';
import { SuccessToast } from '../components/SuccessToast';

/**
 * Shows the default success toast.
 * @param message The message to be shown.
 * @param duration The duration of the toast.
 */
export const success = (message: string, duration?: number) =>
  show(() => <SuccessToast message={message} duration={duration} />);
