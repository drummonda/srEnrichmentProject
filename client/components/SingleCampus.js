import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCampus} from '../reducers/campusReducer'
import StudentList from './StudentList'
import UpdateCampusForm from './UpdateCampusForm'

class SingleCampus extends Component {

  constructor (props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount () {
    const campusId = Number(this.props.campusToSet)
    this.props.fetchCampus(campusId);
  }

  componentDidUpdate (prevProps) {
    const campusId = Number(this.props.campusToSet);
    const prevCampus = prevProps.currentCampus;
    const {currentCampus} = this.props;
    if (JSON.stringify(prevCampus) !== JSON.stringify(currentCampus)) {
      this.props.fetchCampus(campusId);
    }
  }

  buttonClick () {
    this.props.history.goBack();
  }

  render () {
    const campus = this.props.currentCampus;
    console.log("current campus: ", campus)

    return (
      (campus.name ?
       <div id='campus'>
        <h2>{campus.name}</h2>
        <h3>Location: {campus.location}</h3>
        <h3>Headmaster: {campus.headmaster}</h3>
        <StudentList students={campus.students} campusId={campus.id}/>
        <UpdateCampusForm campusId={campus.id} />
        <button onClick={this.buttonClick} >Back</button>
       </div>
       :
       <h2>Loading</h2>
      )
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  campusToSet: ownProps.match.params.campusId,
  currentCampus: state.campuses.currentCampus,
  history: ownProps.history,
});

const mapDispatchToProps = dispatch => ({
  fetchCampus: (campusId) => dispatch(fetchCampus(campusId))
})

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer
