import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { create } from './api-user'

const StylizedCard = styled(Card)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(14),
    paddingBottom: theme.spacing(2)
}))

const StylizedIconError = styled(Icon)(({ theme }) => ({
    verticalAlign: 'middle'
}))

const StylizedTypographyTitle = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
}))

const StylizedTextField = styled(TextField)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
}))

const StylizedButtonSubmit = styled(Button)(({ theme }) => ({
    margin: 'auto',
    marginBottom: theme.spacing(2)
}))

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    })

    const handleChange = name => ({ target }) => { // name in this function - is the name of the input field
        setValues({...values, [name]: target.value })
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
        }
        create(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error})
            } else {
                setValues({ ...values, error: '', open: true})
            }
        })
    }

    return (
        <Box>
            <StylizedCard>
                <CardContent>
                    <StylizedTypographyTitle>
                        Sign Up
                    </StylizedTypographyTitle>
                    <StylizedTextField id='name' label='Name' value={values.name} onChange={handleChange('name')} margin='normal' />
                    <StylizedTextField id='email' type='email' label='Email' value={values.email} onChange={handleChange('email')} margin='normal' />
                    <StylizedTextField id='password' type='password' label='Password' value={values.password} onChange={handleChange('password')} margin='normal' />
                    <br /> {
                        values.error && (<Typography component='p' color='error'>
                            <StylizedIconError color='error'>error</StylizedIconError>
                        {values.error}</Typography>)
                    }
                </CardContent>
                <CardActions>
                    <StylizedButtonSubmit color='primary' variant='contained' onClick={clickSubmit}>Submit</StylizedButtonSubmit>
                </CardActions>
            </StylizedCard>
            <Dialog
                open={values.open}
                onClose={(event, reason) => {
                    if(reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        setOpen(false)
                    }
                }}
            >
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to='/signin'>
                        <Button color='primary' autoFocus='autoFocus' variant='contained'>
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </Box>
    )

}

export default Signup