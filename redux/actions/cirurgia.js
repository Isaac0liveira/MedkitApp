import * as type from "../types";

export const postCirurgiaRequest = (cirurgia) => {
    return {
        type: type.POST_CIRURGIA_REQUESTED,
        payload: cirurgia,
    }
}

export const putCirurgiaRequest = (cirurgia) => {
    return {
        type: type.PUT_CIRURGIA_REQUESTED,
        payload: cirurgia,
    }
}

export const getCirurgiaRequest = (exame) => {
    return {
        type: type.GET_CIRURGIA_REQUESTED,
        payload: exame,
    }
}

export const getCirurgiaByUsuarioRequest = (usuario) => {
    return {
        type: type.GET_CIRURGIA_BY_USUARIO_REQUESTED,
        payload: usuario,
    }
}

export const deleteCirurgiaRequest = (id) => {
    return {
        type: type.DELETE_CIRURGIA_REQUESTED,
        payload: id,
    }
}