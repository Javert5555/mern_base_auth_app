import React from 'react'
import { Navigate, Outlet, useLocation,  } from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute = () => {
    const location = useLocation()
    return (
        auth.isAuthenticated() ?
        <Outlet /> :
        <Navigate to='/signin' state={{ from: location }} />
    )
}

export default PrivateRoute