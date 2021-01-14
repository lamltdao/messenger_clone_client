import React, {useContext, useEffect, useState} from 'react'
import io from 'socket.io-client'
import {useUserContext} from './UserProvider'
const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}
export function SocketProvider({children}) {
    const [chatSocket, setChatSocket] = useState()

    const [videoCallSocket, setVideoCallSocket] = useState(false)
    const [isInitVideoCallSocket, setIsInitVideoCallSocket] = useState(false)
    const [isVideoCallSocketConnected, setIsVideoCallSocketConnected] = useState(false)

    const {user} = useUserContext()
    const userId = user._id
    useEffect(() => {
        var newChatSocket = io(
            'http://localhost:5000/chat', {
                query: {
                    userId
                }
            }        
        )
        setChatSocket(newChatSocket)
       return () => {
            if(newChatSocket) newChatSocket.close()
       }
    }, [userId])

    useEffect(() => {
        if(isInitVideoCallSocket) {
            console.log('init video call socket');
            var newVideoCallSocket = io(
                'http://localhost:5000/video-call', {
                    query: {
                        userId
                    }
                }        
            )
            setVideoCallSocket(newVideoCallSocket)       
        }
        return () => {
            if(newVideoCallSocket) {
                console.log('cleaning up');
                newVideoCallSocket.close()
            }
        }
    }, [userId, isInitVideoCallSocket])


    useEffect(() => {
        videoCallSocket && videoCallSocket.on('connect', () => {
            console.log('video call socket connected');
            console.log(videoCallSocket);
            setIsVideoCallSocketConnected(true)
            setIsInitVideoCallSocket(false)
        })   
    },[videoCallSocket])

    const value = {
        videoCallSocket,
        chatSocket, 
        isVideoCallSocketConnected,
        setIsInitVideoCallSocket
    }
    return (
        <SocketContext.Provider value = {value}>
            {children}
        </SocketContext.Provider>
    )
}
