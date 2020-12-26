import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {useConversations} from '../../../contexts/ConversationProvider'
export default function ConversationList() {
   const {conversations, selectConversationById, selectedConversationId} = useConversations()
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
                        conversation.name ? conversation.name : conversation.users.slice(0,1).map(user => user.name).join(', ')
                    }
                </ListGroup.Item>
            ))
            }
        </ListGroup>    
        )
}
