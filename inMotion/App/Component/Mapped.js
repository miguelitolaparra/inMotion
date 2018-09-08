import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';

class Mapped extends Component {
    constructor(props){
        super(props);
        this.state={
            response:this.props.fetchResponse,
            latitude: this.props.latitude,
            longitude: this.props.longitude
        }
    }
    initialRegion = () => {
        if(this.state.latitude) {
            return (
                {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.4,
                    longitudeDelta: 0.4
                }
            )
        } else if (this.state.response.places.length === 0){
            Actions.noRoute()
        } else {
            return (
                {
                    latitude: this.state.response.places[0].lat,
                    longitude: this.state.response.places[0].lon,
                    latitudeDelta: 0.6,
                    longitudeDelta: 0.6
                }
            )
        }
    }

    render() {
        let mappedRoutes = this.state.response.places.map( location => {
            let latitude = location.lat;
            let longitude= location.lon;
            let latlng = {latitude, longitude};
            return (
                <MapView.Marker
                            key={location.unique_id}
                            coordinate={latlng}
                            title={location.name}
                            description={location.description}
                            pinColor='#092D4D'
                            onPress={() => {Actions.trailDetail({location:location})}}/>
            )
        })
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={this.initialRegion()}>
                    {mappedRoutes}
                </MapView>
                <Button title='Create a new route' onPress={Actions.newRoute} />
            </View>
        );
    }
}

export default Mapped;

var styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });