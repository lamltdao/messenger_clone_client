import React from 'react'
import {Container} from 'react-bootstrap'
import NavBar from './nav_bar/NavBar'
import DashBoard from './dashboard/DashBoard'
import {ConversationProvider} from '../contexts/ConversationProvider'
import {SocketProvider} from '../contexts/SocketProvider'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Main() {
    let [accessToken, setAccessToken] = useLocalStorage('access_token', null)
    return (
        <SocketProvider accessToken = {accessToken}>
            <ConversationProvider>
                <Container>
                    <NavBar/>
                    <DashBoard/>
                </Container>
            </ConversationProvider>        
        </SocketProvider>
        
    )
}
