import React from 'react'
import {Text, Animated, Easing} from 'react-native'
import { StackNavigator } from 'react-navigation'
import ProfileScreen from './ProfileScreen'
import ProfileSettingsScreen from './ProfileSettingsScreen'




export default StackNavigator({
  Profile : { screen: ProfileScreen},
  Profile_Settings : { screen: ProfileSettingsScreen}
},{
  mode: 'modal',
  cardStyle:{
    backgroundColor: "transparent",
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps
      const { index } = scene

      const height = layout.initHeight
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      })

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      })

      return { opacity, transform: [{ translateY }] }
    },
  }),

})
