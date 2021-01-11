import React, { useEffect, useRef, useState } from 'react'
import {useVideoCallContext} from '../contexts/VideoCallProvider'
import {useSocket} from '../contexts/SocketProvider'
import {useUserContext} from '../contexts/UserProvider'
import Video from './Video'
export default function VideoCall() {
    const {streams, joinCall} = useVideoCallContext()
    const {user} = useUserContext()
    const {isVideoCallSocketConnected, setIsInitVideoCallSocket} = useSocket()
    console.log(streams);


    useEffect(() => { 
        setIsInitVideoCallSocket(true)
        if(isVideoCallSocketConnected && user._id) {
            joinCall(user._id)  
        }
    },[isVideoCallSocketConnected, user, setIsInitVideoCallSocket])


    return (
        <div>
            <div className = 'video-grid'>
                <div>
                    {   
                        streams.map((stream,index) => {
                            return (
                                <Video key = {index} stream = {stream}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
