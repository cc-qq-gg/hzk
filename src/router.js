import React from 'react'
import Home from './components/home'
import Login from './components/login'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function AppRouter() {
  return (
    <Router>
      <div><Link exact to='/'>tologin</Link></div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </Router>

  )
}
