import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage';

export default function LoginSecuredRoute({ children, ...rest }) {
  let [refreshToken, setRefreshToken] = useLocalStorage('refresh_token', null) 
  return (
      <Route
        {...rest}
        render={({ location }) =>
          refreshToken !== null ? (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          ) : children
        }
      />
    );
}
