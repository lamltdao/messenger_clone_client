import React, {useRef, useState} from 'react'
import { Container, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useAuthContext} from '../contexts/AuthProvider'
import { Layout, Typography, Row, Col, Form, Input, Checkbox } from 'antd'
import 'antd/dist/antd.css'

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

    const styles = {
      layoutStyle: {
        fontFamily: 'monospace',
      },
      titleStyle: {
        margin: '15px',
      },
    }

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };
    return (
        <div>
            <Layout style={styles.layoutStyle}>
                <Layout.Content>
                  <Row>
                    <Col span={24}>
                      <Typography.Title level={1} style={styles.titleStyle}>
                        Welcome to Messenger
                      </Typography.Title>
                    </Col>
                  </Row>
                  
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ]}
                    >
                      <Input/>
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                  {/* <Form onSubmit = {handleSubmit}>
                      <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control type = 'text' ref = {emailRef} required/>
                      </Form.Group>

                      <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type = 'text' ref = {passwordRef} required/>
                      </Form.Group>
                      <Button type = 'submit'>Login</Button>
                  </Form> */}
                  <div>
                    {loginMessage}
                  </div>
                  <Link to = '/register'>Register</Link>
                </Layout.Content>
                <Layout.Footer>
                  
                </Layout.Footer>                                
            </Layout>
        </div>
    )
}
