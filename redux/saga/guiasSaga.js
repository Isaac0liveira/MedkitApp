import {call, put, takeEvery} from "redux-saga/effects";
import {ToastAndroid} from "react-native";

const findGuiasByConsultas = (consulta) => {
    const apiUrl = `http://192.168.100.2:8080/MedKitServer/guias?id=${consulta.id}`;
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

function* fetchGuias(action) {
    try {
        const guias = yield call(findGuiasByConsultas, action.payload);
        if(guias && guias.guias?.length > 0){
            yield put({type: 'GET_GUIAS_SUCCESS', guias: guias.guias});
        }else {
            yield put({type: 'GET_GUIAS_FAILED', guias: []});
        }
    } catch (e) {
        yield put({type: 'GET_GUIAS_FAILED', guias: []})
    }
}

function* guiasSaga() {
    yield takeEvery('GET_GUIAS_REQUESTED', fetchGuias);
}

export default guiasSaga;