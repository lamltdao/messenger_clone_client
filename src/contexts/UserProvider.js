import React, {useEffect, useState, useContext} from 'react'
import {useAuthContext} from './AuthProvider'
import {AUTH_BASE_URL} from '../config'

const UserContext = React.createContext()
export function useUserContext() {
    return useContext(UserContext)
}
export function UserProvider({children}) {
    // Each user has props: _id, name, email
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

    function getUserInfoById(contactId) {
        const userInfo = [user, ...contacts].find(contact => contact._id === contactId)
        // if no contact is found
        if(userInfo === undefined) return null
        else return userInfo
    }

    function getAllUsers() {
        return [user, ...contacts]
    }

    const value = {
        user,
        contacts,
        getUserInfoById,
        getAllUsers
    }
    return (
        <UserContext.Provider value = {value}>
            {children}
        </UserContext.Provider>
    )
}
