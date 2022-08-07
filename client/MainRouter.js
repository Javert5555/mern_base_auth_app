import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'

const MainRouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/users' element={<Users />} />
            </Routes>
            <Link to={'/users'}>123</Link>
        </div>
    )
}

export default MainRouter