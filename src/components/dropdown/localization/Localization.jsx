import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import './Localization.css'

const Localization = ({ country, setCountry }) => {
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)

  const countries = [
    {
      code: 'UA',
      label: 'Ukrainian'
    },
    {
      code: 'GB',
      label: 'English'
    },
    {
      code: 'HU',
      label: 'Hungarian'
    }
  ]

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event, code) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
    if (code) {
      setCountry(code.toLowerCase())
    }
  }

  function handleListKeyDown (event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const prevOpen = React.useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
        <div className='localization-item'>
          <div className='localization-button'>
            <IconButton
            data-testid='open-localization'
            ref={anchorRef}
            aria-haspopup='true'
            onClick={handleToggle}
            >
            <img
              data-testid='default-image'
              loading='lazy'
              className='image'
              src={`https://flagcdn.com/w20/${country}.png`}
              srcSet={`https://flagcdn.com/w40/${country}.png 2x`}
              alt=''
            />
            </IconButton>
          </div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          transition
          disablePortal
        >
            {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    onKeyDown={handleListKeyDown}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} onClick={(e) => handleClose(e, country.code)}>
                        <IconButton data-testid={`select-${country.code.toLowerCase()}`}>
                            <img
                                loading='lazy'
                                className='image'
                                src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                alt=''
                            />
                        </IconButton>
                      </MenuItem>
                    ))}

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
            )}
        </Popper>
        </div>
  )
}

Localization.propTypes = {
  country: PropTypes.string,
  setCountry: PropTypes.func.isRequired
}

export default Localization
