import React, {useEffect, useState, useContext, useCallback} from 'react'
import axios from 'axios'
import {CONVERSATION_BASE_URL} from '../config'
import {useSocket} from './SocketProvider'
import {useAuthContext} from './AuthProvider'
import {useUserContext} from './UserProvider'

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
    const {getUserInfoById} = useUserContext()

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
    let [selectedConversationId, setSelectedConversationId] = useState(null)

        
    // function to create a new conversation
    function createConversation(recipientIds) {
        const body = {
            messages: [],
            users: [...recipientIds]
        }
        authFetch({
            method: 'post',
            url: CONVERSATION_BASE_URL + '/conversation',
            data: body
        })
        .then(data => {
            const newConversation = data.data
            setConversations(prevConversations => {
                return [...prevConversations, newConversation]
            })
            setSelectedConversationId(newConversation._id)
        })
        .catch(err => {
            console.log(err);
        })
    }

    // function to handle message sent from others
    const updateConversation = useCallback(({conversationId, userId, messageBody}) => {
        setConversations(prevConversations => {
            let numUnmatchedConversations = 0
            // if # of unmatched conversations = # of conversations => message from a new conversation
            let isNewConversation = numUnmatchedConversations === prevConversations.length
            // deep-clone the previous state so that a re-render is triggered
            const cloneConversations = JSON.parse(JSON.stringify(prevConversations))
            // const cloneConversations = [...prevConversations]
            cloneConversations.map((conversation) => {
                // if message is from an existing conversation
                if(conversation._id === conversationId) {
                    const sender = getUserInfoById(userId)
                    conversation.messages.push({
                        user: sender._id,
                        messageBody
                    })                
                }
                else {
                    ++numUnmatchedConversations
                }
                return conversation
            })

            if(isNewConversation) {
                authFetch({
                    method: 'get',
                    url: CONVERSATION_BASE_URL + `/conversation/${conversationId}` ,
                })
                .then(data => {
                    const conversation = data.data
                    cloneConversations.push(conversation)
                })
                .catch(err => {
                    console.log(err);
                })
            }
            return cloneConversations
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
