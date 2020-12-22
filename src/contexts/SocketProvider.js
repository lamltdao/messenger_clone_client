import React, {useContext, useEffect, useState} from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()
export function useSocket() {
    return useContext(SocketContext)
}
export function SocketProvider({accessToken, children}) {
    const [socket, setSocket] = useState()
    // useEffect(() => {
    //     var newSocket = io(
    //         'http://localhost:5000', 
    //         { query: {accessToken} }
    //     )
    //     setSocket(newSocket)

    //    return () => newSocket.close()
    // }, [accessToken])
    return (
        <SocketContext.Provider value = {socket}>
            {children}
        </SocketContext.Provider>
    )
}
