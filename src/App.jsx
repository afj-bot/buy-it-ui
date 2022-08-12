import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Header from './components/header/Header'

const App = ({ children }) => {
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
