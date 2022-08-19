import React from "react";
import { render, screen } from "@testing-library/react";
import PlaceIcon from "@mui/icons-material/Place";

import Comunication from "../Comunication";

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

test("Render the comnunication ", async () => {
  render(<Comunication title="title" subtitle="subtitle" icon={PlaceIcon}/>);
  expect(screen.getByTestId("title")).toBeVisible();
  expect(screen.getByTestId("subtitle")).toBeVisible();
  expect(screen.getByTestId("icon-title")).toBeVisible();
});
