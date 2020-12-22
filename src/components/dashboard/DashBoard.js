import React from 'react'
import SideBar from './sidebar/SideBar'
import ConversationDetail from './ConversationDetail'
import {Row} from 'react-bootstrap'
export default function DashBoard() {
    return (
        <Row className = 'd-flex' style = {{height: '100vh'}}>
            <SideBar/>
            <ConversationDetail/>
        </Row>
    )
}
