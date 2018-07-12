import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {campusNameForm, campusLocationForm, campusHeadmasterForm, makeEmail, makeImageUrl, putCampus} from '../reducers/campusReducer'

class UpdateCampusForm extends Component {

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
    const { campusId, currentCampus } = this.props;
    const prevCampus = prevProps.currentCampus;
    if (JSON.stringify(prevCampus) !== JSON.stringify(currentCampus)) {
      this.setFormProps();
    }
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
    const { name, location, headmaster, currentCampus } = this.props;
    const id = currentCampus.id;
    const headmaster_email = makeEmail(name, headmaster);
    const image_url = makeImageUrl(name);
    const campus = { id, name, location, headmaster, headmaster_email, image_url };
    this.props.putCampus(campus);
    this.clearProps();
  }

  clearProps () {
    this.props.campusNameForm('');
    this.props.campusHeadmasterForm('');
    this.props.campusLocationForm('');
  }

  buttonClick () {
    this.props.history.goBack();
  }

  setFormProps () {
    const { currentCampus } = this.props;
    this.props.campusNameForm(currentCampus.name);
    this.props.campusLocationForm(currentCampus.location);
    this.props.campusHeadmasterForm(currentCampus.headmaster);
  }

  render () {
    let {name, location, headmaster } = this.props;

    return (
      <div className='create-form' id='create-campus-form'>
        <h2>Cody's fucking campus update form</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
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
  currentCampus: state.campuses.currentCampus,
  campusId: ownProps.campusId,
  history: ownProps.history
});

const mapDispatchToProps = dispatch => ({
  campusNameForm: name => dispatch(campusNameForm(name)),
  campusLocationForm: location => dispatch(campusLocationForm(location)),
  campusHeadmasterForm: headmaster => dispatch(campusHeadmasterForm(headmaster)),
  putCampus: campus => dispatch(putCampus(campus)),
});

const UpdateCampusContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateCampusForm);

export default UpdateCampusContainer
