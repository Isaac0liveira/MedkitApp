import React from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {faHeart, faClipboard, faUser, faHospital, faco} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const Inicio = ({navigation}) => {

    const usuario = useSelector(state => state.users.users);

    const OptionCard = (props) => {
        const colorsGradient = ['rgba(156,224,185,0.73)', 'rgba(137,206,212,0.77)', 'rgba(124,206,184,0.66)'];
        return <TouchableOpacity onPress={props.onPress} style={styles.optionsCardOpacity}>

            <LinearGradient colors={colorsGradient} style={styles.optionsCard}>
                <FontAwesomeIcon size={70} icon={props.source} style={styles.optionsCardIcon}/>
                <Text style={styles.optionsCardText}>{props.text}</Text>
            </LinearGradient>

        </TouchableOpacity>
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.textHeader}>Olá {usuario.nome}!</Text>
            </View>

            <View style={styles.mainCard}/>

            <Text style={[styles.textHeader, {margin: 15}]}>O que podemos fazer por você?</Text>

            <ScrollView contentContainerStyle={styles.optionsContainer}>
                <OptionCard text="Consultas" source={faHeart} onPress={() => {navigation.navigate('ListaConsultas')}}/>
                <OptionCard text="Exames" source={faClipboard}  onPress={() => {navigation.navigate('ListaExames')}}/>
                <OptionCard text="Cirurgias" source={faHospital}  onPress={() => {navigation.navigate('ListaCirurgias')}}/>
                <OptionCard text="Especialistas" source={faUser}/>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    header: {
        justifyContent: "center",
        margin: 20,
        marginTop: 60
    },
    textHeader: {
        color: "black",
        fontSize: 22,
        fontWeight: "300"
    },
    mainCard: {
        alignSelf: "center",
        backgroundColor: "rgba(169,214,217,0.78)",
        padding: 80,
        marginTop: 10,
        marginBottom: 10,
        width: "95%",
        borderRadius: 10
    },
    optionsContainer: {
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    optionsCard: {
        backgroundColor: "rgba(132,183,213,0.78)",
        borderRadius: 20,
        alignItems: "center",
        flex: 1
    },
    optionsCardText: {
        fontSize: 22,
        fontWeight: "400",
        color: "white",
        flex: 1,
        textAlignVertical: "bottom",
        marginBottom: 20
    },
    optionsCardIcon: {
        color: "white",
        marginTop: 40
    },
    optionsCardOpacity: {
        height: 200,
        width: "46%",
        margin: 5,
        borderRadius: 20
    }
})

export default Inicio