import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default function LoginSecuredRoute({ children, ...rest }) {
  let user = window.localStorage.getItem('user')
  return (
      <Route
        {...rest}
        render={({ location }) =>
          user !== null ? (
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
