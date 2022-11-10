import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../LoginForm";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { LocalizeContext } from "../../../../service/providers/LocalizeProvider";
import axios from "../../../../service/api/axios";
import resource from "../../../../__jest__/localize.json";

const mock = (key) => {
  return resource ? resource[`${key}`] : "";
};

const contextValue = {
  resource,
  getKeyValue: mock,
};

test("Handle login click event", async () => {
  const axiosPost = jest.spyOn(axios, "post");
  axiosPost.mockImplementation(() => {
    return Promise.resolve({ data: JSON.parse("{\"token\": \"asdasda\"}"), status: 200 });
  });
  render(
    <LocalizeContext.Provider value={contextValue} >
        <LoginForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "42" } });
  fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "42" } });
  fireEvent.click(screen.getByTestId("login"));

  await waitFor(async () => {
    expect(axiosPost).toBeCalled();
  });
});

test("Check the button disabled if password empty", async () => {
  render(
    <LocalizeContext.Provider value={contextValue} >
        <LoginForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "42" } });
  expect(screen.getByTestId("login")).toBeDisabled();
});

test("Check the button disabled if username empty", async () => {
  render(
    <LocalizeContext.Provider value={contextValue} >
        <LoginForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "42" } });
  expect(screen.getByTestId("login")).toBeDisabled();
});

test.skip("Check the forgot password button", async () => {
  render(
    <LocalizeContext.Provider value={contextValue} >
        <LoginForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.click(screen.getByTestId("forgot-password"));
  expect(screen.getByText("Link to /forgot-password")).toBeInTheDocument();
});

test("Handle error", async () => {
  const axiosPost = jest.spyOn(axios, "post");
  axiosPost.mockImplementation(() => {
    return Promise.resolve({
      data: JSON.parse("{\"response\":\"Failed\",\"error\":[{\"message\":\"error.username-password.invalid\"}]}"),
      status: 401,
    });
  });
  render(
    <LocalizeContext.Provider value={contextValue} >
        <LoginForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "42" } });
  fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "42" } });
  fireEvent.click(screen.getByTestId("login"));
  await waitFor(() => {
    expect(screen.getByTestId("username").firstChild).toHaveClass("Mui-error");
  }, { timeout: 5000 });
});
