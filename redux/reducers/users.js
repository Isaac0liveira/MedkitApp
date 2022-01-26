import * as type from '../types';

const initialState = {
    users: [],
}

export default function users(state = initialState, action){
    switch (action.type){
        case type.GET_USERS_REQUESTED:
            return {
                ...state,
            }
        case type.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
            }
        case type.GET_USERS_FAILED:
            return {
                ...state,
                error: action.message,
            }
        default:
            return state;
    }
}