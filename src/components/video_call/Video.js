import React, {useRef, useEffect} from 'react'

export default function Video(props) {
    const videoRef = useRef()
    // Manage new streams
    useEffect(() => {
        const stream = props.stream ? props.stream.stream : null
        if(stream) {
            const video = videoRef.current
            video.srcObject = stream
        }    
        else return    
    }, [props.stream])
    // Manage video and audio
    useEffect(() => {
        // only local video can mute or stop video
        if(!props.stream || props.isVideoStop === undefined || props.isMute === undefined) return
        const {srcObject} = videoRef.current
        srcObject.getVideoTracks()[0].enabled = !props.isVideoStop
    }, [props.isVideoStop])
    return (
        <div className = 'd-flex align-items-center flex-column'>
            <video autoplay="true" muted = {props.muted} playsInline = 'true' ref = {videoRef} style = {{height: '50%'}}>
                
            </video>
            {props.stream && props.stream.userId}
        </div>
    )
}
