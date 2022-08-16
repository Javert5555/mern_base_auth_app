import { Button, Card, CardActions, CardContent, Icon, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import auth from './../auth/auth-helper'
import { read, update } from './api-user'

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

const EditProfile = () => {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: '',
        redirectToProfile: false
    })

    const jwt = auth.isAuthenticated()
    const params = useParams()

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        read({
            userId: params.userId
        }, {t: jwt.token}, signal).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, name: data.name, email: data.email })
            }
        })
        return () => abortController.abort()
    }, [params.userId])

    const handleChange = name => ({ target }) => {
        setValues({...values, [name]: target.value })
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        update({
            userId: params.userId
        }, {t: jwt.token}, user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, userId: data._id, redirectToProfile: true })
            }
        })
        
    }

    if (values.redirectToProfile) {
        return <Navigate to={`/user/${values.userId}`} replace />
    }

    return (
        <StylizedCard>
            <CardContent>
                <StylizedTypographyTitle>
                    Edit Profile
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
    )
}

export default EditProfile