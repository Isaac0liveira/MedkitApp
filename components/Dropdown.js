import {StyleSheet, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import React from "react";

export const Dropdown = (props) => {
    return <View style={styles.pickerContainer}>
        <Picker mode="dropdown" selectedValue={props.selected} style={styles.pickerStyle}
                onValueChange={((itemValue, itemIndex) => itemValue !== "0" ? props.onValueChange(itemValue) : null)}>
            {props.children}
        </Picker>
    </View>
}

const styles = StyleSheet.create({
    pickerContainer: {
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: "rgba(78,83,83,0.34)",
        padding: 10,
        margin: 20
    },
    pickerStyle: {
        color: "black",
        width: "100%"
    },
})