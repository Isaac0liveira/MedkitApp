import React, {useEffect, useState} from "react";
import {Animated, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import 'moment/locale/pt-br';
import {Card} from "../components/ListCard";
import {ShowModal} from "../components/Modal";
import {ShowHeader} from "../components/Header";
import {useIsFocused} from "@react-navigation/native";
import {deleteCirurgiaRequest, getCirurgiaByUsuarioRequest, getCirurgiaRequest} from "../redux/actions/cirurgia";
import {listaStyle} from "../styles/ListaStyle";

const ListaCirurgias = ({navigation}) => {

    const [valueFade] = useState(new Animated.Value(0));
    const [modalVisible, setModalVisible] = useState(false);
    const [cirurgiaSelecionada, setCirurgiaSelecionada] = useState(null);

    const isFocused = useIsFocused();
    const usuario = useSelector(state => state.users.users);
    const cirurgias = useSelector(state => state.cirurgias.cirurgias);
    const dispatch = useDispatch();

    useEffect(() => {
        Animated.timing(valueFade, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false
        }).start();
    }, []);

    useEffect(() => {
        dispatch(getCirurgiaByUsuarioRequest(usuario));
    }, [isFocused]);

    useEffect(() => {
        console.log(cirurgias)
    }, [cirurgias]);

    const modalOptions = [{
        text: "Desmarcar Cirurgia",
        onPress: () => {
            dispatch(deleteCirurgiaRequest(cirurgiaSelecionada.id));
            dispatch(getCirurgiaRequest(usuario))
            setModalVisible(!modalVisible);
        }
    },
        {
            text: "Remarcar/Editar Cirurgia",
            onPress: () => {
                setModalVisible(!modalVisible);
                navigation.navigate("MarcarConsulta", {cirurgia: cirurgiaSelecionada});
            }
        }];

    return (
        <>
            <ShowModal modalVisible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}
                       onPressOut={() => setModalVisible(!modalVisible)} options={modalOptions}/>

            <ShowHeader onPress={() => navigation.goBack()} headerText="Cirurgias" customStyle={{opacity: valueFade}}/>

            {cirurgias.length ? <Animated.ScrollView style={listaStyle.listaContainer}>
                {cirurgias.map((cirurgia, index) => {
                    return (
                        <Card data={cirurgia.data} onPress={() => navigation.navigate("Cirurgia", {cirurgia: cirurgia})} onLongPress={() => {
                            setCirurgiaSelecionada(cirurgia);
                            setModalVisible(true);
                        }} key={cirurgia.id} index={index} titulo={cirurgia.hospital.nome} isDate={true} linha1="Cirurgia"
                              linha2={cirurgia.tipo}/>
                    )
                })}
            </Animated.ScrollView> : <Text style={listaStyle.listaVazias}>Não há cirurgias disponíveis</Text>}
        </>
    )
}

export default ListaCirurgias;