import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {newStudentName, newStudentAge, newStudentFood, postStudent} from '../reducers/studentReducer'

class CreateStudentForm extends Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    const value = event.target.value;
    const name = event.target.name;
    if(name === 'name') {
      this.props.newStudentName(value);
    } else if (name === 'age') {
      this.props.newStudentAge(value);
    } else if (name === 'food') {
      this.props.newStudentFood(value);
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    const {name, age, food} = this.props;
    const student = { name, age, food };
    this.props.postStudent(student);
    this.props.newStudentName('');
    this.props.newStudentAge('');
    this.props.newStudentFood('');
  }

  render () {
    const {name, age, food} = this.props;

    return (
      <div className='form' id='create-student-form'>
        <h2>Cody's fucking student creation form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Student Name</label>
          <input type='text' name='name' value={name} onChange={this.handleChange} />

          <label>Student Age</label>
          <input type='text' name='age' value={age}  onChange={this.handleChange} />

          <label>Favorite Food</label>
          <input type='text' name='food' value={food} onChange={this.handleChange} />

          <button >Create!</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  name: state.students.newStudentName,
  age: state.students.newStudentAge,
  food: state.students.newStudentFood,
});

const mapDispatchToProps = dispatch => ({
  newStudentName: name => dispatch(newStudentName(name)),
  newStudentAge: age => dispatch(newStudentAge(age)),
  newStudentFood: food => dispatch(newStudentFood(food)),
  postStudent: student => dispatch(postStudent(student)),
});

const CreateStudentContainer = connect(mapStateToProps, mapDispatchToProps)(CreateStudentForm);

export default CreateStudentContainer
