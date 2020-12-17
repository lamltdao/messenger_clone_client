import React, {useEffect} from 'react'
import ConversationList from './ConversationList'
export default function SideBar() {
    return (
        <div style = {{width:'250px'}} className = 'd-flex flex-column'>
            <ConversationList/>
        </div>
    )
}
