import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage';

export default function HomeSecuredRoute({ children, ...rest }) {
  let [user, setUser] = useLocalStorage('user', null) 
  return (
      <Route
        {...rest}
        render={({ location }) =>
          user !== null ? (
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
