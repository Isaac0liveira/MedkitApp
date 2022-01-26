import {Animated, Button, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserRequest} from "../redux/actions/user";

const Login = ({navigation}) => {
    const dispatch = useDispatch();
    const usuario = useSelector(state => state.users.users)
    const [valueImg, setValueImg] = useState(new Animated.Value(800));
    const [valueFade, setValueFade] = useState(new Animated.Value(0));
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("")

    useEffect(() => {
        Animated.timing(valueImg, {
            toValue: 0,
            duration: 600,
            useNativeDriver: false
        }).start();
        Animated.timing(valueFade, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }, []);

    useEffect(() => {
        usuario.length !== 0? navigation.navigate('Inicio') : null
    }, [usuario])

    return (
        <View style={styles.container}>
            <Animated.Image source={require('../assets/img/hospital_login.jpg')}  style={{position: "absolute", height: "120%", width: "100%", top: valueImg}}/>
            <Animated.View style={[styles.container, {height: "60%", width: "90%", borderRadius: 15, bottom: 40, opacity: valueFade}]}>
                <Text style={styles.textoInicial}>Seja bem vindo a{"\n"} Medkit Clínica! {"\n"}</Text>
                <TextInput style={styles.input} placeholder="Login" onChangeText={(text) => setLogin(text)}/>
                <TextInput style={styles.input} placeholder="Senha" onChangeText={(text) => setSenha(text)}/>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(getUserRequest({cpf: login, senha: senha}))}>
                    <Text style={{color: "rgba(204,238,238,0.95)", fontSize: 15, fontFamily: "Roboto-Light"}}>Entrar</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.container, {height: "15%", width: "90%", borderRadius: 15, top: 10, opacity: valueFade}]}>
                <Text style={{color: "rgba(0,75,75,0.95)", fontSize: 18, padding: 10, textAlign: "center", fontFamily: "Roboto-Light"}}>Ainda não é cliente Medkit? {"\n"} Venha e faça seu cadastro</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
        container: {
            height: "100%",
            width: "100%",
            justifyContent: "center",
            backgroundColor: "rgba(243,246,245,0.76)",
            alignItems: "center"
        },
        textoInicial: {
            fontFamily: "Roboto-Light",
            fontSize: 30,
            top: 20,
            textAlign: "center",
            color: "rgba(2,94,84,0.75)",
        },
        input: {
            backgroundColor: "rgba(17,55,78,0.87)",
            width: "80%",
            margin: 10,
            padding: 15,
            borderRadius: 20,
        },
        button: {
            backgroundColor: "rgba(17,55,78,0.87)",
            padding: 20,
            width: "40%",
            alignItems: "center",
            top: 20,
            marginBottom: 20
        }
    }
);

export default Login;