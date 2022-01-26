import React, {useEffect} from "react";
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from "react-native";
import {ShowHeader} from "../components/Header";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getGuiasRequest} from "../redux/actions/guias";
import {Card} from "../components/ListCard";
import {useIsFocused} from "@react-navigation/native";

const Consulta = ({route, navigation}) => {
    const isFocused = useIsFocused();
    const consulta = route.params?.consulta;
    const guias = useSelector(state => state.guias.guias);
    const dispatch = useDispatch();

    const getMomentDate = (date) => {
        moment.locale('pt-br');
        return moment(date).format("DD/MMM/YY HH:mm");
    }

    useEffect(() => {
        dispatch(getGuiasRequest(consulta));
    }, [isFocused]);

    useEffect(() => console.log(guias), [guias]);

    return (
        <>
            <ShowHeader onPress={() => navigation.goBack()} headerText={consulta.tipo}/>

            <View style={styles.container}>
                <Text style={styles.cabecalhoText}>Nome do Paciente: {consulta.paciente.nome}</Text>
                <Text style={styles.cabecalhoText}>Data da Consulta: {getMomentDate(consulta.data)}</Text>
                <Text style={styles.cabecalhoText}>Profissional Responsável: {consulta.profissional.nome}</Text>
                <Text style={styles.cabecalhoText}>Local da Consulta: {consulta.hospital.nome}</Text>
                <Text style={[styles.cabecalhoText, {fontSize: 22, marginTop: 20, marginBottom: 15, textAlign: "center"}]}>Resultado</Text>
            </View>

            {consulta?.realizada && <ScrollView style={styles.resultadoContainer}>
                <Text style={[styles.cabecalhoText, {flex: 1, marginRight: 10}]}>{consulta.resultado}</Text>
                <Text style={[styles.cabecalhoText, {fontSize: 22, marginTop: 20, marginBottom: 15, textAlign: "center"}]}>Guias</Text>
                {guias?.map((guia, index) => {
                    return <Card onPress={() => guia.ativa? navigation.navigate("MarcarConsulta", {exame: {tipo: guia.tipo, guia: {id: guia.id}}})
                        : ToastAndroid.show("Guia já utilizada", 500)} animated={false} isDate={false} startText="Guia" index={index} key={guia.id} startBackgroundColor={"#b8f5b8"} endBackgroundColor={"#6edb6e"}
                    linha1={guia.tipo.toUpperCase()}/>
                })}
            </ScrollView>}

            {!consulta?.realizada && <View style={styles.semResultado}>
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
    }

})

export default Consulta;