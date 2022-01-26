import {Modal, StyleSheet, Pressable, Text, TouchableOpacity} from "react-native";
import React from "react";


const ModalButton = (props) => {
    return <TouchableOpacity style={styles.buttonClose} onPress={props.onPress}>
        <Text style={styles.textStyle}>{props.text}</Text>
    </TouchableOpacity>
}

export const ShowModal = (props) => {
    return <Modal animationType="slide" transparent={true} visible={props.modalVisible}
                  onRequestClose={props.onRequestClose} statusBarTranslucent={true}>
        <Pressable style={styles.centeredView} onPress={props.onPressOut}>
            {props.options.map((option, index) => {
                return <ModalButton style={styles.buttonClose} key={index} text={option.text} onPress={option.onPress}/>
            })}
        </Pressable>
    </Modal>
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(200,231,217,0.75)",
    },
    buttonClose: {
        borderRadius: 20,
        marginTop: 20,
        paddingHorizontal: 80,
        padding: 20,
        elevation: 2,
        backgroundColor: "#003b39",
    },
});