import * as type from '../types';

const initialState = {
    consultas: [],
}

export default function consulta(state = initialState, action){
    switch (action.type){
        case type.GET_CONSULTAS_REQUESTED:
            return {
                ...state,
            }
        case type.GET_CONSULTAS_SUCCESS:
            return {
                ...state,
                consultas: action.consultas,
            }
        case type.GET_CONSULTAS_FAILED:
            return {
                ...state,
                consultas: action.consultas,
                error: action.message,
            }
        case type.POST_CONSULTAS_REQUESTED:
            return {
                ...state,
            }
        case type.PUT_CONSULTAS_REQUESTED:
            return {
                ...state,
            }
        case type.DELETE_CONSULTAS_REQUESTED:
            return {
                ...state,
            }
        default:
            return state;
    }
}