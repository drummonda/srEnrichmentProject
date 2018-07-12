import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCampuses} from '../reducers/campusReducer'
import AllStudents from './AllStudents'

class AllCampuses extends Component {

  constructor (props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount () {
    this.props.fetchCampuses();
  }

  buttonClick () {
    this.props.history.goBack();
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
         <button onClick={this.buttonClick} >Back</button>
         <button id='create-button'>
          <Link to='/new-campus-form' >
            Add a new campus!
          </Link>
        </button>
       </div>
      )
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  campuses: state.campuses.list,
  history: ownProps.history,
});

const mapDispatchToProps = dispatch => ({
  fetchCampuses: () => dispatch(fetchCampuses()),
});

const AllCampusesContainer = connect(mapStateToProps, mapDispatchToProps)(AllCampuses);

export default AllCampusesContainer
