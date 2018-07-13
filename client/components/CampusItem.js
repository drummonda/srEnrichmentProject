import React, {Component} from 'react';
import {Link} from 'react-router-dom'

const CampusItem = ({campus}) => {
  return (
    <li className='campus-item'>
      <Link to={`/campuses/${campus.id}`} >{campus.name}</Link>
      <img src='upenn.jpg'/>
    </li>
  )
}

export default CampusItem
