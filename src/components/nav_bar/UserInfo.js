import React from 'react'
import {useUserContext} from '../../contexts/UserProvider'

export default function UserInfo() {
    const {user} = useUserContext()
    return (
        <div>
                {
                    user.name
                }
        </div>
    )
}
