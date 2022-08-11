import { Button, Card, CardActions, CardContent, Icon, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { signin } from './api-auth'
import auth from './auth-helper'

const StylizedCard = styled(Card)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
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

const Signin = () => {

    const location = useLocation()

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })

    const clickSubmit = () => {

        const user = {
            email: values.email || undefined,
            password: values.password || undefined,
        }

        signin(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error})
            } else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '', redirectToReferrer: true })
                })
            }
        })
    }

    const handleChange = name => ({ target }) => {
        setValues({ ...values, [name]: target.value })
    }

    const pathname = useLocation().state?.form?.pathname || '/'
    
    const { redirectToReferrer } = values
    if (redirectToReferrer) {
        return <Navigate to={pathname} replace />
    }

    return (
        <StylizedCard>
            <CardContent>
                <StylizedTypographyTitle>
                    Sign In
                </StylizedTypographyTitle>
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
    )
}

export default Signin