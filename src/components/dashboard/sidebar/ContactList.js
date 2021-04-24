import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {useUserContext} from '../../../contexts/UserProvider'
import {useThemeContext} from '../../../contexts/ThemeProvider'

export default function ContactList() {
    const {contacts} = useUserContext()
    const {theme} = useThemeContext()
    return (
        <ListGroup variant = "flush">
            {contacts.length > 0 ? contacts.map(contact => (
                <ListGroup.Item key = {contact._id} className={theme.listGroupItem}>
                    {contact.name}
                </ListGroup.Item>
            ))
            : ''
        }
        </ListGroup>
    )
}
