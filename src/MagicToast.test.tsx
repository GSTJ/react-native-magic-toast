import React from 'react';
import { render, act } from '@testing-library/react-native';
import { MagicModalPortal } from 'react-native-magic-modal';
import { magicToast } from './index';
import { TOAST_TEST_ID } from './MagicToast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

describe('MagicToast', () => {
  it('renders correctly', async () => {
    const component = render(
      <SafeAreaProvider>
        <MagicModalPortal />
      </SafeAreaProvider>
    );

    expect(component.queryByTestId(TOAST_TEST_ID)).toBeFalsy();

    act(() => {
      magicToast.alert('Taveira');
    });

    expect(component).toMatchSnapshot();
    expect(component.queryByTestId(TOAST_TEST_ID)).toBeTruthy();
  });
});
