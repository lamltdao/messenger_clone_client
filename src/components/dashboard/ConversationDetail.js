import React from 'react'
import {useConversations} from '../../contexts/ConversationProvider'
import { Container, Row, Col } from 'react-bootstrap'
export default function ConversationDetail() {
    const {sendMessage, selectedConversationId} = useConversations()
    return (
        <Container className = 'd-flex flex-column flex-grow-1'>
            <Row>
            {
                selectedConversationId
            }
            </Row>
            
            
        </Container>
    )
}
