import React, {useEffect} from "react";
import {Text, StyleSheet, View, StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import {Provider, useSelector} from "react-redux";
import store from "./redux/store";
import ListaConsultas from "./pages/ListaConsultas";
import Agendamento from "./pages/Agendamento";
import Consulta from "./pages/Consulta";
import ListaExames from "./pages/ListaExames";
import Exame from "./pages/Exame";
import ListaCirurgias from "./pages/ListaCirurgias";
import Cirurgia from "./pages/Cirurgia";

const Stack = createNativeStackNavigator();

const App = () => {
    useEffect(() => {StatusBar.setHidden(true)}, []);

    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: "rgb(195,248,224)"}}} initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{title: 'Login', headerShown: false}}/>
                <Stack.Screen name="Inicio" component={Inicio} options={{title: 'Inicio', headerShown: false}}/>
                <Stack.Screen name="ListaConsultas" component={ListaConsultas} options={{title: 'Consultas', headerShown: false}}/>
                <Stack.Screen name="ListaExames" component={ListaExames} options={{title: 'Exames', headerShown: false}}/>
                <Stack.Screen name="ListaCirurgias" component={ListaCirurgias} options={{title: 'Cirurgias', headerShown: false}}/>
                <Stack.Screen name="MarcarConsulta" component={Agendamento} options={{title: 'Marcar Consulta', headerShown: false}}/>
                <Stack.Screen name="Consulta" component={Consulta} options={{title: 'Consulta', headerShown: false}}/>
                <Stack.Screen name="Exame" component={Exame} options={{title: 'Exame', headerShown: false}}/>
                <Stack.Screen name="Cirurgia" component={Cirurgia} options={{title: 'Cirurgia', headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
}

export default App;