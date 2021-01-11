import React from 'react'
import LogOut from './LogOut'
import UserInfo from './UserInfo'
import {Row, Col } from 'react-bootstrap'

export default function Navbar() {
    return (
            <Row className = 'mb-3 mt-2'>
                <Col sm = {9}><UserInfo/></Col>
                <Col sm = {3}><LogOut/></Col>
            </Row>
    )
}
