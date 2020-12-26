import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'
import {AUTH_BASE_URL} from '../config'

export const apiStates = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    LOADING: 'LOADING'
}

export const useApi = (url, method, options) => {
    let [data, setData] = useState(null)
    let [error, setError] = useState(null)
    let [state, setStatus] = useState(apiStates.LOADING)
    const [accessToken, setAccessToken] = useLocalStorage('access_token', null)
    const [refreshToken, setRefreshToken] = useLocalStorage('refresh_token', null)
    

    useEffect(() => {
        let request = {url, method, ...options}

        // get a new accessToken
        axios({
            method: 'post',
            url: AUTH_BASE_URL + '/auth/token',
            data: {
                refreshToken
            }
        })
        .then(tokenData => {
            const newAccessToken = tokenData.data.accessToken ? tokenData.data.accessToken : null 
            setAccessToken(newAccessToken)
            request.headers = {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'           
            }
            console.log(request);
            axios(request)
            .then(userData => {
                console.log(userData.data);
                console.log('get data');

                setData(userData.data)
                setStatus(apiStates.SUCCESS)
            })
            .catch(err => {
                console.log(err);
                console.log('cannot get data');
                setError(err)
                setStatus(apiStates.ERROR)
            })
        })
        .catch(err => {
            console.log(err);
            setError(err)
            setStatus(apiStates.ERROR)
        })
        console.log('fetched');
    },[data,setData,error,setError, state, setStatus, accessToken, refreshToken, setAccessToken, url, method, options])

    return {data, error, state}
}
