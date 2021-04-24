import React, {useState} from 'react'
import ConversationList from './ConversationList'
import ContactList from './ContactList'
import {Tab, Nav, Button, Modal} from 'react-bootstrap'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'
import {useThemeContext} from '../../../contexts/ThemeProvider'

const CONVERSATION_KEY = 'conversation'
const CONTACT_KEY = 'contact'

export default function SideBar() {
    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY)
    const [modalOpen, setModalOpen] = useState(false)
    const isConversationTabOpen = activeKey === CONVERSATION_KEY
    const {theme} = useThemeContext()

    function closeModal() {
        setModalOpen(false)
    }
    return (
        <div style = {{width:'250px', height: '100%'}} className = {`d-flex flex-column mr-1 ${theme.backgroundColor}`}>
            <Tab.Container activeKey = {activeKey} onSelect = {(key) => {setActiveKey(key)}}>
                <Nav variant = 'tabs' className = 'justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey = {CONVERSATION_KEY} className={`${theme.textColor}`}>Conversations</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link eventKey = {CONTACT_KEY} className={`${theme.textColor}`}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className = 'border-right overflow-auto flex-grow-1'>
                    <Tab.Pane eventKey = {CONVERSATION_KEY}>
                        <ConversationList/>
                    </Tab.Pane>
                    <Tab.Pane eventKey = {CONTACT_KEY}>
                        <ContactList/>
                    </Tab.Pane>
                </Tab.Content>
                
                <Button className = 'rounded-4 mx-2' variant={theme.commonButtonColor} onClick = {() => setModalOpen(true)}>
                    New {isConversationTabOpen ? 'Conversations' : 'Contacts'}
                </Button>
            </Tab.Container> 

            <Modal show = {modalOpen} onHide = {closeModal} >
                {isConversationTabOpen ? 
                    <NewConversationModal closeModal = {closeModal}/>:
                    <NewContactModal closeModal = {closeModal}/> 
            }
            </Modal>     
        </div>
    )
}
