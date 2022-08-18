import React from "react";
import { render, screen } from "@testing-library/react";

import Payments from "../Payments";

import "@testing-library/jest-dom";

const visa = "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg";
const master = "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

test("Render the payments and check the 2 images", async () => {
  render(<Payments />);
  const localization = screen.getAllByTestId("payment");
  expect(localization.length).toEqual(2);
  expect(localization[0].src).toEqual(visa);
  expect(localization[1].src).toEqual(master);
});
