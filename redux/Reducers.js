import { combineReducers } from 'redux'
import consts from './Consts'

import TabBar from '../components/TabNavigator/TabBarConfig'
import TabOne from '../components/HomeScreen/HomeTabConfig'
import TabTwo from '../components/ProfileTab/ProfileTabConfig'
import PopularTab from '../components/PopularTab/PopularTabConfig'
import InitScreen from '../components/SignUpNavigator/SignUpConfig'


function allUsers(state=[],action){
  switch (action.type) {
    case consts.GETINITALUSERS:
      return action.payload
      break;
    case consts.UPFOLLOWING:
      console.log('UPFOLLOWING in allUsers which is really just the users the current user is following');
      console.log(action.payload);
      console.log(state);
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
  // if(action.type === consts.GETINITALUSERS){
  //   return action.payload
  // }else {
  //   return state
  // }
}

function currentUser(state={},action){
  switch (action.type) {
    case consts.GETCURRENTUSER:
      return action.payload
      break;
    default:
      return state
  }

}

function currentAuthUser(state={},action){
  switch(action.type){
    case consts.GETAUTHUSER:
      return action.payload
      break
    case consts.UPFOLLOWING:
      return {
        ...state,
        following: [
          ...state.following,
          action.payload.id
        ]
      }
    default:
      return state
  }

}

function popularUsers(state=[],action){
  switch(action.type){
    case consts.POPULARUSERS:
      return action.payload;
      break;
    default:
      return state
  }
}

export default combineReducers({
  allUsers,
  popularUsers,
  currentUser,
  currentAuthUser,
  tabBar: (state, action) => TabBar.router.getStateForAction(action,state),
  tabOne: (state, action) => TabOne.router.getStateForAction(action,state),
  tabTwo: (state, action) => TabTwo.router.getStateForAction(action,state),
  popularTab: (state, action) => PopularTab.router.getStateForAction(action,state),
  initScreen: (state, action) => InitScreen.router.getStateForAction(action,state)
})
