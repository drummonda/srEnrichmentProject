import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'

export default class Navbar extends Component {

  render () {
    return (

      <nav id="navbar">
        <NavLink class='nav-link' to='/students'>Students</NavLink>
        <NavLink class='nav-link' to='/campuses'>Campuses</NavLink>
      </nav>
    )
  }
}
