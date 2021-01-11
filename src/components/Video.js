import React, {useRef, useEffect} from 'react'

export default function Video(props) {
    const videoRef = useRef()
    useEffect(() => {
        const stream = props.stream.stream ? props.stream.stream : null
        if(stream) {
            const video = videoRef.current
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
                video.play()
            })
        }    
        else return    
    }, [props.stream])
    return (
        <video ref = {videoRef}>
            
        </video>
    )
}
