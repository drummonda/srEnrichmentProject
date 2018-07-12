import React, {Component} from 'react'

const StudentSelector = ({currentStudents, students, handleSelect, handleAddStudent}) => {
  if (currentStudents) {
    let ids = currentStudents.map(student => student.id);
    students = students.filter(student => !ids.includes(student.id));
  }
  return (
    <div id='campus-select-container'>
      <label name='select'>
        Add a student!
      </label>
      <select id='campus-selector' onChange={(event) => handleSelect(event)}>
        {students.map(student => (
          <option value={student.id} key={student.name}>
            {student.name}
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
