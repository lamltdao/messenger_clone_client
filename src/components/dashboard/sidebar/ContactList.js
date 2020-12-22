import React from 'react'
import {ListGroup} from 'react-bootstrap'

export default function ContactList() {
    const contacts = [{
        id: 1, name: 1
    },{
        id: 2, name: 2
    },{
        id: 3, name: 3
    }]
    return (
        <ListGroup variant = "flush">
            {contacts.map(contact => (
                <ListGroup.Item key = {contact.id}>
                    {contact.name}
                </ListGroup.Item>
            ))}
        </ListGroup>    )
}
