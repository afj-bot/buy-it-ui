import React, { useState, createElement, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuIcon from '@mui/icons-material/Menu'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import { LocalizeContext } from '../../../../service/providers/LocalizeProvider'
import './MenuMobile.css'

const MenuMobile = ({ items, login, cartItems, isShowLogin }) => {
  const [open, setOpen] = useState(false)
  const { getKeyValue } = useContext(LocalizeContext)

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen((prevOpen) => !prevOpen)
  }

  return (
        <div>
            <React.Fragment>
                <IconButton onClick={toggleDrawer()}>
                    <MenuIcon style={{ fontSize: '40px', margin: 'auto' }}/>
                </IconButton>
                <Drawer
                    open={open}
                    onClose={toggleDrawer()}
                >
                    <Box
                        sx={{ width: 250 }}
                         role="presentation"
                        onClick={toggleDrawer()}
                        onKeyDown={toggleDrawer()}
                    >
                        <List style={{ marginTop: '2%' }}>
                            {items.map((item) => (
                                <ListItem key={item.value} disablePadding>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemButton component={Link} to={item.link}>
                                        <ListItemText className="sidebar-text" primary={getKeyValue(item.value)} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        {isShowLogin && <><Divider />
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {createElement(login.icon)}
                            </ListItemIcon>
                            <ListItemButton component={Link} to={login.link}>
                                <ListItemText className="sidebar-text" primary={getKeyValue(login.value)} />
                            </ListItemButton>
                        </ListItem></>}
                        <Divider />
                        {cartItems.map((item) => (
                                <ListItem key={item.value} disablePadding>
                                    <ListItemIcon>
                                        {createElement(item.icon)}
                                    </ListItemIcon>
                                    <ListItemButton component={Link} to={item.link}>
                                        <ListItemText className="sidebar-text" primary={getKeyValue(item.value)} />
                                    </ListItemButton>
                                </ListItem>
                        ))}
                    </Box>
                </Drawer>
            </React.Fragment>
        </div>

  )
}

MenuMobile.propTypes = {
  items: PropTypes.array.isRequired,
  login: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
  isShowLogin: PropTypes.bool.isRequired
}

export default MenuMobile
