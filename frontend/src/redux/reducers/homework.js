import * as actions from '../actions/actionTypes';

// id: payload.id,
// person_id: payload.person_id,
// homework_text: payload.homework_text,
// homework_image: payload.homework_image,
// likes: payload.likes,
// created: payload.created,
// updated: payload.updated

const homeworkReducer = (state={homeworks:undefined}, action) => {
    const { type, payload } = action;
    switch(type){
        case actions.REMOVE_ALL_HOMEWORKS:
            return state = {};
        case actions.SET_HOMEWORKS:
            return state = {homeworks: payload};
        case actions.ADD_HOMEWORK:
            let sp = [...state.homeworks];
            sp.unshift(payload)
            return state = {homeworks: sp};
        case actions.GET_HOMEWORK:
            return state;
        case actions.GET_HOMEWORKS:
            return state;
        default:
            return state;
    }
}

export default homeworkReducer;