import React, { useEffect, useRef, useState, useContext, useCallback } from 'react'
import Peer from 'peerjs'
import {useSocket} from '../contexts/SocketProvider'
import {useUserContext} from '../contexts/UserProvider'
import {useConversations} from '../contexts/ConversationProvider'
const VideoCallContext = React.createContext()

export function useVideoCallContext() {
    return useContext(VideoCallContext)
}
export function VideoCallProvider({children}) {
    const {videoCallSocket, isVideoCallSocketConnected} = useSocket()
    const peerRef = useRef()
    const [streams, setStreams] = useState([])
    const {selectedConversationId} = useConversations()
    const {user} = useUserContext()

    const addStream = useCallback((stream, userId) => {
        setStreams(prevStreams => {
            const cloneStreams = [...prevStreams]
            // check if stream has already existed in the array
            const index = cloneStreams.findIndex(stream => stream.userId === userId)
            // remove the stream if it exists in advance
            if(index === -1) {
                cloneStreams.push({stream, userId})
            }
            return cloneStreams
        })   
    }, [setStreams])

    const removeStream = useCallback((userId) => {
        setStreams(prevStreams => {
            const cloneStreams = [...prevStreams]
            const newStreams = cloneStreams.filter(stream => stream.userId !== userId)
            return newStreams
        })    
    }, [setStreams])

    function joinCall(userId) {
        peerRef.current = new Peer()
        // join call when a peer Object is created
        peerRef.current.on('open', peerId => {
            videoCallSocket.emit('join-call', {conversationId: selectedConversationId, userId, peerId})
        })
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then(myStream => {
            addStream(myStream, user._id)

            // answer call
            peerRef.current.on('call', call => {
                // answer call + provide stream
                call.answer(myStream)
                // if the caller add a stream
                call.on('stream', callerStream => {
                    const callerId = call.metadata.userId
                    addStream(callerStream, callerId)
                })
                
            })        
        })        
        .catch(err => {

        })
        // // notify other users 
        // videoCallSocket.emit('calling', {conversationId: selectedConversationId, userId})
    }

    function rejectCall() {
        peerRef.current = null
    }

    useEffect(() => {
        if(!isVideoCallSocketConnected || peerRef.current == null || peerRef.current.disconnected || streams.length === 0) return
        // get notified when a user calls
        videoCallSocket.on('notify-call', ({conversationId, userId}) => {
            
        })

        // when a new user is connected
        videoCallSocket.on('user-connected', ({userId, peerId}) => {
            let call = peerRef.current.call(peerId, streams[0].stream, {// other peerId, my stream
                metadata: {userId: user._id}
            }) 
    
            // when user is connected
            call.on('stream', newUserStream => {
                addStream(newUserStream, userId)
            })
        })        
        // when a user is disconnected
        videoCallSocket.on('user-disconnected', userId => {
            removeStream(userId)
        })

        return () => {
            peerRef.current.off('call')
            videoCallSocket.off('notify-call')
            videoCallSocket.off('user-connected')
            videoCallSocket.off('user-disconnected')
        }
    },[videoCallSocket,isVideoCallSocketConnected, addStream, removeStream, user, streams])

    const value = {
        streams,
        joinCall,
        rejectCall,
    }
    return (
        <VideoCallContext.Provider value = {value}>
            {children}
        </VideoCallContext.Provider>
    )
}
