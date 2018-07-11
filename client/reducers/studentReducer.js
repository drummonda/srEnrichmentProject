import axios from 'axios';

// CONSTANTS
export const GET_STUDENTS_FROM_SERVER = 'GET_STUDENTS_FROM_SERVER';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_STUDENT = 'GET_STUDENT';
export const ADD_STUDENT = 'ADD_STUDENT';
export const NEW_STUDENT_NAME = 'NEW_STUDENT_NAME';
export const NEW_STUDENT_AGE = 'NEW_STUDENT_AGE';
export const NEW_STUDENT_FOOD = 'NEW_STUDENT_FOOD';

// ACTION CREATORS
export const getStudents = students => ({
  type: GET_STUDENTS,
  students
});

export const getStudent = student => ({
  type: GET_STUDENT,
  student
});

export const addStudent = student => ({
  type: ADD_STUDENT,
  student
});

export const newStudentName = name => ({
  type: NEW_STUDENT_NAME,
  name
})

export const newStudentAge = age => ({
  type: NEW_STUDENT_AGE,
  age
})

export const newStudentFood = food => ({
  type: NEW_STUDENT_FOOD,
  food
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

export const fetchStudent = studentId => {
  return async dispatch => {
    const res = await axios.get(`/api/students/${studentId}`);
    const student = res.data;
    const action = getStudent(student);
    dispatch(action);
  }
}

export const postStudent = student => async dispatch => {
  console.log(student);
  const response = await axios.post('/api/students', student);
  const gotStudent = response.data;
  dispatch(addStudent(gotStudent));
};

// INITIAL STATE
const initialState = {
  list: [],
  currentStudent: {},
  newStudentName: '',
  newStudentAge: '',
  newStudentFood: '',
}

// REDUCER HANDLING
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, {list: action.students});

    case GET_STUDENT:
      return Object.assign({}, state, {currentStudent: action.student});

    case NEW_STUDENT_NAME:
      return Object.assign({}, state, {newStudentName: action.name});

    case NEW_STUDENT_AGE:
      return Object.assign({}, state, {newStudentAge: action.age});

    case NEW_STUDENT_FOOD:
      return Object.assign({}, state, {newStudentFood: action.food});

    case ADD_STUDENT:
      return Object.assign({}, state, {list: [...state.list, action.student]});

    default:
      return state;
  }
}

export default studentReducer;
