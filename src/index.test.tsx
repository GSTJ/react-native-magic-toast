import React from "react";

import { render, act } from "@testing-library/react-native";
import { MagicModalPortal } from "magic-modal";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TOAST_TEST_ID } from "./components/Toast";
import { magicToast } from "./index";

describe("MagicToast", () => {
  it("renders an alert toast", () => {
    const component = render(
      <SafeAreaProvider>
        <MagicModalPortal />
      </SafeAreaProvider>,
    );

    expect(component.queryByTestId(TOAST_TEST_ID)).toBeFalsy();

    act(() => {
      magicToast.alert("Taveira");
    });

    expect(component).toMatchSnapshot();
    expect(component.queryByTestId(TOAST_TEST_ID)).toBeTruthy();
  });

  it("renders a success toast", () => {
    const component = render(
      <SafeAreaProvider>
        <MagicModalPortal />
      </SafeAreaProvider>,
    );

    expect(component.queryByTestId(TOAST_TEST_ID)).toBeFalsy();

    act(() => {
      magicToast.success("Taveira");
    });

    expect(component).toMatchSnapshot();
    expect(component.queryByTestId(TOAST_TEST_ID)).toBeTruthy();
  });
});
