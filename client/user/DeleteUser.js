import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import auth from '../auth/auth-helper'
import { remove } from './api-user'

const DeleteUser = ({ userId }) => {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const jwt = auth.isAuthenticated()

    const clickButton = () => {
        setOpen(true)
    }

    const deleteAccount = () => {
        remove({
            userId: userId
        }, {t: jwt.token}).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                auth.clearJWT(() => console.log('deleted'))
                setRedirect(true)
            }
        })
    }

    const handleRequestClose = () => {
        setOpen(false)
    }

    if (redirect) {
        return <Navigate to='/' />
    }

    return (
        <Box component='span'>
            <IconButton aria-label='Delete' onClick={clickButton} color='secondary'>
                <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>{'Delete account'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete your account.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={deleteAccount} color='secondary' autoFocus='autoFocus'>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
}

export default DeleteUser