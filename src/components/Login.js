import React, {useRef, useState} from 'react'
import {Form, Container, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useAuthContext} from '../contexts/AuthProvider'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    let [loginMessage, setLoginMessage] = useState('')

    const {login} = useAuthContext()
    
    async function handleSubmit(e) {
        e.preventDefault()
        const body = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        const {status} = await login(body)
        if(status === 'SUCCESS') {
            window.location.href = '/'
        }
        if(status === 'ERROR') {
            setLoginMessage('Failed to login')
        }
        if(status === 'LOADING') {
            setLoginMessage('Logging in...')
        }
    }

    return (
        <div>
            <Container className = 'align-items-center d-flex' style = {{height: '100vh'}}>
                <Form onSubmit = {handleSubmit} className = 'w-100'>
                    <Form.Group>
                        <Form.Label>Enter your email</Form.Label>
                        <Form.Control type = 'text' ref = {emailRef} required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Enter your password</Form.Label>
                        <Form.Control type = 'text' ref = {passwordRef} required/>
                    </Form.Group>
                    <Button type = 'submit'>Login</Button>
                </Form>
                <div>
                    {loginMessage}
                </div>
                <Link to = '/register'>Register</Link>
            </Container>
        </div>
    )
}
