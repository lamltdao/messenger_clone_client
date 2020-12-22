import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {CONVERSATION_BASE_URL, AUTH_BASE_URL} from '../config'
import {useSocket} from './SocketProvider'
import useLocalStorage from '../hooks/useLocalStorage'

const ConversationContext = React.createContext()
export function useConversations() {
    return useContext(ConversationContext)
} 
export function ConversationProvider({children}) {
    const socket = useSocket()

    // get all conversations' Ids from db
    let [conversations, setConversations] = useState([])
    let [accessToken, setAccessToken] = useLocalStorage('access_token', null)
    let [refreshToken, setRefreshToken] = useLocalStorage('refresh_token', null)
    useEffect(() => {
        axios({
            method: 'post',
            url: AUTH_BASE_URL + '/auth/token',
            data: {
                refreshToken
            }
            // accesstoken will send the userId aka senderId to server, which will be used to get conversations
        })
        .then(data => {
            console.log(data.data);
            let {accessToken} = data.data
            setAccessToken(accessToken)
            axios({
                method: 'get',
                url: CONVERSATION_BASE_URL + '/conversation',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(data => {
                console.log(data.data);
                let conversations = data.data
                conversations = conversations ? conversations : []
                setConversations(conversations)
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }, [accessToken, setAccessToken, refreshToken, setRefreshToken])
    

    // function to create a new conversation
    function createConversation(recipientIds) {
        const body = {
            messages: [],
            users: [...recipientIds]
        }
        axios({
            method: 'post',
            url: CONVERSATION_BASE_URL + '/conversation',
            data: body
        })
        .then(data => {
            const conversation = data.data
            setConversations(prevConversations => {
                prevConversations.push(conversation)
                return prevConversations
            })
        })
        .catch(err => {

        })
    }

    // function to send a message from user to recipients
    function sendMessage(conversationId, message) {
        socket.emit('send-message', {conversationId, message})
    }

    // function to select a conversation by id
    let [selectedConversationId, setSelectedConversationId] = useState(null)

   
    const value = {
        conversations,
        createConversation,
        sendMessage,
        selectConversationById: setSelectedConversationId,
        selectedConversationId: conversations.find(conversation => conversation._id === selectedConversationId )
    }
    return (
        <ConversationContext.Provider value = {value}>
            {children}
        </ConversationContext.Provider>
    )
}
