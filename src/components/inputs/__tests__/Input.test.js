import React from "react";
import  { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input";

import '@testing-library/jest-dom'

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

test('Handle input filled value', async () => {
    const handleInput = jest.fn();
    render(<Input placeholder="Input" id="input" type="text" error={false} changeFunction={handleInput} />);
    const input = screen.queryByPlaceholderText("Input");
    fireEvent.change(input, { target: { value: "42" } });
    expect(handleInput).toBeCalled();
});
