import {call, put, takeEvery} from "redux-saga/effects";
import {ToastAndroid} from "react-native";


const findCirurgiaById = ({type, id}) => {
    const apiUrl = `http://192.168.100.2:8080/MedKitServer/cirurgias${type === "usuario"? "/byUsuario" : ""}?id=${id}`
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


const postAndPutCirurgiaApi = (cirurgia) => {
    const apiUrl = "http://192.168.100.2:8080/MedKitServer/cirurgias";
    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            id: cirurgia.id,
            tipo: cirurgia.tipo,
            exame: cirurgia.exame,
            data: cirurgia.data,
            ativa: true
        })
    }).then(res =>
        res.text().then((text) => {
            ToastAndroid.show(text, 3000);
        })
    ).catch((error => ToastAndroid.show(error.message, 2000)));
}

const deleteCirurgiaApi = (id) => {
    const apiUrl = `http://192.168.100.2:8080/MedKitServer/cirurgia?id=${id}`;
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

function* fetchCirurgias(action) {
    try {
        const cirurgias = yield call(findCirurgiaById, {id: action.payload.id});
        if (cirurgias && cirurgias.cirurgias?.length > 0) {
            yield put({type: 'GET_CIRURGIA_SUCCESS', cirurgias: cirurgias.cirurgias});
        } else {
            yield put({type: 'GET_CIRURGIA_FAILED', cirurgias: []});
        }
    } catch (e) {
        yield put({type: 'GET_CIRURGIA_FAILED', cirurgias: []})
    }
}

function* fetchCirurgiasByUsuario(action) {
    try {
        const cirurgias = yield call(findCirurgiaById, {type: "usuario", id: action.payload.id});
        if (cirurgias && cirurgias.cirurgias?.length > 0) {
            yield put({type: 'GET_CIRURGIA_BY_USUARIO_SUCCESS', cirurgias: cirurgias.cirurgias});
        } else {
            yield put({type: 'GET_CIRURGIA_BY_USUARIO_FAILED', cirurgias: []});
        }
    } catch (e) {
        yield put({type: 'GET_CIRURGIA_BY_USUARIO_FAILED', cirurgias: []})
    }
}

function* postAndPutCirurgia(action) {
    yield call(postAndPutCirurgiaApi, action.payload);
}

function* deleteCirurgia(action) {
    yield call(deleteCirurgiaApi, action.payload);
}

function* cirurgiaSaga() {
    yield takeEvery('GET_CIRURGIA_REQUESTED', fetchCirurgias);
    yield takeEvery('GET_CIRURGIA_BY_USUARIO_REQUESTED', fetchCirurgiasByUsuario);
    yield takeEvery('DELETE_CIRURGIA_REQUESTED', deleteCirurgia);
    yield takeEvery('POST_CIRURGIA_REQUESTED', postAndPutCirurgia);
    yield takeEvery('PUT_CIRURGIA_REQUESTED',  postAndPutCirurgia);
}

export default cirurgiaSaga;