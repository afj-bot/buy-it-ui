import React, { useEffect } from "react"
import PropTypes from "prop-types"
import "./App.css"
import { ANONYMOUS_ATTRIBUTE, AUTH_TOKEN_ATTRIBUTE, OK } from "./constants"
import Header from "./components/header/Header"
import apiInstance from "./service/api/axios"
import AuthService from "./service/api/AuthService"

const App = ({ children }) => {
  useEffect(() => {
    async function getAnonymous () {
      if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) === null) {
        const cookieResponse = await AuthService.getCookie()
        if (cookieResponse.status === OK) {
          const tokenResponse = await AuthService.authorize()
          localStorage.setItem(AUTH_TOKEN_ATTRIBUTE, tokenResponse.data.token)
          localStorage.setItem(ANONYMOUS_ATTRIBUTE, "true")
        }
      }
    }

    getAnonymous()
    if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) !== null) {
      const token = localStorage.getItem(AUTH_TOKEN_ATTRIBUTE)
      apiInstance.defaults.headers.Authorization = `Bearer ${token}`
    }
  }, [])

  return (
    <>
      <Header />
      {children}
    </>
  )
}

App.propTypes = {
  children: PropTypes.node
}

export default App
