import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'

export default class Navbar extends Component {

  render () {
    return (

      <nav id="navbar">
        <NavLink className='nav-link' to='/students'>Students</NavLink>
        <NavLink className='nav-link' to='/campuses'>Campuses</NavLink>
      </nav>
    )
  }
}
