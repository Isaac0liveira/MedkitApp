import {all} from 'redux-saga/effects'
import userSaga from "./userSaga";
import consultaSaga from "./consultaSaga";
import profissionaisSaga from "./profissionaisSaga";
import guiasSaga from "./guiasSaga";
import exameSaga from "./exameSaga";
import cirurgiaSaga from "./cirurgiaSaga";

export default function* rootSaga(){
    yield all([
        userSaga(),
        consultaSaga(),
        profissionaisSaga(),
        guiasSaga(),
        exameSaga(),
        cirurgiaSaga()
    ])
}