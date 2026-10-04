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

  it("shows the alert message text", () => {
    const component = render(
      <SafeAreaProvider>
        <MagicModalPortal />
      </SafeAreaProvider>,
    );

    act(() => {
      magicToast.alert("Something went wrong");
    });

    expect(component.queryByText("Something went wrong")).toBeTruthy();
  });

  it("shows the success message text", () => {
    const component = render(
      <SafeAreaProvider>
        <MagicModalPortal />
      </SafeAreaProvider>,
    );

    act(() => {
      magicToast.success("All done");
    });

    expect(component.queryByText("All done")).toBeTruthy();
  });
});
