import React from 'react'
import Profile from './views/Profile'
import Home from './views/Home'
import Friends from './views/Friends'
import Courses from './views/Courses'
import RoundHistory from './views/RoundHistory'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import RoundCreation from './views/RoundCreation'


const App = props => {
  //potential for rememberme
  // useEffect(() => {
  //   window.addEventListener("beforeunload", (ev) => {
  //     ev.preventDefault()
  //     if(localStorage.getItem('jwt'))
  //   })
  // })

  return (
    <Router>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/friends">
          <Friends />
        </Route>
        <Route path="/courses">
          <Courses />
        </Route>
        <Route path="/roundHistory">
          <RoundHistory />
        </Route>
        <Route exact path="/roundCreation/:id">
          <RoundCreation />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App

