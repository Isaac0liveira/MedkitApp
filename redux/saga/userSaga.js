import {call, put, takeEvery} from 'redux-saga/effects'
import {ToastAndroid} from "react-native";


const loginApi = (usuario) => {
    const apiUrl = `http://192.168.100.2:8080/MedKitServer/login?login=${usuario.cpf}&senha=${usuario.senha}`;
    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res =>
        res.json()
    ).catch((error => ToastAndroid.show(error.message, 2000)))
}

function* fetchUser(action) {
    try {
        const user = yield call(loginApi, action.payload)
        ToastAndroid.show(user.message, 2000);
        console.log(user)
        if(user.paciente){
            yield put({type: 'GET_USERS_SUCCESS', users: user.paciente})
        }else {
            yield put({type: 'GET_USERS_FAILED', message: user.message})
        }
    } catch (e) {
        yield put({type: 'GET_USERS_FAILED', message: e.message})
    }
}

function* userSaga() {
    yield takeEvery('GET_USERS_REQUESTED', fetchUser);
}

export default userSaga;