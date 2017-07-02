import React, { Component } from 'react'
import { View, Text, AppRegistry, Button, Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation'

import UserDetail from './HomeTabScreens/UserDetail'
import UserList from './HomeTabScreens/UserList'
import Post from './HomeTabScreens/Post'


const stackNavigatorConfig = {
  mode: 'modal',
}

export default StackNavigator({
  MainScreen : { screen: UserList},
  User_Detail : { screen: UserDetail},
  Post: {screen: Post}
},stackNavigatorConfig)
