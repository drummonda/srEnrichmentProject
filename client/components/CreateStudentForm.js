import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {studentNameForm, studentAgeForm, studentFoodForm, makeImageUrl, postStudent} from '../reducers/studentReducer'

class CreateStudentForm extends Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearProps = this.clearProps.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
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
    const {name, age, food} = this.props;
    const image_url = makeImageUrl(name);
    const student = { name, age, food, image_url };
    this.props.postStudent(student);
    this.clearProps();
    this.props.history.push('/students');
  }

  clearProps () {
    this.props.studentNameForm('');
    this.props.studentAgeForm('');
    this.props.studentFoodForm('');
  }

  buttonClick () {
    this.props.history.goBack();
  }

  render () {
    const {name, age, food} = this.props;

    return (
      <div className='create-form' id='create-student-form'>
        <h2>Student fuckin' creation form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Student Name</label>
          <input type='text' name='name' value={name} onChange={this.handleChange} />

          <label>Student Age</label>
          <input type='text' name='age' value={age}  onChange={this.handleChange} />

          <label>Favorite Food</label>
          <input type='text' name='food' value={food} onChange={this.handleChange} />

          <button >Fuckin' create!</button>
        </form>
        <button onClick={this.buttonClick} >Back</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: state.students.studentNameForm,
  age: state.students.studentAgeForm,
  food: state.students.studentFoodForm,
  history: ownProps.history
});

const mapDispatchToProps = dispatch => ({
  studentNameForm: name => dispatch(studentNameForm(name)),
  studentAgeForm: age => dispatch(studentAgeForm(age)),
  studentFoodForm: food => dispatch(studentFoodForm(food)),
  postStudent: student => dispatch(postStudent(student)),
});

const CreateStudentContainer = connect(mapStateToProps, mapDispatchToProps)(CreateStudentForm);

export default CreateStudentContainer
