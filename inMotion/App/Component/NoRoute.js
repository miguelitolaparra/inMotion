import React, { Component } from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';


class NoRoute extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../Assets/HatchfulExport-All/facebook_profile_image.png')} style={styles.image}/>
                <Text style={styles.error}>No Routes Found 😞</Text>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight onPress={Actions.newRoute}
                                        style={styles.button}>
                        <Text style={styles.buttonText}>Create New Route</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default NoRoute;

styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#DAE2EE'
    },
    image: {
        width: 300,
        height: 300
    },
    error: {
        fontSize: 30
    },
    button: {
        width: 300,
        backgroundColor: '#092D4D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 0,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        margin: 0,
        padding: 5
    },
    buttonContainer: {
       display: 'flex',
        alignItems: 'center'
    }
})