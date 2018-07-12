import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {newCampusName, newCampusLocation, newCampusHeadmaster, makeEmail, makeImageUrl, postCampus} from '../reducers/campusReducer'

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
      this.props.newCampusName(value);
    } else if (name === 'location') {
      this.props.newCampusLocation(value);
    } else if (name === 'headmaster') {
      this.props.newCampusHeadmaster(value);
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
    <Redirect to='/campuses' />
  }

  clearProps () {
    this.props.newCampusName('');
    this.props.newCampusHeadmaster('');
    this.props.newCampusLocation('');
  }

  buttonClick () {
    this.props.history.goBack();
  }

  render () {
    const {name, location, headmaster} = this.props;

    return (
      <div className='create-form' id='create-campus-form'>
        <h2>Cody's fucking campus creation form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Campus Name</label>
          <input type='text' name='name' value={name} onChange={this.handleChange} />

          <label>Campus Location</label>
          <input type='text' name='location' value={location}  onChange={this.handleChange} />

          <label>Campus Headmaster</label>
          <input type='text' name='headmaster' value={headmaster} onChange={this.handleChange} />

          <button >Create!</button>
        </form>
        <button onClick={this.buttonClick} >Back</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: state.campuses.newCampusName,
  location: state.campuses.newCampusLocation,
  headmaster: state.campuses.newCampusHeadmaster,
  history: ownProps.history
});

const mapDispatchToProps = dispatch => ({
  newCampusName: name => dispatch(newCampusName(name)),
  newCampusLocation: location => dispatch(newCampusLocation(location)),
  newCampusHeadmaster: headmaster => dispatch(newCampusHeadmaster(headmaster)),
  postCampus: campus => dispatch(postCampus(campus)),
});

const CreateCampusContainer = connect(mapStateToProps, mapDispatchToProps)(CreateCampusForm);

export default CreateCampusContainer
