import React, {Component} from 'react'

const CampusSelector = ({currentCampus, campuses, handleSelect}) => {
  if (currentCampus) {
    campuses = campuses.filter(campus => campus.id !== currentCampus.id);
  }
  return (
    <div id='campus-select-container'>
      <label name='select'>
        Pick a campus!
      </label>
      <select id='campus-selector' onChange={(event) => handleSelect(event)}>
        {currentCampus ?
          <option value={currentCampus.id} key={currentCampus.name}>
            {currentCampus.name}
          </option>
          : null
        }
        {campuses.map(campus => (
          <option value={campus.id} key={campus.name}>
            {campus.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CampusSelector;
