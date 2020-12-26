import React, {useEffect, useState, useContext} from 'react'
import {useAuthContext} from './AuthProvider'
import {AUTH_BASE_URL} from '../config'

const UserContext = React.createContext()
export function useUserContext() {
    return useContext(UserContext)
}
export function UserProvider({children}) {
    const {authFetch} = useAuthContext()
    const [user, setUser] = useState({})
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        authFetch({
            method: 'get',
            url: AUTH_BASE_URL + '/user'
        })
        .then(data => {
            setUser(data.data)
        })
        .catch(err => {
            setUser({})
        })
    },[setUser])

    useEffect(() => {
        authFetch({
            method: 'get',
            url: AUTH_BASE_URL + '/user/contact'
        })
        .then(data => {
            setContacts(data.data)
        })
        .catch(err => {
            console.log(err);
            setContacts([])
        })
    },[setContacts])

    const value = {
        user,
        contacts
    }
    return (
        <UserContext.Provider value = {value}>
            {children}
        </UserContext.Provider>
    )
}
