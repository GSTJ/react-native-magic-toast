import React from 'react';
import { render, act } from '@testing-library/react-native';
import { MagicModalPortal } from 'react-native-magic-modal';
import { magicToast } from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TOAST_TEST_ID } from './components/Toast';

describe('MagicToast', () => {
  it('renders alerts correctly', async () => {
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

  it('renders success correctly', async () => {
    const component = render(
      <SafeAreaProvider>
        <MagicModalPortal />
      </SafeAreaProvider>
    );

    expect(component.queryByTestId(TOAST_TEST_ID)).toBeFalsy();

    act(() => {
      magicToast.success('Taveira');
    });

    expect(component).toMatchSnapshot();
    expect(component.queryByTestId(TOAST_TEST_ID)).toBeTruthy();
  });
});
