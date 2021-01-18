import React, {useContext, useState, useRef} from 'react'
import {AUTH_BASE_URL} from '../config'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'


const isTokenExpired = (token) => {
    if(!token) return true
    const decode = JSON.parse(atob(token.split('.')[1]))
    const expiredDateInSec = decode.exp ? decode.exp : null
    return expiredDateInSec ? expiredDateInSec * 1000 < Date.now() - 2000 : true
}

const AuthContext = React.createContext()
export function useAuthContext() {
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    
    const [accessToken, setAccessToken] = useLocalStorage('access_token', null)
    const [refreshToken, setRefreshToken] = useLocalStorage('refresh_token', null)
    const isTokenUpdating = useRef(false)
    // get accessToken
    async function getAccessToken() {
        if(!accessToken) return null
        if(!isTokenUpdating.current && isTokenExpired(accessToken)) {
            isTokenUpdating.current = true
            await axios({
                method: 'post',
                url: AUTH_BASE_URL + '/auth/token',
                data: {
                    refreshToken
                }
            })
            .then(data => {
                const {accessToken} = data.data
                setAccessToken(accessToken)
            })
            .catch(err => {
                setAccessToken(null)
            })
            isTokenUpdating.current = false
            return accessToken
        }
        return accessToken
    }  
    
    // fetch api with accessToken
    async function authFetch(request) {
        const token = await getAccessToken()
        request = request || {}
        request.headers = {
            ...request.headers,
            'Authorization' : `Bearer ${token}`
        }
        return axios(request)
    }

    // login 
    async function login({email, password}) {
        let status = 'LOADING'
        await axios({
			method:'post',
			url:AUTH_BASE_URL +'/auth/login',
			data: {email, password}
        })
        .then(data => {
            const {accessToken, refreshToken} = data.data
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
            status = 'SUCCESS'
        })
		.catch(err => {
			status = 'ERROR'
        })   
        return {status} 
    }
    // logout
    async function logOut() {
        let status = 'LOADING'
        await axios({
            method:'delete',
            url:AUTH_BASE_URL + '/auth/logout',
            data: {
                refreshToken
            }
        })
        .then(data => {
            status = 'SUCCESS'
            setRefreshToken(null)
        })
        .catch(err => {
            status = 'ERROR'
        })
        return {status}
    }
    const value = {
       login,
       logOut,
       getAccessToken,
       authFetch
    }
    return (
        <AuthContext.Provider value = {value}>
                {children}
        </AuthContext.Provider>
    )
}

