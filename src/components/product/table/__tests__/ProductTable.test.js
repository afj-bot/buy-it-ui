import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import ProductTable from "../ProductTable";
import { BrowserRouter } from "react-router-dom";
import { LocalizeContext } from "../../../../service/providers/LocalizeProvider";
import axios from "../../../../service/api/axios";
import resource from "../../../../__jest__/localize.json";
import response from "../../../../__jest__/productResponseMock.json";

import "@testing-library/jest-dom";

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

test("Load products in the product table", async () => {
  const axiosPost = jest.spyOn(axios, "get");
  const products = JSON.parse(JSON.stringify(response));
  const firstProduct = products.content[0];
  axiosPost.mockImplementation(() => {
    return Promise.resolve({ data: products, status: 200 });
  });
  render(
      <LocalizeContext.Provider value={contextValue} >
          <ProductTable />
      </LocalizeContext.Provider>, { wrapper: BrowserRouter }
  );

  await waitForElementToBeRemoved(screen.getByTestId("loader-title"));
  expect(screen.getByTestId("header").textContent).toEqual(firstProduct.name);
  expect(screen.getByTestId("price").textContent).toEqual(firstProduct.price);
  expect(screen.getByTestId("description").textContent).toEqual(firstProduct.description);
  expect(screen.getByTestId("category").textContent).toEqual(firstProduct.category.name);
  expect(screen.getByTestId("subcategory").textContent).toEqual(firstProduct.category.subCategory.name);
});
