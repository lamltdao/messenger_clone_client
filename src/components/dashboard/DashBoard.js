import React from 'react'
import SideBar from './sidebar/SideBar'
import ConversationDetail from './ConversationDetail'
import {Row, Col} from 'react-bootstrap'
export default function DashBoard() {
    return (
        <Row className = 'd-flex' style = {{height: '100%'}}>
            <Col><SideBar/></Col>
            <Col><ConversationDetail/></Col>
        </Row>
    )
}
