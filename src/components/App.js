import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import Main from './Main'
import Register from './Register'
import VideoCall from './VideoCall'
import HomeSecuredRoute from '../routes/HomeSecuredRoute'
import LoginSecuredRoute from '../routes/LoginSecuredRoute'
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
import {VideoCallProvider} from '../contexts/VideoCallProvider'

function App() {
  return (
    <div className="App">
        <AuthProvider>
          <UserProvider>
            <SocketProvider>
              <ConversationProvider>
                <VideoCallProvider>
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

                        <Route exact path = '/video-call/:conversationId'>
                          <VideoCall/>
                        </Route>
                      </Switch>
                    </Router>      
                  </ThemeProvider>
                </VideoCallProvider>
              </ConversationProvider>        
            </SocketProvider>
          </UserProvider>
        </AuthProvider>
    </div>
  );
}

export default App;
