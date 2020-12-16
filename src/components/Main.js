import React from 'react'
import {Button, Container} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

export default function Main() {
    const history = useHistory()
    function logOut() {

    }

    return (
        <div>
            <Container>
                Main
                <Button onClick = {logOut}>Log out</Button>
            </Container>
        </div>
    )
}
