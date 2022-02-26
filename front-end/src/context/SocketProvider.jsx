import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pedidosErr, pedidosRecive } from '../actions/pedidosActions';


import { useSocket } from '../hooks/useSocket';


export const SocketContext = createContext();

const baseUrl = process.env.REACT_APP_API_URL_BASE
export const SocketProvider = ({ children }) => {

    const { socket, online, desconectarSocket } = useSocket(baseUrl);
    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (!userInfo)
            desconectarSocket()
    }, [userInfo, desconectarSocket])

    useEffect(() => {
        socket?.on('lista-domicilios', domicilios => {
            dispatch(pedidosRecive(domicilios, userInfo.usuario.id_usuario))
        })
    }, [socket, dispatch])

    useEffect(()=>{
        socket?.on('error-solicitud', error => {
            dispatch(pedidosErr(error))
        })
    })

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}