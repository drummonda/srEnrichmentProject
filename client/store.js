import { compose, combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import students from './reducers/studentReducer';
import campuses from './reducers/campusReducer';

const reducer = combineReducers({
  students,
  campuses
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store;
