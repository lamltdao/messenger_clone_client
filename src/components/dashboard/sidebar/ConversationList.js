import React, {useCallback} from 'react'
import {ListGroup} from 'react-bootstrap'
import {useConversations} from '../../../contexts/ConversationProvider'
import {useUserContext} from '../../../contexts/UserProvider'
export default function ConversationList() {
    const {conversations, selectConversationById, selectedConversationId} = useConversations()
    const {user} = useUserContext()
    const userId = user._id
    
    const getDefaultConversationName = useCallback((users) => {
        const contactNames = users.filter(user => user._id !== userId).map(user => {
            return user.name
        })
        return ['You', ...contactNames].join(', ')
    },[userId])
    return (
        <ListGroup variant = "flush">
            {
            conversations.length !== 0 && conversations.map((conversation, index) => (
                <ListGroup.Item 
                    key = {conversation._id}
                    action 
                    onClick = {() => selectConversationById(conversation._id)}
                    active = {conversation._id === selectedConversationId}
                >
                    {
                        conversation.name ? conversation.name : getDefaultConversationName(conversation.users)
                    }
                </ListGroup.Item>
            ))
            }
        </ListGroup>    
        )
}
