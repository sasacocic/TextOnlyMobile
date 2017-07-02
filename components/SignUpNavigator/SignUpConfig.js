import React from 'react'
import { StackNavigator, NavigationActions } from 'react-navigation'
import {View, Text, Button} from 'react-native'


//import screens
import SignUpScreen from '../SignUpScreens/SignUpScreen'
import LoginScreen from '../SignUpScreens/LoginScreen'


//Navigator
export default StackNavigator({
  SignUp: {screen: SignUpScreen},
  Login: {screen: LoginScreen},
},{
  initialRouteName: "SignUp",
  headerMode : "none",
}
)
