import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash, faUsers, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import Login from './Login'
import Main from './Main'
import Register from './Register'
import VideoCall from './video_call/VideoCall'
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

library.add(fab, faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash,faUsers, faDoorOpen)

function App() {
  return (
    <div className="App">
        <ThemeProvider>
          <AuthProvider>
            <UserProvider>
              <SocketProvider>
                <ConversationProvider>
                  <VideoCallProvider>
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
                  </VideoCallProvider>
                </ConversationProvider>        
              </SocketProvider>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
    </div>
  );
}

export default App;
