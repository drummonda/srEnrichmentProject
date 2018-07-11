import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Navbar from './components/Navbar'
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <div id='app'>
        <Navbar/>
        <App />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
