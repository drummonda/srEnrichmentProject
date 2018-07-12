import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStudent} from '../reducers/studentReducer'
import UpdateStudentForm from './UpdateStudentForm'
const JSON = require('circular-json');

class SingleStudent extends Component {

  constructor (props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount () {
    const studentId = Number(this.props.studentToSet)
    this.props.fetchStudent(studentId);
  }

  componentDidUpdate (prevProps) {
    const studentId = Number(this.props.studentToSet);
    const prevStudent = prevProps.currentStudent;
    const {currentStudent} = this.props;
    if (JSON.stringify(prevStudent) !== JSON.stringify(currentStudent)) {
      this.props.fetchStudent(studentId);
    }
  }

  buttonClick () {
    this.props.history.goBack();
  }

  render () {
    const {currentStudent} = this.props;

    return (
      (currentStudent.name ?
       <div id='student'>
        <h2>{currentStudent.name}</h2>
        <h3>Age: {currentStudent.age}</h3>
        <h3>Favorite Food: {currentStudent.favorite_food}</h3>
        <UpdateStudentForm studentId={currentStudent.id} />
        <button onClick={this.buttonClick} >Back</button>
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
  history: ownProps.history,
});

const mapDispatchToProps = dispatch => ({
  fetchStudent: (studentId) => dispatch(fetchStudent(studentId))
})

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer
