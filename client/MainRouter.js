import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Home from './core/Home'

const MainRouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<Home />} />
            </Routes>
        </div>
    )
}

export default MainRouter