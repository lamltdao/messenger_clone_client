import React, { useState } from 'react'
import {Button} from 'react-bootstrap'
import {useAuthContext} from '../../contexts/AuthProvider'
import {useThemeContext} from '../../contexts/ThemeProvider'

export default function LogOut() {
    const [logOutMessage, setLogOutMessage] = useState('')
    const {logOut} = useAuthContext()
    const {theme} = useThemeContext()

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
            <Button onClick = {handleClick} variant={theme.commonButtonColor}>Log out</Button>
            <div>{logOutMessage}</div>
        </div>
    )
}
