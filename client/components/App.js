import React, {Component} from 'react';
import {Link, NavLink, Route, Switch} from 'react-router-dom'
import AllStudents from './AllStudents';
import AllCampuses from './AllCampuses';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import CreateStudentForm from './CreateStudentForm';
import CreateCampusForm from './CreateCampusForm';
import UpdateCampusForm from './UpdateCampusForm';
import UpdateStudentForm from './UpdateStudentForm';

export default class App extends Component {

  render () {
    return (
      <div id="container">
        <h1>Cody's campus</h1>
        <Route exact path='/students' component={AllStudents}/>
        <Route exact path='/campuses' component={AllCampuses}/>
        <Route path='/new-student-form' component={CreateStudentForm} />
        <Route path='/new-campus-form' component={CreateCampusForm} />
        <Route exact path='/campuses/:campusId' component={SingleCampus}/>
        <Route exact path='/students/:studentId' component={SingleStudent} />
        <Route exact path='/students/:studentId/edit' component={UpdateStudentForm} />
        <Route exact path='/campuses/:campusId/edit' component={UpdateCampusForm} />

      </div>
    )
  }
}
