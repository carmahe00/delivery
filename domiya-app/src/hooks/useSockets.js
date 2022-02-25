import { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import types from '../types/socketType'

export const useSocket = (serverPath) => {

    const [socket, setSocket] = useState(null);

    
    const { userInfo } = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    
    const conectarSocker = useCallback(() => {
        const socketTmp = io(serverPath, { 
            transports: ['websocket'],
            withCredentials: true, 
            extraHeaders: {
                "authorization": JSON.stringify(userInfo)
            }
        })
        !socket && setSocket(socketTmp)
    }, [serverPath, setSocket, socket])

    const online = useMemo(() => socket?.connected, [socket])

    const desconectarSocket = useCallback(() => {
        socket?.disconnect()
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
