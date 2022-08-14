import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Localization from "../Localization"

import "@testing-library/jest-dom"

let container = null
beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  container.remove()
  container = null
})

test("Load and display localization drop down with GB", async () => {
  const setCountry = jest.fn()
  render(<Localization country="gb" setCountry={setCountry} />)
  const localization = screen.getByTestId("default-image")
  expect(localization.src).toEqual("https://flagcdn.com/w20/gb.png")
})

test("Check if the drop down change country", async () => {
  const setCountry = jest.fn()
  render(<Localization country="ua" setCountry={setCountry} />)
  fireEvent.click(screen.getByTestId("open-localization"))
  const uaIconButton = screen.getByTestId("select-ua")
  fireEvent.click(uaIconButton)
  expect(setCountry).toBeCalled()
  const localization = screen.getByTestId("default-image")
  expect(localization.src).toEqual("https://flagcdn.com/w20/ua.png")
})

test("Check if the drop down can be closed", async () => {
  const setCountry = jest.fn()
  render(<Localization country="ua" setCountry={setCountry} />)
  fireEvent.click(screen.getByTestId("open-localization"))
  fireEvent.click(screen.getByTestId("open-localization"))
  expect(screen.getByTestId("select-ua")).not.toBeVisible()
})

test("Check if the drop down can be closed on Tab", async () => {
  const setCountry = jest.fn()
  render(<Localization country="ua" setCountry={setCountry} />)
  fireEvent.click(screen.getByTestId("open-localization"))
  userEvent.tab()
  expect(screen.getByTestId("select-ua")).not.toBeVisible()
})

test("Check if the drop down can be closed on Escape", async () => {
  const setCountry = jest.fn()
  render(<Localization country="ua" setCountry={setCountry} />)
  fireEvent.click(screen.getByTestId("open-localization"))
  userEvent.keyboard("[Escape]")
  expect(screen.getByTestId("select-ua")).not.toBeVisible()
})
