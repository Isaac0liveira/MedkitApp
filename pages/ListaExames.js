import React, {useEffect, useState} from "react";
import {Animated, StyleSheet, Text, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {useDispatch, useSelector} from "react-redux";
import 'moment/locale/pt-br';
import {Card} from "../components/ListCard";
import {ShowModal} from "../components/Modal";
import {ShowHeader} from "../components/Header";
import {deleteExameRequest, getExameRequest} from "../redux/actions/exame";
import {useIsFocused} from "@react-navigation/native";
import {listaStyle} from "../styles/ListaStyle";

const ListaExames = ({navigation}) => {

    const [valueFade] = useState(new Animated.Value(0));
    const [modalVisible, setModalVisible] = useState(false);
    const [exameSelecionado, setExameSelecionado] = useState(null);

    const isFocused = useIsFocused();
    const usuario = useSelector(state => state.users.users);
    const exames = useSelector(state => state.exames.exames);
    const dispatch = useDispatch();

    useEffect(() => {
        Animated.timing(valueFade, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false
        }).start();
    }, []);

    useEffect(() => {
        dispatch(getExameRequest(usuario));
    }, [isFocused]);

    const modalOptions = [{
        text: "Desmarcar Exame",
        onPress: () => {
            dispatch(deleteExameRequest(exameSelecionado.id));
            dispatch(getExameRequest(usuario))
            setModalVisible(!modalVisible);
        }
    },
        {
            text: "Remarcar/Editar Exame",
            onPress: () => {
                setModalVisible(!modalVisible);
                navigation.navigate("MarcarConsulta", {exame: exameSelecionado});
            }
        }];

    return (
        <>
            <ShowModal modalVisible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}
                       onPressOut={() => setModalVisible(!modalVisible)} options={modalOptions}/>

            <ShowHeader onPress={() => navigation.goBack()} headerText="Exames" customStyle={{opacity: valueFade}}/>

            {exames.length ? <Animated.ScrollView style={listaStyle.listaContainer}>
                {exames.map((exame, index) => {
                    return (
                        <Card data={exame.data} onPress={() => navigation.navigate("Exame", {exame: exame})} onLongPress={() => {
                            setExameSelecionado(exame);
                            setModalVisible(true);
                        }} key={exame.id} index={index} titulo={exame.hospital.nome} isDate={true}
                              linha1={exame.profissional.nome} linha2={exame.profissional.area}/>
                    )
                })}
            </Animated.ScrollView> : <Text style={listaStyle.listaVazias}>Não há exames disponíveis</Text>}
        </>
    )
}

export default ListaExames;