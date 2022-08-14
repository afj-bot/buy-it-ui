import React from "react"
import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"

import { PUBLIC_ROUTES, AUTH_TOKEN_ATTRIBUTE, ANONYMOUS_ATTRIBUTE } from "../../constants"

const AuthenticateClosedRoute = ({ children }) => {
  if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) !== null && localStorage.getItem(ANONYMOUS_ATTRIBUTE) !== "true") {
    return (
      <Navigate to={PUBLIC_ROUTES.DASHBOARD} replace={true} />
    )
  }
  return children
}

AuthenticateClosedRoute.propTypes = {
  children: PropTypes.node
}

export default AuthenticateClosedRoute
