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
  const { user } = useUserContext();
  const { isVideoCallSocketConnected, setIsInitVideoCallSocket } = useSocket();
  const [videoIcon, setVideoIcon] = useState("video");
  const [microphoneIcon, setMicrophoneIcon] = useState("microphone");

  function muteAndUnmute() {

  }

  function playAndStopVideo() {

  }

  function viewParticipants() {

  }

  function leaveCall() {

  }

  useEffect(() => {
    setIsInitVideoCallSocket(true);
    if (isVideoCallSocketConnected && user._id) {
      joinCall(user._id);
    }
  }, [isVideoCallSocketConnected, user, setIsInitVideoCallSocket]);

  return (
    <Container className ="d-flex flex-column">
      <Row className="d-flex bg-secondary mb-3">
          <div className = 'd-flex justify-content-center align-items-center' style = {{height: '90vh'}}>
            {streams.map((stream, index) => {
              return <Video key={index} stream={stream} />;
            })}
          </div>
      </Row>
      <Row className="d-flex bg-dark text-white">
          <ControlButton
            iconName = {microphoneIcon}
            text = 'Mute'
            onClick = {muteAndUnmute}
          />

          <ControlButton
            iconName = {videoIcon}
            text = 'Stop video'
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
