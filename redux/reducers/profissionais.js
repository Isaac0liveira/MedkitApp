import * as type from '../types';

const initialState = {
    profissionais: [],
}

export default function profissionais(state = initialState, action){
    switch (action.type){
        case type.GET_PROFISSIONAIS_REQUESTED:
            return {
                ...state,
            }
        case type.GET_PROFISSIONAIS_SUCCESS:
            return {
                ...state,
                profissionais: action.profissionais
            }
        case type.GET_PROFISSIONAIS_FAILED:
            return {
                ...state,
                error: action.message,
                profissionais: []
            }
        default:
            return state;
    }
}