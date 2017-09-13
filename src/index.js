import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Attach from './components/Attach.js'
import Section from './components/Section.js'
import App from './components/App.js'
import Callback from './components/Callback.js'
import './index.css'
import auth from './util/auth'

const checkAuth = (nextState, replace, callback) => {
  auth
    .init()
    .then(() => {
      callback()
    })
    .catch(error => {
      callback(error)
    })
}

ReactDOM.render(
  <Router basename='/'>
    <Switch>
      <Route path='/' exact component={App} />}/>
      <Route path='/attach' component={Attach} onEnter={checkAuth} />} />
      <Route path='/section' component={Section} onEnter={checkAuth} />} />
      <Route path='/callback' onEnter={checkAuth} component={Callback} />} />
    </Switch>
  </Router>,
  document.getElementById('root')
)
