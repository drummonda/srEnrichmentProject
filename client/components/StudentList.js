import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const StudentList = ({students, campusId, handleRemove}) => {
  console.log("These are all the students:", students);
  console.log("campus id: ", campusId)

  return (
    <div className='student-list'>
      <ul>
        {students ?
          (students.map(student => (
            <li className='campus-student-list'key={student.id}>
              <Link className='student-name' to={`/students/${student.id}`} >
                {student.name}
              </Link>
              <button onClick={() => handleRemove(student.id)} >Fucking Delete!!!</button>
            </li>
          )))
          :
          <h2>No students in this fucking campus yet!</h2> }
      </ul>
    </div>
  )
}

export default StudentList
