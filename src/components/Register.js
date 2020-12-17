import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import {Form, Container, Button} from 'react-bootstrap'
import axios from 'axios'
import {AUTH_BASE_URL} from '../config'

export default function Register() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    
    function handleSubmit(e) {
        e.preventDefault()
        const body = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axios({
			method:'post',
			url:AUTH_BASE_URL +'/auth/register',
			data: body
		})
		.then(data=>{
		})
		.catch(err=>{
        })    
    }

    return (
        <div>
            <Container className = 'align-items-center d-flex' style = {{height: '100vh'}}>
                <Form onSubmit = {handleSubmit} className = 'w-100'>
                    <Form.Group>
                        <Form.Label>Enter your name</Form.Label>
                        <Form.Control type = 'text' ref = {nameRef} name = 'name' required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Enter your email</Form.Label>
                        <Form.Control type = 'email' ref = {emailRef} name = 'email' required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Enter your password</Form.Label>
                        <Form.Control type = 'text' ref = {passwordRef} name = 'password' required/>
                    </Form.Group>
                    <Button type = 'submit'>Register</Button>
                </Form>
                <Link to = '/login'>Login</Link>
            </Container>        
        </div>
    )
}