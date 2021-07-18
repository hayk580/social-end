import Questions from '../../components/dashboard/question/Question';
import * as actions from './actionTypes';

export const setUser = (user) => {
    return {
        type: actions.SET_USER,
        payload: user
    }
}

export const logoutUser = () => {
    return {
        type: actions.LOGOUT_USER
    }
}

export const setPosts = (posts) => {
    return {
        type: actions.SET_POSTS,
        payload: posts
    }
}

export const set_course = (course) => {
    return {
        type: actions.SET_COURSE,
        payload: course
    }
}

export const addPost = (post) => {
    return {
        type: actions.ADD_POST,
        payload: post
    }
}

export const setHomeworks = (homeworks) => {
    return {
        type: actions.SET_HOMEWORKS,
        payload: homeworks
    }
}


export const setCourse_modules = (course_module) => {
    return {
        type: actions.SET_COURSE_MODULES,
        payload: course_module
    }
}


export const setGroupPosts = (groupposts) => {
    return {
        type: actions.SET_GROUPSPOSTS,
        payload: groupposts
    }
} 
export const addHomework = (homework) => {
    return {
        type: actions.ADD_HOMEWORK,
        payload: homework
    }
}

export const removeAllPosts = () => {
    return {
        type: actions.REMOVE_ALL_POSTS,
    }
    

}

    export const removeAllHomeworks = () => {
        return {
            type: actions.REMOVE_ALL_HOMEWORKS,
        }
    }  


    export const addGroup = (group) => {
        return {
            type: actions.ADD_GROUP,
            payload: group
        }
    }


    export const addSchedules = (schedules) => {
        return {
            type: actions.ADD_SCHEDULES,
            payload: schedules
        }
    }



    export const addCategory = (category) => {
        return {
            type: actions.ADD_SCHEDULES,
            payload: category
        }
    }


    export const addQuestion = (question) => {
        return {
            type: actions.ADD_QUESTION,
            payload: question
        }
    }
    
    export const addCourse = (course) =>
    {
        return {
            type: actions.ADD_COURSE,
            payload: course
        }
    }

    export const addCourse_module = (course_module) =>
    {
        return {
            type: actions.ADD_COURSE_MODULE,
            payload: course_module
        }
    }