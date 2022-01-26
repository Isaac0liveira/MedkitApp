import * as type from '../types';

export const getGuiasRequest = (consulta) => {
    return {
        type: type.GET_GUIAS_REQUESTED,
        payload: consulta,
    }
}