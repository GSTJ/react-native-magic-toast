import React from "react";

import { render, act } from "@testing-library/react-native";
import { MagicModalPortal } from "magic-modal";
import { SafeAreaProvider } from "react-native-safe-area-context";

import * as publicApi from "./index";
import { magicToast, Toast, TOAST_TEST_ID } from "./index";

/**
 * The README has documented `Toast.Container` since the first release, and it
 * was never exported — the example in it could not compile. These tests are
 * here so the entry point cannot quietly lose a name again.
 */
describe("public API", () => {
  it("exports exactly the documented surface", () => {
    // Sorted, so the failure message on a change reads as a diff of names
    // rather than of positions.
    expect(Object.keys(publicApi).sort()).toStrictEqual([
      "TOAST_TEST_ID",
      "Toast",
      "magicToast",
    ]);
  });

  it("exposes the three toast functions", () => {
    expect(Object.keys(magicToast).sort()).toStrictEqual([
      "alert",
      "show",
      "success",
    ]);
  });

  it("exposes the toast building blocks", () => {
    expect(Object.keys(Toast).sort()).toStrictEqual(["Container", "Message"]);
    expect(TOAST_TEST_ID).toBe("magic-toast");
  });

  it("renders the README's custom toast through the exported pieces", () => {
    const component = render(
      <SafeAreaProvider>
        <MagicModalPortal />
      </SafeAreaProvider>,
    );

    expect(component.queryByTestId(TOAST_TEST_ID)).toBeFalsy();

    act(() => {
      magicToast.show(() => (
        <Toast.Container duration={1000}>
          <Toast.Message>My custom toast</Toast.Message>
        </Toast.Container>
      ));
    });

    expect(component.queryByTestId(TOAST_TEST_ID)).toBeTruthy();
    expect(component.queryByText("My custom toast")).toBeTruthy();
  });
});
