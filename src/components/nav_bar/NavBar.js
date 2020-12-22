import React from 'react'
import LogOut from './LogOut'
import Searchfield from './Searchfield'
import UserInfo from './UserInfo'
import {Row, Col } from 'react-bootstrap'
export default function Sidebar() {
    return (
            <Row className = 'mb-3 mt-2'>
                <Col sm = {6}><Searchfield /></Col>
                <Col sm = {4}><UserInfo/></Col>
                <Col sm = {2}><LogOut/></Col>
            </Row>
    )
}
