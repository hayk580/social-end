import * as actions from '../actions/actionTypes';


const course_moduleReducer = (state={course_modules:undefined}, action) => {
    const { type, payload } = action;
    switch(type){
        case actions.REMOVE_ALL_COURSE_MODULES:
            return state = {};
        case actions.SET_COURSE_MODULES:
            return state = {course_modules: payload};
        case actions.ADD_COURSE_MODULE:
            let sp = [...state.course_modules];
            sp.unshift(payload)
            return state = {course_modules: sp};
        case actions.GET_COURSE_MODULE:
            return state;
        case actions.GET_COURSE_MODULES:
            return state;
        default:
            return state;
    }
}

export default course_moduleReducer;