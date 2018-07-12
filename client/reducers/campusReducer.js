import axios from 'axios';

// CONSTANTS
export const GET_CAMPUSES_FROM_SERVER = 'GET_CAMPUSES_FROM_SERVER';
export const GET_CAMPUSES = 'GET_CAMPUSES';
export const SET_CAMPUS = 'SET_CAMPUS';
export const ADD_CAMPUS = 'ADD_CAMPUS';
export const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
export const CAMPUS_NAME_FORM = 'CAMPUS_NAME_FORM';
export const CAMPUS_LOCATION_FORM = 'CAMPUS_LOCATION_FORM';
export const CAMPUS_HEADMASTER_FORM = 'CAMPUS_HEADMASTER_FORM';

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

export const updateCampus = updatedCampus => ({
  type: UPDATE_CAMPUS,
  updatedCampus
})

export const campusNameForm = name => ({
  type: CAMPUS_NAME_FORM,
  name
});

export const campusHeadmasterForm = headmaster => ({
  type: CAMPUS_HEADMASTER_FORM,
  headmaster
});

export const campusLocationForm = location => ({
  type: CAMPUS_LOCATION_FORM,
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
  const response = await axios.post('/api/campuses', campus);
  const gotCampus = response.data;
  dispatch(addCampus(gotCampus));
};

export const putCampus = campus => async dispatch => {
  const response = await axios.put(`/api/campuses/${campus.id}`, campus);
  const gotCampus = response.data;
  dispatch(updateCampus(gotCampus));
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
  campusNameForm: '',
  campusLocationForm: '',
  campusHeadmasterForm: '',
}

// REDUCER HANDLING
const campusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAMPUSES:
      return Object.assign({}, state, {list: action.campuses});

    case SET_CAMPUS:
     const currentId = Number(action.campusId);
      return Object.assign({}, state, {currentCampus: action.campus});

    case CAMPUS_NAME_FORM:
      return Object.assign({}, state, {campusNameForm: action.name});

    case CAMPUS_HEADMASTER_FORM:
      return Object.assign({}, state, {campusHeadmasterForm: action.headmaster});

    case CAMPUS_LOCATION_FORM:
      return Object.assign({}, state, {campusLocationForm: action.location});

    case ADD_CAMPUS:
      return Object.assign({}, state, {list: [...state.list, action.campus]});

    case UPDATE_CAMPUS:
      return Object.assign({}, state, {currentCampus: action.updatedCampus});

    default:
      return state;
  }
}

export default campusReducer;
