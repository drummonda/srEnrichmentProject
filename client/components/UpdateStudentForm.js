import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {studentNameForm, studentAgeForm, studentFoodForm, makeImageUrl, putStudent} from '../reducers/studentReducer'
const JSON = require('circular-json');

class UpdateStudentForm extends Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearProps = this.clearProps.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.setFormProps = this.setFormProps.bind(this);
  }

  componentDidMount () {
    this.setFormProps();
  }

  componentDidUpdate (prevProps) {
    const { studentId, currentStudent } = this.props;
    const prevStudent = prevProps.currentStudent;
    if (JSON.stringify(prevStudent) !== JSON.stringify(currentStudent)) {
      this.setFormProps();
    }
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
    const { name, age, food, currentStudent } = this.props;
    const id = currentStudent.id;
    const image_url = makeImageUrl(name);
    const studentToSend = { id, name, age, food, image_url };
    console.log('do I get here 1', studentToSend);
    this.props.putStudent(studentToSend);
    this.clearProps();
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
    console.log("This is the currentStudent:", currentStudent);
    this.props.studentNameForm(currentStudent.name);
    this.props.studentAgeForm(currentStudent.age);
    this.props.studentFoodForm(currentStudent.favorite_food);
  }

  render () {
    const {name, age, food } = this.props;

    return (
      <div className='create-form' id='create-campus-form'>
        <h2>Cody's fucking student update form</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>Student Name</label>
          <input type='text' name='name' value={name} onChange={this.handleChange} />

          <label>Student Age</label>
          <input type='text' name='age' value={age}  onChange={this.handleChange} />

          <label>Student Favorite Food</label>
          <input type='text' name='food' value={food} onChange={this.handleChange} />

          <button >Fuckin' Update!</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: state.students.studentNameForm,
  age: state.students.studentAgeForm,
  food: state.students.studentFoodForm,
  currentStudent: state.students.currentStudent,
  studentId: ownProps.studentId,
  history: ownProps.history
});

const mapDispatchToProps = dispatch => ({
  studentNameForm: name => dispatch(studentNameForm(name)),
  studentAgeForm: age => dispatch(studentAgeForm(age)),
  studentFoodForm: food => dispatch(studentFoodForm(food)),
  putStudent: student => dispatch(putStudent(student)),
});

const UpdateStudentContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateStudentForm);

export default UpdateStudentContainer
