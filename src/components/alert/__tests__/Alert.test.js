import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Alert from "../Alert";
import { AlertContext } from "../../../service/providers/AlertProvider";

import "@testing-library/jest-dom";

const showAlert = jest.fn();
const closeAlert = jest.fn();

test("Load and display success alert", async () => {
  const contextValue = {
    alert: {
      message: "Alert test",
      open: true,
      severity: "success",
      duration: 1000,
    },
    showAlert,
    closeAlert,
  };
  render(<AlertContext.Provider value={contextValue}><Alert /></AlertContext.Provider>);
  const alert = screen.getByTestId("alert-success");
  expect(alert).toBeVisible();
});

test("Load and display error alert", async () => {
  const contextValue = {
    alert: {
      message: "Alert test",
      open: true,
      severity: "error",
      duration: 1000,
    },
    showAlert,
    closeAlert,
  };
  render(<AlertContext.Provider value={contextValue}><Alert /></AlertContext.Provider>);
  const alert = screen.getByTestId("alert-error");
  expect(alert).toBeVisible();
});

test("Load and not display success alert", async () => {
  const contextValue = {
    alert: {
      message: "Alert test",
      open: false,
      severity: "success",
      duration: 1000,
    },
    showAlert,
    closeAlert,
  };
  const { container } = render(<AlertContext.Provider value={contextValue}><Alert /></AlertContext.Provider>);
  expect(container.innerHTML).not.toContain("Alert test");
});

test("Close success alert", async () => {
  const contextValue = {
    alert: {
      message: "Alert test",
      open: true,
      severity: "success",
      duration: 1000,
    },
    showAlert,
    closeAlert,
  };
  render(<AlertContext.Provider value={contextValue}><Alert /></AlertContext.Provider>);
  fireEvent.click(screen.getByTitle("Close"));
  expect(closeAlert).toBeCalled();
});

test("Wait for auto close success alert", async () => {
  const contextValue = {
    alert: {
      message: "Alert test",
      open: true,
      severity: "success",
      duration: 1000,
    },
    showAlert,
    closeAlert,
  };
  render(<AlertContext.Provider value={contextValue}><Alert /></AlertContext.Provider>);
  await waitFor(() => expect(closeAlert).toHaveBeenCalledTimes(1), { timeout: 5000 });
});
