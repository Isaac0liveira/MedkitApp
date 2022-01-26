import * as type from '../types';

const initialState = {
    exames: [],
}

export default function exames(state = initialState, action) {
    switch (action.type) {
        case type.POST_EXAME_REQUESTED:
            return {
                ...state,
            }
        case type.PUT_EXAME_REQUESTED:
            return {
                ...state,
            }
        case type.GET_EXAME_REQUESTED:
            return {
                ...state,
            }
        case type.GET_EXAME_SUCCESS:
            return {
                ...state,
                exames: action.exames
            }
        case type.GET_EXAME_FAILED:
            return {
                ...state,
                exames: []
            }
        case type.DELETE_EXAME_REQUESTED:
            return {
                ...state
            }
        default:
            return state;
    }
}
