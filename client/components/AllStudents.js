import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchStudents} from '../reducers/studentReducer'

class AllStudents extends Component {

  constructor (props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount () {
    this.props.fetchStudents();
  }

  componentDidUpdate (prevProps) {
    if (this.props.students.length !== prevProps.students.length) {
      this.props.fetchStudents();
    }
  }

  buttonClick () {
    this.props.history.goBack();
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
        <button onClick={this.buttonClick} >Back</button>
        <button id='create-button'>
          <Link to='/new-student-form' >
            Add a new student!
          </Link>
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  students: state.students.list,
  history: ownProps.history,
});

const mapDispatchToProps = dispatch => ({
  fetchStudents: () => dispatch(fetchStudents())
});

const AllStudentsContainer = connect(mapStateToProps, mapDispatchToProps)(AllStudents);

export default AllStudentsContainer
