import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableHighlight } from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
import { Dropdown } from 'react-native-material-dropdown';
import { Actions } from 'react-native-router-flux';

class NewRouteInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            newRoute: this.props.newRoute,
            activity: '',
            rating: '',
            name: '',
            description: ''
        }
    }
    initialRegion = () => {
        return (
            {
                latitude: this.state.newRoute[0].coords.latitude,
                longitude: this.state.newRoute[0].coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            }
        )
    }
    submitTrail = () => {
        let { name, description, activity, rating, newRoute } = this.state
        let locationArray = newRoute.map(location => {
            let latitude = location.coords.latitude
            let longitude = location.coords.longitude
            return {latitude, longitude}
        })
        console.log({ name: name,
            location: locationArray,
            description: description,
            activity: activity,
            rating: rating})
        fetch('http://192.168.0.108:3000/trails', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                location: locationArray,
                description: description,
                activity: activity,
                rating: rating
            })
        })
            .then(res => res.json())
            .then(data => {
                Actions.home()
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        let rating = [{
            value: 1
        }, {
            value: 2
        }, {
            value: 3
        }, {
            value: 4
        }, {
            value: 5
        }]
        let activity = [{
            value: 'hiking'
        }, {
            value: 'mountain biking'
        }, {
            value: 'longboarding'
        }, {
            value: 'running'
        }, {
            value: 'surfing'
        }, {
            value: 'SUP boarding'
        }]
        let {latitude, longitide} = this.state.newRoute[0].coords
        let polyArray = this.state.newRoute.map(position => {
            return {latitude:position.coords.latitude, longitude:position.coords.longitude}
          })
        return (
            <View style={styles.container}>
                <TextInput onChangeText={(text)=>{
                    this.setState({
                        name: text
                    })
                }} placeholder='Route Name'
                   style={styles.textInput}/>
                <TextInput onChangeText={(text) => {
                    this.setState({
                        description: text
                    })
                }} placeholder='Description'
                   style={styles.textInput}/>
                <Dropdown
                    ref={(el)=> this.dropdownactivityRef = el}
                    label='  Activity'
                    data={activity}
                    onChangeText={(e) => {
                        let splitStr = e.split(' ');
                        if (splitStr.length > 1){
                             let newStr = splitStr[0] +'+'+splitStr[1]
                             this.setState({
                                 activity: newStr
                                })
                        } else {
                            this.setState({
                                activity: e
                            })
                        }
                    }}
                    />
                <Dropdown
                    ref={(el)=> this.dropdownRatingRef = el}
                    label='  Difficulty'
                    data={rating}
                    onChangeText={(e)=> {
                        this.setState({
                            rating: e
                        })
                    }}
                    />
                <View style={styles.buttonContainer}>
                    <TouchableHighlight onPress={this.submitTrail}
                                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </TouchableHighlight>
                </View>
                <MapView
                    style={styles.map}
                    initialRegion={this.initialRegion()}>
                    <Polyline coordinates={polyArray} strokeColor='#000' strokeWidth={4}/>
                </MapView>
            </View>
        );
    }
}

export default NewRouteInfo;

let styles = StyleSheet.create ({
    container: {
        flex: 1,
      },
      map: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textInput: {
        margin: 10,
        fontSize: 18,
        paddingBottom: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5
      },
      button: {
        width: 200,
        backgroundColor: '#092D4D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 0,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        margin: 0,
        padding: 0
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center'
    }
})