import React, { Component } from 'react'
import { View, Text, AppRegistry, Button } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'


import HomeTab from '../HomeScreen/HomeTab'
import ProfileTab from '../ProfileTab/ProfileTab'
import PopularTab from '../PopularTab/PopularTab'
import Testing from './Testing'

const tabBarConfiguration = {
  //...other configs
tabBarOptions:{
    // tint color is passed to text and icons (if enabled) on the tab bar
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
// background color is for the tab component
    activeBackgroundColor: 'blue',
    inactiveBackgroundColor: 'white',
  }
}

export default TabNavigator({
  HomeScreen: { screen: HomeTab},
  ProfileScreen: { screen: ProfileTab},
  PopularScreen: {screen: PopularTab},
  // Testing: {screen: Testing} // only for testing features quickly 
},tabBarConfiguration)
