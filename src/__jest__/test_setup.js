import React from 'react'
import {render} from '@testing-library/react'
import { LocalizeProvider } from '../service/providers/LocalizeProvider';

const resource = {
    "login.form.title": "Log In",
    "login.form.forgot.password.button": "Forgot password",
    "login.form.button": "Log In",
    "login.form.username.input": "Username",
    "login.form.button.tooltip": "Fill password/username to login",
    "login.form.password.input": "Password",
    "login.form.forgot.password.tooltip": "Forgot your password?"
}

const AllTheProviders = ({children}) => {
  return (
      <LocalizeProvider resource={resource}>
        {children}
      </LocalizeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}