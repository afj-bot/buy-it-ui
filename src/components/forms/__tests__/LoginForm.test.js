import React from "react";
import  { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../LoginForm";
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import { LocalizeContext } from "../../../service/providers/LocalizeProvider";
import axios from "../../../service/api/axios";

const resource = {
    "login.form.title": "Log In",
    "login.form.forgot.password.button": "Forgot password",
    "login.form.button": "Log In",
    "login.form.username.input": "Username",
    "login.form.button.tooltip": "Fill password/username to login",
    "login.form.password.input": "Password",
    "login.form.forgot.password.tooltip": "Forgot your password?"
}

const mock = (key) => {
    return resource ? resource[`${key}`] : "";
}

const contextValue = {
    resource: resource,
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

test("Handle login click event", async () => {
    const axiosPost = jest.spyOn(axios, "post");
    axiosPost.mockImplementation(() => {
         return Promise.resolve({ data: '"token": "asdasda', status: 200});
    });
    render(
    <LocalizeContext.Provider value={contextValue} >
        <LoginForm />
    </LocalizeContext.Provider>,  
    {wrapper: BrowserRouter});
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "42" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "42" } });
    fireEvent.click(screen.getByTestId("login"));
    
    await waitFor( async () => {
        expect(axiosPost).toBeCalled();
    });
});

test("Check the button disabled if password empty", async () => {
    const axiosPost = jest.spyOn(axios, "post");
    axiosPost.mockImplementation(() => {
         return Promise.resolve({ data: '', status: 401});
    });
    render(
    <LocalizeContext.Provider value={contextValue} >
        <LoginForm />
    </LocalizeContext.Provider>,  
    {wrapper: BrowserRouter});
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "42" } });
    expect(screen.getByTestId("login")).toBeDisabled();
});

test("Check the button disabled if username empty", async () => {
    const axiosPost = jest.spyOn(axios, "post");
    axiosPost.mockImplementation(() => {
         return Promise.resolve({ data: '', status: 401});
    });
    render(
    <LocalizeContext.Provider value={contextValue} >
        <LoginForm />
    </LocalizeContext.Provider>,  
    {wrapper: BrowserRouter});
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "42" } });
    expect(screen.getByTestId("login")).toBeDisabled();
});

test.skip("Check the forgot password button", async () => {
    const axiosPost = jest.spyOn(axios, "post");
    axiosPost.mockImplementation(() => {
         return Promise.resolve({ data: '', status: 401});
    });
    render(
    <LocalizeContext.Provider value={contextValue} >
        <LoginForm />
    </LocalizeContext.Provider>,  
    {wrapper: BrowserRouter});
    fireEvent.click(screen.getByTestId("forgot-password"));
    expect(screen.getByText('Link to /forgot-password')).toBeInTheDocument();
});


test("Handle error", async () => {
    const axiosPost = jest.spyOn(axios, "post");
    axiosPost.mockImplementation(() => {
         return Promise.resolve({ data: '', status: 401});
    });
    render(
    <LocalizeContext.Provider value={contextValue} >
        <LoginForm />
    </LocalizeContext.Provider>,  
    {wrapper: BrowserRouter});
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "42" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "42" } });
    fireEvent.click(screen.getByTestId("login"))

    await waitFor( async () => {
        expect(screen.getByTestId("username").firstChild).toHaveClass("Mui-error");
    });
});