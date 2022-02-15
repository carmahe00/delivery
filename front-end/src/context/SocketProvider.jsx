import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pedidosRecive } from '../actions/pedidosActions';


import { useSocket } from '../hooks/useSocket';


export const SocketContext = createContext();

const baseUrl = process.env.REACT_APP_API_URL_BASE
export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocker, desconectarSocket } = useSocket(baseUrl);
    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo)
            conectarSocker()
    }, [conectarSocker, userInfo]);

    useEffect(() => {
        if (!userInfo)
            desconectarSocket()
    }, [userInfo, desconectarSocket])

    useEffect(() => {
        socket?.on('lista-domicilios', domicilios => {
            dispatch(pedidosRecive(domicilios))
        })
    }, [socket, dispatch])

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}