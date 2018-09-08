import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux'

class TrailDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            location: this.props.location
        }
    }

    initialRegion = () => {
        return ({
            latitude: this.state.location.lat,
            longitude: this.state.location.lon,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4
        })
    }

    render() {
        let { location } = this.state
        let latitude = location.lat;
        let longitude= location.lon;
        let latlng = {latitude, longitude};
        let initialRegion = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.4,
                longitudeDelta: 0.4
            }
        let activityLog = location.activities.map(activity => {
            let activityName =activity.activity_type_name.toUpperCase()

            return (
                <View key={activity.unique_id}>
                   <Text style={styles.activity}>{activityName + ':'}</Text>
                   <Text style={styles.rating}>   rating: {(activity.rating > 0 ? activity.rating : 'Not yet rated.')}</Text>
                </View>
            )
        })
        console.log(this.state.location)
        let trailName = location.name.toUpperCase()
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                        initialRegion={initialRegion}>
                    <MapView.Marker coordinate={latlng}
                                    title={location.name}
                                    pinColor='#092D4D' />
                </MapView>
                <View>
                    <Text style={styles.name}>{trailName}</Text>
                    <Text style={styles.activityHdr}>Available Activities</Text>
                    {activityLog}
                </View>
            </View>
        );
    }
}

export default TrailDetail;

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DAE2EE'
    },
    map: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
        fontSize: 24,
        marginBottom: 5,
        color: '#092D4D'
    },
    activityHdr: {
        fontSize: 18,
        marginBottom: 5,
        color: '#092D4D'
    },
    activity: {
        display: 'flex',
        fontSize: 18,
        color: '#092D4D'
    },
    rating: {
        display: 'flex',
        fontSize: 18,
        marginBottom: 5,
        color: '#092D4D'
    }
  });