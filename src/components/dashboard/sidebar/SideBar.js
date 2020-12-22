import React, {useState} from 'react'
import ConversationList from './ConversationList'
import ContactList from './ContactList'
import {Tab, Nav, Button, Modal} from 'react-bootstrap'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

const CONVERSATION_KEY = 'conversation'
const CONTACT_KEY = 'contact'

export default function SideBar() {
    const [activeKey, setActiveKey] = useState(CONTACT_KEY)
    const [modalOpen, setModalOpen] = useState(false)
    const isConversationTabOpen = activeKey === CONVERSATION_KEY

    function closeModal() {
        setModalOpen(false)
    }
    return (
        <div style = {{width:'250px'}} className = 'd-flex flex-column'>
            <Tab.Container activeKey = {activeKey} onSelect = {(key) => {setActiveKey(key)}}>
                <Nav variant = 'tabs' className = 'justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey = {CONVERSATION_KEY}>Conversations</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link eventKey = {CONTACT_KEY}>Contacts</Nav.Link>
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
                <div className = 'p-2 border-top border-right small'>
                    Your Id: <span className = 'text-muted'>Id</span>
                </div>
                <Button className = 'rounded-0' onClick = {() => setModalOpen(true)}>
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
