import React from 'react'
import {useConversations} from '../../contexts/ConversationProvider'

export default function ConversationDetail() {
    const {sendMessage, selectedConversationId} = useConversations()
    return (
        <div className = 'd-flex flex-column flex-grow-1'>
            
        </div>
    )
}
