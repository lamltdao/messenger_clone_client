import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {useConversations} from '../../../contexts/ConversationProvider'
export default function ConversationList() {
    const {conversationIds, selectConversationById} = useConversations()
    return (
        <ListGroup variant = "flush">
            {conversationIds.map((conversationId, index) => (
                <ListGroup.Item 
                    key = {conversationId}
                    action 
                    onClick = {() => selectConversationById(conversationId)}
                    active = {conversation.selected}
                >
                    { // Conversation name
                    /* {conversation.contactIds
                        .map(contactId => (contactId.name ))
                        .join(', ')
                    } */} 
                </ListGroup.Item>
            ))}
        </ListGroup>    
        )
}
