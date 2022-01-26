import {combineReducers} from "redux";
import users from "./users";
import consulta from "./consulta";
import profissionais from "./profissionais";
import guias from "./guias";
import exames from "./exames";
import cirurgias from "./cirurgia";

const rootReducer = combineReducers({
    users: users,
    consultas: consulta,
    profissionais: profissionais,
    guias: guias,
    exames: exames,
    cirurgias: cirurgias
});

export default rootReducer;