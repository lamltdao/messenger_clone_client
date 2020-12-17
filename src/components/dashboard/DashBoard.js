import React from 'react'
import SideBar from './sidebar/SideBar'
import ConversationDetail from './ConversationDetail'
import {Container} from 'react-bootstrap'
export default function DashBoard() {
    return (
        <Container className = 'd-flex' style = {{height: '100vh'}}>
            <SideBar/>
            <ConversationDetail/>
        </Container>
    )
}
