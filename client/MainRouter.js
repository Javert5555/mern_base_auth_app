import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Box } from '@mui/material'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import PrivateRoute from './auth/PrivateRoute'

const MainRouter = () => (
        <Box>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/user/edit/:userId' element={<PrivateRoute />}>
                    <Route path='/user/edit/:userId' element={<Users />} />
                </Route>
            </Routes>
            <Link to={'/signin'}>123</Link>
        </Box>
)

export default MainRouter