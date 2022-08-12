import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

import { PUBLIC_ROUTES, AUTH_TOKEN_ATTRIBUTE } from '../../constants'

const PublicRoute = ({ children }) => {
  if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) !== null) {
    return (
      <Navigate to={PUBLIC_ROUTES.DASHBOARD} replace={true} />
    )
  }
  return children
}

PublicRoute.propTypes = {
  children: PropTypes.node
}

export default PublicRoute
