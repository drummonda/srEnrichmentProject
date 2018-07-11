import axios from 'axios';

// CONSTANTS
export const GET_CAMPUSES_FROM_SERVER = 'GET_CAMPUSES_FROM_SERVER';
export const GET_CAMPUSES = 'GET_CAMPUSES';
export const SET_CAMPUS = 'SET_CAMPUS';

// ACTION CREATORS
const getCampuses = campuses => ({
  type: GET_CAMPUSES,
  campuses
});

export const getCampus = campus => ({
  type: SET_CAMPUS,
  campus
});

// THUNK MIDDLEWARE
export const fetchCampuses = () => {
  return async dispatch => {
    const res = await axios.get('/api/campuses');
    const campuses = res.data;
    const action = getCampuses(campuses);
    dispatch(action);
  }
}

export const fetchCampus = (campusId) => {
  return async dispatch => {
    const res = await axios.get(`/api/campuses/${campusId}`);
    const campus = res.data;
    const action = getCampus(campus);
    dispatch(action);
  }
}


// INITIAL STATE
const initialState = {
  list: [],
  currentCampus: {},
}

// REDUCER HANDLING
const campusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAMPUSES:
      return Object.assign({}, state, {list: action.campuses});

    case SET_CAMPUS:
     const currentId = Number(action.campusId);
      return Object.assign({}, state, {currentCampus: action.campus});

    default:
      return state;
  }
}

export default campusReducer;
