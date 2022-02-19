import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import types from '../types/socketType'

export const useSocket = (serverPath) => {

    const [socket, setSocket] = useState(null);

    const [online, setOnline] = useState(false);
    const dispatch = useDispatch();

    const conectarSocker = useCallback(() => {
        const socketTmp = io(serverPath, { transports: ['websocket'] })
        !socket && setSocket(socketTmp)
    }, [serverPath, setSocket, socket])


    const desconectarSocket = useCallback(() => {
        socket?.disconnect()
    }, [socket])

    useEffect(() => {
        setOnline(socket?.connected);
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => dispatch({
            type: types.userConnect
        }));
    }, [socket, dispatch])

    useEffect(() => {
        socket?.on('disconnect', () => dispatch({
            type: types.userDisconnet
        }));
    }, [socket, dispatch])

    return {
        socket,
        conectarSocker,
        online,
        desconectarSocket
    }
}
