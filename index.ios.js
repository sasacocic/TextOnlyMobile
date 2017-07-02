/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  AppRegistry,
  Button,
  AsyncStorage,
  Animated,
  Easing
} from 'react-native';
// import { Navigation } from 'react-native-navigation';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Provider } from 'react-redux';
import store from './redux/Store'


import Navigator from './components/TabNavigator/TabBar'
import InitScreen from './components/SignUpNavigator/SignUp'


export class App extends Component {
  constructor(){
    super()
    this.state = {
      loggedIn : false
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('@TextOnlyMobile:CurrentUser').then(res => {
      //res could also be null.....
      if(res != undefined){
        this.setState({loggedIn:true})
      }
    })
  }

  // create animation for logging in
  render(){
    if(this.state.loggedIn){
      return(
        <Provider store={store}>
          <Navigator />
        </Provider>
      )
    } else{
      return(
        <Provider store={store}>
          <InitScreen />
        </Provider>
      )
    }
  }
}

class SimpleNav extends Component {

  render(){
    return(
        <App />
    )
  }
}


AppRegistry.registerComponent('textOnlyMobile', () => App)
