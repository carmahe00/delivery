import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types';

const PublicRoute = ({ user = null }) => {

    return !user ? (
        <>
            <Outlet />
        </>)
        : user.usuario.rol === "ADMINISTRADOR" ?
            <Navigate to="/admin/home" /> :
            <Navigate to="/user/home" />
    
}

export default PublicRoute


PublicRoute.propTypes = {

    user: PropTypes.object
}