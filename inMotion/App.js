/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
// import MapView, {Polyline} from 'react-native-maps';
// import haversine from 'haversine';
import {Router, Scene, Stack} from 'react-native-router-flux';
import NewRoute from './App/Component/NewRoute';
import World from './App/Component/World';
import Home from './App/Component/Home';
import Intro from './App/Component/Intro';
import Mapped from './App/Component/Mapped';
import NewRouteInfo from './App/Component/NewRouteInfo';
import NoRoute from './App/Component/NoRoute';
import TrailDetail from './App/Component/TrailDetail';


const App = () => {
return(
    <Router>
      <Scene key="root">
        <Scene key="intro" component={Intro} title="inMotion"/>
        <Scene key="home" component={Home} title="inMotion"/>
        <Scene key="noRoute" component={NoRoute} title="inMotion"/>
        <Scene key="mapped" component={Mapped} title="inMotion"/>
        <Scene key="newRoute" component={NewRoute} title="inMotion"/>
        <Scene key="newRouteInfo" component={NewRouteInfo} title="inMotion"/>
        <Scene key='trailDetail' component={TrailDetail} title='inMotion'/>
      </Scene>
    </Router>
)
}

export default App;
