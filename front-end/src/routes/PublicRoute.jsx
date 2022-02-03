import React from 'react'
import {  Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types';

const PublicRoute = ({ isAuthenticated  }) => {
    
    return !isAuthenticated ? (
        <>
            <Outlet />
        </>)
        : <Navigate to="/user/home" />
    
}

export default PublicRoute


PublicRoute.propTypes = {
    
    isAuthenticated: PropTypes.bool.isRequired
}