import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useVideoCallContext } from "../../contexts/VideoCallProvider";
import { useSocket } from "../../contexts/SocketProvider";
import { useUserContext } from "../../contexts/UserProvider";
import Video from "./Video";


const ControlButton = ({iconName, text, classAtr, ...otherAtr}) => {
  return (
    <Button
      {...otherAtr}
      className={`d-flex flex-column justify-content-center align-items-center px-4 py-1 mx-2 bg-dark border-0 ${classAtr}`}
    >
    <FontAwesomeIcon icon={iconName} />
    <span>{text}</span>
  </Button>
)
}
export default function VideoCall() {
  const { streams, joinCall } = useVideoCallContext();
  const [myStream, ...otherStreams] = streams
  const { user } = useUserContext();
  const { isVideoCallSocketConnected, setIsInitVideoCallSocket } = useSocket();
  const [isMute, setIsMute] = useState(true)
  const [isVideoStop, setIsVideoStop] = useState(false)
  function muteAndUnmute(e) {
    e.preventDefault()
    setIsMute((isMute) => {
      return !isMute
    })
  }

  function playAndStopVideo(e) {
    e.preventDefault()
    setIsVideoStop((isVideoStop) => {
      return !isVideoStop
    })
  }

  function viewParticipants() {

  }

  function leaveCall() {
    window.close()
  }

  useEffect(() => {
    setIsInitVideoCallSocket(true);
    if (isVideoCallSocketConnected && user._id) {
      joinCall(user._id);
    }
  }, [isVideoCallSocketConnected, user, setIsInitVideoCallSocket]);

  return (
    <Container className ="d-flex flex-column">
      <Row className="d-flex mb-3">
          <div className = 'd-flex justify-content-center py-3' style = {{height: '90vh'}}>
            {otherStreams.length > 0 && otherStreams.map((stream, index) => {
              return <Video key={index} stream={stream}/>;
            })}
          <Video stream={myStream} muted = 'true' isMute = {isMute} isVideoStop = {isVideoStop} />
          </div>
      </Row>
      <Row className="d-flex bg-dark text-white">
          <ControlButton
            iconName = {isMute ? 'microphone-slash' : 'microphone'}
            text = {isMute ? 'Unmute' : 'Mute'}
            onClick = {muteAndUnmute}
          />

          <ControlButton
            iconName = {isVideoStop ? 'video-slash' : 'video'}
            text = {isVideoStop ? 'Play Video' : 'Stop Video'}
            onClick = {playAndStopVideo}
          />
        
          <ControlButton
            iconName = 'users'
            text = 'Participants'
            onClick = {viewParticipants}
          />
        
          <ControlButton
            iconName = 'door-open'
            text = 'Leave call'
            classAtr = 'text-danger'
            onClick = {leaveCall}
          />
      </Row>
    </Container>
  );
}
