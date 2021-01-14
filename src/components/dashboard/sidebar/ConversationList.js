import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {useConversations} from '../../../contexts/ConversationProvider'
import {useUserContext} from '../../../contexts/UserProvider'
export default function ConversationList() {
    const {conversations, selectConversationById, selectedConversationId} = useConversations()
    const {user, getUserInfoById} = useUserContext()
    const userId = user._id
    
    function getDefaultConversationName(userIds) {
        const contactNames = userIds.filter(id => id !== userId).map(id => {
            return getUserInfoById(id).name
        })
        return ['You', ...contactNames].join(', ')
    }
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
