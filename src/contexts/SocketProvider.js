import React, {useContext, useEffect, useState} from 'react'
import io from 'socket.io-client'
import {useUserContext} from '../contexts/UserProvider'
const SocketContext = React.createContext()
export function useSocket() {
    return useContext(SocketContext)
}
export function SocketProvider({children}) {
    const [socket, setSocket] = useState()
    const {user} = useUserContext()
    const userId = user._id
    useEffect(() => {
        var newSocket = io(
            'http://localhost:5000', 
            { query: {userId} }
        )
        setSocket(newSocket)

    //    return () => {
    //         if(newSocket) newSocket.close()
    //    }
    }, [userId])
    return (
        <SocketContext.Provider value = {socket}>
            {children}
        </SocketContext.Provider>
    )
}
