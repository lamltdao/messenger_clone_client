import Login from './Login'
import Main from './Main'
import Register from './Register'
import HomeSecuredRoute from '../routes/HomeSecuredRoute'
import LoginSecuredRoute from '../routes/LoginSecuredRoute'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch, 
  Route,
} from 'react-router-dom'

import {ConversationProvider} from '../contexts/ConversationProvider'
import {SocketProvider} from '../contexts/SocketProvider'
import {AuthProvider} from '../contexts/AuthProvider'
import {UserProvider} from '../contexts/UserProvider'
import {ThemeProvider} from '../contexts/ThemeProvider'

function App() {
  return (
    <div className="App">
        <AuthProvider>
          <UserProvider>
            <SocketProvider>
              <ConversationProvider>
                <ThemeProvider>
                  <Router>
                    <Switch>
                      <LoginSecuredRoute exact path = '/login'>
                        <Login/>
                      </LoginSecuredRoute>

                      <Route exact path = '/register'>
                        <Register/>
                      </Route>

                      <HomeSecuredRoute exact path = '/'>
                        <Main/>
                      </HomeSecuredRoute>

                    </Switch>
                  </Router>      
                </ThemeProvider>
              </ConversationProvider>        
            </SocketProvider>
          </UserProvider>
        </AuthProvider>
    </div>
  );
}

export default App;
