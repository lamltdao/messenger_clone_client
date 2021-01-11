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
    const {chatSocket} = useSocket()
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

    // function to handle message sent from others
    const updateConversation = useCallback(({conversationId, userId, messageBody}) => {
        setConversations(prevConversations => {
            // deep-clone the previous state so that a re-render is triggered
            const newConversations = JSON.parse(JSON.stringify(prevConversations))
            newConversations.map((conversation) => {
                if(conversation._id === conversationId) {
                    const sender = conversation.users.find(user => user._id === userId)
                    conversation.messages.push({
                        user: {
                            _id: sender._id,
                            name: sender.name
                        },
                        messageBody
                    })                
                }
                return conversation
            })
            return newConversations
        })
    }, [setConversations])


    // function to send a message from user to recipients
    function sendMessage(conversationId, userId, messageBody) {
        chatSocket.emit('send-message', {conversationId, userId, messageBody})
        updateConversation({conversationId, userId, messageBody})
    }       
    
    useEffect(() => {
        if(chatSocket == null) {
            return 
        }
        chatSocket.on('push-message', updateConversation)
        return () => {
            chatSocket.off('push-message')
        } 
    }
    , [chatSocket, updateConversation]
    )
   
    // function to load more messages from db


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
