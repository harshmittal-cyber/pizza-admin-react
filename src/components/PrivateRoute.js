import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.userReducer)

    return isAuthenticated ? <Outlet /> : < Navigate to='/login' />
}

export default PrivateRoute