import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import './Loader.css'

const Loading = ({ open, text = 'Wait ...' }) => {
  const [isOpen, setIsOpen] = React.useState(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
        <Dialog open={isOpen}>
            <DialogTitle
                className="loader-title"
                id="loader-title"
                data-test-id="loader-title"
            >
                <span className="loader-title-text">{text}</span>
            </DialogTitle>
            <DialogContent>
                <Grid container justifyContent="center">
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
  )
}

Loading.propTypes = {
  open: PropTypes.bool,
  text: PropTypes.string
}

export default Loading
