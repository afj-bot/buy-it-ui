import React from "react";
import { render, screen } from "@testing-library/react";
import Form from "../Form";
import "@testing-library/jest-dom";

import PlaceIcon from "@mui/icons-material/Place";
let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

const elementsMap = [
  {
    row: (<div data-testid="test"/>),
  },
  {
    row: (<div data-testid="test2"/>),
  },
];

test("Handle login click event", async () => {
  render(<Form title="title" titleIcon={PlaceIcon} elementsMap={elementsMap} isLoading={false}/>);

  expect(screen.getByTestId("test")).toBeVisible();
  expect(screen.getByTestId("test2")).toBeVisible();
});
