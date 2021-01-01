import React, {useEffect, useState, useContext, useCallback} from 'react'
import axios from 'axios'
import {CONVERSATION_BASE_URL} from '../config'
import {useSocket} from './SocketProvider'
import {useAuthContext} from './AuthProvider'
import useLocalStorage from '../hooks/useLocalStorage'
const ConversationContext = React.createContext()

export const messageResponseModel = (_id, name, messageBody) => {
    return {
        user: {
            _id,
            name
        },
        messageBody
    }
}

export function useConversations() {
    return useContext(ConversationContext)
} 

export function ConversationProvider({children}) {
    const socket = useSocket()
    const {authFetch} = useAuthContext()
    
    // get all conversations' info from db
    let [conversations, setConversations] = useState([])
    useEffect(() => {
        authFetch({
            method: 'get',
            url: CONVERSATION_BASE_URL + '/conversation',
            params: {
                messageLimit: 30
            }
        })
        .then(data => {
            const conversations = data.data
            setConversations(conversations)
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    // function to select a conversation by id
    let [selectedConversationId, setSelectedConversationId] = useLocalStorage('selectedConversationId',null)

        
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
    function sendMessage(conversationId, messageBody) {
        socket.emit('send-message', {conversationId, messageBody})
    }    

    // function to handle message sent from others
    const updateConversation = useCallback(({conversationId, userId, messageBody}) => {
        console.log("Receive message ", messageBody )
        setConversations((prevConversations) => {
            const conversation = prevConversations.find(conversation => conversation._id === conversationId)
            const sender = conversation.users.find(user => user._id === userId)
            conversation.messages.push(messageResponseModel(sender._id, sender.name, messageBody))
            return prevConversations
        })
    }, [setConversations])
    
    useEffect(() => {
        if(socket == null) {
            return 
        }
        socket.on('push-message', updateConversation)
        return () => socket.off('push-message')
    }, [socket, updateConversation])
   
    // function to load more messages from db
    function loadMessages() {
        
    }


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
