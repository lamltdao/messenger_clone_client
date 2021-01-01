import React, { useState } from 'react'
import {Button} from 'react-bootstrap'
import {useAuthContext} from '../../contexts/AuthProvider'

export default function LogOut() {
    const [logOutMessage, setLogOutMessage] = useState('')
    const {logOut} = useAuthContext()
    async function handleClick(e) {
        e.preventDefault()
        const {status} = await logOut()
        if(status === 'SUCCESS') {
            window.location.href = '/login'
        }
        if(status === 'ERROR') {
            setLogOutMessage('Unable to log out')
        }
        if(status === 'LOADING') {
            setLogOutMessage('Logging out')
        }
    }
    return (
        <div>
            <Button onClick = {handleClick}>Log out</Button>
            <div>{logOutMessage}</div>
        </div>
    )
}
