import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {useUserContext} from '../../../contexts/UserProvider'
export default function ContactList() {
    const {contacts} = useUserContext()
    return (
        <ListGroup variant = "flush">
            {contacts.length > 0 ? contacts.map(contact => (
                <ListGroup.Item key = {contact._id}>
                    {contact.name}
                </ListGroup.Item>
            ))
            : ''
        }
        </ListGroup>            
        )
}
