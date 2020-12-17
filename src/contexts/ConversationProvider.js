import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {CONVERSATION_BASE_URL} from '../../../config'
import {useSocket} from './SocketProvider'

const ConversationContext = React.createContext()
export function useConversations() {
    return useContext(ConversationContext)
} 
export function ConversationProvider({children}) {
    const socket = useSocket()

    // get all conversations' Ids from db
    let [conversationIds, setConversationIds] = useState([])
    axios({
        method: 'get',
        url: CONVERSATION_BASE_URL + '/conversation'
        // accesstoken will send the userId aka senderId to server, which will be used to get conversations
    })
    .then(data => {
        const {conversationIds} = data.data
        setConversationIds(conversationIds)
    })

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
            const {conversationId} = data.data
            setConversationIds(prevConversationIds => {
                prevConversationIds.push(conversationId)
                return prevConversationIds
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
        conversationIds,
        createConversation,
        sendMessage,
        selectConversationById: setSelectedConversationId,
        selectedConversationId: conversationIds.find(conversationId => conversationId == selectedConversationId )
    }
    return (
        <ConversationContext.Provider value = {value}>
            {children}
        </ConversationContext.Provider>
    )
}
