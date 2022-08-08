import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'

const MainRouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
            <Link to='/signup'>123</Link>
        </div>
    )
}

export default MainRouter