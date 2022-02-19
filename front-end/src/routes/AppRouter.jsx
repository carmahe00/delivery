import React from 'react'
import {
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginPage from '../pages/LoginPage';
import ProtectedRouter from './ProtectedRouter';
import PublicRoute from './PublicRoute';
import Home from '../pages/Home';
import { ROLES } from '../utils/roles.type';
import CityPage from '../pages/admin/CityPage';
import UserPage from '../pages/admin/UserPage';
import UserPageProvider from '../pages/coordinate/UserPageProvider';
import UserPageHome from '../pages/coordinate/UserPageHome';
import ProtectedRouterProv from './ProtectedRouterProv';
import Desktop from '../pages/Provider/Desktop';

const AppRouter = () => {
    const { userInfo } = useSelector(state => state.userLogin)

    return (
        <Routes>
            <Route element={<PublicRoute user={userInfo} />} >
                <Route path="/" index element={<LoginPage />} />
            </Route>
            <Route path="admin" element={<ProtectedRouter isAuthenticated={!!userInfo} roles={[ROLES.admin]} />}  >
                <Route path="home" index element={<Home />} />
                <Route path="ciudades" element={<CityPage />} />
                <Route path="usuarios" element={<UserPage />} />

            </Route>

            <Route path="user" element={<ProtectedRouter isAuthenticated={!!userInfo} roles={[ROLES.thirdcoordinator]} />}  >
                <Route path="home" index element={<Home />} />

                <Route path="usuarios" element={<><h1>usuarios</h1></>} />
                <Route path="usuarios/proveedores" element={<UserPageProvider />} />
                <Route path="usuarios/domiciliarios" element={<UserPageHome />} />

                <Route path="recargas" element={<><h1>recargas</h1></>} />
                <Route path="recargas/proveedores" element={<><h1>proveedores recargas</h1></>} />
                <Route path="recargas/domiciliarios" element={<><h1>domiciliarios recargas</h1></>} />
            </Route>

            <Route path="provider" element={<ProtectedRouterProv isAuthenticated={!!userInfo} roles={[ROLES.provider]} />} >
                <Route index element={<Desktop />} />
                <Route path="historial" element={<h1>Historial</h1>} />
            </Route>
            <Route
                path="*"
                element={<Navigate to="/" />}
            />
        </Routes>
    )
}

export default AppRouter
