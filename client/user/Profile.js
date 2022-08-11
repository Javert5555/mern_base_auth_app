import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, styled, Typography } from '@mui/material'
import { Person } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import auth from './../auth/auth-helper'
import { read } from './api-user'
import DeleteUser from './DeleteUser';

const StylizedRootPaper = styled(Paper)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
}))

const StylizedTypographyTitle = styled(Typography)(({ theme }) => ({
    // marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
}))

const Profile = () => {
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()

    const params = useParams()


    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            userId: params.userId
        }, {t: jwt.token}, signal).then(data => {
            if (data.error) {
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })
        return () => abortController.abort()
    }, [params.userId])

    if (redirectToSignin) {
        return <Navigate to='/signin' />
    }

    return (
        <StylizedRootPaper elevation={4}>
            <StylizedTypographyTitle variant='h6'>
                Profile
            </StylizedTypographyTitle>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />{
                        auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
                        (<ListItemSecondaryAction>
                            <Link to={`/user/edit/${user._id}`}>
                                <IconButton aria-label='Edit' color='primary'>
                                    <EditIcon />
                                </IconButton>
                            </Link>
                            <DeleteUser userId={user._id} />
                        </ListItemSecondaryAction>)
                    }
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={`Joined: ${(new Date(user.created)).toDateString()}`} />
                </ListItem>
            </List>
        </StylizedRootPaper>
    )
}

export default Profile