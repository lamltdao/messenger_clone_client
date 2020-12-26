import React, {useContext, useState} from 'react'
import {AUTH_BASE_URL} from '../config'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'


const isTokenExpired = (token) => {
    if(!token) return true
    const decode = JSON.parse(atob(token.split('.')[1]))
    const expiredDateInSec = decode.exp ? decode.exp : null
    return expiredDateInSec ? expiredDateInSec * 1000 < Date.now() : true
}

const AuthContext = React.createContext()
export function useAuthContext() {
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    
    const [accessToken, setAccessToken] = useLocalStorage('access_token', null)
    const [refreshToken, setRefreshToken] = useLocalStorage('refresh_token', null)
    const [isTokenUpdating, setIsTokenUpdating] = useState(false)
    // get accessToken
    async function getAccessToken() {
        if(!accessToken) return null
        if(!isTokenUpdating && isTokenExpired(accessToken)) {
            setIsTokenUpdating(true)
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
            setIsTokenUpdating(false)
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

    // logout

    const value = {
       getAccessToken,
       authFetch
    }
    return (
        <AuthContext.Provider value = {value}>
                {children}
        </AuthContext.Provider>
    )
}

