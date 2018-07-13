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
export const STUDENT_FORM = 'STUDENT_FORM';
export const ADD_STUDENT = 'ADD_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';

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
});

export const studentForm = studentId => ({
  type: STUDENT_FORM,
  studentId,
});

export const addStudentToState = student => ({
  type: ADD_STUDENT,
  student
});

export const deleteStudentFromState = student => ({
  type: DELETE_STUDENT,
  student,
});

// THUNK MIDDLEWARE
export const fetchCampuses = () => {
  return async dispatch => {
    const res = await axios.get('/api/campuses');
    const campuses = res.data;
    const action = getCampuses(campuses);
    dispatch(action);
  }
};

export const fetchCampus = (campusId) => {
  return async dispatch => {
    const res = await axios.get(`/api/campuses/${campusId}`);
    const campus = res.data;
    const action = getCampus(campus);
    dispatch(action);
  }
};

export const postCampus = campus => async dispatch => {
  const response = await axios.post('/api/campuses', campus);
  const gotCampus = response.data;
  dispatch(addCampus(gotCampus));
};

export const putCampus = (campus, history) => async dispatch => {
  const response = await axios.put(`/api/campuses/${campus.id}`, campus);
  const gotCampus = response.data;
  dispatch(updateCampus(gotCampus));
  history.push(`/campuses/${campus.id}`)
};

export const deleteCampus = (campusIdToDelete, history) => async dispatch => {
  await axios.delete(`/api/campuses/${campusIdToDelete}`);
  history.push('/campuses');
};

export const addStudent = (studentId, campusId) => async dispatch => {
  const studentToAdd = await axios.put(`/api/students/addCampus/${studentId}`, { id: campusId });
  dispatch(addStudentToState(studentToAdd));
};

export const removeStudent = studentId => async dispatch => {
  const studentToRemove = await axios.put(`/api/students/removeCampus/${studentId}`);
  dispatch(deleteStudentFromState(studentId));
}


// HELPER FUNCTIONS
export const makeEmail = (campusName, headmasterName) => {
  const firstNameLowerCase = headmasterName.split(' ').join('').toLowerCase();
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
  studentIdToAdd: 0,
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

    case STUDENT_FORM:
      return Object.assign({}, state, {studentIdToAdd: action.studentId});

    case ADD_STUDENT:
      let currentCampus = state.currentCampus;
      let updatedCurrentCampus = Object.assign({}, currentCampus, {students: [...currentCampus.students, action.student]});
      return Object.assign({}, state, {currentCampus: updatedCurrentCampus});

    case DELETE_STUDENT:
      let currentCampusStudents = state.currentCampus.students.filter(student => student.id !== action.student);
      let updateCurrentCampus = Object.assign({}, state.currentCampus, {students: currentCampusStudents});
      return Object.assign({}, state, {currentCampus: updateCurrentCampus});

    case ADD_CAMPUS:
      return Object.assign({}, state, {list: [...state.list, action.campus]});

    case UPDATE_CAMPUS:
      return Object.assign({}, state, {currentCampus: action.updatedCampus});

    default:
      return state;
  }
}

export default campusReducer;
