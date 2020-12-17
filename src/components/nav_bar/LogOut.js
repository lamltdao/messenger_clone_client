import React from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import axios from 'axios'
import {AUTH_BASE_URL} from '../../config'
import {Button} from 'react-bootstrap'

export default function LogOut() {
    let [refreshToken, setRefreshToken] = useLocalStorage('refresh_token', null) 

    function logOut(e) {
        e.preventDefault()
        axios({
            method:'delete',
            url:AUTH_BASE_URL + '/auth/logout',
            data: {
                refreshToken
            }
        })
        .then(data => {
            console.log(data);
            setRefreshToken(null)
            window.location.href = '/login'
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <Button onClick = {logOut}>Log out</Button>
    )
}
