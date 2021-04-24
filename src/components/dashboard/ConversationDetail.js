import React, {useState, useCallback} from 'react'
import {CLIENT_BASE_URL} from '../../config'
import {useThemeContext, themeOptions} from '../../contexts/ThemeProvider'
import {Form, InputGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import {useConversations} from '../../contexts/ConversationProvider'
import {useUserContext} from '../../contexts/UserProvider'

export default function ConversationDetail() {
    // set theme
    const {theme, setTheme} = useThemeContext()
    
    // get conversation info
    const {sendMessage, selectedConversationId, conversations} = useConversations()
    const conversation = selectedConversationId === null ? null : conversations.find(conversation => conversation._id === selectedConversationId)
    // get user info 
    const {user, contacts} = useUserContext()
    const userId = user._id
    // 
    const [text, setText] = useState('')

    // scroll to last message sent
    const setRef = useCallback(node => {
        if(node) {
            node.scrollIntoView({smooth : true})
        }
    },[])
    
    // send message when clicked 'Send' button
    function handleSubmit(e) {
        e.preventDefault()
        if(text !== '') {
            sendMessage(selectedConversationId, user, text)
            setText('') 
        }
    }
    // join a video call
    function handleClick(e) {
        e.preventDefault()
        window.open(CLIENT_BASE_URL + `/video-call/${selectedConversationId}`)    
    }
    return (
        conversation ? 

        <div className = {`d-flex flex-column flex-grow-1 ${theme.backgroundColor}`} style = {{height: '100%'}}>
            <div className = 'd-flex flex-row justify-content-end'>
                <DropdownButton title = 'Choose your theme' className='mr-2' variant={theme.commonButtonColor}>
                    {
                        themeOptions.map((theme, index) => {
                            return (
                            <Dropdown.Item key = {index} onClick = {() => {setTheme(theme)}}>{theme.name}</Dropdown.Item>                            )
                        })
                    }
                </DropdownButton>
                <Button onClick = {handleClick} className='mr-2' variant={theme.commonButtonColor}>Video Call</Button>
            </div>
            
            <div className = 'flex-grow-1 overflow-auto'>
                <div className = 'd-flex flex-column align-items-start justify-content-end px-3'>
                    { 
                    conversation.messages.map((message, index) => {
                        const lastMessage = conversation.messages.length - 1 === index
                        const senderInfo = message.user
                        const isSentFromMe = senderInfo._id === userId
                        const {messageBody} = message
                        return (
                            <div 
                                ref = {lastMessage ? setRef : null}
                                key = {index}
                                className = {`my-1 d-flex flex-column ${isSentFromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                {
                                    // set color of message box and sender's name depending on the sender (user or his/her contacts)
                                }
                                <div className = {`rounded px-2 py-1 
                                                    ${isSentFromMe ? theme.myTextBoxColor : theme.otherTextBoxColor}`}
                                >
                                    {messageBody}
                                </div>

                                <div className = {`text-muted small ${isSentFromMe ? 'text-right' : ''}`}>
                                    {isSentFromMe ? 'You' : senderInfo.name}
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>  
            <Form onSubmit = {handleSubmit}>
                <Form.Group className = 'm-2'>
                    <InputGroup>
                        <Form.Control 
                        as = 'textarea'
                        required 
                        value = {text}
                        onChange = {e => setText(e.target.value)}
                        style = {{height: '75px', resize: 'none'}} 
                        className = {`${theme.textAreaColor}`}   
                        />
                        <InputGroup.Append>
                            <Button type = 'submit' className = {`${theme.sendButtonColor}`}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
        :
        <div>
            No conversation opened
        </div>
    )
}
