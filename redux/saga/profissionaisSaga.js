import {call, put, takeEvery} from 'redux-saga/effects'
import {ToastAndroid} from "react-native";


const profissionaisApi = (area) => {
    const apiUrl = `http://192.168.100.2:8080/MedKitServer/profissional?area=${area}`;
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

function* fetchProfissionais(action) {
    try {
        const retorno = yield call(profissionaisApi, action.payload);
        console.log(retorno)
        ToastAndroid.show(retorno.message, 2000);
        if(retorno.profissionais){
            yield put({type: 'GET_PROFISSIONAIS_SUCCESS', profissionais: retorno.profissionais})
        }else {
            yield put({type: 'GET_PROFISSIONAIS_FAILED', message: retorno.message, profissionais: []})
        }
    } catch (e) {
        yield put({type: 'GET_PROFISSIONAIS_FAILED', message: e.message,  profissionais: []})
    }
}

function* profissionaisSaga() {
    yield takeEvery('GET_PROFISSIONAIS_REQUESTED', fetchProfissionais);
}

export default profissionaisSaga;