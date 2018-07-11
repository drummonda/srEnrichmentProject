import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStudent} from '../reducers/studentReducer'

class SingleStudent extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const studentId = Number(this.props.studentToSet)
    this.props.fetchStudent(studentId);
  }

  render () {
    const student = this.props.currentStudent;
    console.log("current student: ", student)

    return (
      (student ?
       <div id='student'>
        <h2>{student.name}</h2>
        <h3>Age: {student.age}</h3>
        <h3>Favorite Food: {student.favorite_food}</h3>
       </div>
       :
       <h2>Loading</h2>
      )
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  studentToSet: ownProps.match.params.studentId,
  currentStudent: state.students.currentStudent,
});

const mapDispatchToProps = dispatch => ({
  fetchStudent: (studentId) => dispatch(fetchStudent(studentId))
})

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer
