import React, { Component } from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

class World extends Component {
componentDidMount() {
    fetch("https://www.strava.com/api/v3/activities/12345678987654321?include_all_efforts=Authorization: Bearer [[18e4615989b47dd4ff3dc711b0aa4502e4b311a9]]")
    .then(res => res.json())
    .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err))
}
    render() {
        return (
            <View>
                <Text></Text>
            </View>
        );
    }
}

export default World;

