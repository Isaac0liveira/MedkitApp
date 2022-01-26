import * as type from '../types';

export const getProfissionaisRequest = (area) => {

    return {
        type: type.GET_PROFISSIONAIS_REQUESTED,
        payload: area,
    }
}