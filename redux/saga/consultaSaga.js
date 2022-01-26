import {call, put, takeEvery} from 'redux-saga/effects'
import {ToastAndroid} from "react-native";
import {getConsultasRequest} from "../actions/consulta";


const findConsultasById = (usuario) => {
    const apiUrl = `http://192.168.100.2:8080/MedKitServer/consultas?id=${usuario.id}`;
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

const postAndPutConsultaApi = (consulta) => {
    const apiUrl = "http://192.168.100.2:8080/MedKitServer/consultas";
    fetch(apiUrl, {
        method: consulta.id? 'PUT' : 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            ...consulta.id && {id: consulta.id},
            tipo: consulta.tipo,
            paciente: {id: consulta.paciente.id},
            profissional: {id: consulta.profissional.id},
            data: consulta.data
        })
    }).then(res =>
        res.text().then((text) => {
            ToastAndroid.show(text, 3000);
        })
    ).catch((error => ToastAndroid.show(error.message, 2000)));
}

const deleteConsultaApi = (id) => {
    const apiUrl = `http://192.168.100.2:8080/MedKitServer/consultas?id=${id}`;
    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(res =>
        res.text().then((text) => {
            ToastAndroid.show(text, 2000);
        })
    ).catch((error => ToastAndroid.show(error.message, 2000)));
}

function* fetchConsultas(action) {
    try {
        const consultas = yield call(findConsultasById, action.payload);
        if (consultas && consultas.consultas?.length > 0) {
            yield put({type: 'GET_CONSULTAS_SUCCESS', consultas: consultas.consultas});
        } else {
            yield put({type: 'GET_CONSULTAS_FAILED', consultas: []});
        }
    } catch (e) {
        yield put({type: 'GET_CONSULTAS_FAILED', consultas: []})
    }
}

function* postConsulta(action) {
   yield call(postAndPutConsultaApi, action.payload);
}

function* putConsulta(action) {
    yield call(postAndPutConsultaApi, action.payload);
}

function* deleteConsulta(action) {
    deleteConsultaApi(action.payload);
}

function* consultaSaga() {
    yield takeEvery('GET_CONSULTAS_REQUESTED', fetchConsultas);
    yield takeEvery('POST_CONSULTAS_REQUESTED', postConsulta);
    yield takeEvery('PUT_CONSULTAS_REQUESTED', putConsulta);
    yield takeEvery('DELETE_CONSULTAS_REQUESTED', deleteConsulta);
}


export default consultaSaga;