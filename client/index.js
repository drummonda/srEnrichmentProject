import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Navbar from './components/Navbar'
import {HashRouter, Route, Switch} from 'react-router-dom'

ReactDOM.render(
  <HashRouter>
    <div id='container'>
      <Navbar/>
      <App />
    </div>
  </HashRouter>,
  document.getElementById('app')
)
