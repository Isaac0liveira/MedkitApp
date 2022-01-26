import React, {useEffect, useState} from "react";
import {Animated, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowAltCircleLeft} from "@fortawesome/free-regular-svg-icons";
import {Picker} from "@react-native-picker/picker";
import {useDispatch, useSelector} from "react-redux";
import {getProfissionaisRequest} from "../redux/actions/profissionais";
import DatePicker from 'react-native-date-picker'
import 'moment/locale/pt-br';
import {getConsultasRequest, postConsultasRequest, putConsultasRequest} from "../redux/actions/consulta";
import {Dropdown} from "../components/Dropdown";
import {ShowHeader} from "../components/Header";
import {getExameRequest, postExameRequest, putExameRequest} from "../redux/actions/exame";
import {getCirurgiaRequest, postCirurgiaRequest} from "../redux/actions/cirurgia";

const Agendamento = ({route, navigation}) => {

    const exame = route.params?.exame;
    const consulta = route.params?.consulta;
    const cirurgia = route.params?.cirurgia;

    const [selected, setSelected] = useState("0");
    const [date, setDate] = useState(new Date())
    const [selectedProfissional, setSelectedProfissional] = useState("0");

    const profissionais = useSelector(state => state.profissionais.profissionais)
    const usuario = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        selected !== "0"? dispatch(getProfissionaisRequest(selected)) : null;
        exame? dispatch(getProfissionaisRequest(exame.tipo)) : null
    }, [selected]);

    useEffect(() => {
        if (profissionais.length) {
            setSelected(profissionais[0].area);
        }
        if (consulta) {
            setSelected(consulta.tipo);
            setSelectedProfissional(consulta.profissional.id);
        }
        console.log(exame);
        console.log(cirurgia);
    }, []);

    const setRequest = () => {
        consulta? dispatch(putConsultasRequest(getConsultaObject())) : exame?.id? dispatch(putExameRequest(getExameObject())) : exame?
            dispatch(postExameRequest(getExameObject())) : cirurgia? dispatch(postCirurgiaRequest(cirurgia)) : dispatch(postConsultasRequest(getConsultaObject()))

        exame? dispatch(getExameRequest(usuario)) : cirurgia? getCirurgiaRequest(usuario) : getConsultasRequest(usuario);
        navigation.goBack();
    }

    const getConsultaObject = () => {
        return {
            ...consulta && {id: consulta.id},
            tipo: selected,
            paciente: {id: usuario.id},
            profissional: {id: selectedProfissional},
            data: date,
        }
    }

    const getExameObject = () => {
        return {
            ...exame && {id: exame.id},
            tipo: exame.tipo,
            paciente: {id: usuario.id},
            profissional: {id: selectedProfissional},
            data: date,
            guia: {id: exame.guia.id}
        }
    }

    return <>
        <ShowHeader headerText={consulta? "Remarcar Consulta" : exame?.id? "Remarcar Exame" : exame? "Marcar Exame" : "Marcar Consulta"}
                        onPress={() => navigation.goBack()}/>

        {!exame && !cirurgia && <Dropdown selected={profissionais.length ? profissionais[0].area : selected} onValueChange={setSelected}>
            <Picker.Item label="Selecione o tipo de consulta" value="0"/>
        </Dropdown>}

        {exame && <Dropdown selected={exame.tipo}><Picker.Item label={exame.tipo} value={exame.tipo}/></Dropdown>}

        {cirurgia && <Dropdown selected={cirurgia.tipo}><Picker.Item label={cirurgia.tipo} value={cirurgia.tipo}/></Dropdown>}

        {profissionais.length > 0 && <Dropdown selected={selectedProfissional} onValueChange={setSelectedProfissional}>
            <Picker.Item label="Selecione seu Profissional" value="0"/>
            {profissionais.map((profissional) => {
                return <Picker.Item label={profissional.nome} value={profissional.id} key={profissional.id}/>
            })}
        </Dropdown>}

        {selectedProfissional !== "0" && !exame && <Text style={styles.datePickerLabel}>Data da Consulta</Text>}
        {selectedProfissional !== "0" && exame && <Text style={styles.datePickerLabel}>Data do Exame</Text>}
        {cirurgia && <Text style={styles.datePickerLabel}>Data da Cirurgia</Text>}
        {selectedProfissional !== "0" || cirurgia && <DatePicker date={date} onDateChange={setDate} minimumDate={new Date()} style={styles.datePicker} locale="pt-br"/>}

        {date != null && (selectedProfissional !== "0" || cirurgia) &&
        <TouchableOpacity onPress={() => setRequest()} style={styles.confirmationButton}>
            <Text style={{color: "white"}}>{consulta ? "Remarcar Consulta" : exame?.id ? "Remarcar Exame" : exame? "Confirmar Exame" : cirurgia? "Confirmar Cirurgia" : "Confirmar Consulta"}</Text>
        </TouchableOpacity>}
    </>
}

const styles = StyleSheet.create({
    datePicker: {
        width: 500
    },
    datePickerLabel: {
        marginVertical: 20,
        color: "black",
        fontSize: 20,
        alignSelf: "center",
        marginHorizontal: 20
    },
    confirmationButton: {
        backgroundColor: "rgba(53,128,189,0.73)",
        margin: 10,
        marginTop: 50,
        padding: 25,
        alignItems: "center",
        borderRadius: 20
    }
});
export default Agendamento;