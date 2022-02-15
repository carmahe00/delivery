import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../../context/SocketProvider'

const Desktop = () => {
    const { socket } = useContext(SocketContext)
    
    useEffect(()=>{
        console.log(socket)
        
    }, [socket])
    
    return (
        <div>
            <h1>Hola</h1>
        </div>
    )
}

export default Desktop
