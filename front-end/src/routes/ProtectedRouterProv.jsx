import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import ModalSolicitud from '../components/ModalSolicitud';

import Header from '../components/ui/Header';
import { SocketProvider } from '../context/SocketProvider';

const ProtectedRouterProv = ({ isAuthenticated, roles }) => {
    const location = useLocation();

    return isAuthenticated ?

        <>
            <Header />
            <SocketProvider>
                <Outlet />
                <ModalSolicitud />
            </SocketProvider>
            
        </> : <Navigate to="/" state={{ from: location }} />
}

export default ProtectedRouterProv
