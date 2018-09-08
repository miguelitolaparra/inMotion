import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Home from './Home';

class Intro extends Component {
    componentDidMount() {
        setTimeout(Actions.home,1500)
    }
    // how do i remove the back button?
    render() {
        return (
            <View>
                <TouchableHighlight onPress={Actions.home}>
                    <Image source={require('../Assets/HatchfulExport-All/facebook_profile_image.png')} style={styles.image}></Image>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Intro;

var styles = StyleSheet.create({

    image: {
      width: 375,
      height: 600
    }
  });