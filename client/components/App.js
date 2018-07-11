import React, {Component} from 'react';
import {Link, NavLink, Route, Switch} from 'react-router-dom'
import AllStudents from './AllStudents';
import AllCampuses from './AllCampuses';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';

export default class App extends Component {

  render () {
    return (
      <div id="container">
        <h1>Cody's campus</h1>
        <Route exact path='/students' component={AllStudents}/>
        <Route exact path='/campuses' component={AllCampuses}/>
        <Route path='/campuses/:campusId' component={SingleCampus}/>
        <Route path='/students/:studentId' component={SingleStudent} />
      </div>
    )
  }
}
