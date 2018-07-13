import React, {Component} from 'react';
import {Link} from 'react-router-dom'

const StudentItem = ({student}) => {
  return (
    <li className='student-item'>
      <Link to={`/students/${student.id}`} >
        {student.name}
        <img src='cody.jpg'/>
      </Link>
    </li>
  )
}

export default StudentItem
