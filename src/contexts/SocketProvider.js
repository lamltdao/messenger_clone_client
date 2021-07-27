import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useUserContext } from "./UserProvider";
import { CONVERSATION_BASE_URL } from "../config";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}
export function SocketProvider({ children }) {
  const [chatSocket, setChatSocket] = useState();

  const [videoCallSocket, setVideoCallSocket] = useState(false);
  const [isInitVideoCallSocket, setIsInitVideoCallSocket] = useState(false);
  const [isVideoCallSocketConnected, setIsVideoCallSocketConnected] =
    useState(false);

  const { user } = useUserContext();
  const userId = user._id;
  useEffect(() => {
    var newChatSocket = io(`${CONVERSATION_BASE_URL}/chat`, {
      query: {
        userId,
      },
    });
    setChatSocket(newChatSocket);
    return () => {
      if (newChatSocket) newChatSocket.close();
    };
  }, [userId]);

  useEffect(() => {
    if (isInitVideoCallSocket) {
      console.log("init video call socket");
      var newVideoCallSocket = io(`${CONVERSATION_BASE_URL}/video-call`, {
        query: {
          userId,
        },
      });
      setVideoCallSocket(newVideoCallSocket);
    }
    return () => {
      if (newVideoCallSocket) {
        console.log("cleaning up");
        newVideoCallSocket.close();
      }
    };
  }, [userId, isInitVideoCallSocket]);

  useEffect(() => {
    videoCallSocket &&
      videoCallSocket.on("connect", () => {
        console.log("video call socket connected");
        console.log(videoCallSocket);
        setIsVideoCallSocketConnected(true);
        setIsInitVideoCallSocket(false);
      });
  }, [videoCallSocket]);

  const value = {
    videoCallSocket,
    chatSocket,
    isVideoCallSocketConnected,
    setIsInitVideoCallSocket,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
