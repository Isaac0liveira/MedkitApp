import {call, put, takeEvery} from "redux-saga/effects";
import {ToastAndroid} from "react-native";


const findExamesById = (usuario) => {
    const apiUrl = `http://192.168.100.2:8080/MedKitServer/exames?id=${usuario.id}`;
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

const postAndPutExameApi = (exame) => {
    console.log(exame);
    const apiUrl = "http://192.168.100.2:8080/MedKitServer/exames";
    fetch(apiUrl, {
        method: exame.id? 'PUT' : 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            ...exame.id && {id: exame.id},
            tipo: exame.tipo,
            paciente: {id: exame.paciente.id},
            profissional: {id: exame.profissional.id},
            data: exame.data,
            guia: {id: exame.guia.id}
        })
    }).then(res =>
        res.text().then((text) => {
            ToastAndroid.show(text, 3000);
        })
    ).catch((error => ToastAndroid.show(error.message, 2000)));
}

const deleteExameApi = (id) => {
    const apiUrl = `http://192.168.100.2:8080/MedKitServer/exames?id=${id}`;
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

function* fetchExames(action) {
    try {
        const exames = yield call(findExamesById, action.payload);

        if (exames && exames.exames?.length > 0) {
            yield put({type: 'GET_EXAME_SUCCESS', exames: exames.exames});
        } else {
            yield put({type: 'GET_EXAME_FAILED', exames: []});
        }
    } catch (e) {
        yield put({type: 'GET_EXAME_FAILED', exames: []})
    }
}

function* postAndPutExame(action) {
    yield call(postAndPutExameApi, action.payload);
}

function* deleteConsulta(action) {
    yield call(deleteExameApi, action.payload);
}

function* exameSaga() {
    yield takeEvery('GET_EXAME_REQUESTED', fetchExames);
    yield takeEvery('DELETE_EXAME_REQUESTED', deleteConsulta);
    yield takeEvery('POST_EXAME_REQUESTED', postAndPutExame);
    yield takeEvery('PUT_EXAME_REQUESTED',  postAndPutExame);
}

export default exameSaga;