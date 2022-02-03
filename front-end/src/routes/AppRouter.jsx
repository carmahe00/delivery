import React from 'react'
import {
    Route,
    Routes
} from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginPage from '../pages/LoginPage';
import ProtectedRouter from './ProtectedRouter';
import PublicRoute from './PublicRoute';
import Home from '../pages/Home';

const AppRouter = () => {
    const { userInfo } = useSelector(state => state.userLogin)
    return (
        <Routes>
            <Route element={<PublicRoute isAuthenticated={!!userInfo} />} >
                <Route path="/" index element={<LoginPage />} />
            </Route>
            <Route path="user" element={<ProtectedRouter isAuthenticated={!!userInfo} />}  >
                <Route path="home" element={<Home />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
