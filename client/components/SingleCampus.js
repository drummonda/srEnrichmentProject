import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCampus, deleteCampus, studentForm, addStudent, removeStudent} from '../reducers/campusReducer'
import {fetchStudents} from '../reducers/studentReducer'
import StudentList from './StudentList'
import UpdateCampusForm from './UpdateCampusForm'
import StudentSelector from './StudentSelector'

class SingleCampus extends Component {

  constructor (props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddStudent = this.handleAddStudent.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount () {
    const campusId = Number(this.props.campusToSet);
    this.props.fetchCampus(campusId);
    this.props.fetchStudents();
  }

  componentDidUpdate (prevProps) {
    const {currentCampus, campusToSet} = this.props;
    const prevCampus = prevProps.currentCampus;
    if (JSON.stringify(currentCampus.students) !== JSON.stringify(prevCampus.students)) {
      this.props.fetchCampus(campusToSet);
    }
  }

  buttonClick () {
    this.props.history.goBack();
  }

  handleDelete () {
    const campusId = this.props.campusToSet;
    this.props.deleteCampus(campusId);
  }

  handleSelect (event) {
    const studentId = Number(event.target.value);
    this.props.studentForm(studentId);
  }

  handleAddStudent () {
    const {studentIdToAdd, campusToSet} = this.props;
    this.props.addStudent(studentIdToAdd, campusToSet);
  }

  handleRemove (studentId) {
    this.props.removeStudent(studentId);
  }

  render () {
    const campus = this.props.currentCampus;
    const {students} = this.props;

    return (
      (campus.name ?
       <div id='campus'>
        <h2>{campus.name}</h2>
        <h3>Location: {campus.location}</h3>
        <h3>Headmaster: {campus.headmaster}</h3>
        <button onClick={this.handleDelete} >Fucking Delete!!!</button>
        <button id='edit-button'>
          <Link to={`/campuses/${campus.id}/edit`} >
            Fuckin' Edit!
          </Link>
        </button>
        <button onClick={this.buttonClick} >Back</button>
        <StudentList
          students={campus.students}
          campusId={campus.id}
          handleRemove={this.handleRemove}/>
        <StudentSelector
          currentStudents={campus.students}
          students={students}
          handleSelect={this.handleSelect}
          handleAddStudent={this.handleAddStudent} />
       </div>
       :
       <h2>Loading</h2>
      )
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  students: state.students.list,
  campusToSet: Number(ownProps.match.params.campusId),
  currentCampus: state.campuses.currentCampus,
  studentIdToAdd: state.campuses.studentIdToAdd,
  history: ownProps.history,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCampus: campusId => dispatch(fetchCampus(campusId)),
  fetchStudents: () => dispatch(fetchStudents()),
  deleteCampus: campusId => dispatch(deleteCampus(campusId, ownProps.history)),
  studentForm: studentId => dispatch(studentForm(studentId)),
  addStudent: (studentId, campusId) => dispatch(addStudent(studentId, campusId)),
  removeStudent: studentId => dispatch(removeStudent(studentId))
})

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer
