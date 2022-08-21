import React from "react";
import { render, screen } from "@testing-library/react";
import Title from "../Title";
import PlaceIcon from "@mui/icons-material/Place";

import "@testing-library/jest-dom";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

test("Check the title renders correct", async () => {
  render(<Title text="title" icon={PlaceIcon} />);

  expect(screen.getByTestId("title-text")).toBeVisible();
  expect(screen.getByTestId("title-icon")).toBeVisible();
});
