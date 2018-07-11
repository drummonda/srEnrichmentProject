import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchStudents} from '../reducers/studentReducer'

class AllStudents extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchStudents();
  }

  render () {
    const students = this.props.students;
    console.log("These are all the students:", students);

    return (
      <div id='student-list'>
        <h2>Cody's fucking students</h2>
        <ul>
          {this.props.students.length &&
            (students.map(student => (
              <li key={student.id}><Link to={`/students/${student.id}`} >{student.name}</Link></li>
            )
          )) }
        </ul>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  students: state.students.list
});

const mapDispatchToProps = dispatch => ({
  fetchStudents: () => dispatch(fetchStudents())
});

const AllStudentsContainer = connect(mapStateToProps, mapDispatchToProps)(AllStudents);

export default AllStudentsContainer
