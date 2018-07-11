import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCampuses} from '../reducers/campusReducer'
import AllStudents from './AllStudents'

class AllCampuses extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchCampuses();
  }

  render () {
    const campuses = this.props.campuses;
    console.log("These are all the campuses:", campuses);

    return (
      (campuses.length &&
       <div id='all-campuses'>
         <h1>All the fuckin' campuses</h1>
         <ul>
          {campuses.map(campus => (
            <li key={campus.id}><Link to={`/campuses/${campus.id}`} >{campus.name}</Link></li>
          ))}
         </ul>
       </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  campuses: state.campuses.list
});

const mapDispatchToProps = dispatch => ({
  fetchCampuses: () => dispatch(fetchCampuses()),
});

const AllCampusesContainer = connect(mapStateToProps, mapDispatchToProps)(AllCampuses);

export default AllCampusesContainer
