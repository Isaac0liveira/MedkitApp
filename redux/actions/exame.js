import * as type from "../types";

export const postExameRequest = (exame) => {
    return {
        type: type.POST_EXAME_REQUESTED,
        payload: exame,
    }
}

export const putExameRequest = (exame) => {
    return {
        type: type.PUT_EXAME_REQUESTED,
        payload: exame,
    }
}

export const getExameRequest = (usuario) => {
    return {
        type: type.GET_EXAME_REQUESTED,
        payload: usuario,
    }
}

export const deleteExameRequest = (id) => {
    return {
        type: type.DELETE_EXAME_REQUESTED,
        payload: id,
    }
}