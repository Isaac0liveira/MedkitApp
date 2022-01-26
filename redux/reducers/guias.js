import * as type from '../types';

const initialState = {
    guias: [],
}

export default function guias(state = initialState, action){
    switch (action.type){
        case type.GET_GUIAS_REQUESTED:
            return {
                ...state,
            }
        case type.GET_GUIAS_SUCCESS:
            return {
                ...state,
                guias: action.guias,
            }
        case type.GET_GUIAS_FAILED:
            return {
                ...state,
                guias: action.guias,
                error: action.message,
            }
        case type.DELETE_GUIAS_REQUESTED:
            return {
                ...state,
            }
        default:
            return state;
    }
}