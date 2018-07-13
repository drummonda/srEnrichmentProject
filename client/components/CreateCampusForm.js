import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {campusNameForm, campusLocationForm, campusHeadmasterForm, makeEmail, makeImageUrl, postCampus} from '../reducers/campusReducer'

class CreateCampusForm extends Component {

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
      this.props.campusNameForm(value);
    } else if (name === 'location') {
      this.props.campusLocationForm(value);
    } else if (name === 'headmaster') {
      this.props.campusHeadmasterForm(value);
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    const {name, location, headmaster} = this.props;
    const headmaster_email = makeEmail(name, headmaster);
    const image_url = makeImageUrl(name);
    const campus = { name, location, headmaster, headmaster_email, image_url };
    this.props.postCampus(campus);
    this.clearProps();
    this.props.history.push('/campuses');
  }

  clearProps () {
    this.props.campusNameForm('');
    this.props.campusHeadmasterForm('');
    this.props.campusLocationForm('');
  }

  buttonClick () {
    this.props.history.goBack();
  }

  render () {
    const {name, location, headmaster} = this.props;

    return (
      <div className='create-form' id='create-campus-form'>
        <div className='header'>
          <h2>Cody's fucking campus creation form</h2>
          <div className='button-div'>
            <button id='back' onClick={this.buttonClick} >Back</button>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>Campus Name</label>
          <input type='text' name='name' value={name} onChange={this.handleChange} />

          <label>Campus Location</label>
          <input type='text' name='location' value={location}  onChange={this.handleChange} />

          <label>Campus Headmaster</label>
          <input type='text' name='headmaster' value={headmaster} onChange={this.handleChange} />

          <button >Create!</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: state.campuses.campusNameForm,
  location: state.campuses.campusLocationForm,
  headmaster: state.campuses.campusHeadmasterForm,
  history: ownProps.history
});

const mapDispatchToProps = dispatch => ({
  campusNameForm: name => dispatch(campusNameForm(name)),
  campusLocationForm: location => dispatch(campusLocationForm(location)),
  campusHeadmasterForm: headmaster => dispatch(campusHeadmasterForm(headmaster)),
  postCampus: campus => dispatch(postCampus(campus)),
});

const CreateCampusContainer = connect(mapStateToProps, mapDispatchToProps)(CreateCampusForm);

export default CreateCampusContainer
