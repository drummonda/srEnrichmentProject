import axios from 'axios';

// CONSTANTS
export const GET_CAMPUSES_FROM_SERVER = 'GET_CAMPUSES_FROM_SERVER';
export const GET_CAMPUSES = 'GET_CAMPUSES';
export const SET_CAMPUS = 'SET_CAMPUS';
export const ADD_CAMPUS = 'ADD_CAMPUS';
export const NEW_CAMPUS_NAME = 'NEW_CAMPUS_NAME';
export const NEW_CAMPUS_LOCATION = 'NEW_CAMPUS_LOCATION';
export const NEW_CAMPUS_HEADMASTER = 'NEW_CAMPUS_HEADMASTER';

// ACTION CREATORS
const getCampuses = campuses => ({
  type: GET_CAMPUSES,
  campuses
});

export const getCampus = campus => ({
  type: SET_CAMPUS,
  campus
});

export const addCampus = campus => ({
  type: ADD_CAMPUS,
  campus
});

export const newCampusName = name => ({
  type: NEW_CAMPUS_NAME,
  name
});

export const newCampusHeadmaster = headmaster => ({
  type: NEW_CAMPUS_HEADMASTER,
  headmaster
});

export const newCampusLocation = location => ({
  type: NEW_CAMPUS_LOCATION,
  location
})

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

export const postCampus = campus => async dispatch => {
  console.log(campus);
  const response = await axios.post('/api/campuses', campus);
  const gotCampus = response.data;
  dispatch(addCampus(gotCampus));
};


// HELPER FUNCTIONS
export const makeEmail = (campusName, headmasterName) => {
  const firstNameLowerCase = headmasterName.split(' ')[0].toLowerCase();
  const campusNameLowercase = campusName.split(' ').join('').toLowerCase();
  return `${firstNameLowerCase}@${campusNameLowercase}.wiz`;
}

export const makeImageUrl = campusName => {
  const campusNameLowercase = campusName.split(' ').join('').toLowerCase();
  return `${campusNameLowercase}.jpg`
}


// INITIAL STATE
const initialState = {
  list: [],
  currentCampus: {},
  newCampusName: '',
  newCampusLocation: '',
  newCampusHeadmaster: '',
}

// REDUCER HANDLING
const campusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAMPUSES:
      return Object.assign({}, state, {list: action.campuses});

    case SET_CAMPUS:
     const currentId = Number(action.campusId);
      return Object.assign({}, state, {currentCampus: action.campus});

    case NEW_CAMPUS_NAME:
      return Object.assign({}, state, {newCampusName: action.name});

    case NEW_CAMPUS_HEADMASTER:
      return Object.assign({}, state, {newCampusHeadmaster: action.headmaster});

    case NEW_CAMPUS_LOCATION:
      return Object.assign({}, state, {newCampusLocation: action.location});

    case ADD_CAMPUS:
      return Object.assign({}, state, {list: [...state.list, action.campus]});

    default:
      return state;
  }
}

export default campusReducer;
