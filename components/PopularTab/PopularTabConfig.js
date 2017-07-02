import React, { Component } from 'react'
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'

import PopularScreen from './PopularScreen'
import UserDetail from '../HomeScreen/HomeTabScreens/UserDetail'

export default StackNavigator({
  PopularTabPopularScreen: {
    screen: PopularScreen,
    navigationOptions: ({navigation}) => ({
      title: "Popular"
    }),
  },
  PopularTabUserDetail: {
    screen: UserDetail,
    navigationOptions: ({navigation}) => ({
      title: "User Detail"
    }),
  }
})
