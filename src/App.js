import './App.css';
import Login from './components/Login'
import Main from './components/Main'
import Register from './components/Register'
import HomeSecuredRoute from './routes/HomeSecuredRoute'
import LoginSecuredRoute from './routes/LoginSecuredRoute'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch, 
  Route,
} from 'react-router-dom'
function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
