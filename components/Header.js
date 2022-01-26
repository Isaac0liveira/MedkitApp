import {Animated, StyleSheet, Text, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowAltCircleLeft} from "@fortawesome/free-regular-svg-icons";
import React from "react";

export const ShowHeader = (props) => {
    return <Animated.View style={[styles.header, props.customStyle]}>
        <TouchableOpacity onPress={props.onPress}>
            <FontAwesomeIcon size={38} icon={faArrowAltCircleLeft}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>
            {props.headerText}
        </Text>
    </Animated.View>
}

const styles = StyleSheet.create({
    header: {
        marginTop: 60,
        marginBottom: 20,
        marginHorizontal: 20,
        flexDirection: "row"
    },
    headerText: {
        color: "black",
        fontSize: 25,
        fontWeight: "300",
        marginHorizontal: 20
    },
})