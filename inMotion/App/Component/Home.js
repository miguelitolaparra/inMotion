import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableHighlight, Picker, Image, TextInput} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import ImageSlider from 'react-native-image-slider';





class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          latitude: '',
          longitude: '',
          error: null,
          currentLocation: [],
          useCurrent: false,
          showsUserLocation: false,
          inputLocationCity: '',
          inputLocationState: '',
          sport: '',
          fetchResponse: []
        };
      }

      findTrails = () => { // this is the function that runs when the submit button is touched.
        if(this.state.inputLocationCity && this.state.inputLocationState || this.state.useCurrent){ if(this.state.useCurrent) {
                fetch(`https://trailapi-trailapi.p.mashape.com/?lat=${this.state.latitude || ''}&lon=${this.state.longitude || ''}&
        q[activities_activity_type_name_eq]=${this.dropdownRef.value() || ''}`, {
            headers: {
                'X-Mashape-Key': 'F3CQOfYu4Nmsh6C6zBA1x7EIFZnQp1ZeRnLjsnNOygYt4LfdE5'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    fetchResponse: data
                })
                Actions.mapped({fetchResponse: this.state.fetchResponse, latitude: this.state.latitude, longitude: this.state.longitude})
            })
        } else {
            fetch(`https://trailapi-trailapi.p.mashape.com/?q[city_cont]=${this.state.inputLocationCity || ''}&q[state_cont]=${this.state.inputLocationState || ''}&
        q[activities_activity_type_name_eq]=${this.dropdownRef.value() || ''}`, {
            headers: {
                'X-Mashape-Key': 'F3CQOfYu4Nmsh6C6zBA1x7EIFZnQp1ZeRnLjsnNOygYt4LfdE5'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    fetchResponse: data
                })
                Actions.mapped({fetchResponse: this.state.fetchResponse})
            })
        }
      } else {
          alert('Please input both a city and province/state')
      }
    }
      currentLocation = () => { // runs if the user want's to use their current location instead of inputting their own
          navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                currentLocation: 'Current Location',
                useCurrent: true
            })
          },
        )
      }
      render() {
          let sport =[{
              value: 'hiking',
              label: 'hiking'
          }, {
              value: 'mountain biking'
          }]
          const images = [
            'https://imgur.com/FhCzHj9.jpg',
            'https://imgur.com/BrT9hVV.jpg',
            'https://imgur.com/i1Bigte.jpg',
            'https://imgur.com/6ESLjKk.jpg',
            'https://imgur.com/sZmxxQW.jpg'
          ]
        return (
          <View style={styles.container}>

                <View style={styles.search}>
                    <Dropdown
                        ref={(el)=> this.dropdownRef = el}
                        label='  Choose your sport'
                        data={sport}
                        onChangeText={(e) => {
                            let splitStr = e.split(' ');
                            if (splitStr.length > 1){
                                let newStr = splitStr[0] +'+'+splitStr[1]
                                this.setState({
                                    sport: newStr
                                    })
                            } else {
                                this.setState({
                                    sport: e
                                })
                            }
                        }}
                        />
                    <TextInput onChangeText={text => {
                                                this.setState({
                                                    inputLocationCity: text.trim(),
                                                    useCurrent: false})
                                                }
                                            }
                                placeholder='City'
                                style={styles.textInput}>
                        {this.state.currentLocation}
                    </TextInput>
                    <TextInput onChangeText={text => {
                        this.setState({
                            inputLocationState: text.trim(),
                            useCurrent: false})
                        }} placeholder='State/Prov'
                        style={styles.textInput}>
                            {this.state.currentLocation}
                    </TextInput>
                    <View style={styles.searchBtnCont}>
                        <TouchableHighlight onPress={this.currentLocation}
                                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Use Current Location
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.findTrails}
                                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Submit
                            </Text>
                        </TouchableHighlight>

                    </View>
                </View>
                <View style={styles.imageSlider}>
                    <ImageSlider images={images}
                                loopBothSides
                                autoPlayWithInterval={2000}
                                style={styles.imageSlider}
                                >
                                <Image source={require('../Assets/HatchfulExport-All/logo_transparent.png')}
                                style={styles.image}/>

                    </ImageSlider>

                </View>
                <View style={styles.newRoute}>
                <TouchableHighlight onPress={Actions.newRoute}
                                    style={styles.newRouteBtn}>
                    <Text style={styles.newRouteBtnTxt}>Create New Route</Text>
                </TouchableHighlight>
            </View>

           </View>
        );
      }
}
export default Home;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#DAE2EE'
    },
    search: {
        flex: 1.5,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageSlider: {
        flex: 1.25,
    },
    textInput: {
        margin: 10,
        fontSize: 18,
        paddingBottom: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5
    },
    searchBtnCont: {
        flex: 1,
        alignItems: 'center'
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
    newRoute: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newRouteBtn: {
        backgroundColor: 'white',
        width: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#092D4D',
        borderWidth: 0.5,
        padding: 0,
        margin: 10
    },
    newRouteBtnTxt: {
        fontSize: 24,
        color: '#092D4D',
        padding: 5
    },
    newRouteText: {
        color: '#092D4D',
        fontSize: 18,
    },
    image: {
        width: 200,
        height: 200,
    }
  });

