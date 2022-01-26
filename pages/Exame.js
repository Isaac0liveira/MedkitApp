import React, {useEffect} from "react";
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from "react-native";
import {ShowHeader} from "../components/Header";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getGuiasRequest} from "../redux/actions/guias";
import {Card} from "../components/ListCard";
import {useIsFocused} from "@react-navigation/native";
import {getCirurgiaRequest} from "../redux/actions/cirurgia";

const Exame = ({route, navigation}) => {
    const isFocused = useIsFocused();
    const exame = route.params?.exame;
    const cirurgias = useSelector(state => state.cirurgias.cirurgias);
    const dispatch = useDispatch();

    const getMomentDate = (date) => {
        moment.locale('pt-br');
        return moment(date).format("DD/MMM/YY HH:mm");
    }

    useEffect(() => {
        dispatch(getCirurgiaRequest(exame));
    }, [isFocused]);

    return (
        <>
            <ShowHeader onPress={() => navigation.goBack()} headerText={exame.tipo}/>

            <View style={styles.container}>
                <Text style={styles.cabecalhoText}>Nome do Paciente: {exame.paciente.nome}</Text>
                <Text style={styles.cabecalhoText}>Data da Consulta: {getMomentDate(exame.data)}</Text>
                <Text style={styles.cabecalhoText}>Profissional Responsável: {exame.profissional.nome}</Text>
                <Text style={styles.cabecalhoText}>Local do Exame: {exame.hospital.nome}</Text>
                <Text style={[styles.cabecalhoText, {fontSize: 22, marginTop: 20, marginBottom: 15, textAlign: "center"}]}>Resultado</Text>
            </View>

            {exame?.realizado && <ScrollView style={styles.resultadoContainer}>
                <Text style={[styles.cabecalhoText, {flex: 1, marginRight: 10}]}>{exame.resultado}</Text>
                <Text style={[styles.cabecalhoText, {fontSize: 22, marginTop: 20, marginBottom: 15, textAlign: "center"}]}>Agendamentos</Text>
                {cirurgias?.map((cirurgia, index) => {
                    return <Card onPress={() => !cirurgia.ativa? navigation.navigate("MarcarConsulta", {cirurgia: cirurgia})
                        : ToastAndroid.show("Cirurgia já marcada", 500)} animated={false} isDate={false} startText="CIRURGIA" index={index} key={cirurgia.id} startBackgroundColor={"#f5b8b8"} endBackgroundColor={"#db6e6e"}
                                 linha1={cirurgia.tipo.toUpperCase()}/>
                })}
            </ScrollView>}

            {!exame?.realizada && <View style={styles.semResultado}>
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

export default Exame;