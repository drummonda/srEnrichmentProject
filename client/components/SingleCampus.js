import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCampus} from '../reducers/campusReducer'
import StudentList from './StudentList'

class SingleCampus extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const campusId = Number(this.props.campusToSet)
    this.props.fetchCampus(campusId);
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
});

const mapDispatchToProps = dispatch => ({
  fetchCampus: (campusId) => dispatch(fetchCampus(campusId))
})

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer
