import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCampuses} from '../reducers/campusReducer'
import CampusItem from './CampusItem'

class AllCampuses extends Component {

  constructor (props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount () {
    this.props.fetchCampuses();
  }

  componentDidUpdate (prevProps) {
    if (this.props.campuses.length !== prevProps.campuses.length) {
      this.props.fetchCampuses();
    }
  }

  buttonClick () {
    this.props.history.goBack();
  }

  render () {
    const campuses = this.props.campuses;
    console.log("These are all the campuses:", campuses);

    return (
      (campuses.length &&
       <div className='campus-list'>
        <div className='header'>
         <h1>All the fuckin' campuses</h1>
          <div className='button-div'>
             <button className='button' onClick={this.buttonClick} >Back</button>
             <button className='button' id='create-button'>
              <Link to='/new-campus-form' >
                Add a new campus!
              </Link>
            </button>
          </div>
         </div>
         <div className='actual-campus-list'>
          <ul>
            {campuses.map(campus => (
              <CampusItem key={campus.id} campus={campus} />
            ))}
          </ul>
         </div>
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
