import React from 'react'
import { Route,  } from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute = ({ path, element }) => (
    auth.isAuthenticated() ?
    <Route path={path} element={element} /> :
    <Route path='*' element={<Navigate to='/signin' state={{ from: location }} replace />} />
)

export default PrivateRoute