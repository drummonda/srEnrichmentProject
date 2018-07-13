import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchStudents} from '../reducers/studentReducer'
import StudentItem from './StudentItem'

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
      <div className='student-list'>
        <div className='header'>
          <h2>Cody's students</h2>
          <div className='button-div'>
            <button className='button' onClick={this.buttonClick} >Back</button>
            <button className='button'>
              <Link to='/new-student-form' >
                Add a new student!
              </Link>
            </button>
          </div>
        </div>
        <div className='actual-student-list'>
          <ul>
            {this.props.students.length &&
              (students.map(student => (
                <StudentItem key={student.id} student={student}/>
              )
            )) }
          </ul>
        </div>
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
