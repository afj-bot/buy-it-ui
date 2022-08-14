import React, { useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';

const LocalizationDropDown = ({country, setCountry }) => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const countries = [
        {
          code: "UA",
          label: "Ukrainian"
        },
        {
          code: "GB",
          label: "English"
        },
        {
          code: "HU",
          label: "Hungarian"
        }
      ]

      
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };

      const handleClose = (event, code) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
        setCountry(code.toLowerCase());
      };
    
      function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        } else if (event.key === 'Escape') {
          setOpen(false);
        }
      }
    
      const prevOpen = React.useRef(open);
      React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus();
        }
    
        prevOpen.current = open;
      }, [open]);

    return (
        <>
        <IconButton
          ref={anchorRef}
          aria-haspopup="true"
          onClick={handleToggle}
          data-testid="open-localization"
        >
          <img 
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${country}.png`}
              srcSet={`https://flagcdn.com/w40/${country}.png 2x`}
              alt=""
              data-testid="default-image"
          />
        </IconButton>
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
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {countries.map((country) => (
                        <IconButton 
                          key={country.code}
                          data-testid={`select-${country.code.toLowerCase()}`} 
                          onClick={(e) => handleClose(e, country.code)}>
                            <img 
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                alt=""
                            />
                        </IconButton>
                    ))}
                
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </>
    )
}

export default LocalizationDropDown;