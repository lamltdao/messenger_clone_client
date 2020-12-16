import React, {useRef} from 'react'
import {Form, Container, Button} from 'react-bootstrap'
import {Link, useHistory, useLocation} from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from '../config'
import useLocalStorage from '../hooks/useLocalStorage'
export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    let history = useHistory();
    let location = useLocation();
  
    let { from } = location.state || { from: { pathname: "/" } };
    const [user, setUser] = useLocalStorage('user',null)
    function handleSubmit(e) {
        e.preventDefault()
        const body = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axios({
			method:'post',
			url:BASE_URL +'/auth/login',
			data: body
		})
		.then(data=>{
            console.log(data.data);
            if(user) {

            }
            else {
                setUser(data.data.name)
            }
		})
		.catch(err=>{
			console.log(err);
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
                <Link to = '/register'>Register</Link>
            </Container>
        </div>
    )
}
