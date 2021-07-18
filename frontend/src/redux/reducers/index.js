import userReducer from './user';
import postReducer from './post';
import course_moduleReducer from './course_modules';
import homeworkReducer from './homework';
import courseReducer from './course';
import {combineReducers} from 'redux';

const allReducers = combineReducers({user: userReducer, posts:postReducer, homeworks:homeworkReducer, course:courseReducer, course_module: course_moduleReducer});


export default allReducers;