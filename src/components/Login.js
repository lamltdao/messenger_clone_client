import React, {useRef, useState} from 'react'
import {Form, Container, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {AUTH_BASE_URL} from '../config'
import useLocalStorage from '../hooks/useLocalStorage'


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [accessToken, setAccessToken] = useLocalStorage('access_token',null)
    const [refreshToken, setRefreshToken] = useLocalStorage('refresh_token',null)
    const [errMess, setErrMess] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        const body = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axios({
			method:'post',
			url:AUTH_BASE_URL +'/auth/login',
			data: body
		})
		.then(data=>{
            const {accessToken, refreshToken} = data.data
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
            window.location.href = '/'
		})
		.catch(err=>{
			setErrMess('Failed to log in')
        })    
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
                    {errMess}
                </div>
                <Link to = '/register'>Register</Link>
            </Container>
        </div>
    )
}
