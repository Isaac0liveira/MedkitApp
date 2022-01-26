import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const store = compose(applyMiddleware(sagaMiddleware))(createStore)(rootReducer);
sagaMiddleware.run(rootSaga);

export default store;