import * as type from '../types';

const initialState = {
    cirurgias: [],
}

export default function cirurgias(state = initialState, action) {
    switch (action.type) {
        case type.POST_CIRURGIA_REQUESTED:
            return {
                ...state,
            }
        case type.PUT_CIRURGIA_REQUESTED:
            return {
                ...state,
            }
        case type.GET_CIRURGIA_REQUESTED:
            return {
                ...state,
            }
        case type.GET_CIRURGIA_SUCCESS:
            return {
                ...state,
                cirurgias: action.cirurgias
            }
        case type.GET_CIRURGIA_FAILED:
            return {
                ...state,
                cirurgias: []
            }
        case type.GET_CIRURGIA_BY_USUARIO_REQUESTED:
            return {
                ...state,
            }
        case type.GET_CIRURGIA_BY_USUARIO_SUCCESS:
            return {
                ...state,
                cirurgias: action.cirurgias
            }
        case type.GET_CIRURGIA_BY_USUARIO_FAILED:
            return {
                ...state,
                cirurgias: []
            }
        case type.DELETE_CIRURGIA_REQUESTED:
            return {
                ...state
            }
        default:
            return state;
    }
}