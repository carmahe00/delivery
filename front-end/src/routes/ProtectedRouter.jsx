import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Header from '../components/ui/Header';

const ProtectedRouter = ({ isAuthenticated, roles }) => {
    const location = useLocation();

    return isAuthenticated ?

        <>
            <Header />
            <Outlet />
        </> : <Navigate to="/" state={{ from: location }} />
}

export default ProtectedRouter
