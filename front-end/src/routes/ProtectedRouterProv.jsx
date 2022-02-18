import { Box } from '@mui/material';
import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import ModalSolicitud from '../components/ModalSolicitud';
import Footer from '../components/ui/Footer';

import Header from '../components/ui/Header';
import { SocketProvider } from '../context/SocketProvider';

const ProtectedRouterProv = ({ isAuthenticated, roles }) => {
    const location = useLocation();

    return isAuthenticated ?

        <>
            <Header />
            <SocketProvider>
                <Box sx={{ flexDirection: 'column', flexWrap: 'wrap', height: '100vh' }} >
                    <Outlet />
                </Box>
                <ModalSolicitud />
            </SocketProvider>
            <Footer />
        </> : <Navigate to="/" state={{ from: location }} />
}

export default ProtectedRouterProv
