import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchStudent, studentNameForm, studentAgeForm, studentFoodForm, campusForm, makeImageUrl, putStudent} from '../reducers/studentReducer'
import {fetchCampuses} from '../reducers/campusReducer'
import CampusSelector from './CampusSelector'

class UpdateStudentForm extends Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearProps = this.clearProps.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.setFormProps = this.setFormProps.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  async componentDidMount () {
    await this.props.fetchStudent(this.props.studentId);
    await this.props.fetchCampuses();
    this.setFormProps();
  }

  handleChange (event) {
    const value = event.target.value;
    const name = event.target.name;
    if(name === 'name') {
      this.props.studentNameForm(value);
    } else if (name === 'age') {
      this.props.studentAgeForm(value);
    } else if (name === 'food') {
      this.props.studentFoodForm(value);
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    const { name, age, food, currentStudent, campusId} = this.props;
    const {id} = currentStudent;
    const image_url = makeImageUrl(name);
    const studentToSend = { id, name, age, food, image_url, campusId };
    console.log('do I get here 1', studentToSend);
    this.props.putStudent(studentToSend);
    this.clearProps();
  }

  handleSelect (event) {
    const campusId = Number(event.target.value);
    console.log(campusId);
    this.props.campusForm(campusId);
  }

  clearProps () {
    this.props.studentNameForm('');
    this.props.studentAgeForm('');
    this.props.studentFoodForm('');
  }

  buttonClick () {
    this.props.history.goBack();
  }

  setFormProps () {
    const { currentStudent } = this.props;
    this.props.studentNameForm(currentStudent.name);
    this.props.studentAgeForm(currentStudent.age);
    this.props.studentFoodForm(currentStudent.favorite_food);
  }

  render () {
    const {name, age, food, currentStudent, campuses} = this.props;
    const currentCampus = campuses.find(campus => campus.id === currentStudent.campusId);

    return (
      (currentStudent.name ?
      <div className='create-form' id='create-campus-form'>
        <h2>Fuckin' update a student form</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>Student Name</label>
          <input type='text' name='name' value={name} onChange={this.handleChange} />

          <label>Student Age</label>
          <input type='text' name='age' value={age}  onChange={this.handleChange} />

          <label>Student Favorite Food</label>
          <input type='text' name='food' value={food} onChange={this.handleChange} />

          <CampusSelector currentCampus={currentCampus} campuses={campuses} handleSelect={this.handleSelect}/>
          <button >Fuckin' Update!</button>
        </form>
      </div>
      :
      <h1>I'm fucking loading, chill!</h1>)
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: state.students.studentNameForm,
  age: state.students.studentAgeForm,
  food: state.students.studentFoodForm,
  currentStudent: state.students.currentStudent,
  campuses: state.campuses.list,
  campusId: state.students.campusId,
  studentId: Number(ownProps.match.params.studentId),
  history: ownProps.history
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  studentNameForm: name => dispatch(studentNameForm(name)),
  studentAgeForm: age => dispatch(studentAgeForm(age)),
  studentFoodForm: food => dispatch(studentFoodForm(food)),
  campusForm: campusId => dispatch(campusForm(campusId)),
  putStudent: student => dispatch(putStudent(student, ownProps.history)),
  fetchStudent: studentId => dispatch(fetchStudent(studentId)),
  fetchCampuses: () => dispatch(fetchCampuses()),
});

const UpdateStudentContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateStudentForm);

export default UpdateStudentContainer
