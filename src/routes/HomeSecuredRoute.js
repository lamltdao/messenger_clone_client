import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage';

export default function HomeSecuredRoute({ children, ...rest }) {
  let [refreshToken, setRefreshToken] = useLocalStorage('refresh_token', null) 
  return (
      <Route
        {...rest}
        render={({ location }) =>
          refreshToken !== null ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}
