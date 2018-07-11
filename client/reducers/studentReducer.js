import axios from 'axios';

// CONSTANTS
export const GET_STUDENTS_FROM_SERVER = 'GET_STUDENTS_FROM_SERVER';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_STUDENT = 'GET_STUDENT';

// ACTION CREATORS
const getStudents = (students) => ({
  type: GET_STUDENTS,
  students
});

const getStudent = (student) => ({
  type: GET_STUDENT,
  student
})

// THUNK MIDDLEWARE
export const fetchStudents = () => {
  return async dispatch => {
    const res = await axios.get('/api/students');
    const students = res.data;
    const action = getStudents(students);
    dispatch(action);
  }
}

export const fetchStudent = (studentId) => {
  return async dispatch => {
    const res = await axios.get(`/api/students/${studentId}`);
    const student = res.data;
    const action = getStudent(student);
    dispatch(action);
  }
}

// INITIAL STATE
const initialState = {
  list: [],
  currentStudent: {},
}

// REDUCER HANDLING
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, {list: action.students});

    case GET_STUDENT:
      return Object.assign({}, state, {currentStudent: action.student});

    default:
      return state;
  }
}

export default studentReducer;
