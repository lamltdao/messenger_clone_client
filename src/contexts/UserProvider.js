import React, {useEffect, useState, useContext, useCallback} from 'react'
import {useAuthContext} from './AuthProvider'
import {AUTH_BASE_URL} from '../config'

const UserContext = React.createContext()
export function useUserContext() {
    return useContext(UserContext)
}
export function UserProvider({children}) {
    // Each user has props: _id, name, email
    console.log('user render');
    const {authFetch} = useAuthContext()
    const [user, setUser] = useState({})
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        console.log('fetch user');
        authFetch({
            method: 'get',
            url: AUTH_BASE_URL + '/user'
        })
        .then(data => {
            const {contacts,...user} = data.data
            setUser(user)
            setContacts(contacts)
        })
        .catch(err => {
            setUser({})
            setContacts([])
        })
    },[])

    const value = {
        user,
        contacts,
    }
    return (
        <UserContext.Provider value = {value}>
            {children}
        </UserContext.Provider>
    )
}
