import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Footer from '../components/ui/Footer';
import Header from '../components/ui/Header';

const ProtectedRouter = ({ isAuthenticated, roles }) => {
    const location = useLocation();

    return isAuthenticated ?

        <>
            <Header />
            <Outlet />
            <Footer />
        </> : <Navigate to="/" state={{ from: location }} />
}

export default ProtectedRouter
