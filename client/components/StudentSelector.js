import React, {Component} from 'react'

const StudentSelector = ({currentStudents, students, handleSelect, handleAddStudent}) => {
  if (currentStudents) {
    let ids = currentStudents.map(student => student.id);
    students = students.filter(student => !ids.includes(student.id));
  }
  return (
    <div className='campus-select-container'>
      <label name='select'>
        Add a student!
      </label>
      <select  className="styled-select green rounded" onChange={(event) => handleSelect(event)}>
        {students.map(student => (
          <option value={student.id} key={student.name}>
            <em>{student.name}</em>
          </option>
        ))}
      </select>
      <button onClick={() => handleAddStudent()}>
        Fuckin' Add em!
      </button>
    </div>
  )
}

export default StudentSelector;
