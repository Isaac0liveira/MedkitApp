import React, {useEffect, useState} from "react";
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {useDispatch, useSelector} from "react-redux";
import {deleteConsultasRequest, getConsultasRequest} from "../redux/actions/consulta";
import 'moment/locale/pt-br';
import {Card} from "../components/ListCard";
import {ShowModal} from "../components/Modal";
import {ShowHeader} from "../components/Header";
import {useIsFocused} from "@react-navigation/native";
import {listaStyle} from "../styles/ListaStyle";

const ListaConsultas = ({navigation}) => {

    const isFocused = useIsFocused();
    const [valueFade] = useState(new Animated.Value(0));
    const [modalVisible, setModalVisible] = useState(false);
    const [consultaSelecionada, setConsultaSelecionada] = useState(null);
    const usuario = useSelector(state => state.users.users);
    const consultas = useSelector(state => state.consultas.consultas);
    const dispatch = useDispatch();


    useEffect(() => {
        Animated.timing(valueFade, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false
        }).start();
    }, []);

    useEffect(() => {
        dispatch(getConsultasRequest(usuario))
    }, [isFocused])

    const modalOptions = [{
            text: "Desmarcar Consulta",
            onPress: () => {
                dispatch(deleteConsultasRequest(consultaSelecionada.id));
                dispatch(getConsultasRequest(usuario))
                setModalVisible(!modalVisible);
            }
        },
        {
            text: "Remarcar/Editar Consulta",
            onPress: () => {
                setModalVisible(!modalVisible);
                navigation.navigate("MarcarConsulta", {consulta: consultaSelecionada});
            }
        }];

    return (
        <>
            <ShowModal modalVisible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}
                       onPressOut={() => setModalVisible(!modalVisible)} consulta={consultaSelecionada} options={modalOptions}/>

            <ShowHeader onPress={() => navigation.goBack()} headerText="Consultas" customStyle={{opacity: valueFade}}/>

            {consultas.length ? <Animated.ScrollView style={listaStyle.listaContainer}>
                {consultas.map((consulta, index) => {
                    return (
                        <Card data={consulta.data} onPress={() => navigation.navigate("Consulta", {consulta: consulta})} onLongPress={() => {
                            setConsultaSelecionada(consulta);
                            setModalVisible(true);
                        }} key={consulta.id} index={index} titulo={consulta.hospital.nome} isDate={true}
                              linha1={consulta.profissional.nome} linha2={consulta.profissional.area}/>
                    )
                })}
            </Animated.ScrollView> : <Text style={listaStyle.listaVazias}>Não há consultas disponíveis</Text>}

            <TouchableOpacity onPress={() => navigation.navigate("MarcarConsulta")}>
                <LinearGradient colors={['rgba(216,246,246,0.53)', 'rgba(123,206,227,0.66)', 'rgba(53,128,189,0.73)']}
                                style={listaStyle.listaAddButton}>
                    <Text style={listaStyle.listaAddButtonText}>Marcar Consulta</Text>
                </LinearGradient>
            </TouchableOpacity>
        </>
    )
}

export default ListaConsultas;