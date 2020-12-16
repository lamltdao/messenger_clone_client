import './App.css';
import Login from './components/Login'
import Main from './components/Main'
import Register from './components/Register'
import HomeSecuredRoute from './routes/HomeSecuredRoute'

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
            <Route path = '/login'>
              <Login/>
            </Route>

            <Route path = '/register'>
              <Register/>
            </Route>

            <HomeSecuredRoute path = '/'>
              <Main/>
            </HomeSecuredRoute>

          </Switch>
        </Router>      
    </div>
  );
}

export default App;
