import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {CONVERSATION_BASE_URL} from '../config'
import {useSocket} from './SocketProvider'
import {useAuthContext} from './AuthProvider'

const ConversationContext = React.createContext()

export function useConversations() {
    return useContext(ConversationContext)
} 

export function ConversationProvider({accessToken,children}) {
    const socket = useSocket()
    const {authFetch} = useAuthContext()
    
    // get all conversations' Ids from db
    let [conversations, setConversations] = useState([])
    useEffect(() => {
        authFetch({
            method: 'get',
            url: CONVERSATION_BASE_URL + '/conversation'
        })
        .then(data => {
            setConversations(data.data)
        })
        .catch(err => {
            console.log(err);
        })
    },[setConversations])
    
    
        
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
        selectedConversationId
    }
    return (
        <ConversationContext.Provider value = {value}>
            {children}
        </ConversationContext.Provider>
    )
}
