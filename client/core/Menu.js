import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import auth from '../auth/auth-helper'

const isActive = (location, path) => {
    return location?.pathname === path ?
        {color: '#ff4081'} :
        {color: '#ffffff'}
}

const Menu = () => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <Typography variant='h6' color='inherit'>
                        MERN Skeleton
                    </Typography>
                    <Link to='/'>
                        <IconButton aria-label='Home' style={isActive(location, '/')}>
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <Link to='/users'>
                        <Button style={isActive(location, '/users')}>
                            Users
                        </Button>
                    </Link>
                    {
                        !auth.isAuthenticated() && (<Box component='span'>
                            <Link to='/signup'>
                                <Button style={isActive(location, '/signup')}>
                                    Sign up
                                </Button>
                            </Link>
                            <Link to='/signin'>
                                <Button style={isActive(location, '/signin')}>
                                    Sign in
                                </Button>
                            </Link>
                        </Box>)
                    }
                    {
                        auth.isAuthenticated() && (<Box component='span'>
                            <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                                <Button style={isActive(location, `/user/${auth.isAuthenticated().user._id}`)}>
                                    My Profile
                                </Button>
                            </Link>
                            <Button
                                color='inherit'
                                onClick={() => {
                                    auth.clearJWT(() => navigate('/', { replace: true }))
                                }}
                            >
                                Sign out
                            </Button>
                        </Box>)
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Menu