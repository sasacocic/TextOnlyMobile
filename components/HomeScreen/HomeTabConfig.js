import 'react'
import 'react-native';
import { StackNavigator } from 'react-navigation'

import UserDetail from './HomeTabScreens/UserDetail'
import UserList from './HomeTabScreens/UserList'
import Post from './HomeTabScreens/Post'


export default StackNavigator({
  MainScreen : { screen: UserList},
  User_Detail : { screen: UserDetail},
  Post: {screen: Post}
},{
  mode: 'modal'
})
