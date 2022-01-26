import * as type from '../types';

export const getConsultasRequest = (usuario) => {
    return {
        type: type.GET_CONSULTAS_REQUESTED,
        payload: usuario,
    }
}

export const postConsultasRequest = (consulta) => {
    return {
        type: type.POST_CONSULTAS_REQUESTED,
        payload: consulta,
    }
}

export const putConsultasRequest = (consulta) => {
    return {
        type: type.PUT_CONSULTAS_REQUESTED,
        payload: consulta,
    }
}

export const deleteConsultasRequest = (id) => {
    return {
        type: type.DELETE_CONSULTAS_REQUESTED,
        payload: id,
    }
}