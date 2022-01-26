import React, {useEffect, useState} from "react";
import {Modal, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import {ShowHeader} from "../components/Header";
import moment from "moment";
import {useIsFocused} from "@react-navigation/native";

const Cirurgia = ({route, navigation}) => {
    const isFocused = useIsFocused();
    const cirurgia = route.params?.cirurgia;
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {

    }, [isFocused]);

    const getMomentDate = (date) => {
        moment.locale('pt-br');
        return moment(date).format("DD/MMM/YY HH:mm");
    }

    const ShowModal = (props) => {
        return <Modal animationType="slide" transparent={true} visible={modalVisible}
                      onRequestClose={() => setModalVisible(!modalVisible)} statusBarTranslucent={true}>
            <Pressable style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
                {props.children}
            </Pressable>
        </Modal>
    }


    return (
        <>
            <ShowHeader onPress={() => navigation.goBack()} headerText={cirurgia.tipo}/>
            <ShowModal>
                {cirurgia.profissionais?.map((profissional, index) => {
                    return <Text style={[styles.cabecalhoText, {backgroundColor: "white", width: "70%", padding: 10, alignSelf: "center", textAlign: "center"}]} key={index}>{profissional.nome}</Text>
                })}
            </ShowModal>

            <View style={styles.container}>
                <Text style={styles.cabecalhoText}>Nome do Paciente: {cirurgia.exame.paciente.nome}</Text>
                <Text style={styles.cabecalhoText}>Data da Operação: {getMomentDate(cirurgia.data)}</Text>
                <Text style={styles.cabecalhoText}>Local da Operação: {cirurgia.hospital.nome}</Text>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{marginTop: 15}}>
                    <Text style={[styles.cabecalhoText, {borderWidth: 1, borderRadius: 10, backgroundColor: "white", padding: 10, alignSelf: "center"}]}>Profissionais Responsáveis </Text>
                </TouchableOpacity>
                <Text style={[styles.cabecalhoText, {fontSize: 22, marginTop: 20, marginBottom: 15, textAlign: "center"}]}>Resultado</Text>
            </View>

            {cirurgia.realizada && <ScrollView style={styles.resultadoContainer}>
                <Text style={[styles.cabecalhoText, {flex: 1, marginRight: 10}]}>{cirurgia.resultado}</Text>
            </ScrollView>}

            {!cirurgia?.realizada && <View style={styles.semResultado}>
                <Text style={styles.semResultadoText}>Consulta não realizada{"\n"}Retorne após a data marcada</Text>
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    cabecalhoText: {
        color: "black",
        fontWeight: "300",
        fontSize: 15,
        marginTop: 10
    },
    resultadoContainer: {
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: "white"
    },
    semResultado: {
        flex: 0.6,
        alignItems: "center",
    },
    semResultadoText: {
        flex: 1,
        textAlignVertical: "center",
        textAlign: "center",
        color: "black",
        fontSize: 25,
        fontWeight: "200",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(200,231,217,0.75)",
    },

})

export default Cirurgia;