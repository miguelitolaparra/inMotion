import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
import haversine from 'haversine';
import { Actions } from 'react-native-router-flux';

class NewRoute extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          latitude: 43.6455535,
          longitude: -79.3975818,
          error: null,
          newRoute: [],
          travelledDistance: 0,
          showsUserLocation: false,
          tracking: false
        };
      }
      componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('starting position', position)
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.state.showsUserLocation = true;
      }
      trackRoute = () => {
        this.setState({
          tracking: true
        })
        this.watchId = navigator.geolocation.watchPosition(position => {
          let copy = Array.from(this.state.newRoute)
          copy.push(position)
          this.setState({
            newRoute: copy
          })
          console.log('this is tracking', position)
        },error => console.log(error), {distanceFilter: 10})

      }
      recordDistance = () => {
        let cumulativeDistance = 0
        let startingPoint = {}
        this.state.newRoute.forEach(position => {
          let {latitude, longitude} = position.coords
          let endPoint = {latitude, longitude}
          let travelled = haversine(startingPoint, endPoint, {unit: 'meter'}) || 0;
          startingPoint = endPoint
          cumulativeDistance = cumulativeDistance + travelled
        })
        this.setState({
          travelledDistance: cumulativeDistance
        })
        Actions.newRouteInfo({newRoute:this.state.newRoute})
      }
      stopTracking = () => {
        this.setState({
          tracking: false
        })
        navigator.geolocation.clearWatch(this.watchId)
        this.recordDistance();
      }
      render() {
        let polyArray = this.state.newRoute.map(position => {
          return {latitude:position.coords.latitude, longitude:position.coords.longitude}
        })
        buttonFn = () => {if(!this.state.tracking){
          return (
                <TouchableHighlight onPress={this.trackRoute}
                                    style={styles.trackButton}>
                    <Text style={styles.buttonText}>Track Route</Text>
                </TouchableHighlight>
          )
        } else {
          return (
                <TouchableHighlight onPress={this.stopTracking}
                                    style={styles.stopButton}>
                    <Text style={styles.stopText}>Stop Tracking</Text>
                </TouchableHighlight>
          )
        }
      }
        return (
          <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={{
                       latitude: this.state.latitude,
                       longitude: this.state.longitude,
                       latitudeDelta: 0.0922,
                       longitudeDelta: 0.0421}}
                     showsUserLocation={true}
                     followsUserLocation={true}>
                     <Polyline coordinates={polyArray} strokeColor='#000' strokeWidth={6}/>
            </MapView>
            <View>
            {buttonFn()}
            </View>
            </View>
        );
      }
}

export default NewRoute;

var styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    trackButton: {
      backgroundColor: '#092D4D',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 24,
      margin: 0,
      padding: 20
    },
    stopButton:{
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stopText: {
      color: '#092D4D',
      fontSize: 24,
      margin: 0,
      padding: 20
    }
  });

