import React, {useState} from "react";
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import moment from "moment";

export const Card = (props) => {
    const getMomentDate = (date, format) => {
        moment.locale('pt-br')
        return moment(date).format(format);
    }

    const [valueImg] = useState(new Animated.Value(800));
    props.animated && Animated.timing(valueImg, {
        toValue: 0,
        duration: 600 + props.index * 600 / 2,
        useNativeDriver: false
    }).start();

    return <Animated.View style={{position: "relative", left: props.animated? valueImg : 0}}>
        <TouchableOpacity style={styles.consultaCardOpacity} onLongPress={props.onLongPress}
                          onPress={props.onPress}>
            <View style={[styles.consultaCardStart, {backgroundColor: props.startBackgroundColor? props.startBackgroundColor : "white" }]}>
                {props.isDate && <Text style={styles.consultaCardTextStart}>{getMomentDate(props.data, 'DD')}</Text>}
                {props.isDate && <Text style={styles.consultaCardTextStart}>{getMomentDate(props.data, "MMM").toUpperCase()}</Text>}
                {!props.isDate && props.startText && <Text style={[styles.consultaCardTextStart, {textAlignVertical: "center"}]}>{props.startText}</Text>}
            </View>

            <View style={[styles.consultaCardEnd, {backgroundColor: props.endBackgroundColor? props.endBackgroundColor : "rgba(121,228,243,0.55)"}]}>
                <Text style={[styles.consultaCardTextEnd, {marginTop: 10}]}>{props.titulo}</Text>
                <Text style={styles.consultaCardTextEnd}>{props.linha1}</Text>
                <Text style={[styles.consultaCardTextEnd, {fontWeight: "bold", letterSpacing: 2}]}>{props.linha2}</Text>
            </View>
        </TouchableOpacity>
    </Animated.View>
}

const styles = StyleSheet.create({
    consultaCardStart: {
        borderBottomStartRadius: 60,
        borderTopStartRadius: 60,
        width: "35%",
        alignItems: "center",
    },
    consultaCardTextStart: {
        fontSize: 18,
        fontWeight: "300",
        color: "black",
        flex: 1,
        marginVertical: 10,
        marginLeft: 20,
        textAlignVertical: "top",
    },
    consultaCardEnd: {
        alignItems: "flex-start",
        width: "70%"
    },
    consultaCardTextEnd: {
        fontSize: 20,
        fontWeight: "400",
        marginTop: 5,
        color: "white",
        marginLeft: 20,
        textAlignVertical: "top",
    },
    consultaCardOpacity: {
        height: 120,
        width: "100%",
        borderRadius: 20,
        flexDirection: "row",
        marginVertical: 10
    },
});