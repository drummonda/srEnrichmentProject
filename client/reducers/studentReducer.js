import axios from 'axios';

// CONSTANTS
export const GET_STUDENTS_FROM_SERVER = 'GET_STUDENTS_FROM_SERVER';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_STUDENT = 'GET_STUDENT';
export const ADD_STUDENT = 'ADD_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const STUDENT_NAME_FORM = 'STUDENT_NAME_FORM';
export const STUDENT_AGE_FORM = 'STUDENT_AGE_FORM';
export const STUDENT_FOOD_FORM = 'STUDENT_FOOD_FORM';
export const CAMPUS_FORM = 'CAMPUS_FORM';

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

export const updateStudent = updatedStudent => ({
  type: UPDATE_STUDENT,
  updatedStudent
});

export const studentNameForm = name => ({
  type: STUDENT_NAME_FORM,
  name
});

export const studentAgeForm = age => ({
  type: STUDENT_AGE_FORM,
  age
});

export const studentFoodForm = food => ({
  type: STUDENT_FOOD_FORM,
  food
});

export const campusForm = campusId => ({
  type: CAMPUS_FORM,
  campusId
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
  const response = await axios.post('/api/students', {student: student});
  const gotStudent = response.data;
  dispatch(addStudent(gotStudent));
};

export const putStudent = (studentToUpdate, history) => async dispatch => {
  const response = await axios.put(`/api/students/${studentToUpdate.id}`, studentToUpdate);
  const gotStudent = response.data;
  dispatch(updateStudent(gotStudent));
  history.push(`/students/${studentToUpdate.id}`);
};

export const deleteStudent = (studentIdToDelete, history) => async dispatch => {
  await axios.delete(`/api/students/${studentIdToDelete}`);
  history.push('/students');
}

// HELPER FUNCTIONS
export const makeImageUrl = studentName => {
  const studentNameLowercase = studentName.split(' ').join('').toLowerCase();
  return `${studentNameLowercase}.jpg`
}

// INITIAL STATE
const initialState = {
  list: [],
  currentStudent: {},
  studentNameForm: '',
  studentAgeForm: '',
  studentFoodForm: '',
  campusId: 0,
}

// REDUCER HANDLING
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, {list: action.students});

    case GET_STUDENT:
      return Object.assign({}, state, {currentStudent: action.student});

    case STUDENT_NAME_FORM:
      return Object.assign({}, state, {studentNameForm: action.name});

    case STUDENT_AGE_FORM:
      return Object.assign({}, state, {studentAgeForm: action.age});

    case STUDENT_FOOD_FORM:
      return Object.assign({}, state, {studentFoodForm: action.food});

    case CAMPUS_FORM:
      return Object.assign({}, state, {campusId: action.campusId});

    case ADD_STUDENT:
      return Object.assign({}, state, {list: [...state.list, action.student]});

    case UPDATE_STUDENT:
      return Object.assign({}, state, {currentStudent: action.updatedStudent});

    default:
      return state;
  }
}

export default studentReducer;
