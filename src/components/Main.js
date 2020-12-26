import React from 'react'
import {Container} from 'react-bootstrap'
import NavBar from './nav_bar/NavBar'
import DashBoard from './dashboard/DashBoard'


export default function Main() {    
    return (
        <Container>
            <NavBar/>
            <DashBoard/>
        </Container>
    )
}
