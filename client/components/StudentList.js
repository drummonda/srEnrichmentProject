import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const StudentList = ({students, campusId}) => {
  console.log("These are all the students:", students);
  console.log("campus id: ", campusId)

  return (
    <div className='student-list'>
      <h2>Cody's fucking students</h2>
      <ul>
        {students ?
          (students.map(student => (
            <li key={student.id}>
              <Link to={`/students/${student.id}`} >
                {student.name}
              </Link>
            </li>
          )))
          :
          <h2>No students in this fucking campus yet!</h2> }
      </ul>
    </div>
  )
}

export default StudentList
