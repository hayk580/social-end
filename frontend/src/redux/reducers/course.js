import * as actions from '../actions/actionTypes';

// id: payload.id,
// person_id: payload.person_id,
// course_text: payload.course_text,
// course_image: payload.course_image,
// likes: payload.likes,
// created: payload.created,
// updated: payload.updated

const courseReducer = (state={courses:undefined}, action) => {
    const { type, payload } = action;
    switch(type){
        case actions.REMOVE_ALL_COURSES:
            return state = {};
        case actions.SET_COURSES:
            return state = {courses: payload};
        case actions.ADD_COURSE:
            let sp = [...state.courses];
            sp.unshift(payload)
            return state = {courses: sp};
        case actions.GET_COURSE:
            return state;
        case actions.GET_COURSES:
            return state;
        default:
            return state;
    }
}

export default courseReducer;