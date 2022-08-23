import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "../RegistrationForm";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { LocalizeContext } from "../../../../service/providers/LocalizeProvider";
import axios from "../../../../service/api/axios";

const resource =
{
  "registration.form.title": "Registration",
  "registration.form.or.text": "or",
  "registration.form.login.button": "Login",
  "error.password.confirm": "Password and confirm password should be the same",
  "registration.form.password.input": "Your password",
  "registration.form.confirm-password.input": "Confirm your password",
  "registration.form.privacy.link": "privacy policy",
  "registration.form.privacy.text": "I accept",
  "error.email.field": "Email should match pattern '*@domain.com'",
  "error.password.weak": "Password should have a capital letter and one number",
  "error.required.field": "This field is required",
  "registration.form.username.input": "Your username",
  "registration.form.button.tooltip": "Fill all field to registered",
  "error.password.less": "Password should be more than 8 symbols",
  "registration.form.button": "Register",
  "registration.form.email.input": "Your email",
};

const mock = (key) => {
  return resource ? resource[`${key}`] : "";
};

const contextValue = {
  resource,
  getKeyValue: mock,
};

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

test("Registration form - Handle login click event", async () => {
  const axiosPost = jest.spyOn(axios, "post");
  axiosPost.mockImplementation(() => {
    return Promise.resolve({ data: "\"token\": \"asdasda", status: 200 });
  });
  render(
    <LocalizeContext.Provider value={contextValue} >
        <RegistrationForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.change(screen.getByPlaceholderText("Your username"), { target: { value: "username" } });
  fireEvent.change(screen.getByPlaceholderText("Your email"), { target: { value: "username@mail.com" } });
  fireEvent.change(screen.getByPlaceholderText("Your password"), { target: { value: "Test123$" } });
  fireEvent.change(screen.getByPlaceholderText("Confirm your password"), { target: { value: "Test123$" } });
  fireEvent.click(screen.getByTestId("privacy-policy-checkbox"));

  expect(screen.getByTestId("registration")).toBeEnabled();
  fireEvent.click(screen.getByTestId("registration"));

  await waitFor(async () => {
    expect(axiosPost).toBeCalled();
  });
});

test("Registration form - Check the button disabled if only username is filled", async () => {
  render(
    <LocalizeContext.Provider value={contextValue} >
      <RegistrationForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.change(screen.getByPlaceholderText("Your username"), { target: { value: "username" } });
  expect(screen.getByTestId("registration")).toBeDisabled();
});

test("Registration form - Check the button disabled if only email is filled", async () => {
  render(
    <LocalizeContext.Provider value={contextValue} >
      <RegistrationForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.change(screen.getByPlaceholderText("Your email"), { target: { value: "test@mail.com" } });
  expect(screen.getByTestId("registration")).toBeDisabled();
});

test("Registration form - Check the button disabled if only password is filled", async () => {
  render(
    <LocalizeContext.Provider value={contextValue} >
      <RegistrationForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.change(screen.getByPlaceholderText("Your password"), { target: { value: "Test123$" } });
  expect(screen.getByTestId("registration")).toBeDisabled();
});

test("Registration form - Check the button disabled if only confirm password is filled", async () => {
  render(
    <LocalizeContext.Provider value={contextValue} >
      <RegistrationForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.change(screen.getByPlaceholderText("Confirm your password"), { target: { value: "Test123$" } });
  expect(screen.getByTestId("registration")).toBeDisabled();
});

test("Registration form - Check the error message", async () => {
  render(
    <LocalizeContext.Provider value={contextValue} >
      <RegistrationForm />
    </LocalizeContext.Provider>,
    { wrapper: BrowserRouter });
  fireEvent.change(screen.getByPlaceholderText("Your username"), { target: { value: "Test123$" } });
  fireEvent.change(screen.getByPlaceholderText("Your username"), { target: { value: "" } });
  expect(screen.getByText("This field is required")).toBeVisible();
});
