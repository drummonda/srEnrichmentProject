import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchStudent, deleteStudent} from '../reducers/studentReducer'
import {fetchCampuses} from '../reducers/campusReducer'
import UpdateStudentForm from './UpdateStudentForm'
const JSON = require('circular-json');

class SingleStudent extends Component {

  constructor (props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount () {
    const studentId = Number(this.props.studentToSet)
    this.props.fetchStudent(studentId);
    this.props.fetchCampuses();
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

  handleDelete () {
    const studentId = Number(this.props.studentToSet);
    this.props.deleteStudent(studentId);
  }

  render () {
    const {currentStudent, campuses} = this.props;
    console.log(campuses);
    const currentCampus = campuses.find(campus => campus.id === currentStudent.campusId);

    return (
      (currentStudent.name ?
       <div className='student-page'>
        <div className='student-info'>
          <h2>{currentStudent.name}</h2>
          <img src='cody.jpg'/>
          <br/><br/><br/>
          <h3>Age: {currentStudent.age}</h3>
          <h3>Favorite Food: {currentStudent.favorite_food}</h3>
          <h3>Attends: { currentCampus ? currentCampus.name : "No fucking campus!" }
          </h3>
        </div>
        <div className='button-div'>
          <button className='button' onClick={this.handleDelete} >Fucking Delete!!!</button>
          <button className='button'>
            <Link to={`/students/${currentStudent.id}/edit`} >
              Fuckin' Edit!
            </Link>
          </button>
          <button className='button' onClick={this.buttonClick} >Back</button>
        </div>
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
  campuses: state.campuses.list,
  history: ownProps.history,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchStudent: (studentId) => dispatch(fetchStudent(studentId)),
  fetchCampuses: () => dispatch(fetchCampuses()),
  deleteStudent: (studentId) => dispatch(deleteStudent(studentId, ownProps.history))
})

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer
