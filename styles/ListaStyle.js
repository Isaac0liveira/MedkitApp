import {StyleSheet} from "react-native";

export const listaStyle = StyleSheet.create({
    listaContainer: {
        marginLeft: 10
    },
    listaVazias: {
        flex: 1,
        color: "black",
        alignSelf: "center",
        textAlignVertical: "center",
        fontSize: 25,
        fontWeight: "200"
    },
    listaAddButton: {
        backgroundColor: "#68aab6",
        width: "80%",
        alignSelf: "center",
        padding: 20,
        alignItems: "center",
        marginVertical: 20,
        borderRadius: 10
    },
    listaAddButtonText: {
        color: "white",
        fontSize: 20,
    },
})