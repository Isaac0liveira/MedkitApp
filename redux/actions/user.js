import * as type from '../types';

export const getUserRequest = (users) => {

    return {
        type: type.GET_USERS_REQUESTED,
        payload: users,
    }
}